import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';

export const useTokenBalances = (tokenAddress: string) => {
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenPrice, setTokenPrice] = useState<string>('0');
  const [ethReserve, setEthReserve] = useState<string>('0');
  const [tokenReserve, setTokenReserve] = useState<string>('0');
  const [isPending, setIsPending] = useState(false);

  // Refresh balances function
  const refreshBalances = useCallback(async () => {
    if (!window.ethereum || !tokenAddress) return;
    
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length === 0) {
        setIsPending(false);
        return;
      }
      
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
      
      // Get token price and reserves
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        [
          'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
        ],
        provider
      );
      
      const stats = await swapContract.getTokenStats(tokenAddress);
      // Format and set values:
      // tokenReserve is at index 0
      // ethReserve is at index 1
      // currentPrice is at index 11
      
      if (stats[0]) {
        setTokenReserve(ethers.utils.formatEther(stats[0]));
      }
      
      if (stats[1]) {
        setEthReserve(ethers.utils.formatEther(stats[1]));
      }
      
      if (stats[11]) {
        setTokenPrice(ethers.utils.formatEther(stats[11]));
      }
    } catch (error) {
      console.error('Error refreshing balances:', error);
    } finally {
      setIsPending(false);
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

  return {
    tokenBalance,
    ethBalance,
    tokenPrice,
    ethReserve,
    tokenReserve,
    refreshBalances,
    isPending
  };
};
