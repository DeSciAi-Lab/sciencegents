import { supabase } from "@/integrations/supabase/client";
import { ScienceGentData, TokenStats } from "./types";
import { transformBlockchainToSupabaseFormat } from "./transformations";

/**
 * Fetches a ScienceGent token's data from Supabase
 * @param address The token address
 * @returns ScienceGent data or null if not found
 */
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log("Fetching ScienceGent from Supabase:", address);
    
    const { data, error } = await supabase
      .from('sciencegents')
      .select('*, sciencegent_stats!inner(*)')
      .eq('address', address)
      .single();
    
    if (error) {
      console.error("Error fetching from Supabase:", error);
      return null;
    }
    
    if (!data) {
      console.log("No data found in Supabase for address:", address);
      return null;
    }
    
    console.log("Supabase data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching ScienceGent from Supabase:", error);
    return null;
  }
};

/**
 * Saves ScienceGent data to Supabase
 * @param data ScienceGent data from blockchain
 * @param stats Token statistics from blockchain
 * @returns Success status
 */
export const saveScienceGentToSupabase = async (
  data: ScienceGentData,
  stats: TokenStats
): Promise<boolean> => {
  try {
    console.log("Saving ScienceGent to Supabase:", data.address);
    
    // Transform blockchain data to Supabase format
    const { scienceGent, scienceGentStats } = transformBlockchainToSupabaseFormat(data, stats);
    
    // First check if record already exists
    const { data: existingData, error: checkError } = await supabase
      .from('sciencegents')
      .select('address')
      .eq('address', data.address)
      .single();
    
    let saveOperation;
    if (existingData) {
      // Update existing record
      console.log("Updating existing ScienceGent record");
      saveOperation = supabase
        .from('sciencegents')
        .update(scienceGent)
        .eq('address', data.address);
    } else {
      // Insert new record
      console.log("Inserting new ScienceGent record");
      saveOperation = supabase
        .from('sciencegents')
        .insert(scienceGent);
    }
    
    // Execute the save operation
    const { error: saveError } = await saveOperation;
    
    if (saveError) {
      console.error("Error saving ScienceGent to Supabase:", saveError);
      throw saveError;
    }
    
    // Now handle the sciencegent_stats record
    const { data: existingStats, error: checkStatsError } = await supabase
      .from('sciencegent_stats')
      .select('sciencegent_address')
      .eq('sciencegent_address', data.address)
      .single();
    
    let statsOperation;
    if (existingStats) {
      // Update existing stats
      statsOperation = supabase
        .from('sciencegent_stats')
        .update(scienceGentStats)
        .eq('sciencegent_address', data.address);
    } else {
      // Insert new stats
      statsOperation = supabase
        .from('sciencegent_stats')
        .insert(scienceGentStats);
    }
    
    // Execute the stats operation
    const { error: statsError } = await statsOperation;
    
    if (statsError) {
      console.error("Error saving ScienceGent stats to Supabase:", statsError);
      throw statsError;
    }
    
    console.log("Successfully saved ScienceGent to Supabase:", data.address);
    return true;
  } catch (error) {
    console.error("Error in saveScienceGentToSupabase:", error);
    return false;
  }
};
