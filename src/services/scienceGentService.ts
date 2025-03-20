import { ethers } from "ethers";
import { contractConfig, factoryABI, dsiTokenABI } from "@/utils/contractConfig";
import { ScienceGentFormData } from "@/types/sciencegent";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the current launch fee from the ScienceGentsFactory contract
 */
export const getLaunchFee = async (): Promise<string> => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );
    
    const launchFee = await factoryContract.launchFee();
    return ethers.utils.formatEther(launchFee);
  } catch (error) {
    console.error("Error fetching launch fee:", error);
    throw error;
  }
};

/**
 * Checks if the user has enough DSI tokens and has approved the factory contract
 */
export const checkDSIAllowance = async (launchFee: string): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      throw new Error("No connected account found");
    }
    
    const dsiContract = new ethers.Contract(
      contractConfig.addresses.DSIToken,
      dsiTokenABI,
      provider
    );
    
    // Check balance
    const balance = await dsiContract.balanceOf(accounts[0]);
    const launchFeeWei = ethers.utils.parseEther(launchFee);
    
    if (balance.lt(launchFeeWei)) {
      throw new Error(`Insufficient DSI balance. You need ${launchFee} DSI tokens.`);
    }
    
    // Check allowance
    const allowance = await dsiContract.allowance(
      accounts[0],
      contractConfig.addresses.ScienceGentsFactory
    );
    
    return allowance.gte(launchFeeWei);
  } catch (error) {
    console.error("Error checking DSI allowance:", error);
    throw error;
  }
};

/**
 * Approves the factory contract to spend DSI tokens
 */
export const approveDSIForFactory = async (launchFee: string): Promise<string> => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const dsiContract = new ethers.Contract(
      contractConfig.addresses.DSIToken,
      dsiTokenABI,
      signer
    );
    
    // Add 10% buffer to ensure approval is sufficient
    const launchFeeWei = ethers.utils.parseEther(launchFee);
    const approvalAmount = launchFeeWei.mul(110).div(100);
    
    const tx = await dsiContract.approve(
      contractConfig.addresses.ScienceGentsFactory,
      approvalAmount
    );
    
    toast({
      title: "Transaction Submitted",
      description: "Approving DSI tokens for ScienceGents Factory...",
    });
    
    const receipt = await tx.wait();
    
    toast({
      title: "Approval Successful",
      description: "DSI tokens approved for ScienceGents Factory",
    });
    
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error approving DSI tokens:", error);
    toast({
      title: "Approval Failed",
      description: error.message || "Failed to approve DSI tokens",
      variant: "destructive",
    });
    throw error;
  }
};

/**
 * Creates a new ScienceGent token on the blockchain and saves it to Supabase
 */
export const createScienceGent = async (formData: ScienceGentFormData): Promise<string> => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
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
    
    const receipt = await tx.wait();
    
    // Extract token address from the event logs
    let tokenAddress = null;
    if (receipt && receipt.events) {
      // Look for TokenCreated event
      const event = receipt.events.find(
        (e) => e.event === "TokenCreated"
      );
      
      if (event && event.args) {
        tokenAddress = event.args[0]; // Token address is typically the first parameter
      }
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
    }
    
    toast({
      title: "ScienceGent Created!",
      description: "Your ScienceGent has been successfully created.",
    });
    
    return tokenAddress || receipt.transactionHash;
  } catch (error) {
    console.error("Error creating ScienceGent:", error);
    toast({
      title: "Creation Failed",
      description: error.message || "Failed to create ScienceGent",
      variant: "destructive",
    });
    throw error;
  }
};
