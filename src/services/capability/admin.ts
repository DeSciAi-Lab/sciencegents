
import { supabase } from '@/integrations/supabase/client';
import { Capability } from '@/types/capability';
import { upsertCapabilityToSupabase } from './supabase';
import { 
  fetchCapabilityIdsFromBlockchain,
  fetchCapabilityDetailsFromBlockchain,
  registerCapabilityOnBlockchain
} from './blockchain';

/**
 * Syncs all capabilities from the blockchain to Supabase
 * This is an admin function that should be scheduled or triggered manually
 */
export const syncCapabilitiesWithBlockchain = async (): Promise<{ synced: number; failed: number }> => {
  try {
    console.log("Starting capability sync with blockchain...");
    
    const capabilityIds = await fetchCapabilityIdsFromBlockchain();
    console.log(`Found ${capabilityIds.length} capabilities on the blockchain`);
    
    let synced = 0;
    let failed = 0;
    
    // Process each capability
    for (const id of capabilityIds) {
      try {
        // First check if this capability already exists in our database
        const { data: existingCapability } = await supabase
          .from('capabilities')
          .select('*')
          .eq('id', id)
          .single();
          
        // If it exists and we've synced it recently (within last 24 hours), skip it
        if (existingCapability) {
          const lastSynced = new Date(existingCapability.last_synced_at);
          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);
          
          if (lastSynced > oneDayAgo) {
            console.log(`Skipping capability ${id} as it was synced recently`);
            continue;
          }
        }
        
        // Fetch details from blockchain
        const blockchainCapability = await fetchCapabilityDetailsFromBlockchain(id);
        
        if (!blockchainCapability) {
          console.error(`Failed to fetch capability ${id} from blockchain`);
          failed++;
          continue;
        }
        
        // Merge with existing data if available
        const capabilityToSync = {
          ...existingCapability,
          ...blockchainCapability,
          // Ensure these fields exist
          id: id,
          last_synced_at: new Date().toISOString()
        };
        
        // Save to Supabase
        const { error } = await supabase
          .from('capabilities')
          .upsert(capabilityToSync);
          
        if (error) {
          console.error(`Failed to save capability ${id} to Supabase:`, error);
          failed++;
        } else {
          console.log(`Successfully synced capability ${id}`);
          synced++;
        }
      } catch (err) {
        console.error(`Error processing capability ${id}:`, err);
        failed++;
      }
    }
    
    console.log(`Capability sync complete. Synced: ${synced}, Failed: ${failed}`);
    return { synced, failed };
  } catch (error) {
    console.error('Error in syncCapabilitiesWithBlockchain:', error);
    throw error;
  }
};

// Function to create or update a capability
export const upsertCapability = async (capability: Capability, onChain = false): Promise<{ success: boolean; error?: string }> => {
  try {
    // Ensure capability has the required stats field
    const capabilityWithStats = {
      ...capability,
      stats: capability.stats || {
        usageCount: 0,
        rating: 4.5,
        revenue: 0
      }
    };
    
    // Save to Supabase
    await upsertCapabilityToSupabase(capabilityWithStats, !capability.createdAt);
    
    // If onChain is true, also register on blockchain
    if (onChain) {
      await registerCapabilityOnBlockchain(capability);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error upserting capability:', error);
    return { 
      success: false, 
      error: error.message || 'An unknown error occurred' 
    };
  }
};
