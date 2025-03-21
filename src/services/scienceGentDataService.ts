
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
  fetchScienceGentFromSupabase,
  syncCapabilityDetailsToSupabase
} from "./scienceGent/supabase";
import { 
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
    
    // Create a modified ScienceGentData with capability fees
    const enrichedData: ScienceGentData = {
      ...scienceGentData,
      capabilityFees: totalCapabilityFees
    };
    
    // Save to Supabase
    await saveScienceGentToSupabase(enrichedData, tokenStats);
    
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
