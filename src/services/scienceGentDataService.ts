
import { toast } from "@/components/ui/use-toast";
import { syncScienceGent } from "./scienceGent";

/**
 * Sync a single ScienceGent from blockchain to Supabase
 * @param address ScienceGent address
 * @returns Promise that resolves when sync is complete
 */
export const syncSingleScienceGent = async (address: string): Promise<void> => {
  try {
    console.log("Syncing single ScienceGent:", address);
    
    const success = await syncScienceGent(address);
    
    if (!success) {
      throw new Error("Failed to sync ScienceGent");
    }
    
    return;
  } catch (error) {
    console.error("Error syncing ScienceGent:", error);
    throw error;
  }
};

/**
 * Sync all ScienceGents from blockchain to Supabase
 * @returns Object with sync results
 */
export const syncAllScienceGents = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // Import function directly to avoid circular dependencies
    const { syncAllScienceGentsFromBlockchain } = await import("./scienceGent/blockchain");
    
    return await syncAllScienceGentsFromBlockchain();
  } catch (error) {
    console.error("Error syncing all ScienceGents:", error);
    throw error;
  }
};

/**
 * Sync all creation timestamps from blockchain to Supabase
 * @returns Object with sync results
 */
export const syncAllCreationTimestamps = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // Import function directly to avoid circular dependencies
    const { syncAllCreationTimestampsFromBlockchain } = await import("./scienceGent/blockchain");
    
    return await syncAllCreationTimestampsFromBlockchain();
  } catch (error) {
    console.error("Error syncing all creation timestamps:", error);
    throw error;
  }
};
