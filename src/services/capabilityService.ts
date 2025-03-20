
import { supabase } from "@/integrations/supabase/client";
import { Capability, SupabaseCapability, mapSupabaseToCapability } from "@/types/capability";
import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";
import { toast } from "@/components/ui/use-toast";

// Supabase URL and key from our configuration
const SUPABASE_URL = "https://pwlptpkzbnjcccgfbkck.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bHB0cGt6Ym5qY2NjZ2Zia2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNzUwMTAsImV4cCI6MjA1Nzg1MTAxMH0.tDmiZeDYqM2ui3NjLg3JjqqIy90gXXnSzEauKqGGiYg";

// Function to fetch all capabilities from Supabase
export const fetchCapabilitiesFromSupabase = async (): Promise<Capability[]> => {
  try {
    console.log("Fetching capabilities from Supabase...");
    const { data, error } = await supabase
      .from('capabilities')
      .select('*');

    if (error) {
      console.error('Error fetching capabilities:', error);
      throw error;
    }

    console.log("Capabilities fetched successfully:", data?.length || 0);
    // Convert Supabase records to Capability format
    return (data || []).map(record => mapSupabaseToCapability(record as SupabaseCapability));
  } catch (error) {
    console.error('Error in fetchCapabilitiesFromSupabase:', error);
    throw error;
  }
};

// Function to fetch a specific capability by ID from Supabase
export const fetchCapabilityById = async (id: string): Promise<Capability | null> => {
  try {
    console.log(`Fetching capability with ID ${id} from Supabase...`);
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log(`No capability found with ID ${id}`);
        return null;
      }
      console.error('Error fetching capability:', error);
      throw error;
    }

    console.log(`Capability with ID ${id} fetched successfully:`, data ? 'Found' : 'Not found');
    // Convert Supabase record to Capability format
    return data ? mapSupabaseToCapability(data as SupabaseCapability) : null;
  } catch (error) {
    console.error(`Error in fetchCapabilityById for ID ${id}:`, error);
    throw error;
  }
};

// Function to check if the connected wallet is the admin wallet
export const isAdminWallet = async (): Promise<boolean> => {
  const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83'.toLowerCase();
  
  if (!window.ethereum) {
    console.log("No Ethereum provider found");
    return false;
  }
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    
    if (!accounts || accounts.length === 0) {
      console.log("No connected accounts found");
      return false;
    }
    
    const connectedAccount = accounts[0].toLowerCase();
    const isAdmin = connectedAccount === ADMIN_WALLET_ADDRESS;
    console.log(`Connected account: ${connectedAccount}, Is admin: ${isAdmin}`);
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin wallet:', error);
    return false;
  }
};

