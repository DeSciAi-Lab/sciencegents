
// Export blockchain-related functions
export { 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain
} from './blockchain';

// Export Supabase-related functions
export {
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
  transformSupabaseToFormattedScienceGent
} from './transformations';

/**
 * Syncs a single ScienceGent from blockchain to Supabase
 * @param address ScienceGent address
 * @returns Success status
 */
export const syncScienceGent = async (address: string): Promise<boolean> => {
  try {
    console.log("Syncing ScienceGent:", address);
    
    // Import functions from modules
    const { fetchScienceGentFromBlockchain, fetchTokenStatsFromBlockchain } = await import('./blockchain');
    const { saveScienceGentToSupabase } = await import('./supabase');
    
    // Import toast from UI
    const { toast } = await import('@/components/ui/use-toast');
    
    // Fetch token details and stats
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    
    if (!scienceGentData || !tokenStats) {
      throw new Error("Failed to fetch ScienceGent data from blockchain");
    }
    
    // Save to Supabase
    await saveScienceGentToSupabase(scienceGentData, tokenStats);
    
    toast({
      title: "Sync Successful",
      description: `${scienceGentData.name} has been synced from the blockchain`
    });
    
    return true;
  } catch (error) {
    console.error("Error syncing ScienceGent:", error);
    
    // Import toast from UI
    const { toast } = await import('@/components/ui/use-toast');
    
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGent",
      variant: "destructive"
    });
    
    throw error;
  }
};
