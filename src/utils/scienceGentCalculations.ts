
import { ethers } from 'ethers';

/**
 * Calculate maturity progress percentage
 * @param virtualETH Virtual ETH amount
 * @param collectedFees Collected fees
 * @param capabilityFees Capability fees
 * @returns Progress percentage (0-100)
 */
export const calculateMaturityProgress = (
  virtualETH: number, 
  collectedFees: number, 
  capabilityFees: number = 0
): number => {
  try {
    if (virtualETH === 0) return 0;
    
    // Migration threshold is 2x virtualETH + capabilityFees
    const targetFees = (2 * virtualETH) + capabilityFees;
    const progress = Math.min(Math.round((collectedFees / targetFees) * 100), 100);
    
    return progress;
  } catch (error) {
    console.error("Error calculating maturity progress:", error);
    return 0;
  }
};

/**
 * Convert ETH price to USD
 * @param ethPrice ETH price
 * @param ethToUsdRate Current ETH to USD rate
 * @returns USD price as string with $ prefix
 */
export const convertEthToUsd = (ethPrice: number, ethToUsdRate: number = 3000): string => {
  if (!ethPrice || isNaN(ethPrice)) return '$0.00';
  const usdPrice = ethPrice * ethToUsdRate;
  
  if (usdPrice < 0.01) {
    return `$${usdPrice.toFixed(6)}`;
  } else if (usdPrice < 1) {
    return `$${usdPrice.toFixed(4)}`;
  } else if (usdPrice < 1000) {
    return `$${usdPrice.toFixed(2)}`;
  } else if (usdPrice < 1000000) {
    return `$${(usdPrice / 1000).toFixed(2)}K`;
  } else {
    return `$${(usdPrice / 1000000).toFixed(2)}M`;
  }
};

/**
 * Format ETH value for display
 * @param ethValue ETH value
 * @returns Formatted ETH string
 */
export const formatEthValue = (ethValue: number): string => {
  if (!ethValue || isNaN(ethValue)) return '0 ETH';
  
  if (ethValue < 0.001) {
    return `${ethValue.toFixed(6)} ETH`;
  } else if (ethValue < 0.01) {
    return `${ethValue.toFixed(5)} ETH`;
  } else if (ethValue < 0.1) {
    return `${ethValue.toFixed(4)} ETH`;
  } else if (ethValue < 1) {
    return `${ethValue.toFixed(3)} ETH`;
  } else if (ethValue < 1000) {
    return `${ethValue.toFixed(2)} ETH`;
  } else if (ethValue < 1000000) {
    return `${(ethValue / 1000).toFixed(2)}K ETH`;
  } else {
    return `${(ethValue / 1000000).toFixed(2)}M ETH`;
  }
};

/**
 * Get current ETH price in USD from API
 * @returns Promise resolving to current ETH price in USD
 */
export const fetchCurrentEthPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    return data.ethereum?.usd || 3000; // Default to 3000 if API fails
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return 3000; // Default fallback price
  }
};

/**
 * Calculate token price from blockchain data
 * @param priceInWei Price in wei as string (from blockchain)
 * @returns Price in ETH as number
 */
export const calculateTokenPrice = (priceInWei: string | undefined): number => {
  if (!priceInWei) return 0;
  try {
    return parseFloat(ethers.utils.formatEther(priceInWei));
  } catch (error) {
    console.error("Error calculating token price:", error);
    return 0;
  }
};

/**
 * Calculate market cap based on token price and total supply
 * @param tokenPrice Token price in ETH
 * @param totalSupplyInWei Total supply in wei as string (from blockchain)
 * @returns Market cap in ETH
 */
export const calculateMarketCap = (tokenPrice: number, totalSupplyInWei: string): number => {
  if (!tokenPrice || !totalSupplyInWei) return 0;
  try {
    const totalSupply = parseFloat(ethers.utils.formatEther(totalSupplyInWei));
    return tokenPrice * totalSupply;
  } catch (error) {
    console.error("Error calculating market cap:", error);
    return 0;
  }
};

