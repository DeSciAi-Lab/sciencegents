
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { contractConfig } from '@/utils/contractConfig';

// Define the type for swap direction
export type SwapDirection = 'buy' | 'sell';

// Custom hook for token swap functionality
export const useTokenSwap = (tokenAddress: string) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenPrice, setTokenPrice] = useState<string>('0');

  // Refresh balances function
  const refreshBalances = useCallback(async () => {
    if (!window.ethereum || !tokenAddress) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length === 0) return;
      
      const account = accounts[0];
      
      // Get ETH balance
      const ethBalance = await provider.getBalance(account);
      setEthBalance(ethers.utils.formatEther(ethBalance));
      
      // Get token balance
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function balanceOf(address) view returns (uint256)'],
        provider
      );
      
      const balance = await tokenContract.balanceOf(account);
      setTokenBalance(ethers.utils.formatUnits(balance, 18));
      
      // Get token price
      try {
        const swapContract = new ethers.Contract(
          contractConfig.addresses.ScienceGentsSwap,
          [
            'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
          ],
          provider
        );
        
        const stats = await swapContract.getTokenStats(tokenAddress);
        // currentPrice is at index 11
        const price = stats[11];
        
        if (price) {
          setTokenPrice(ethers.utils.formatEther(price));
        }
      } catch (priceError) {
        console.error('Error fetching token price:', priceError);
      }
    } catch (e) {
      console.error('Error refreshing balances:', e);
    }
  }, [tokenAddress]);

  // Initialize balances on mount
  useEffect(() => {
    refreshBalances();
    
    // Set up listener for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', refreshBalances);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', refreshBalances);
      }
    };
  }, [refreshBalances]);

  // Function to estimate tokens received for ETH
  const estimateTokensFromETH = useCallback(async (ethAmount: string): Promise<string> => {
    if (!window.ethereum || !tokenAddress || !ethAmount) return '0';
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function calculateTokensFromETH(address,uint256) view returns (uint256)'],
        provider
      );
      
      const ethAmountWei = ethers.utils.parseEther(ethAmount);
      const tokensOut = await swapContract.calculateTokensFromETH(tokenAddress, ethAmountWei);
      
      return ethers.utils.formatUnits(tokensOut, 18);
    } catch (e) {
      console.error('Error estimating tokens from ETH:', e);
      return '0';
    }
  }, [tokenAddress]);

  // Function to estimate ETH received for tokens
  const estimateETHFromTokens = useCallback(async (tokenAmount: string): Promise<string> => {
    if (!window.ethereum || !tokenAddress || !tokenAmount) return '0';
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function calculateETHFromTokens(address,uint256) view returns (uint256)'],
        provider
      );
      
      const tokenAmountWei = ethers.utils.parseEther(tokenAmount);
      const ethOut = await swapContract.calculateETHFromTokens(tokenAddress, tokenAmountWei);
      
      return ethers.utils.formatEther(ethOut);
    } catch (e) {
      console.error('Error estimating ETH from tokens:', e);
      return '0';
    }
  }, [tokenAddress]);

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
      
      await refreshBalances();
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
  }, [tokenAddress, refreshBalances]);

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
      
      await refreshBalances();
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
  }, [tokenAddress, refreshBalances]);

  return {
    buyTokens,
    sellTokens,
    estimateTokensFromETH,
    estimateETHFromTokens,
    isPending,
    error,
    tokenBalance,
    ethBalance,
    tokenPrice,
    refreshBalances
  };
};
