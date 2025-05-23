
import { ethers } from 'ethers';
import { TokenStats } from '@/services/scienceGent/types';

/**
 * Calculates the maturity progress percentage
 * @param virtualETH Virtual ETH amount as string or number
 * @param collectedFees Collected fees as string or number
 * @param capabilityFees Optional capability fees as string or number
 * @returns Progress percentage (0-100)
 */
export const calculateMaturityProgress = (
  virtualETH: string | number,
  collectedFees: string | number,
  capabilityFees: string | number = '0'
): number => {
  try {
    // Convert inputs to numbers if they're strings
    const vETH = typeof virtualETH === 'string' ? parseFloat(virtualETH) : virtualETH;
    const fees = typeof collectedFees === 'string' ? parseFloat(collectedFees) : collectedFees;
    const capFees = typeof capabilityFees === 'string' ? parseFloat(capabilityFees) : capabilityFees;
    
    if (vETH === 0) return 0;
    
    // Migration threshold is 2x virtualETH + capability fees
    const targetFees = (2 * vETH) + capFees;
    
    // Calculate progress percentage with full precision (don't round to integer)
    // Cap at 100% maximum
    const progress = Math.min((fees / targetFees) * 100, 100);
    
    return progress;
  } catch (error) {
    console.error("Error calculating maturity progress:", error);
    return 0;
  }
};

/**
 * Calculates the token price in ETH
 * @param currentPrice Price from blockchain as BigNumber string
 * @returns Formatted price as a number
 */
export const calculateTokenPrice = (currentPrice: string): number => {
  try {
    if (!currentPrice) return 0;
    return parseFloat(ethers.utils.formatEther(currentPrice));
  } catch (error) {
    console.error("Error calculating token price:", error);
    return 0;
  }
};

/**
 * Calculates the market cap in ETH
 * @param tokenPrice Token price in ETH
 * @param totalSupply Total supply as string or number
 * @returns Market cap in ETH as a number
 */
export const calculateMarketCap = (
  tokenPrice: number,
  totalSupply: string | number
): number => {
  try {
    // Convert totalSupply to number if it's a string
    const supply = typeof totalSupply === 'string' 
      ? parseFloat(ethers.utils.formatEther(totalSupply))
      : totalSupply;
    
    return tokenPrice * supply;
  } catch (error) {
    console.error("Error calculating market cap:", error);
    return 0;
  }
};

/**
 * Formats a timestamp to a human-readable age string
 * @param creationTimestamp Creation timestamp (seconds since epoch)
 * @returns Formatted age string (e.g., "2 days" or "3 months")
 */
export const formatAge = (creationTimestamp: number | undefined): string => {
  if (!creationTimestamp) return 'Unknown';
  
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = now - creationTimestamp;
  
  // Calculate days, hours, etc.
  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  
  if (days > 365) {
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(diffInSeconds / (60 * 60));
    return `${hours || 1} hour${hours !== 1 ? 's' : ''}`;
  }
};

/**
 * Get all token metrics in one function
 * @param tokenStats Token statistics from blockchain
 * @param totalSupply Total token supply
 * @param capabilityFees Optional capability fees
 * @returns Object with calculated metrics
 */
export const getTokenMetrics = (
  tokenStats: TokenStats,
  totalSupply: string,
  capabilityFees: number = 0
) => {
  const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
  const marketCap = calculateMarketCap(tokenPrice, totalSupply);
  
  const virtualETH = tokenStats.virtualETH
    ? parseFloat(ethers.utils.formatEther(tokenStats.virtualETH))
    : 0;
    
  const collectedFees = tokenStats.collectedFees
    ? parseFloat(ethers.utils.formatEther(tokenStats.collectedFees))
    : 0;
    
  const maturityProgress = calculateMaturityProgress(
    virtualETH,
    collectedFees,
    capabilityFees
  );
  
  return {
    tokenPrice,
    marketCap,
    virtualETH,
    collectedFees,
    maturityProgress,
    isMigrationEligible: maturityProgress >= 100,
  };
};
