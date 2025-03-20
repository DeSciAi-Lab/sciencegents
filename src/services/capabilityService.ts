import { supabase } from "@/integrations/supabase/client";
import { Capability, SupabaseCapability, mapSupabaseToCapability } from "@/types/capability";
import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";

// Function to fetch all capabilities from Supabase
export const fetchCapabilitiesFromSupabase = async (): Promise<Capability[]> => {
  const { data, error } = await supabase
    .from('capabilities')
    .select('*');

  if (error) {
    console.error('Error fetching capabilities:', error);
    throw error;
  }

  // Convert Supabase records to Capability format
  return (data || []).map(record => mapSupabaseToCapability(record as SupabaseCapability));
};

// Function to fetch a specific capability by ID from Supabase
export const fetchCapabilityById = async (id: string): Promise<Capability | null> => {
  const { data, error } = await supabase
    .from('capabilities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching capability:', error);
    throw error;
  }

  // Convert Supabase record to Capability format
  return data ? mapSupabaseToCapability(data as SupabaseCapability) : null;
};

// Function to insert or update a capability in Supabase
export const upsertCapability = async (capability: Capability): Promise<void> => {
  // Convert Capability to Supabase format
  const supabaseRecord: SupabaseCapability = {
    id: capability.id,
    name: capability.name,
    domain: capability.domain,
    description: capability.description,
    price: capability.price,
    creator: capability.creator,
    created_at: capability.createdAt,
    docs: capability.docs,
    usage_count: capability.stats.usageCount,
    rating: capability.stats.rating,
    revenue: capability.stats.revenue,
    features: capability.features,
    last_synced_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from('capabilities')
    .upsert(supabaseRecord, { onConflict: 'id' });

  if (error) {
    console.error('Error upserting capability:', error);
    throw error;
  }
};

// Function to get all registered capability IDs from the blockchain
export const fetchCapabilityIdsFromBlockchain = async (): Promise<string[]> => {
  try {
    if (!window.ethereum) {
      throw new Error("No wallet detected. Please install MetaMask or another Web3 provider.");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Ensure the user is connected
    await provider.listAccounts();
    
    const factory = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );

    const capabilityIds = await factory.getAllRegisteredCapabilityIDs();
    return capabilityIds;
  } catch (error) {
    console.error('Error fetching capability IDs from blockchain:', error);
    throw error;
  }
};

// Function to get capability details from the blockchain
export const fetchCapabilityDetailsFromBlockchain = async (id: string): Promise<Partial<Capability>> => {
  try {
    if (!window.ethereum) {
      throw new Error("No wallet detected. Please install MetaMask or another Web3 provider.");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Ensure the user is connected
    await provider.listAccounts();
    
    const factory = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );

    const [description, price, creator] = await factory.getCapabilityDetails(id);
    
    return {
      id,
      name: id, // The contract doesn't store a separate name, we'll use the ID
      description,
      price: parseFloat(ethers.utils.formatEther(price)),
      creator,
      domain: "Unknown", // The contract doesn't store domain, we'll need to update this manually
      features: [], // The contract doesn't store features
      stats: {
        usageCount: 0,
        rating: 4.5,
        revenue: 0
      }
    };
  } catch (error) {
    console.error(`Error fetching capability ${id} from blockchain:`, error);
    throw error;
  }
};

// Function to sync blockchain capabilities with Supabase
export const syncCapabilitiesWithBlockchain = async (): Promise<{ 
  added: number, 
  updated: number, 
  total: number 
}> => {
  try {
    const capabilityIds = await fetchCapabilityIdsFromBlockchain();
    let added = 0;
    let updated = 0;

    for (const id of capabilityIds) {
      const existingCapability = await fetchCapabilityById(id);
      
      if (!existingCapability) {
        // New capability, fetch from blockchain and add to Supabase
        const blockchainCapability = await fetchCapabilityDetailsFromBlockchain(id);
        
        // Create a new capability with default values
        const newCapability: Capability = {
          id: blockchainCapability.id || '',
          name: blockchainCapability.name || id,
          domain: 'Unknown',
          description: blockchainCapability.description || '',
          price: blockchainCapability.price || 0,
          creator: blockchainCapability.creator || '',
          createdAt: new Date().toISOString(),
          stats: {
            usageCount: 0,
            rating: 4.5,
            revenue: 0
          },
          features: []
        };
        
        await upsertCapability(newCapability);
        added++;
      } else {
        // Existing capability, update from blockchain if needed
        const blockchainCapability = await fetchCapabilityDetailsFromBlockchain(id);
        
        // Only update if there are differences
        if (
          blockchainCapability.description !== existingCapability.description ||
          blockchainCapability.price !== existingCapability.price ||
          blockchainCapability.creator !== existingCapability.creator
        ) {
          const updatedCapability = {
            ...existingCapability,
            description: blockchainCapability.description || existingCapability.description,
            price: blockchainCapability.price || existingCapability.price,
            creator: blockchainCapability.creator || existingCapability.creator,
            last_synced_at: new Date().toISOString()
          };
          
          await upsertCapability(updatedCapability);
          updated++;
        }
      }
    }

    return { added, updated, total: capabilityIds.length };
  } catch (error) {
    console.error('Error syncing capabilities with blockchain:', error);
    throw error;
  }
};
