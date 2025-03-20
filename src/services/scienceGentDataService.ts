
import { ethers } from "ethers";
import { supabase } from "@/integrations/supabase/client";
import { contractConfig, factoryABI } from "@/utils/contractConfig";
import { toast } from "@/components/ui/use-toast";

// Type definitions
interface ScienceGentData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creator: string;
  tradingEnabled: boolean;
  isMigrated: boolean;
  capabilities: string[];
  adminLockAmount: string;
  adminLockRemainingTime: string;
  isAdminTokensUnlocked: boolean;
}

interface TokenStats {
  tokenReserve: string;
  ethReserve: string;
  virtualETH: string;
  collectedFees: string;
  tradingEnabled: boolean;
  creator: string;
  creationTimestamp: string;
  maturityDeadline: string;
  migrated: boolean;
  lpUnlockTime: string;
  lockedLPAmount: string;
  currentPrice: string;
  migrationEligible: boolean;
}

// Function to save a ScienceGent to Supabase
export const saveScienceGentToSupabase = async (
  scienceGentData: ScienceGentData,
  tokenStats: TokenStats
) => {
  try {
    console.log("Saving ScienceGent to Supabase:", scienceGentData.address);
    
    // Calculate maturity progress based on collected fees and virtualETH
    const collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
    const virtualETH = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
    const maturityProgress = virtualETH > 0 
      ? Math.min(Math.round((collectedFees / (2 * virtualETH)) * 100), 100) 
      : 0;
    
    // Convert price to a number
    const tokenPrice = tokenStats.currentPrice 
      ? parseFloat(ethers.utils.formatEther(tokenStats.currentPrice))
      : 0;
    
    // Calculate market cap (total supply * price)
    const totalSupply = parseFloat(ethers.utils.formatEther(scienceGentData.totalSupply));
    const marketCap = tokenPrice * totalSupply;
    
    // Calculate total liquidity (ethReserve * 2) as an approximation
    const ethReserve = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
    const totalLiquidity = ethReserve * 2;
    
    // Prepare data for Supabase
    const scienceGent = {
      address: scienceGentData.address,
      name: scienceGentData.name,
      symbol: scienceGentData.symbol,
      description: "", // Can be updated later through UI
      domain: "General", // Default domain
      total_supply: totalSupply,
      market_cap: marketCap,
      token_price: tokenPrice,
      price_change_24h: 0, // This would require historical data
      total_liquidity: totalLiquidity,
      maturity_progress: maturityProgress,
      virtual_eth: virtualETH,
      creator_address: scienceGentData.creator,
      created_on_chain_at: new Date(parseInt(tokenStats.creationTimestamp) * 1000).toISOString(),
      is_migrated: tokenStats.migrated,
      last_synced_at: new Date().toISOString()
    };
    
    console.log("Checking if ScienceGent exists:", scienceGentData.address);
    
    // First check if the ScienceGent exists
    const { data: existingScienceGent, error: checkError } = await supabase
      .from('sciencegents')
      .select('id')
      .eq('address', scienceGentData.address)
      .maybeSingle();
    
    if (checkError) {
      console.error("Error checking if ScienceGent exists:", checkError);
      throw checkError;
    }
    
    // If it exists, update, otherwise insert
    let upsertError = null;
    if (existingScienceGent) {
      console.log("Updating existing ScienceGent:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegents')
        .update(scienceGent)
        .eq('address', scienceGentData.address);
      upsertError = error;
    } else {
      console.log("Inserting new ScienceGent:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegents')
        .insert(scienceGent);
      upsertError = error;
    }
    
    if (upsertError) {
      console.error("Error upserting ScienceGent:", upsertError);
      throw upsertError;
    }
    
    // Initialize or update stats
    const statsData = {
      sciencegent_address: scienceGentData.address,
      volume_24h: 0, // This would require tracking transactions
      transactions: 0, // This would require tracking transactions
      holders: 0, // This would require tracking token holders
      updated_at: new Date().toISOString()
    };
    
    console.log("Checking if ScienceGent stats exists:", scienceGentData.address);
    
    // Check if stats already exist
    const { data: existingStats, error: checkStatsError } = await supabase
      .from('sciencegent_stats')
      .select('id')
      .eq('sciencegent_address', scienceGentData.address)
      .maybeSingle();
    
    if (checkStatsError) {
      console.error("Error checking if ScienceGent stats exists:", checkStatsError);
      throw checkStatsError;
    }
    
    // If stats exist, update, otherwise insert
    let statsError = null;
    if (existingStats) {
      console.log("Updating existing ScienceGent stats:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegent_stats')
        .update(statsData)
        .eq('sciencegent_address', scienceGentData.address);
      statsError = error;
    } else {
      console.log("Inserting new ScienceGent stats:", scienceGentData.address);
      const { error } = await supabase
        .from('sciencegent_stats')
        .insert(statsData);
      statsError = error;
    }
    
    if (statsError) {
      console.error("Error upserting ScienceGent stats:", statsError);
      throw statsError;
    }
    
    // Save capabilities
    if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
      await saveCapabilitiesToSupabase(scienceGentData.address, scienceGentData.capabilities);
    }
    
    console.log("ScienceGent saved successfully:", scienceGentData.address);
    return true;
  } catch (error) {
    console.error("Error saving ScienceGent to Supabase:", error);
    throw error;
  }
};

// Function to save ScienceGent capabilities to Supabase
const saveCapabilitiesToSupabase = async (
  scienceGentAddress: string,
  capabilities: string[]
) => {
  try {
    // First, delete any existing capabilities for this ScienceGent
    const { error: deleteError } = await supabase
      .from('sciencegent_capabilities')
      .delete()
      .eq('sciencegent_address', scienceGentAddress);
    
    if (deleteError) {
      console.error("Error deleting existing capabilities:", deleteError);
      throw deleteError;
    }
    
    // Insert new capabilities
    const capabilityRows = capabilities.map(capabilityId => ({
      sciencegent_address: scienceGentAddress,
      capability_id: capabilityId,
      added_at: new Date().toISOString()
    }));
    
    if (capabilityRows.length > 0) {
      const { error: insertError } = await supabase
        .from('sciencegent_capabilities')
        .insert(capabilityRows);
      
      if (insertError) {
        console.error("Error inserting capabilities:", insertError);
        throw insertError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error saving capabilities to Supabase:", error);
    throw error;
  }
};

// Function to fetch ScienceGent details from the blockchain
export const fetchScienceGentFromBlockchain = async (address: string): Promise<ScienceGentData | null> => {
  try {
    console.log("Fetching ScienceGent from blockchain:", address);
    
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );
    
    // Get token details from factory
    const details = await factoryContract.getTokenDetails(address);
    
    // Get token capabilities
    const capabilities = await factoryContract.getTokenAssignedCapabilities(address);
    
    // Create ScienceGentData object
    const scienceGentData: ScienceGentData = {
      address,
      name: details[0],
      symbol: details[1],
      totalSupply: details[2].toString(),
      creator: details[3],
      tradingEnabled: details[4],
      isMigrated: details[5],
      capabilities,
      adminLockAmount: details[7].toString(),
      adminLockRemainingTime: details[8].toString(),
      isAdminTokensUnlocked: details[9]
    };
    
    return scienceGentData;
  } catch (error) {
    console.error("Error fetching ScienceGent from blockchain:", error);
    return null;
  }
};

// Function to fetch token statistics from the blockchain
export const fetchTokenStatsFromBlockchain = async (address: string): Promise<TokenStats | null> => {
  try {
    console.log("Fetching token stats from blockchain:", address);
    
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Use the ABI for the ScienceGentsSwap contract
    const swapABI = [
      "function getTokenStats(address token) external view returns (uint256 tokenReserve, uint256 ethReserve, uint256 virtualETH, uint256 collectedFees, bool tradingEnabled, address creator, uint256 creationTimestamp, uint256 maturityDeadline, bool migrated, uint256 lpUnlockTime, uint256 lockedLPAmount, uint256 currentPrice, bool migrationEligible)"
    ];
    
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      swapABI,
      provider
    );
    
    // Get token stats from swap contract
    const stats = await swapContract.getTokenStats(address);
    
    // Create TokenStats object
    const tokenStats: TokenStats = {
      tokenReserve: stats[0].toString(),
      ethReserve: stats[1].toString(),
      virtualETH: stats[2].toString(),
      collectedFees: stats[3].toString(),
      tradingEnabled: stats[4],
      creator: stats[5],
      creationTimestamp: stats[6].toString(),
      maturityDeadline: stats[7].toString(),
      migrated: stats[8],
      lpUnlockTime: stats[9].toString(),
      lockedLPAmount: stats[10].toString(),
      currentPrice: stats[11].toString(),
      migrationEligible: stats[12]
    };
    
    return tokenStats;
  } catch (error) {
    console.error("Error fetching token stats from blockchain:", error);
    return null;
  }
};

// Function to fetch ScienceGent details from Supabase
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log("Fetching ScienceGent from Supabase:", address);
    
    // Fetch ScienceGent
    const { data: scienceGent, error: scienceGentError } = await supabase
      .from('sciencegents')
      .select('*')
      .eq('address', address)
      .single();
    
    if (scienceGentError) {
      console.error("Error fetching ScienceGent from Supabase:", scienceGentError);
      return null;
    }
    
    // Fetch ScienceGent stats
    const { data: stats, error: statsError } = await supabase
      .from('sciencegent_stats')
      .select('*')
      .eq('sciencegent_address', address)
      .maybeSingle();
    
    // Fetch capabilities
    const { data: capabilities, error: capabilitiesError } = await supabase
      .from('sciencegent_capabilities')
      .select('capabilities:capability_id(id, name, domain, price)')
      .eq('sciencegent_address', address);
    
    if (capabilitiesError) {
      console.error("Error fetching ScienceGent capabilities:", capabilitiesError);
    }
    
    return {
      ...scienceGent,
      stats: stats || {
        volume_24h: 0,
        transactions: 0,
        holders: 0
      },
      capabilities: capabilities?.map(cap => cap.capabilities) || []
    };
  } catch (error) {
    console.error("Error fetching ScienceGent from Supabase:", error);
    return null;
  }
};

