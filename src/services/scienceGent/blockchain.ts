
import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";
import { toast } from "@/components/ui/use-toast";
import { ScienceGentData, TokenStats, CapabilityDetail } from "./types";

/**
 * Fetches ScienceGent details from the blockchain
 * @param address Token address
 * @returns ScienceGent data or null if not found
 */
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

/**
 * Fetches capability details from blockchain
 * @param capabilityId Capability ID
 * @param provider Ethereum provider
 * @returns Capability details or null if error
 */
export const fetchCapabilityDetailsFromBlockchain = async (
  capabilityId: string, 
  provider: ethers.providers.Web3Provider
): Promise<CapabilityDetail | null> => {
  try {
    console.log(`Fetching capability ${capabilityId} from blockchain`);
    
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );
    
    // Get capability details from contract
    const [description, feeInETH, creator] = await factoryContract.getCapabilityDetails(capabilityId);
    
    return {
      id: capabilityId,
      description,
      feeInETH: feeInETH.toString(),
      creator
    };
  } catch (error) {
    console.error(`Error fetching capability ${capabilityId}:`, error);
    return null;
  }
};

/**
 * Fetches token statistics from the blockchain
 * @param address Token address
 * @returns Token statistics or null if error
 */
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

/**
 * Syncs all ScienceGents from blockchain to Supabase
 */
export const syncAllScienceGentsFromBlockchain = async (): Promise<{ syncCount: number; errorCount: number }> => {
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
      
      // Sync each token
      for (const tokenAddress of tokens) {
        try {
          // Fetch token details and stats
          const scienceGentData = await fetchScienceGentFromBlockchain(tokenAddress);
          const tokenStats = await fetchTokenStatsFromBlockchain(tokenAddress);
          
          if (scienceGentData && tokenStats) {
            // Sync capabilities to Supabase
            if (scienceGentData.capabilities.length > 0) {
              console.log(`Syncing ${scienceGentData.capabilities.length} capabilities for token ${tokenAddress}`);
              for (const capabilityId of scienceGentData.capabilities) {
                const capabilityDetail = await fetchCapabilityDetailsFromBlockchain(capabilityId, provider);
                if (capabilityDetail) {
                  // This will be imported from the transformations module
                  await syncCapabilityToSupabase(tokenAddress, capabilityDetail);
                }
              }
            }
            
            // Import from Supabase operations module
            const { saveScienceGentToSupabase } = await import('./supabase');
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

/**
 * Syncs a capability to Supabase
 * @param tokenAddress Token address
 * @param capabilityDetail Capability details
 */
const syncCapabilityToSupabase = async (tokenAddress: string, capabilityDetail: CapabilityDetail) => {
  try {
    const { syncCapabilityDetailsToSupabase } = await import('./supabase');
    await syncCapabilityDetailsToSupabase(capabilityDetail);
  } catch (error) {
    console.error(`Error syncing capability ${capabilityDetail.id}:`, error);
  }
};
