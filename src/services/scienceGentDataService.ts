
import { toast } from '@/components/ui/use-toast';
import { 
  syncScienceGent,
  syncAllScienceGentsFromBlockchain,
  syncAllCreationTimestampsFromBlockchain
} from '@/services/scienceGent';
import { supabase } from '@/integrations/supabase/client';

/**
 * Syncs all ScienceGents from blockchain to Supabase
 * @returns Promise that resolves with sync stats
 */
export const syncAllScienceGents = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    console.log("Starting sync of all ScienceGents");
    
    // Get all sciencegent addresses from Supabase
    const { data: scienceGents, error } = await supabase
      .from('sciencegents')
      .select('address')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Failed to fetch ScienceGent addresses: ${error.message}`);
    }
    
    if (!scienceGents || scienceGents.length === 0) {
      toast({
        title: "No ScienceGents Found",
        description: "There are no ScienceGents to sync"
      });
      return { syncCount: 0, errorCount: 0 };
    }
    
    // First sync all creation timestamps
    await syncAllCreationTimestamps();
    
    // Then sync full token details
    const totalTokens = scienceGents.length;
    let successCount = 0;
    let errorCount = 0;
    
    // Process tokens in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < scienceGents.length; i += batchSize) {
      const batch = scienceGents.slice(i, i + batchSize);
      
      // Process batch in parallel
      await Promise.all(batch.map(async (sg) => {
        try {
          await syncScienceGent(sg.address);
          successCount++;
        } catch (err) {
          console.error(`Failed to sync ${sg.address}:`, err);
          errorCount++;
          // Continue with other tokens
        }
      }));
      
      // Report progress
      console.log(`Synced ${Math.min(i + batchSize, totalTokens)} of ${totalTokens} ScienceGents`);
    }
    
    toast({
      title: "Sync Complete",
      description: `Successfully synced ${successCount} of ${totalTokens} ScienceGents`
    });
    
    return { syncCount: successCount, errorCount };
  } catch (error) {
    console.error("Error syncing all ScienceGents:", error);
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGents",
      variant: "destructive"
    });
    return { syncCount: 0, errorCount: 1 };
  }
};

/**
 * Syncs a specific token by address
 * @param address Token address
 * @returns Promise that resolves when sync is complete
 */
export const syncSpecificToken = async (address: string): Promise<boolean> => {
  try {
    await syncScienceGent(address);
    return true;
  } catch (error) {
    console.error(`Error syncing token ${address}:`, error);
    return false;
  }
};

/**
 * Syncs a single ScienceGent from blockchain to Supabase
 * @param address ScienceGent address
 * @returns Promise that resolves with sync success status
 */
export const syncSingleScienceGent = async (address: string): Promise<boolean> => {
  try {
    console.log("Syncing single ScienceGent:", address);
    await syncScienceGent(address);
    return true;
  } catch (error) {
    console.error(`Error syncing ScienceGent ${address}:`, error);
    return false;
  }
};

/**
 * Syncs creation timestamps for all ScienceGents from blockchain
 * @returns Promise that resolves with sync stats
 */
export const syncAllCreationTimestamps = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    console.log("Starting sync of all creation timestamps");
    const result = await syncAllCreationTimestampsFromBlockchain();
    
    toast({
      title: "Timestamp Sync Complete",
      description: `Successfully synced ${result.syncCount} timestamps with ${result.errorCount} errors`
    });
    
    return result;
  } catch (error) {
    console.error("Error syncing timestamps:", error);
    toast({
      title: "Timestamp Sync Failed",
      description: error.message || "Failed to sync creation timestamps",
      variant: "destructive"
    });
    return { syncCount: 0, errorCount: 1 };
  }
};
