
import { supabase } from '@/integrations/supabase/client';

/**
 * Syncs capabilities to Supabase for a ScienceGent
 * @param tokenAddress The token address
 * @param capabilityIds Array of capability IDs
 */
export const syncCapabilitiesToSupabase = async (tokenAddress: string, capabilityIds: string[]) => {
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