// Function to insert or update a capability in Supabase
export const upsertCapability = async (capability: Capability): Promise<void> => {
  try {
    console.log("Attempting to upsert capability:", capability.id);
    
    // Check if connected wallet is admin
    const adminStatus = await isAdminWallet();
    console.log("Admin status check result:", adminStatus);
    
    if (!adminStatus) {
      throw new Error("Only admin wallet can perform this operation");
    }
    
    // Convert Capability to Supabase format
    const supabaseRecord = {
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

    console.log("Upserting capability with data:", supabaseRecord);
    
    // Attempt to use the Supabase client first
    try {
      const { error } = await supabase
        .from('capabilities')
        .upsert(supabaseRecord);
        
      if (error) {
        console.warn("Supabase client upsert failed, falling back to direct API call:", error);
        throw error; // Throw to trigger fallback
      }
      
      console.log("Capability upsert successful via Supabase client");
      return;
    } catch (clientError) {
      console.log("Falling back to direct API call due to:", clientError);
      // If Supabase client fails, try direct API call as fallback
      const response = await fetch(`${SUPABASE_URL}/rest/v1/capabilities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(supabaseRecord)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error upserting capability via direct API:', errorData);
        throw new Error(`Failed to upsert capability: ${response.status}`);
      }
      
      console.log("Capability upsert successful via direct API");
    }
  } catch (error) {
    console.error('Admin verification or upsert failed:', error);
    throw error;
  }
};

// Function to get all registered capability IDs from the blockchain
export const fetchCapabilityIdsFromBlockchain = async (): Promise<string[]> => {
  try {
    console.log("Fetching capability IDs from blockchain...");
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
    console.log(`${capabilityIds.length} capability IDs fetched from blockchain`);
    return capabilityIds;
  } catch (error) {
    console.error('Error fetching capability IDs from blockchain:', error);
    throw error;
  }
};

// Function to get capability details from the blockchain
export const fetchCapabilityDetailsFromBlockchain = async (id: string): Promise<Partial<Capability>> => {
  try {
    console.log(`Fetching details for capability ${id} from blockchain...`);
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
    console.log(`Capability ${id} details retrieved from blockchain`);
    
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
    console.log("Starting capability sync with blockchain...");
    // Check if connected wallet is admin
    const adminStatus = await isAdminWallet();
    console.log("Admin status check for sync:", adminStatus);
    
    if (!adminStatus) {
      throw new Error("Only admin wallet can sync capabilities");
    }
    
    // Get capability IDs from blockchain
    const capabilityIds = await fetchCapabilityIdsFromBlockchain();
    console.log(`Found ${capabilityIds.length} capabilities on blockchain`);
    
    let added = 0;
    let updated = 0;

    // Process each capability
    for (const id of capabilityIds) {
      console.log(`Processing capability ${id}...`);
      
      // Check if capability exists in Supabase
      const existingCapability = await fetchCapabilityById(id);
      const blockchainCapability = await fetchCapabilityDetailsFromBlockchain(id);
      
      if (!existingCapability) {
        // New capability - create it
        console.log(`Capability ${id} not found in Supabase, creating new record`);
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
        
        try {
          // Try using Supabase client first
          const { error } = await supabase
            .from('capabilities')
            .insert([{
              id: newCapability.id,
              name: newCapability.name,
              domain: newCapability.domain,
              description: newCapability.description,
              price: newCapability.price,
              creator: newCapability.creator,
              created_at: newCapability.createdAt,
              usage_count: newCapability.stats.usageCount,
              rating: newCapability.stats.rating,
              revenue: newCapability.stats.revenue,
              features: newCapability.features,
              last_synced_at: new Date().toISOString()
            }]);
            
          if (error) {
            console.warn(`Supabase client insert failed for ${id}, falling back to direct API:`, error);
            // Fallback to direct API
            const response = await fetch(`${SUPABASE_URL}/rest/v1/capabilities`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY
              },
              body: JSON.stringify({
                id: newCapability.id,
                name: newCapability.name,
                domain: newCapability.domain,
                description: newCapability.description,
                price: newCapability.price,
                creator: newCapability.creator,
                created_at: newCapability.createdAt,
                usage_count: newCapability.stats.usageCount,
                rating: newCapability.stats.rating,
                revenue: newCapability.stats.revenue,
                features: newCapability.features,
                last_synced_at: new Date().toISOString()
              })
            });
            
            if (!response.ok) {
              const errorData = await response.json();
              console.error(`Failed to add capability ${id} via direct API:`, errorData);
              continue;
            }
          }
          
          console.log(`Capability ${id} added successfully`);
          added++;
        } catch (error) {
          console.error(`Error adding capability ${id}:`, error);
        }
      } else if (
        blockchainCapability.description !== existingCapability.description ||
        blockchainCapability.price !== existingCapability.price ||
        blockchainCapability.creator !== existingCapability.creator
      ) {
        // Capability exists but needs updating
        console.log(`Capability ${id} found in Supabase, updating record`);
        const updatedData = {
          id: existingCapability.id,
          description: blockchainCapability.description || existingCapability.description,
          price: blockchainCapability.price || existingCapability.price,
          creator: blockchainCapability.creator || existingCapability.creator,
          last_synced_at: new Date().toISOString()
        };
        
        try {
          // Try using Supabase client first
          const { error } = await supabase
            .from('capabilities')
            .update(updatedData)
            .eq('id', id);
            
          if (error) {
            console.warn(`Supabase client update failed for ${id}, falling back to direct API:`, error);
            // Fallback to direct API
            const response = await fetch(`${SUPABASE_URL}/rest/v1/capabilities?id=eq.${encodeURIComponent(id)}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY
              },
              body: JSON.stringify(updatedData)
            });
            
            if (!response.ok) {
              const errorData = await response.json();
              console.error(`Failed to update capability ${id} via direct API:`, errorData);
              continue;
            }
          }
          
          console.log(`Capability ${id} updated successfully`);
          updated++;
        } catch (error) {
          console.error(`Error updating capability ${id}:`, error);
        }
      } else {
        console.log(`Capability ${id} is up to date, no changes needed`);
      }
    }

    console.log(`Sync completed: ${added} added, ${updated} updated, ${capabilityIds.length} total`);
    return { added, updated, total: capabilityIds.length };
  } catch (error) {
    console.error('Error syncing capabilities with blockchain:', error);
    throw error;
  }
};
