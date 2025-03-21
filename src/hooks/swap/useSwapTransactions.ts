
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { contractConfig } from '@/utils/contractConfig';

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
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function buyTokens(address,uint256) payable'],
        signer
      );
      
      const ethAmountWei = ethers.utils.parseEther(ethAmount);
      const minTokensOutWei = ethers.utils.parseEther(minTokensOut);
      
      // Apply 1% slippage tolerance
      const minTokensWithSlippage = minTokensOutWei.mul(99).div(100);
      
      const tx = await swapContract.buyTokens(
        tokenAddress,
        minTokensWithSlippage,
        { value: ethAmountWei }
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Please wait while your transaction is being processed...",
      });
      
      await tx.wait();
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${minTokensOut} tokens.`,
      });
      
      await onSuccess();
      return true;
    } catch (e: any) {
      console.error('Error buying tokens:', e);
      setError(e.message || 'Failed to buy tokens. Please try again.');
      
      toast({
        title: "Purchase Failed",
        description: e.message || 'Failed to buy tokens. Please try again.',
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
      
      // First approve the swap contract to spend tokens
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function approve(address,uint256) returns (bool)'],
        signer
      );
      
      const tokenAmountWei = ethers.utils.parseEther(tokenAmount);
      
      const approveTx = await tokenContract.approve(
        contractConfig.addresses.ScienceGentsSwap,
        tokenAmountWei
      );
      
      toast({
        title: "Approval Submitted",
        description: "Please wait while your approval transaction is being processed...",
      });
      
      await approveTx.wait();
      
      // Now sell the tokens
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function sellTokens(address,uint256,uint256)'],
        signer
      );
      
      const minEthOutWei = ethers.utils.parseEther(minEthOut);
      
      // Apply 1% slippage tolerance
      const minEthWithSlippage = minEthOutWei.mul(99).div(100);
      
      const tx = await swapContract.sellTokens(
        tokenAddress,
        tokenAmountWei,
        minEthWithSlippage
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Please wait while your transaction is being processed...",
      });
      
      await tx.wait();
      
      toast({
        title: "Sale Successful",
        description: `You have successfully sold ${tokenAmount} tokens.`,
      });
      
      await onSuccess();
      return true;
    } catch (e: any) {
      console.error('Error selling tokens:', e);
      setError(e.message || 'Failed to sell tokens. Please try again.');
      
      toast({
        title: "Sale Failed",
        description: e.message || 'Failed to sell tokens. Please try again.',
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
