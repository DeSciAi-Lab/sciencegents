
import { supabase } from "@/integrations/supabase/client";
import { ScienceGentData, TokenStats, CapabilityDetail } from "./types";
import { transformBlockchainToSupabaseFormat } from "./transformations";

/**
 * Saves a ScienceGent to Supabase
 * @param scienceGentData ScienceGent data from blockchain
 * @param tokenStats Token statistics from blockchain
 * @returns Success status
 */
export const saveScienceGentToSupabase = async (
  scienceGentData: ScienceGentData,
  tokenStats: TokenStats
): Promise<boolean> => {
  try {
    console.log("Saving ScienceGent to Supabase:", scienceGentData.address);
    
    // Transform data for Supabase
    const { scienceGent, scienceGentStats } = transformBlockchainToSupabaseFormat(
      scienceGentData, 
      tokenStats
    );
    
    // Check if ScienceGent exists
    console.log("Checking if ScienceGent exists:", scienceGentData.address);
    const { data: existingScienceGent, error: checkError } = await supabase
      .from('sciencegents')
      .select('id')
      .eq('address', scienceGentData.address)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking if ScienceGent exists:", checkError);
      throw checkError;
    }
    
    // Insert or update ScienceGent
    if (existingScienceGent) {
      console.log("Updating existing ScienceGent:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegents')
        .update(scienceGent)
        .eq('address', scienceGentData.address);
      
      if (error) {
        console.error("Error updating ScienceGent:", error);
        throw error;
      }
    } else {
      console.log("Inserting new ScienceGent:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegents')
        .insert(scienceGent);
      
      if (error) {
        console.error("Error inserting ScienceGent:", error);
        throw error;
      }
    }
    
    // Check if ScienceGent stats exist
    const { data: existingStats, error: checkStatsError } = await supabase
      .from('sciencegent_stats')
      .select('id')
      .eq('sciencegent_address', scienceGentData.address)
      .maybeSingle();
    
    if (checkStatsError) {
      console.error("Error checking if ScienceGent stats exist:", checkStatsError);
      throw checkStatsError;
    }
    
    // Insert or update ScienceGent stats
    if (existingStats) {
      console.log("Updating existing ScienceGent stats:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegent_stats')
        .update(scienceGentStats)
        .eq('sciencegent_address', scienceGentData.address);
      
      if (error) {
        console.error("Error updating ScienceGent stats:", error);
        throw error;
      }
    } else {
      console.log("Inserting new ScienceGent stats:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegent_stats')
        .insert(scienceGentStats);
      
      if (error) {
        console.error("Error inserting ScienceGent stats:", error);
        throw error;
      }
    }
    
    // Save capabilities
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      await saveCapabilitiesToSupabase(scienceGentData.address, scienceGentData.capabilities);
    }
    
    console.log("ScienceGent saved successfully:", scienceGentData.address);
    return true;
  } catch (error) {
    console.error("Error saving ScienceGent to Supabase:", error);
    throw error;
  }
};

/**
 * Saves ScienceGent capabilities to Supabase
 * @param scienceGentAddress ScienceGent address
 * @param capabilities Array of capability IDs
 * @returns Success status
 */
export const saveCapabilitiesToSupabase = async (
  scienceGentAddress: string,
  capabilities: string[]
): Promise<boolean> => {
  try {
    // First, delete any existing capabilities for this ScienceGent
    const { error: deleteError } = await supabase
      .from('sciencegent_capabilities')
      .delete()
      .eq('sciencegent_address', scienceGentAddress);
    
    if (deleteError) {
      console.error("Error deleting existing capabilities:", deleteError);
      throw deleteError;
    }
    
    // Insert new capabilities
    const capabilityRows = capabilities.map(capabilityId => ({
      sciencegent_address: scienceGentAddress,
      capability_id: capabilityId,
      added_at: new Date().toISOString()
    }));
    
    if (capabilityRows.length > 0) {
      const { error: insertError } = await supabase
        .from('sciencegent_capabilities')
        .insert(capabilityRows);
      
      if (insertError) {
        console.error("Error inserting capabilities:", insertError);
        throw insertError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error saving capabilities to Supabase:", error);
    throw error;
  }
};

/**
 * Fetches ScienceGent details from Supabase
 * @param address ScienceGent address
 * @returns ScienceGent data or null if not found
 */
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log("Fetching ScienceGent from Supabase:", address);
    
    // Fetch ScienceGent
    const { data: scienceGent, error: scienceGentError } = await supabase
      .from('sciencegents')
      .select('*')
      .eq('address', address)
      .single();
    
    if (scienceGentError) {
      console.error("Error fetching ScienceGent from Supabase:", scienceGentError);
      return null;
    }
    
    // Fetch ScienceGent stats
    const { data: stats, error: statsError } = await supabase
      .from('sciencegent_stats')
      .select('*')
      .eq('sciencegent_address', address)
      .maybeSingle();
    
    // Fetch capabilities
    const { data: capabilities, error: capabilitiesError } = await supabase
      .from('sciencegent_capabilities')
      .select('capabilities:capability_id(id, name, domain, price)')
      .eq('sciencegent_address', address);
    
    if (capabilitiesError) {
      console.error("Error fetching ScienceGent capabilities:", capabilitiesError);
    }
    
    return {
      ...scienceGent,
      stats: stats || {
        volume_24h: 0,
        transactions: 0,
        holders: 0
      },
      capabilities: capabilities?.map(cap => cap.capabilities) || []
    };
  } catch (error) {
    console.error("Error fetching ScienceGent from Supabase:", error);
    return null;
  }
};

/**
 * Syncs capability details to Supabase
 * @param capabilityDetail Capability details from blockchain
 * @returns Success status
 */
export const syncCapabilityDetailsToSupabase = async (
  capabilityDetail: CapabilityDetail
): Promise<boolean> => {
  try {
    console.log(`Syncing capability ${capabilityDetail.id} to Supabase`);
    
    // Format capability data
    const capabilityData = {
      id: capabilityDetail.id,
      name: capabilityDetail.id, // Use ID as name initially, can be updated by user later
      description: capabilityDetail.description,
      price: parseFloat(ethers.utils.formatEther(capabilityDetail.feeInETH)),
      creator: capabilityDetail.creator,
      domain: "General", // Default domain
      last_synced_at: new Date().toISOString()
    };
    
    // Check if capability exists in Supabase
    const { data: existingCapability, error: checkError } = await supabase
      .from('capabilities')
      .select('id')
      .eq('id', capabilityDetail.id)
      .maybeSingle();
      
    if (checkError) {
      console.error(`Error checking if capability ${capabilityDetail.id} exists:`, checkError);
      throw checkError;
    }
    
    // Update or insert capability
    if (existingCapability) {
      console.log(`Updating existing capability ${capabilityDetail.id}`);
      const { error } = await supabase
        .from('capabilities')
        .update(capabilityData)
        .eq('id', capabilityDetail.id);
      
      if (error) {
        console.error(`Error updating capability ${capabilityDetail.id}:`, error);
        throw error;
      }
    } else {
      console.log(`Inserting new capability ${capabilityDetail.id}`);
      const { error } = await supabase
        .from('capabilities')
        .insert(capabilityData);
      
      if (error) {
        console.error(`Error inserting capability ${capabilityDetail.id}:`, error);
        throw error;
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error syncing capability ${capabilityDetail.id}:`, error);
    return false;
  }
};
