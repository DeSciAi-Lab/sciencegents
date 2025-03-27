
import { toast } from '@/components/ui/use-toast';
import { 
  syncScienceGent,
  syncAllScienceGentsFromBlockchain,
  syncAllCreationTimestampsFromBlockchain
} from '@/services/scienceGent';
import { supabase } from '@/integrations/supabase/client';

/**
 * Syncs all ScienceGents from blockchain to Supabase
 * @returns Promise that resolves when sync is complete
 */
export const syncAllScienceGents = async (): Promise<boolean> => {
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
      return false;
    }
    
    // First sync all creation timestamps
    await syncAllCreationTimestampsFromBlockchain();
    
    // Then sync full token details
    const totalTokens = scienceGents.length;
    let successCount = 0;
    
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
    
    return true;
  } catch (error) {
    console.error("Error syncing all ScienceGents:", error);
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGents",
      variant: "destructive"
    });
    return false;
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
