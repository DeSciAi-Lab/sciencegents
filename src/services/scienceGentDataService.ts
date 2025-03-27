
import { fetchScienceGentFromBlockchain, fetchTokenStatsFromBlockchain, syncAllScienceGentsFromBlockchain, syncAllCreationTimestampsFromBlockchain } from '@/services/scienceGent/blockchain';
import { saveScienceGentToSupabase } from '@/services/scienceGent/supabase';
import { fetchCurrentEthPrice } from '@/utils/scienceGentCalculations';
import { supabase } from '@/integrations/supabase/client';
import { ethers } from 'ethers';

/**
 * Syncs all ScienceGents from the blockchain to Supabase
 * @returns Object with sync counts and errors
 */
export const syncAllScienceGents = async () => {
  try {
    const result = await syncAllScienceGentsFromBlockchain();
    return result;
  } catch (error) {
    console.error("Error in syncAllScienceGents:", error);
    throw error;
  }
};

/**
 * Syncs all creation timestamps for ScienceGents
 * @returns Object with sync counts and errors
 */
export const syncAllCreationTimestamps = async () => {
  try {
    const result = await syncAllCreationTimestampsFromBlockchain();
    return result;
  } catch (error) {
    console.error("Error in syncAllCreationTimestamps:", error);
    throw error;
  }
};

/**
 * Syncs a specific ScienceGent token from blockchain to Supabase
 * Includes price data and market cap calculations
 * @param address Token address
 * @returns The updated token data or null if error
 */
export const syncScienceGent = async (address: string) => {
  try {
    console.log("Syncing token:", address);
    
    // Fetch token data from blockchain
    const tokenData = await fetchScienceGentFromBlockchain(address);
    if (!tokenData) {
      console.error("Token not found on blockchain");
      return null;
    }
    
    // Fetch token stats from blockchain
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    if (!tokenStats) {
      console.error("Token stats not found on blockchain");
      return null;
    }
    
    // Get current ETH price in USD for USD price calculation
    let ethPriceUsd = 0;
    try {
      ethPriceUsd = await fetchCurrentEthPrice();
    } catch (error) {
      console.error("Error fetching ETH price, using default value:", error);
      ethPriceUsd = 1800; // Default fallback value
    }
    
    // Calculate USD price and market cap
    let tokenPriceEth = 0;
    if (tokenStats.currentPrice) {
      // Convert from wei to ETH
      tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
    }
    const priceUsd = tokenPriceEth * ethPriceUsd;
    
    // Calculate market cap (total supply * price in USD)
    let totalSupply = 0;
    if (tokenData.totalSupply) {
      totalSupply = parseFloat(ethers.utils.formatEther(tokenData.totalSupply));
    }
    const marketCap = priceUsd * totalSupply;
    
    // Save to Supabase with additional calculated fields
    const enrichedTokenData = {
      ...tokenData,
      price_usd: priceUsd,
      market_cap: marketCap
    };
    
    // Save to Supabase
    const savedData = await saveScienceGentToSupabase(enrichedTokenData, tokenStats);
    
    // After saving, fetch the latest data to return to client
    const { data, error } = await supabase
      .from('sciencegents')
      .select('*')
      .eq('address', address)
      .single();
      
    if (error) {
      console.error("Error fetching updated token data:", error);
      return savedData;
    }
    
    return data;
  } catch (error) {
    console.error("Error syncing token:", error);
    throw error;
  }
};

/**
 * Schedules recurring token price updates
 * @param tokenAddress Token address to update
 * @param intervalSeconds Seconds between updates (default: 30)
 * @returns Interval ID that can be used to clear the interval
 */
export const scheduleTokenPriceUpdates = (tokenAddress: string, intervalSeconds = 30) => {
  if (!tokenAddress) return null;
  
  console.log(`Scheduling price updates for ${tokenAddress} every ${intervalSeconds} seconds`);
  
  const intervalId = setInterval(async () => {
    try {
      await syncScienceGent(tokenAddress);
      console.log(`Updated price data for ${tokenAddress}`);
    } catch (error) {
      console.error(`Error updating price for ${tokenAddress}:`, error);
    }
  }, intervalSeconds * 1000);
  
  return intervalId;
};

/**
 * Stops recurring token price updates
 * @param intervalId Interval ID returned from scheduleTokenPriceUpdates
 */
export const stopTokenPriceUpdates = (intervalId: number | null) => {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("Stopped token price updates");
  }
};
