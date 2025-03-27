
// Export blockchain-related functions
import { 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain,
  fetchCreationTimestampFromBlockchain,
  syncAllCreationTimestampsFromBlockchain
} from './blockchain';

// Export Supabase-related functions
import {
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase
} from './supabase';

// Export types
export type {
  ScienceGentData,
  TokenStats,
  CapabilityDetail,
  FormattedScienceGent
} from './types';

// Export transformation functions
export {
  transformBlockchainToSupabaseFormat,
  transformSupabaseToFormattedScienceGent,
  formatAge
} from './transformations';

// Import utility functions for calculations
import { 
  fetchCurrentEthPrice,
  calculateTokenPrice,
  calculateMarketCap
} from '@/utils/scienceGentCalculations';

// Import ethers for formatting
import { ethers } from 'ethers';

// Export the imported functions
export {
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain,
  fetchCreationTimestampFromBlockchain,
  syncAllCreationTimestampsFromBlockchain,
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase,
  fetchCurrentEthPrice,
  calculateTokenPrice,
  calculateMarketCap
};

/**
 * Syncs a single ScienceGent from blockchain to Supabase
 * @param address ScienceGent address
 * @returns Success status
 */
export const syncScienceGent = async (address: string): Promise<boolean> => {
  try {
    console.log("Syncing ScienceGent:", address);
    
    // Fetch token details and stats
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    console.log("Fetched ScienceGent data:", {
      name: scienceGentData?.name,
      symbol: scienceGentData?.symbol,
      totalSupply: scienceGentData?.totalSupply?.toString()
    });
    
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    console.log("Fetched token stats:", {
      currentPrice: tokenStats?.currentPrice?.toString(),
      ethReserve: tokenStats?.ethReserve?.toString(),
      virtualETH: tokenStats?.virtualETH?.toString(),
      collectedFees: tokenStats?.collectedFees?.toString()
    });
    
    if (!scienceGentData || !tokenStats) {
      throw new Error("Failed to fetch ScienceGent data from blockchain");
    }
    
    // Calculate market cap - ensuring we have proper conversions
    const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
    console.log("Calculated token price in ETH:", tokenPrice);
    
    const ethPrice = await fetchCurrentEthPrice();
    console.log("Current ETH price in USD:", ethPrice);
    
    // Format total supply from wei to ether
    let totalSupplyFormatted = 0;
    try {
      totalSupplyFormatted = parseFloat(ethers.utils.formatEther(scienceGentData.totalSupply));
      console.log("Total supply formatted:", totalSupplyFormatted);
    } catch (error) {
      console.error("Error formatting total supply:", error);
      // If we can't format using ethers, try a manual conversion
      try {
        // Assuming 18 decimals
        totalSupplyFormatted = Number(scienceGentData.totalSupply) / 10**18;
        console.log("Total supply manually formatted:", totalSupplyFormatted);
      } catch (secondError) {
        console.error("Failed manual formatting too:", secondError);
      }
    }
    
    // Calculate market cap in ETH
    const marketCapEth = calculateMarketCap(tokenPrice, scienceGentData.totalSupply);
    console.log("Market cap in ETH:", marketCapEth);
    
    // Calculate market cap in USD
    const tokenPriceUsd = tokenPrice * ethPrice;
    console.log("Token price in USD:", tokenPriceUsd);
    
    const marketCapUsd = tokenPriceUsd * totalSupplyFormatted;
    console.log("Market cap in USD:", marketCapUsd);
    
    // Log final data to be saved
    console.log("Final data for Supabase:", {
      tokenPrice,
      tokenPriceUsd,
      marketCapEth,
      marketCapUsd,
      totalSupplyFormatted
    });
    
    // Save to Supabase
    const savedData = await saveScienceGentToSupabase(scienceGentData, tokenStats);
    
    if (!savedData) {
      throw new Error("Failed to save ScienceGent data to Supabase");
    }
    
    console.log("Successfully synced ScienceGent to Supabase:", scienceGentData.name);
    
    const { toast } = await import('@/components/ui/use-toast');
    toast({
      title: "Sync Successful",
      description: `${scienceGentData.name} has been synced from the blockchain`
    });
    
    return true;
  } catch (error) {
    console.error("Error syncing ScienceGent:", error);
    
    const { toast } = await import('@/components/ui/use-toast');
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGent",
      variant: "destructive"
    });
    
    throw error;
  }
};
