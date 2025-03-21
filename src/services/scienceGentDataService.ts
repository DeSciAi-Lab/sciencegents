
import { ethers } from "ethers";
import { toast } from "@/components/ui/use-toast";
import { isAdminWallet } from "./walletService";
import { 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain
} from "./scienceGent/blockchain";
import { 
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase,
  syncCapabilityDetailsToSupabase
} from "./scienceGent/supabase";
import { 
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain
} from "./capability/blockchain";
import { ScienceGentData } from "./scienceGent/types";

/**
 * Synchronizes all ScienceGents from blockchain to database
 * @returns Object with sync results
 */
export const syncAllScienceGents = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // Check if user is admin
    const isAdmin = await isAdminWallet();
    if (!isAdmin) {
      throw new Error("Only admin wallet can perform this operation");
    }
    
    // Get all ScienceGent addresses from blockchain
    console.log("Fetching ScienceGent addresses from blockchain...");
    const { syncAllScienceGentsFromBlockchain } = await import("./scienceGent/blockchain");
    const result = await syncAllScienceGentsFromBlockchain();
    console.log(`Found ${result.syncCount} ScienceGents on blockchain`);
    
    // Extract addresses from the result (if available)
    const addresses: string[] = [];
    // Since we don't have access to actual addresses, we'll have to just return the counts
    
    let syncCount = 0;
    let errorCount = 0;
    
    // Process each address if we have them
    // Note: In a real implementation, we would iterate through the addresses
    // For now, we'll just return the counts from the blockchain sync
    
    console.log(`Sync completed: ${result.syncCount} synced, ${result.errorCount} errors`);
    return { 
      syncCount: result.syncCount,
      errorCount: result.errorCount 
    };
  } catch (error) {
    console.error("Error in syncAllScienceGents:", error);
    throw error;
  }
};

/**
 * Helper function to sync a single ScienceGent
 * @param address Token address
 */
export const syncSingleScienceGent = async (address: string): Promise<boolean> => {
  try {
    // Fetch data from blockchain
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    
    if (!scienceGentData || !tokenStats) {
      throw new Error(`Failed to fetch data for ${address}`);
    }
    
    // Calculate total capability fees for this token
    let totalCapabilityFees = 0;
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      for (const capId of scienceGentData.capabilities) {
        try {
          const capDetails = await fetchCapabilityDetailsFromBlockchain(capId);
          if (capDetails && capDetails.price) {
            totalCapabilityFees += capDetails.price;
          }
          
          // Also sync capability details to Supabase
          await syncCapabilityDetailsToSupabase(capDetails);
        } catch (capError) {
          console.error(`Error fetching capability ${capId}:`, capError);
        }
      }
    }
    
    // Create a modified ScienceGentData with capability fees
    const enrichedData: ScienceGentData & { capabilityFees?: number } = {
      ...scienceGentData,
      capabilityFees: totalCapabilityFees
    };
    
    // Save to Supabase
    await saveScienceGentToSupabase(enrichedData, tokenStats);
    
    return true;
  } catch (error) {
    console.error(`Error syncing ${address}:`, error);
    return false;
  }
};
