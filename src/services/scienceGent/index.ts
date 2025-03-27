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

// Export the imported functions
export {
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain,
  fetchCreationTimestampFromBlockchain,
  syncAllCreationTimestampsFromBlockchain,
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase
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
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    
    if (!scienceGentData || !tokenStats) {
      throw new Error("Failed to fetch ScienceGent data from blockchain");
    }
    
    // Save to Supabase
    const savedData = await saveScienceGentToSupabase(scienceGentData, tokenStats);
    
    if (!savedData) {
      throw new Error("Failed to save ScienceGent data to Supabase");
    }
    
    // Verify market cap calculation
    const ethPrice = await fetchCurrentEthPrice();
    const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
    const priceUSD = tokenPrice * ethPrice;
    
    // Ensure totalSupply is properly formatted
    let totalSupply: number;
    try {
      if (typeof scienceGentData.totalSupply === 'string' && 
          scienceGentData.totalSupply.length > 18) {
        totalSupply = parseFloat(ethers.utils.formatEther(scienceGentData.totalSupply));
      } else {
        totalSupply = parseFloat(String(scienceGentData.totalSupply || '0'));
      }
    } catch (e) {
      console.warn("Failed to format totalSupply, using direct parse");
      totalSupply = parseFloat(String(scienceGentData.totalSupply || '0'));
    }
    
    const expectedMarketCap = priceUSD * totalSupply;
    
    console.log("Market cap verification:", {
      tokenPrice,
      ethPrice,
      priceUSD,
      totalSupply,
      expectedMarketCap,
      calculation: `${priceUSD} * ${totalSupply} = ${expectedMarketCap}`
    });
    
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
