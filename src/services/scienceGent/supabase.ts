
import { ScienceGentData, TokenStats } from './types';
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
    
    const { data, error } = await supabase
      .from('sciencegents')
      .select(`
        *,
        capabilities:sciencegent_capabilities(
          id,
          name,
          domain,
          description
        )
      `)
      .eq('address', address)
      .single();
    
    if (error) {
      console.error("Supabase error:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Format the data for frontend use (add calculated fields)
    const formattedData = {
      ...data,
      // Convert prices to numbers for easier handling
      token_price: data.token_price ? parseFloat(String(data.token_price)) : 0,
      // Add maturity progress calculation if not available
      maturity_progress: data.maturity_progress || (
        data.virtual_eth && data.collected_fees 
          ? calculateMaturityProgress(String(data.virtual_eth), String(data.collected_fees)) 
          : 0
      ),
      // Add any other derived fields from TokenStats
      tokenAge: data.created_on_chain_at 
        ? Math.floor(Date.now() / 1000) - new Date(data.created_on_chain_at).getTime() / 1000
        : 0,
      remainingMaturityTime: data.maturity_deadline 
        ? Math.max(0, parseInt(String(data.maturity_deadline)) - Math.floor(Date.now() / 1000))
        : 0
    };
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return null;
  }
};

/**
 * Calculate maturity progress percentage
 * @param collectedFees Collected fees in the pool
 * @param virtualETH Virtual ETH amount
 * @returns Progress percentage (0-100)
 */
const calculateMaturityProgress = (virtualETH: string, collectedFees: string): number => {
  try {
    const fees = parseFloat(collectedFees);
    const vETH = parseFloat(virtualETH);
    
    if (vETH === 0) return 0;
    
    // Target is 2x virtualETH (according to contract logic)
    const target = vETH * 2;
    
    // Calculate progress percentage (capped at 100%)
    const progress = (fees / target) * 100;
    return Math.min(100, progress);
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
    
    // Add enhanced fields to scienceGent object
    const enhancedScienceGent = {
      ...scienceGent,
      // Add maturity progress calculation
      maturity_progress: tokenStats.maturityProgress || 
        calculateMaturityProgress(tokenStats.virtualETH, tokenStats.collectedFees),
      // Add remaining time calculation
      remaining_maturity_time: tokenStats.remainingMaturityTime || 
        (parseInt(tokenStats.maturityDeadline) - Math.floor(Date.now() / 1000)),
      // Add token age
      token_age: tokenStats.tokenAge || 
        (Math.floor(Date.now() / 1000) - parseInt(tokenStats.creationTimestamp)),
      // Add migration eligibility
      migration_eligible: tokenStats.migrationEligible || false
    };
    
    // Insert or update the ScienceGent
    const { data, error } = await supabase
      .from('sciencegents')
      .upsert(enhancedScienceGent)
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
      capability_id: id,
      name: id, // Default name to ID
      domain: 'General' // Default domain
    }));
    
    // Upsert all capabilities
    const { error: upsertError } = await supabase
      .from('sciencegent_capabilities')
      .upsert(capabilityEntries.map(entry => ({
        sciencegent_address: entry.sciencegent_address,
        capability_id: entry.capability_id
      })), {
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
