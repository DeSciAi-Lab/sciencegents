
import { ScienceGentData, TokenStats, CapabilityDetail } from './types';
import { supabase } from '@/integrations/supabase/client';
import { transformBlockchainToSupabaseFormat, formatAge } from './transformations';
import { ethers } from 'ethers';

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
    
    // Format the data for frontend use (add calculated fields)
    const formattedData = {
      ...data,
      // Convert prices to numbers for easier handling
      token_price: data.token_price ? parseFloat(String(data.token_price)) : 0,
      // Add maturity progress calculation if not available
      maturity_progress: data.maturity_progress || calculateMaturityProgress(
        data.virtual_eth || 0, 
        data.collected_fees || 0
      ),
      // Calculate token age if it's not available in the database
      tokenAge: data.created_at 
        ? Math.floor(Date.now() / 1000) - new Date(data.created_at).getTime() / 1000
        : 0,
      // Use remaining_maturity_time from database if available
      remainingMaturityTime: data.remaining_maturity_time || 0
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
 * @param collectedFees Collected fees
 * @returns Progress percentage (0-100)
 */
const calculateMaturityProgress = (virtualETH: number, collectedFees: number): number => {
  try {
    if (virtualETH === 0) return 0;
    
    // Migration threshold is 2x virtualETH
    const targetFees = 2 * virtualETH;
    const progress = Math.min(Math.round((collectedFees / targetFees) * 100), 100);
    
    return progress;
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
    const transformedData = await transformBlockchainToSupabaseFormat(scienceGentData, tokenStats);
    const scienceGent = transformedData.scienceGent;
    const scienceGentStats = transformedData.scienceGentStats;
    
    // Prepare data for upsert, ensuring all value types match the database schema
    const supabaseData = {
      address: scienceGent.address,
      name: scienceGent.name,
      symbol: scienceGent.symbol,
      total_supply: scienceGent.total_supply,
      creator_address: scienceGent.creator_address,
      description: scienceGent.description,
      profile_pic: scienceGent.profile_pic,
      website: scienceGent.website,
      socials: scienceGent.socials,
      is_migrated: scienceGent.is_migrated,
      migration_eligible: scienceGent.migration_eligible,
      created_at: scienceGent.created_at,
      // Ensure maturity_deadline is properly typed as a number or null
      maturity_deadline: typeof scienceGent.maturity_deadline === 'number' 
        ? scienceGent.maturity_deadline 
        : null,
      // Ensure remaining_maturity_time is a number or null, not a string
      remaining_maturity_time: typeof scienceGent.remaining_maturity_time === 'number'
        ? scienceGent.remaining_maturity_time
        : null,
      maturity_progress: scienceGent.maturity_progress,
      token_price: scienceGent.token_price,
      market_cap: scienceGent.market_cap,
      virtual_eth: scienceGent.virtual_eth,
      collected_fees: scienceGent.collected_fees,
      last_synced_at: scienceGent.last_synced_at,
      domain: scienceGent.domain,
      agent_fee: scienceGent.agent_fee,
      persona: scienceGent.persona,
      developer_name: scienceGent.developer_name,
      developer_email: scienceGent.developer_email,
      bio: scienceGent.bio,
      developer_twitter: scienceGent.developer_twitter,
      developer_telegram: scienceGent.developer_telegram,
      developer_github: scienceGent.developer_github,
      developer_website: scienceGent.developer_website
    };
    
    // Insert or update the ScienceGent
    const { data, error } = await supabase
      .from('sciencegents')
      .upsert(supabaseData)
      .select();
    
    if (error) {
      console.error("Supabase upsert error:", error);
      return null;
    }
    
    console.log("ScienceGent upsert successful:", scienceGentData.address);
    
    // Insert or update the ScienceGent stats
    const { error: statsError } = await supabase
      .from('sciencegent_stats')
      .upsert({
        sciencegent_address: scienceGentStats.sciencegent_address,
        volume_24h: scienceGentStats.volume_24h,
        transactions: scienceGentStats.transactions,
        holders: scienceGentStats.holders,
        updated_at: scienceGentStats.updated_at
      });
      
    if (statsError) {
      console.error("Supabase stats upsert error:", statsError);
    } else {
      console.log("ScienceGent stats upsert successful:", scienceGentData.address);
    }
    
    // If capabilities exist, sync them to the junction table
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      await syncCapabilitiesToSupabase(scienceGentData.address, scienceGentData.capabilities);
    }
    
    return data?.[0] || null;
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
    
    // Create capability entries for each ID
    const capabilityEntries = capabilityIds.map(id => ({
      sciencegent_address: tokenAddress,
      capability_id: id
    }));
    
    // Delete existing capabilities first to ensure clean sync
    const { error: deleteError } = await supabase
      .from('sciencegent_capabilities')
      .delete()
      .eq('sciencegent_address', tokenAddress);
    
    if (deleteError) {
      console.error("Error deleting existing capabilities:", deleteError);
    }
    
    // Insert all capabilities
    if (capabilityEntries.length > 0) {
      const { error: insertError } = await supabase
        .from('sciencegent_capabilities')
        .insert(capabilityEntries);
      
      if (insertError) {
        console.error("Error inserting capabilities:", insertError);
      } else {
        console.log(`Successfully synced ${capabilityEntries.length} capabilities for ${tokenAddress}`);
      }
    }
  } catch (error) {
    console.error("Error syncing capabilities:", error);
  }
};

/**
 * Syncs a capability's details to Supabase
 * @param capabilityDetail Capability details from blockchain
 */
export const syncCapabilityDetailsToSupabase = async (capabilityDetail: CapabilityDetail | null) => {
  try {
    // Skip if no details or no ID
    if (!capabilityDetail || !capabilityDetail.id) return;
    
    console.log(`Syncing capability details for ${capabilityDetail.id}`);
    
    // Prepare data for upsert
    const capabilityData = {
      id: capabilityDetail.id,
      name: capabilityDetail.id, // Default name to ID
      description: capabilityDetail.description || '',
      price: capabilityDetail.feeInETH ? parseFloat(ethers.utils.formatEther(capabilityDetail.feeInETH)) : 0,
      creator: capabilityDetail.creator || '',
      domain: capabilityDetail.domain || 'General', // Use domain if available
      last_synced_at: new Date().toISOString()
    };
    
    // Upsert capability
    const { error: upsertError } = await supabase
      .from('capabilities')
      .upsert(capabilityData);
    
    if (upsertError) {
      console.error("Error upserting capability:", upsertError);
    } else {
      console.log(`Successfully synced capability ${capabilityDetail.id}`);
    }
  } catch (error) {
    console.error("Error syncing capability details:", error);
  }
};
