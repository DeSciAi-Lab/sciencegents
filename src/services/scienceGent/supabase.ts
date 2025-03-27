
import { supabase } from '@/integrations/supabase/client';
import { ScienceGentData, TokenStats } from './types';
import { transformBlockchainToSupabaseFormat } from './transformations';

/**
 * Saves a ScienceGent token data to Supabase
 * @param data Blockchain data for the ScienceGent token
 * @param stats Token statistics from blockchain
 * @returns Promise with the result of the operation
 */
export const saveScienceGentToSupabase = async (
  data: ScienceGentData,
  stats: TokenStats
) => {
  try {
    console.log(`Saving ScienceGent ${data.address} to Supabase...`);
    
    // Transform blockchain data to Supabase format
    const { scienceGent, scienceGentStats } = transformBlockchainToSupabaseFormat(data, stats);
    
    // Convert total_supply to numeric for database storage
    const totalSupplyNumeric = parseFloat(scienceGent.total_supply);
    const scienceGentWithNumericSupply = {
      ...scienceGent,
      total_supply: totalSupplyNumeric
    };
    
    // Upsert to sciencegents table
    const { error: scienceGentError } = await supabase
      .from('sciencegents')
      .upsert(scienceGentWithNumericSupply, {
        onConflict: 'address',
        ignoreDuplicates: false
      });
      
    if (scienceGentError) {
      console.error('Error upserting ScienceGent to Supabase:', scienceGentError);
      throw scienceGentError;
    }
    
    // Upsert to sciencegent_stats table
    const { error: statsError } = await supabase
      .from('sciencegent_stats')
      .upsert(scienceGentStats, {
        onConflict: 'sciencegent_address',
        ignoreDuplicates: false
      });
      
    if (statsError) {
      console.error('Error upserting ScienceGent stats to Supabase:', statsError);
      throw statsError;
    }
    
    console.log(`ScienceGent ${data.address} saved to Supabase`);
    return { success: true };
  } catch (error) {
    console.error('Error in saveScienceGentToSupabase:', error);
    throw error;
  }
};

/**
 * Fetches a ScienceGent token from Supabase by address
 * @param address Token address
 * @returns ScienceGent data or null if not found
 */
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log(`Fetching ScienceGent ${address} from Supabase...`);
    
    const { data, error } = await supabase
      .from('sciencegents')
      .select('*')
      .eq('address', address)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found, return null
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching ScienceGent ${address} from Supabase:`, error);
    throw error;
  }
};
