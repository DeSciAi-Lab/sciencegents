
import { ScienceGentData, TokenStats, ScienceGentStats } from './types';
import { supabase } from '@/integrations/supabase/client';
import { transformBlockchainToSupabaseFormat } from './transformations';

/**
 * Fetches a ScienceGent from Supabase by address
 * @param address The token address
 * @returns The ScienceGent data or null if not found
 */
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log("Fetching ScienceGent from Supabase:", address);
    
    // Get the ScienceGent data
    const { data, error } = await supabase
      .from('sciencegents')
      .select(`
        *,
        capabilities:sciencegent_capabilities(
          id,
          capability_id
        )
      `)
      .eq('address', address)
      .single();
    
    if (error) {
      console.error("Supabase error:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Fetch associated stats
    const { data: statsData } = await supabase
      .from('sciencegent_stats')
      .select('*')
      .eq('sciencegent_address', address)
      .single();
    
    // Format the data for frontend use (add calculated fields)
    const formattedData = {
      ...data,
      // Convert prices to numbers for easier handling
      token_price: data.token_price ? parseFloat(String(data.token_price)) : 0,
      // Add maturity progress calculation if not available
      maturity_progress: data.maturity_progress || 0,
      // Add any other derived fields from TokenStats
      tokenAge: data.created_on_chain_at 
        ? Math.floor(Date.now() / 1000) - new Date(data.created_on_chain_at).getTime() / 1000
        : 0,
      // Use a default value of 0 if maturity_deadline is missing
      remainingMaturityTime: 0,
      // Include stats data or provide defaults
      stats: statsData || {
        transactions: 0,
        volume_24h: 0,
        holders: 0
      }
    };
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return null;
  }
};

/**
 * Calculate maturity progress percentage
 * @param virtualETH Virtual ETH amount
 * @returns Progress percentage (0-100)
 */
const calculateMaturityProgress = (virtualETH: string): number => {
  try {
    // Since collected_fees is not available in the database schema yet,
    // we'll provide a default implementation that just returns 0 or a random value
    const vETH = parseFloat(virtualETH || '0');
    
    if (vETH === 0) return 0;
    
    // Return a default value since we don't have collected_fees
    return 0; // This can be updated when collected_fees is added to the schema
  } catch (error) {
    console.error("Error calculating maturity progress:", error);
    return 0;
  }
};

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

/**
 * Syncs capabilities to Supabase for a ScienceGent
 * @param tokenAddress The token address
 * @param capabilityIds Array of capability IDs
 */
const syncCapabilitiesToSupabase = async (tokenAddress: string, capabilityIds: string[]) => {
  try {
    console.log(`Syncing ${capabilityIds.length} capabilities for token ${tokenAddress}`);
    
    // First, get existing capability IDs for this token
    const { data: existingData, error: fetchError } = await supabase
      .from('sciencegent_capabilities')
      .select('capability_id')
      .eq('sciencegent_address', tokenAddress);
    
    if (fetchError) {
      console.error("Error fetching existing capabilities:", fetchError);
      return;
    }
    
    // Create capability entries for each ID
    const capabilityEntries = capabilityIds.map(id => ({
      sciencegent_address: tokenAddress,
      capability_id: id
    }));
    
    // Upsert all capabilities
    const { error: upsertError } = await supabase
      .from('sciencegent_capabilities')
      .upsert(capabilityEntries, {
        onConflict: 'sciencegent_address,capability_id'
      });
    
    if (upsertError) {
      console.error("Error upserting capabilities:", upsertError);
    }
  } catch (error) {
    console.error("Error syncing capabilities:", error);
  }
};

/**
 * Syncs a capability's details to Supabase
 * @param capabilityDetail Capability details from blockchain
 */
export const syncCapabilityDetailsToSupabase = async (capabilityDetail: any) => {
  try {
    // Skip if no ID
    if (!capabilityDetail.id) return;
    
    console.log(`Syncing capability details for ${capabilityDetail.id}`);
    
    // Check if capability exists in main capabilities table
    const { data: existingData, error: fetchError } = await supabase
      .from('capabilities')
      .select('id')
      .eq('id', capabilityDetail.id)
      .maybeSingle();
    
    if (fetchError) {
      console.error("Error fetching capability:", fetchError);
      return;
    }
    
    // Prepare data for upsert
    const capabilityData = {
      id: capabilityDetail.id,
      name: capabilityDetail.id, // Default name to ID
      description: capabilityDetail.description || '',
      price: capabilityDetail.feeInETH ? parseFloat(capabilityDetail.feeInETH) : 0,
      creator: capabilityDetail.creator || '',
      domain: 'General', // Default domain
      created_at: new Date().toISOString()
    };
    
    // Upsert capability
    const { error: upsertError } = await supabase
      .from('capabilities')
      .upsert(capabilityData);
    
    if (upsertError) {
      console.error("Error upserting capability:", upsertError);
    }
  } catch (error) {
    console.error("Error syncing capability details:", error);
  }
};
