
import { Capability } from "@/types/capability";
import { toast } from "@/components/ui/use-toast";
import { isAdminWallet } from "@/services/walletService";
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from "./blockchain";
import { fetchCapabilityById, upsertCapabilityToSupabase } from "./supabase";

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
          await upsertCapabilityToSupabase(newCapability, true);
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
        const updatedCapability: Capability = {
          ...existingCapability,
          description: blockchainCapability.description || existingCapability.description,
          price: blockchainCapability.price || existingCapability.price,
          creator: blockchainCapability.creator || existingCapability.creator
        };
        
        try {
          await upsertCapabilityToSupabase(updatedCapability, true);
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

// Function to upsert a capability
export const upsertCapability = async (capability: Capability): Promise<void> => {
  try {
    console.log("Starting capability upsert process:", capability.id);
    
    // Check if connected wallet is admin
    const adminStatus = await isAdminWallet();
    console.log("Admin status check result:", adminStatus);
    
    if (!adminStatus) {
      toast({
        title: "Access Denied",
        description: "Only admin wallet can perform this operation",
        variant: "destructive"
      });
      throw new Error("Only admin wallet can perform this operation");
    }
    
    // Proceed with upsert
    await upsertCapabilityToSupabase(capability, true);
    console.log("Capability upsert completed successfully:", capability.id);
    
    toast({
      title: "Capability Updated",
      description: `Capability ${capability.id} has been successfully updated.`,
      variant: "default"
    });
  } catch (error) {
    console.error('Error in upsertCapability:', error);
    
    toast({
      title: "Capability Update Failed",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive"
    });
    
    throw error;
  }
};
