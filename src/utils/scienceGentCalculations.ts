
import { ethers } from 'ethers';
import { TokenStats } from '@/services/scienceGent/types';

/**
 * Fetches current ETH price in USD from CoinGecko API
 * @returns Promise that resolves with ETH price in USD
 */
export const fetchCurrentEthPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    return data.ethereum?.usd || 0;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return 0;
  }
};

/**
 * Safely converts any number-like value to a number
 * @param value The value to convert
 * @param defaultValue Default value if conversion fails
 * @returns A safe number
 */
const safeNumberConversion = (value: any, defaultValue: number = 0): number => {
  if (value === undefined || value === null) return defaultValue;
  
  try {
    // If it's already a number
    if (typeof value === 'number') return value;
    
    // If it's a BigNumber with toNumber method
    if (value.toNumber && typeof value.toNumber === 'function') {
      try {
        return value.toNumber();
      } catch (e) {
        // If toNumber() overflows, use string conversion (with potential loss of precision)
        console.warn("BigNumber overflow, using string conversion", e);
        return parseFloat(value.toString()) || defaultValue;
      }
    }
    
    // If it's a string or can be converted to string
    return parseFloat(value.toString()) || defaultValue;
  } catch (error) {
    console.warn("Error converting to number:", error);
    return defaultValue;
  }
};

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
    // Convert inputs to numbers if they're strings using safe conversion
    const vETH = safeNumberConversion(virtualETH);
    const fees = safeNumberConversion(collectedFees);
    const capFees = safeNumberConversion(capabilityFees);
    
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
    
    // First try parsing as Wei
    try {
      return parseFloat(ethers.utils.formatEther(currentPrice));
    } catch (error) {
      console.warn("Failed to format as ETH, attempting direct parse:", error);
      // If that fails, try direct parsing
      return parseFloat(currentPrice) || 0;
    }
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
    // Convert totalSupply to a proper number if it's a string
    let supply: number;
    
    if (typeof totalSupply === 'string') {
      // Check if it's a Wei string that needs to be formatted
      if (totalSupply.length > 18) {
        try {
          supply = parseFloat(ethers.utils.formatEther(totalSupply));
        } catch (e) {
          console.warn("Failed to format totalSupply as ETH, using direct parse");
          supply = parseFloat(totalSupply);
        }
      } else {
        supply = parseFloat(totalSupply);
      }
    } else {
      supply = totalSupply;
    }
    
    // Ensure values are valid numbers
    if (isNaN(tokenPrice) || isNaN(supply)) {
      console.warn("Invalid inputs for market cap calculation", { tokenPrice, supply });
      return 0;
    }
    
    const marketCap = tokenPrice * supply;
    
    // Log the calculation for debugging
    console.log("Market cap calculation:", { tokenPrice, supply, marketCap });
    
    return marketCap;
  } catch (error) {
    console.error("Error calculating market cap:", error);
    return 0;
  }
};

/**
 * Calculate token price in USD
 * @param ethPrice ETH price in USD
 * @param tokenPrice Token price in ETH
 * @returns Token price in USD
 */
export const calculateTokenPriceUSD = (ethPrice: number, tokenPrice: number): number => {
  return ethPrice * tokenPrice;
};

/**
 * Calculate market cap in USD
 * @param priceUSD Token price in USD
 * @param totalSupply Total supply
 * @returns Market cap in USD
 */
export const calculateMarketCapUSD = (priceUSD: number, totalSupply: number): number => {
  // Ensure values are valid numbers
  if (isNaN(priceUSD) || isNaN(totalSupply)) {
    console.warn("Invalid inputs for USD market cap calculation", { priceUSD, totalSupply });
    return 0;
  }
  
  const marketCapUSD = priceUSD * totalSupply;
  
  // Log the calculation for debugging
  console.log("Market cap USD calculation:", { priceUSD, totalSupply, marketCapUSD });
  
  return marketCapUSD;
};

/**
 * Calculate total liquidity in USD
 * @param ethReserve ETH reserve from blockchain
 * @param ethPrice ETH price in USD
 * @returns Total liquidity in USD
 */
export const calculateTotalLiquidity = (ethReserve: string | number, ethPrice: number): number => {
  const reserve = typeof ethReserve === 'string' 
    ? parseFloat(ethers.utils.formatEther(ethReserve))
    : ethReserve;
    
  return reserve * ethPrice;
};

/**
 * Get all token metrics in one function
 * @param tokenStats Token statistics from blockchain
 * @param totalSupply Total token supply
 * @param capabilityFees Optional capability fees
 * @returns Object with calculated metrics
 */
export const getTokenMetrics = async (
  tokenStats: TokenStats,
  totalSupply: string,
  capabilityFees: number = 0
) => {
  const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
  
  // Fetch current ETH price
  const ethPrice = await fetchCurrentEthPrice();
  
  // Ensure totalSupply is properly formatted
  let formattedTotalSupply: number;
  try {
    formattedTotalSupply = parseFloat(ethers.utils.formatEther(totalSupply));
  } catch (e) {
    console.warn("Failed to format totalSupply as ETH, using direct parse");
    formattedTotalSupply = parseFloat(totalSupply);
  }
  
  // Calculate USD values
  const tokenPriceUSD = calculateTokenPriceUSD(ethPrice, tokenPrice);
  const marketCap = calculateMarketCap(tokenPrice, formattedTotalSupply);
  const marketCapUSD = tokenPriceUSD * formattedTotalSupply;
  
  console.log("Token metrics calculation:", {
    tokenPrice,
    ethPrice,
    tokenPriceUSD,
    formattedTotalSupply,
    marketCap,
    marketCapUSD
  });
  
  const virtualETH = tokenStats.virtualETH
    ? parseFloat(ethers.utils.formatEther(tokenStats.virtualETH))
    : 0;
    
  const collectedFees = tokenStats.collectedFees
    ? parseFloat(ethers.utils.formatEther(tokenStats.collectedFees))
    : 0;
    
  const ethReserve = tokenStats.ethReserve
    ? parseFloat(ethers.utils.formatEther(tokenStats.ethReserve))
    : 0;
    
  const totalLiquidity = calculateTotalLiquidity(ethReserve, ethPrice);
  
  // Migration condition calculation
  const migrationCondition = (2 * virtualETH) + capabilityFees;
  
  // Calculate maturity progress using the utility function
  const maturityProgress = calculateMaturityProgress(
    virtualETH,
    collectedFees,
    capabilityFees
  );
  
  return {
    tokenPrice,
    tokenPriceUSD,
    marketCap,
    marketCapUSD,
    virtualETH,
    collectedFees,
    ethReserve,
    totalLiquidity,
    migrationCondition,
    maturityProgress,
    isMigrationEligible: maturityProgress >= 100,
  };
};

