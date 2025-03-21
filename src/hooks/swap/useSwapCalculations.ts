
import { useCallback } from 'react';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';

export const useSwapCalculations = (tokenAddress: string) => {
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

  return {
    estimateTokensFromETH,
    estimateETHFromTokens
  };
};
