
import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";
import { ScienceGentFormData } from "@/types/sciencegent";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  pendingTransactions,
  addPendingTransaction, 
  removePendingTransaction, 
  clearPendingTransactions 
} from './transaction';
import { extractTokenAddressFromReceipt } from './blockchain';

/**
 * Creates a new ScienceGent token on the blockchain and saves it to Supabase
 * @returns An object containing the transaction hash and token address (if available)
 */
export const createScienceGent = async (formData: ScienceGentFormData & { transactionHash?: string, checkOnly?: boolean }): Promise<{
  transactionHash: string;
  tokenAddress: string | null;
}> => {
  try {
    // If we're just checking for a token address from an existing transaction
    if (formData.checkOnly && formData.transactionHash) {
      const tokenAddress = await extractTokenAddressFromReceipt(formData.transactionHash);
      return {
        transactionHash: formData.transactionHash,
        tokenAddress
      };
    }
    
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    // Generate a unique key for this creation request
    const creationKey = `create-${formData.name}-${formData.symbol}-${Date.now()}`;
    
    // Check if we already have a pending creation
    if (pendingTransactions.has(creationKey)) {
      console.log("Creation already in progress, skipping duplicate call");
      return {
        transactionHash: "pending_transaction",
        tokenAddress: null
      };
    }
    
    // Add to pending transactions
    addPendingTransaction(creationKey);
    
    // Convert form data to contract parameters
    const totalSupply = ethers.utils.parseEther(formData.totalSupply);
    const virtualETH = ethers.utils.parseEther(formData.initialLiquidity);
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      signer
    );
    
    toast({
      title: "Transaction Pending",
      description: "Creating your ScienceGent token...",
    });
    
    const tx = await factoryContract.createToken(
      formData.name,
      formData.symbol,
      totalSupply,
      virtualETH,
      formData.selectedCapabilities
    );
    
    toast({
      title: "Transaction Submitted",
      description: "Waiting for confirmation...",
    });
    
    // Return transaction hash immediately so UI can show pending state
    const transactionHash = tx.hash;
    
    // Wait for transaction confirmation and extract token address
    const receipt = await tx.wait();
    console.log("Transaction receipt:", receipt);
    
    // Extract token address from the event logs
    let tokenAddress = null;
    if (receipt && receipt.events) {
      // Look for TokenCreated event
      const event = receipt.events.find(
        (e) => e.event === "TokenCreated"
      );
      
      if (event && event.args) {
        tokenAddress = event.args[0]; // Token address is typically the first parameter
        console.log("Extracted token address:", tokenAddress);
      }
    }
    
    // If we couldn't extract from events, try the logs
    if (!tokenAddress) {
      tokenAddress = await extractTokenAddressFromReceipt(transactionHash);
    }
    
    if (tokenAddress) {
      // Save to Supabase
      try {
        // Save basic info to Supabase immediately
        const { error } = await supabase
          .from('sciencegents')
          .insert({
            address: tokenAddress,
            name: formData.name,
            symbol: formData.symbol,
            description: formData.description || "",
            website: formData.website || "",
            socials: {
              twitter: formData.twitter || "",
              github: formData.github || ""
            },
            total_supply: parseFloat(formData.totalSupply),
            virtual_eth: parseFloat(formData.initialLiquidity),
            creator_address: signerAddress,
            created_on_chain_at: new Date().toISOString(),
            last_synced_at: new Date().toISOString()
          });
          
        if (error) {
          console.error("Error saving ScienceGent to Supabase:", error);
        } else {
          console.log("ScienceGent saved to Supabase successfully:", tokenAddress);
          
          // Also create initial stats
          await supabase
            .from('sciencegent_stats')
            .insert({
              sciencegent_address: tokenAddress,
              volume_24h: 0,
              transactions: 0, 
              holders: 0
            });
            
          // Also save capabilities if any
          if (formData.selectedCapabilities.length > 0) {
            const capabilityRows = formData.selectedCapabilities.map(capabilityId => ({
              sciencegent_address: tokenAddress,
              capability_id: capabilityId,
              added_at: new Date().toISOString()
            }));
            
            await supabase
              .from('sciencegent_capabilities')
              .insert(capabilityRows);
          }
        }
      } catch (dbError) {
        console.error("Error saving to database:", dbError);
        // Don't throw here, we still want to return the token address
      }
    } else {
      console.error("Could not extract token address from transaction receipt");
    }
    
    toast({
      title: "ScienceGent Created!",
      description: "Your ScienceGent has been successfully created.",
    });
    
    // Remove from pending transactions
    removePendingTransaction(creationKey);
    
    return { transactionHash, tokenAddress };
  } catch (error) {
    console.error("Error creating ScienceGent:", error);
    
    // Clear pending transactions on error
    clearPendingTransactions();
    
    toast({
      title: "Creation Failed",
      description: error.message || "Failed to create ScienceGent",
      variant: "destructive",
    });
    
    throw error;
  }
};

// Re-export extractTokenAddressFromReceipt for convenience
export { extractTokenAddressFromReceipt } from './blockchain';
