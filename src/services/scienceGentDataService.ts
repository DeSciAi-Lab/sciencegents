
import { ethers } from "ethers";
import { toast } from "@/components/ui/use-toast";
import { isAdminWallet } from "./walletService";
import { 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain
} from "./scienceGent/blockchain";
import { 
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase
} from "./scienceGent/supabase";
import { 
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain
} from "./capability/blockchain";
import { 
  syncCapabilityDetailsToSupabase
} from "./scienceGent/supabase";

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
    const addresses = await syncAllScienceGentsFromBlockchain();
    console.log(`Found ${addresses.length} ScienceGents on blockchain`);
    
    let syncCount = 0;
    let errorCount = 0;
    
    // Process each address
    for (const address of addresses) {
      try {
        console.log(`Syncing ScienceGent: ${address}`);
        
        // Fetch token details and stats
        const scienceGentData = await fetchScienceGentFromBlockchain(address);
        const tokenStats = await fetchTokenStatsFromBlockchain(address);
        
        if (!scienceGentData || !tokenStats) {
          console.error(`Failed to fetch data for ${address}`);
          errorCount++;
          continue;
        }
        
        // Calculate total capability fees for this token
        let totalCapabilityFees = 0;
        if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
          for (const capId of scienceGentData.capabilities) {
            try {
              const capDetails = await fetchCapabilityDetailsFromBlockchain(capId);
              if (capDetails && capDetails.feeInETH) {
                totalCapabilityFees += parseFloat(ethers.utils.formatEther(capDetails.feeInETH));
              }
              
              // Also sync capability details to Supabase
              await syncCapabilityDetailsToSupabase(capDetails);
            } catch (capError) {
              console.error(`Error fetching capability ${capId}:`, capError);
            }
          }
        }
        
        // Add capabilityFees to the scienceGentData
        scienceGentData.capabilityFees = totalCapabilityFees;
        
        // Save to Supabase
        await saveScienceGentToSupabase(scienceGentData, tokenStats);
        syncCount++;
        
        console.log(`Successfully synced ${address}`);
      } catch (error) {
        console.error(`Error syncing ${address}:`, error);
        errorCount++;
      }
    }
    
    console.log(`Sync completed: ${syncCount} synced, ${errorCount} errors`);
    return { syncCount, errorCount };
  } catch (error) {
    console.error("Error in syncAllScienceGents:", error);
    throw error;
  }
};
