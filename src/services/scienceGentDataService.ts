
import { ethers } from "ethers";
import { toast } from "@/components/ui/use-toast";
import { isAdminWallet } from "./walletService";
import { 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain
} from "./scienceGent";
import { 
  saveScienceGentToSupabase,
  fetchScienceGentFromSupabase,
  syncCapabilityDetailsToSupabase
} from "./scienceGent/supabase";
import { 
  fetchCapabilityDetailsFromBlockchain
} from "./capability/blockchain";
import { ScienceGentData, CapabilityDetail } from "./scienceGent/types";

/**
 * Synchronizes all ScienceGents from blockchain to database
 * @returns Object with sync results
 */
export const syncAllScienceGents = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // Check if user is admin
    const isAdmin = await isAdminWallet();
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admin wallet can perform this operation",
        variant: "destructive"
      });
      throw new Error("Only admin wallet can perform this operation");
    }
    
    // Show toast notification
    toast({
      title: "Sync Started",
      description: "Fetching ScienceGents from blockchain..."
    });
    
    console.log("Starting blockchain sync process...");
    const result = await syncAllScienceGentsFromBlockchain();
    
    console.log(`Sync completed: ${result.syncCount} synced, ${result.errorCount} errors`);
    
    // Show success toast
    toast({
      title: "Sync Completed",
      description: `Successfully synced ${result.syncCount} ScienceGents with ${result.errorCount} errors.`
    });
    
    return result;
  } catch (error) {
    console.error("Error in syncAllScienceGents:", error);
    
    toast({
      title: "Sync Failed",
      description: error.message || "An error occurred during sync",
      variant: "destructive"
    });
    
    throw error;
  }
};

/**
 * Helper function to sync a single ScienceGent
 * @param address Token address
 * @returns True if sync was successful, false otherwise
 */
export const syncSingleScienceGent = async (address: string): Promise<boolean> => {
  try {
    console.log(`Starting sync for ScienceGent: ${address}`);
    
    // Fetch data from blockchain
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    if (!scienceGentData) {
      throw new Error(`Failed to fetch ScienceGent data for ${address}`);
    }
    
    console.log("ScienceGent data fetched:", scienceGentData);
    
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    if (!tokenStats) {
      throw new Error(`Failed to fetch token stats for ${address}`);
    }
    
    console.log("Token stats fetched:", tokenStats);
    
    // Calculate total capability fees for this token
    let totalCapabilityFees = 0;
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      console.log(`Fetching ${scienceGentData.capabilities.length} capabilities...`);
      
      for (const capId of scienceGentData.capabilities) {
        try {
          const capDetails = await fetchCapabilityDetailsFromBlockchain(capId);
          
          // Make sure we have valid capability details
          if (capDetails) {
            console.log(`Capability ${capId} details:`, capDetails);
            
            // Add the capability fee to the total (in ETH)
            if (capDetails.feeInETH) {
              const feeInEth = parseFloat(ethers.utils.formatEther(capDetails.feeInETH));
              totalCapabilityFees += feeInEth;
              console.log(`Added fee ${feeInEth} ETH, total now: ${totalCapabilityFees} ETH`);
            }
            
            // Also sync capability details to Supabase
            await syncCapabilityDetailsToSupabase(capDetails);
          }
        } catch (capError) {
          console.error(`Error fetching capability ${capId}:`, capError);
        }
      }
    }
    
    // Create a modified ScienceGentData with capability fees
    const enrichedData: ScienceGentData = {
      ...scienceGentData,
      capabilityFees: totalCapabilityFees
    };
    
    console.log("Saving enriched data to Supabase:", enrichedData);
    
    // Save to Supabase
    await saveScienceGentToSupabase(enrichedData, tokenStats);
    
    console.log(`Successfully synced ${address}`);
    
    toast({
      title: "Sync Successful",
      description: `Successfully synced ${scienceGentData.name}`
    });
    
    return true;
  } catch (error) {
    console.error(`Error syncing ${address}:`, error);
    
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGent",
      variant: "destructive"
    });
    
    return false;
  }
};