// Function to sync all ScienceGents from blockchain
export const syncAllScienceGents = async () => {
  try {
    console.log("Starting sync of all ScienceGents");
    
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );
    
    // Get total token count
    const tokenCount = await factoryContract.getTokenCount();
    console.log(`Found ${tokenCount.toString()} tokens to sync`);
    
    // Process in batches to avoid timeout
    const batchSize = 10;
    let syncCount = 0;
    let errorCount = 0;
    
    for (let offset = 0; offset < tokenCount; offset += batchSize) {
      const limit = Math.min(batchSize, tokenCount.toNumber() - offset);
      
      // Use getTokensWithPagination to get tokens in batches
      const result = await factoryContract.getTokensWithPagination(offset, limit);
      const tokens = result.tokens;
      
      console.log(`Processing batch of ${tokens.length} tokens (offset: ${offset}, limit: ${limit})`);
      
      // Process each token
      for (const tokenAddress of tokens) {
        try {
          // Fetch token details and stats
          const scienceGentData = await fetchScienceGentFromBlockchain(tokenAddress);
          const tokenStats = await fetchTokenStatsFromBlockchain(tokenAddress);
          
          if (scienceGentData && tokenStats) {
            // Save to Supabase
            await saveScienceGentToSupabase(scienceGentData, tokenStats);
            syncCount++;
            console.log(`Successfully synced token ${tokenAddress} (${syncCount}/${tokens.length})`);
          }
        } catch (error) {
          console.error(`Error syncing token ${tokenAddress}:`, error);
          errorCount++;
        }
      }
    }
    
    console.log(`Sync completed. Synced ${syncCount} tokens with ${errorCount} errors.`);
    
    toast({
      title: "Sync Completed",
      description: `Successfully synced ${syncCount} ScienceGents with ${errorCount} errors.`
    });
    
    return { syncCount, errorCount };
  } catch (error) {
    console.error("Error syncing ScienceGents:", error);
    
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGents",
      variant: "destructive"
    });
    
    throw error;
  }
};

// Function to sync a single ScienceGent from blockchain
export const syncScienceGent = async (address: string) => {
  try {
    console.log("Syncing ScienceGent:", address);
    
    // Fetch token details and stats
    const scienceGentData = await fetchScienceGentFromBlockchain(address);
    const tokenStats = await fetchTokenStatsFromBlockchain(address);
    
    if (!scienceGentData || !tokenStats) {
      throw new Error("Failed to fetch ScienceGent data from blockchain");
    }
    
    // Save to Supabase
    await saveScienceGentToSupabase(scienceGentData, tokenStats);
    
    toast({
      title: "Sync Successful",
      description: `${scienceGentData.name} has been synced from the blockchain`
    });
    
    return true;
  } catch (error) {
    console.error("Error syncing ScienceGent:", error);
    
    toast({
      title: "Sync Failed",
      description: error.message || "Failed to sync ScienceGent",
      variant: "destructive"
    });
    
    throw error;
  }
};
