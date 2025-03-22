
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { contractConfig } from '@/utils/contractConfig';
import { recordTokenSwap } from '@/services/priceHistoryService';

export const useSwapTransactions = (tokenAddress: string, onSuccess: () => Promise<void>) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to buy tokens with ETH
  const buyTokens = useCallback(async (ethAmount: string, minTokensOut: string): Promise<boolean> => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setError(null);
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function buyTokens(address,uint256) payable'],
        signer
      );
      
      const ethAmountWei = ethers.utils.parseEther(ethAmount);
      const minTokensOutWei = ethers.utils.parseEther(minTokensOut);
      
      const toastId = toast({
        title: "Preparing Transaction",
        description: "Confirm the transaction in your wallet...",
      });
      
      const tx = await swapContract.buyTokens(
        tokenAddress,
        minTokensOutWei,
        { value: ethAmountWei }
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Your purchase is being processed...",
      });
      
      const receipt = await tx.wait();
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased approximately ${parseFloat(minTokensOut).toFixed(6)} tokens.`,
      });
      
      // Record the trade for price history
      await recordTokenSwap(
        tokenAddress,
        true, // isBuy
        minTokensOut, // approximate token amount
        ethAmount,
        tx.hash,
        userAddress
      );
      
      await onSuccess();
      return true;
    } catch (e: any) {
      console.error('Error buying tokens:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to buy tokens. Please try again.';
      
      // Check for common errors and simplify them
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('insufficient funds')) {
        errorMsg = 'Insufficient ETH balance for this transaction.';
      } else if (errorMsg.includes('slippage')) {
        errorMsg = 'Transaction would result in too much slippage. Try a smaller amount or increase slippage tolerance.';
      }
      
      setError(errorMsg);
      
      toast({
        title: "Purchase Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsPending(false);
    }
  }, [tokenAddress, onSuccess]);

  // Function to sell tokens for ETH
  const sellTokens = useCallback(async (tokenAmount: string, minEthOut: string): Promise<boolean> => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setError(null);
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      
      // First approve the swap contract to spend tokens
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function approve(address,uint256) returns (bool)'],
        signer
      );
      
      // Parse token amount safely without showing errors for large numbers
      let tokenAmountWei;
      try {
        // For large integers without decimals
        if (!tokenAmount.includes('.') && tokenAmount.length > 15) {
          const tokenAmountBN = ethers.BigNumber.from(tokenAmount);
          tokenAmountWei = tokenAmountBN.mul(ethers.constants.WeiPerEther);
        } 
        // For large decimal numbers
        else if (tokenAmount.includes('.') && tokenAmount.length > 15) {
          // For large decimals, round to a reasonable precision (6 decimals)
          const parts = tokenAmount.split('.');
          const integerPart = parts[0];
          const decimalPart = parts[1].substring(0, 6); // Keep only 6 decimal places
          const roundedAmount = `${integerPart}.${decimalPart}`;
          tokenAmountWei = ethers.utils.parseEther(roundedAmount);
          
          console.log("Using rounded decimal amount:", roundedAmount);
        }
        // Standard parsing for reasonable numbers
        else {
          tokenAmountWei = ethers.utils.parseEther(tokenAmount);
        }
      } catch (parseError) {
        console.error('Error parsing token amount:', parseError);
        
        // Fallback strategy for extreme cases - use a simplified integer amount
        try {
          const numValue = Math.floor(parseFloat(tokenAmount));
          const simpleAmount = numValue.toString();
          
          // For very large integers
          if (simpleAmount.length > 15) {
            const tokenAmountBN = ethers.BigNumber.from(simpleAmount);
            tokenAmountWei = tokenAmountBN.mul(ethers.constants.WeiPerEther);
          } else {
            tokenAmountWei = ethers.utils.parseEther(simpleAmount);
          }
          
          // Notify user but continue the transaction
          toast({
            title: "Amount Simplified",
            description: "The token amount was simplified to prevent errors. Decimal places were removed.",
            variant: "default",
          });
        } catch (fallbackError) {
          console.error('Even fallback parsing failed:', fallbackError);
          throw new Error("Unable to process this token amount. Please try a smaller or simpler amount (with fewer decimal places).");
        }
      }
      
      toast({
        title: "Preparing Transaction",
        description: "Approve token spending in your wallet...",
      });
      
      // Execute approve transaction
      try {
        const approveTx = await tokenContract.approve(
          contractConfig.addresses.ScienceGentsSwap,
          tokenAmountWei
        );
        
        toast({
          title: "Approval Submitted",
          description: "Approval is being processed...",
        });
        
        await approveTx.wait();
      } catch (approveError: any) {
        // Don't show decimal places error if the approve transaction itself succeeded
        // The error could be coming from our UI parsing but the transaction might work
        if (!approveError.message?.includes('user rejected')) {
          console.warn("Approve had an error but might have succeeded, continuing with sell:", approveError);
        } else {
          throw approveError; // Rethrow user rejections
        }
      }
      
      // Now sell the tokens - continue even if there was a non-rejection error in approve
      // since the transaction could have gone through successfully
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function sellTokens(address,uint256,uint256)'],
        signer
      );
      
      const minEthOutWei = ethers.utils.parseEther(minEthOut);
      
      toast({
        title: "Confirm Sale",
        description: "Confirm the sale transaction in your wallet...",
      });
      
      try {
        const tx = await swapContract.sellTokens(
          tokenAddress,
          tokenAmountWei,
          minEthOutWei
        );
        
        toast({
          title: "Transaction Submitted",
          description: "Your sale is being processed...",
        });
        
        const receipt = await tx.wait();
        
        toast({
          title: "Sale Successful",
          description: `You have successfully sold tokens for approximately ${parseFloat(minEthOut).toFixed(6)} ETH.`,
        });
        
        // Clear any error that might have been set during the approval phase
        setError(null);
        
        // Record the trade for price history
        await recordTokenSwap(
          tokenAddress,
          false, // isBuy = false for sell
          tokenAmount,
          minEthOut, // approximate ETH amount
          tx.hash,
          userAddress
        );
        
        await onSuccess();
        return true;
      } catch (sellError: any) {
        throw sellError; // Rethrow any errors from the actual sell transaction
      }
    } catch (e: any) {
      console.error('Error selling tokens:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to sell tokens. Please try again.';
      
      // Check for common errors and simplify them
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('insufficient balance')) {
        errorMsg = 'Insufficient token balance for this transaction.';
      } else if (errorMsg.includes('slippage')) {
        errorMsg = 'Transaction would result in too much slippage. Try a smaller amount or increase slippage tolerance.';
      } else if (errorMsg.includes('NUMERIC_FAULT') || errorMsg.includes('fractional component') || errorMsg.includes('decimal places')) {
        // For decimal place errors, don't show the error if we might have already sent the transaction
        if (isPending) {
          errorMsg = null; // Don't show error, the transaction might be in progress
        } else {
          errorMsg = 'The token amount is too large or has too many decimal places. Try using a rounded number without decimal places.';
        }
      }
      
      if (errorMsg) {
        setError(errorMsg);
        
        toast({
          title: "Sale Failed",
          description: errorMsg,
          variant: "destructive",
        });
      }
      
      return false;
    } finally {
      setIsPending(false);
    }
  }, [tokenAddress, onSuccess]);

  return {
    buyTokens,
    sellTokens,
    isPending,
    error
  };
};
