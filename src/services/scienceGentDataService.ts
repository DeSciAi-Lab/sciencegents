
import { 
  fetchScienceGentFromBlockchain, 
  fetchTokenStatsFromBlockchain, 
  syncAllScienceGentsFromBlockchain,
  syncAllCreationTimestampsFromBlockchain
} from './scienceGent/blockchain';
import { 
  saveScienceGentToSupabase, 
  fetchScienceGentFromSupabase 
} from './scienceGent/supabase';

/**
 * Syncs a single ScienceGent from blockchain to Supabase
 * @param address ScienceGent address
 * @returns Success status
 */
export const syncSingleScienceGent = async (address: string): Promise<boolean> => {
  try {
    console.log(`Syncing ScienceGent: ${address}`);
    
    // Fetch blockchain data
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    
    if (!scienceGentData || !tokenStats) {
      console.error(`Failed to fetch blockchain data for ${address}`);
      return false;
    }
    
    // Save to Supabase
    await saveScienceGentToSupabase(scienceGentData, tokenStats);
    console.log(`Successfully synced ${address}`);
    return true;
  } catch (error) {
    console.error(`Error syncing ${address}:`, error);
    return false;
  }
};

/**
 * Syncs all ScienceGents from blockchain to Supabase
 * @returns Object with syncCount and errorCount
 */
export const syncAllScienceGents = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    return await syncAllScienceGentsFromBlockchain();
  } catch (error) {
    console.error("Error syncing all ScienceGents:", error);
    return { syncCount: 0, errorCount: 1 };
  }
};

/**
 * Syncs creation timestamps for all ScienceGents
 * @returns Object with syncCount and errorCount
 */
export const syncAllCreationTimestamps = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    return await syncAllCreationTimestampsFromBlockchain();
  } catch (error) {
    console.error("Error syncing creation timestamps:", error);
    return { syncCount: 0, errorCount: 1 };
  }
};

export default {
  syncSingleScienceGent,
  syncAllScienceGents,
  syncAllCreationTimestamps
};
