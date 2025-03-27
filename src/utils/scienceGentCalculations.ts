
import { ethers } from 'ethers';

// Cache for ETH price to avoid frequent API calls
let cachedEthPrice = 3500; // Fallback price
let lastPriceUpdate = 0;

/**
 * Calculate maturity progress as a percentage (0-100%)
 * @param virtualETH Virtual ETH amount in the pool
 * @param collectedFees Collected trading fees in ETH
 * @param capabilityFees Total capability fees in ETH
 * @returns Progress percentage (0-100%)
 */
export const calculateMaturityProgress = (
  virtualETH: number,
  collectedFees: number,
  capabilityFees: number
): number => {
  // Migration condition: collectedFees >= 2 * virtualETH + capabilityFees
  const targetFees = (2 * virtualETH) + capabilityFees;
  
  if (targetFees <= 0) return 0; // Avoid division by zero
  
  const progress = (collectedFees / targetFees) * 100;
  return Math.min(Math.round(progress), 100); // Cap at 100%
};

/**
 * Format ETH value for display (abbreviate large numbers)
 * @param value Value in ETH
 * @returns Formatted string
 */
export const formatEthValue = (value: number): string => {
  if (value === undefined || value === null) return '0 ETH';
  
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M ETH`;
  }
  
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K ETH`;
  }
  
  return `${value.toFixed(4)} ETH`;
};

/**
 * Convert ETH value to USD equivalent
 * @param ethValue Value in ETH
 * @returns Formatted USD string
 */
export const convertEthToUsd = (ethValue: number): string => {
  if (ethValue === undefined || ethValue === null) return '$0.00';
  
  const usdValue = ethValue * cachedEthPrice;
  
  if (usdValue >= 1000000) {
    return `$${(usdValue / 1000000).toFixed(2)}M`;
  }
  
  if (usdValue >= 1000) {
    return `$${(usdValue / 1000).toFixed(2)}K`;
  }
  
  return `$${usdValue.toFixed(2)}`;
};

/**
 * Update cached ETH price from API
 * Throttles updates to once per hour
 */
export const updateEthPrice = async (): Promise<number> => {
  const now = Date.now();
  
  // Only update once per hour
  if (now - lastPriceUpdate < 3600000) {
    return cachedEthPrice;
  }
  
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    
    if (data && data.ethereum && data.ethereum.usd) {
      cachedEthPrice = data.ethereum.usd;
      lastPriceUpdate = now;
    }
  } catch (error) {
    console.error('Error updating ETH price:', error);
  }
  
  return cachedEthPrice;
};

/**
 * Fetch current ETH price (for services)
 * @returns Current ETH price in USD
 */
export const fetchCurrentEthPrice = async (): Promise<number> => {
  return await updateEthPrice();
};

/**
 * Set ETH price manually (for testing or fallback)
 * @param price New ETH price in USD
 */
export const setEthPrice = (price: number): void => {
  if (price > 0) {
    cachedEthPrice = price;
    lastPriceUpdate = Date.now();
  }
};

/**
 * Get current ETH price
 * @returns Current cached ETH price
 */
export const getEthPrice = (): number => {
  return cachedEthPrice;
};
