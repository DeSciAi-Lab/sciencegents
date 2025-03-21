
import { ScienceGentData, TokenStats } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { transformBlockchainToSupabaseFormat } from '../transformations';
import { syncCapabilitiesToSupabase } from './capabilities';

/**
 * Saves a ScienceGent to Supabase
 * @param scienceGentData The blockchain data
 * @param tokenStats The token statistics
 * @returns The saved data or null if error
 */
export const saveScienceGentToSupabase = async (
  scienceGentData: ScienceGentData,
  tokenStats: TokenStats
) => {
  try {
    console.log("Saving ScienceGent to Supabase:", scienceGentData.address);
    
    // Transform the data to Supabase format
    const { scienceGent, scienceGentStats } = transformBlockchainToSupabaseFormat(scienceGentData, tokenStats);
    
    // Insert or update the ScienceGent
    const { data, error } = await supabase
      .from('sciencegents')
      .upsert(scienceGent)
      .select();
    
    if (error) {
      console.error("Supabase upsert error:", error);
      return null;
    }
    
    // Insert or update the ScienceGent stats
    const { error: statsError } = await supabase
      .from('sciencegent_stats')
      .upsert(scienceGentStats);
      
    if (statsError) {
      console.error("Supabase stats upsert error:", statsError);
    }
    
    // If capabilities exist, sync them to the junction table
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      await syncCapabilitiesToSupabase(scienceGentData.address, scienceGentData.capabilities);
    }
    
    return data[0];
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return null;
  }
};
