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

// Export token stats functions
import {
  fetchTokenStats,
  fetchTokenDataFromSupabase,
  saveTokenStatsToSupabase,
  syncAllTokenStats,
  TokenStatsUpdateData,
  FetchedTokenStats
} from './tokenStats';

// Export types
export type {
  ScienceGentData,
  TokenStats,
  CapabilityDetail,
  FormattedScienceGent
} from './types';

// Export token stats types
export type {
  TokenStatsUpdateData,
  FetchedTokenStats
};

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
  fetchScienceGentFromSupabase,
  // Export new token stats functions
  fetchTokenStats,
  fetchTokenDataFromSupabase,
  saveTokenStatsToSupabase,
  syncAllTokenStats
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
    await saveScienceGentToSupabase(scienceGentData, tokenStats);
    
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
