
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
      
      const tokenAmountWei = ethers.utils.parseEther(tokenAmount);
      
      const toastId = toast({
        title: "Preparing Transaction",
        description: "Approve token spending in your wallet...",
      });
      
      const approveTx = await tokenContract.approve(
        contractConfig.addresses.ScienceGentsSwap,
        tokenAmountWei
      );
      
      toast({
        title: "Approval Submitted",
        description: "Approval is being processed...",
      });
      
      await approveTx.wait();
      
      // Now sell the tokens
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
        description: `You have successfully sold ${tokenAmount} tokens for approximately ${parseFloat(minEthOut).toFixed(6)} ETH.`,
      });
      
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
      }
      
      setError(errorMsg);
      
      toast({
        title: "Sale Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
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
