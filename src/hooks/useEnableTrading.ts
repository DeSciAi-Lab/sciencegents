import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { contractConfig } from '@/utils/contractConfig';
import { fetchTokenStats } from '@/services/scienceGent';

export const useEnableTrading = (tokenAddress: string) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enableTrading = useCallback(async (): Promise<boolean> => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setError(null);
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      
      // Create a contract instance with the enableTrading function
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function enableTrading(address)'],
        signer
      );
      
      toast({
        title: "Preparing Transaction",
        description: "Confirm the transaction in your wallet...",
      });
      
      // Call the enableTrading function
      const tx = await swapContract.enableTrading(tokenAddress);
      
      toast({
        title: "Transaction Submitted",
        description: "Enabling trading...",
      });
      
      // Wait for transaction confirmation
      await tx.wait();
      
      toast({
        title: "Trading Enabled",
        description: "Trading has been successfully enabled for this token.",
      });
      
      // Refresh token stats to reflect the new trading state
      await fetchTokenStats(tokenAddress, 0, true);
      
      return true;
    } catch (e: any) {
      console.error('Error enabling trading:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to enable trading. Please try again.';
      
      // Check for common errors and simplify them
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('execution reverted')) {
        errorMsg = 'Transaction failed. You may not be the token creator.';
      }
      
      setError(errorMsg);
      
      toast({
        title: "Enable Trading Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsPending(false);
    }
  }, [tokenAddress]);

  return {
    enableTrading,
    isPending,
    error
  };
}; 