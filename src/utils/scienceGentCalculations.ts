
import { ethers } from 'ethers';
import { TokenStats } from '@/services/scienceGent/types';
import { safeFormatEtherAsNumber } from './ethersUtils';

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
    const vETH = typeof virtualETH === 'string' ? 
      safeFormatEtherAsNumber(virtualETH) : virtualETH;
    
    const fees = typeof collectedFees === 'string' ? 
      safeFormatEtherAsNumber(collectedFees) : collectedFees;
    
    const capFees = typeof capabilityFees === 'string' ? 
      parseFloat(capabilityFees) : capabilityFees;
    
    if (vETH === 0) return 0;
    
    // Migration threshold is 2x virtualETH + capability fees
    const targetFees = (2 * vETH) + capFees;
    
    // Calculate progress percentage, capped at 100%
    const progress = Math.min(Math.round((fees / targetFees) * 100), 100);
    
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
    return safeFormatEtherAsNumber(currentPrice);
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
    let supply: number;
    
    if (typeof totalSupply === 'string') {
      try {
        // Handle very large numbers which might cause overflow
        if (totalSupply.length > 15) {
          console.warn("Total supply too large for precise calculation:", totalSupply);
          supply = Number.MAX_SAFE_INTEGER / (tokenPrice || 1);
        } else {
          supply = safeFormatEtherAsNumber(totalSupply);
        }
      } catch (e) {
        // Fallback if formatEther fails
        console.warn("Using fallback calculation for large supply:", e);
        supply = 1000000; // Use a reasonable default
      }
    } else {
      supply = totalSupply;
    }
    
    return tokenPrice * supply;
  } catch (error) {
    console.error("Error calculating market cap:", error);
    return 0;
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
    ? safeFormatEtherAsNumber(tokenStats.virtualETH)
    : 0;
    
  const collectedFees = tokenStats.collectedFees
    ? safeFormatEtherAsNumber(tokenStats.collectedFees)
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
