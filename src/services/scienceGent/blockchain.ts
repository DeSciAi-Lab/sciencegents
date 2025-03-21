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
    console.log("Token details from blockchain:", details);
    
    // Get token capabilities
    const capabilities = await factoryContract.getTokenAssignedCapabilities(address);
    console.log("Token capabilities from blockchain:", capabilities);
    
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
      // Store additional details from the contract
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
 * @returns Capability details or null if error
 */
export const fetchCapabilityDetailsFromBlockchain = async (
  capabilityId: string
): Promise<CapabilityDetail | null> => {
  try {
    console.log(`Fetching capability ${capabilityId} from blockchain`);
    
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    
    // Enhanced ABI for the ScienceGentsSwap contract to include more stats
    const swapABI = [
      "function getTokenStats(address token) external view returns (uint256 tokenReserve, uint256 ethReserve, uint256 virtualETH, uint256 collectedFees, bool tradingEnabled, address creator, uint256 creationTimestamp, uint256 maturityDeadline, bool migrated, uint256 lpUnlockTime, uint256 lockedLPAmount, uint256 currentPrice, bool migrationEligible)",
      "function isMigrationEligible(address token) external view returns (bool)"
    ];
    
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      swapABI,
      provider
    );
    
    // Get token stats from swap contract
    const stats = await swapContract.getTokenStats(address);
    console.log("Raw token stats from blockchain:", stats);
    
    // Get migration eligibility
    const isMigrationEligible = await swapContract.isMigrationEligible(address);
    console.log("Migration eligibility:", isMigrationEligible);
    
    // Get current timestamp for age calculation
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    // Create enhanced TokenStats object
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
      migrationEligible: isMigrationEligible,
      // Add derived properties for easier UI display
      tokenAge: currentTimestamp - parseInt(stats[6].toString()),
      remainingMaturityTime: Math.max(0, parseInt(stats[7].toString()) - currentTimestamp),
      maturityProgress: calculateMaturityProgress(stats[3].toString(), stats[2].toString())
    };
    
    console.log("Formatted token stats:", tokenStats);
    
    return tokenStats;
  } catch (error) {
    console.error("Error fetching token stats from blockchain:", error);
    return null;
  }
};

/**
 * Calculate maturity progress percentage
 * @param collectedFees Collected fees in the pool
 * @param virtualETH Virtual ETH amount
 * @returns Progress percentage (0-100)
 */
const calculateMaturityProgress = (collectedFees: string, virtualETH: string): number => {
  try {
    const fees = ethers.BigNumber.from(collectedFees);
    const vETH = ethers.BigNumber.from(virtualETH);
    
    // Target is 2x virtualETH (according to contract logic)
    const target = vETH.mul(2);
    
    if (target.isZero()) return 0;
    
    // Calculate progress percentage (capped at 100%)
    const progress = fees.mul(100).div(target);
    return Math.min(100, progress.toNumber());
  } catch (error) {
    console.error("Error calculating maturity progress:", error);
    return 0;
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
    
    // Import required functions
    const { saveScienceGentToSupabase } = await import('./supabase');
    const { syncCapabilityDetailsToSupabase } = await import('./supabase');
    
    for (let offset = 0; offset < tokenCount.toNumber(); offset += batchSize) {
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
            // Calculate total capability fees for this token
            let totalCapabilityFees = 0;
            if (scienceGentData.capabilities && scienceGentData.capabilities.length > 0) {
              for (const capId of scienceGentData.capabilities) {
                try {
                  const capDetails = await fetchCapabilityDetailsFromBlockchain(capId);
                  if (capDetails && capDetails.feeInETH) {
                    totalCapabilityFees += parseFloat(ethers.utils.formatEther(capDetails.feeInETH));
                  }
                  
                  // Also sync capability details to Supabase
                  await syncCapabilityDetailsToSupabase(capDetails);
                } catch (capError) {
                  console.error(`Error fetching capability ${capId}:`, capError);
                }
              }
            }
            
            // Create a modified ScienceGentData with capability fees
            const enrichedData: ScienceGentData = {
              ...scienceGentData,
              capabilityFees: totalCapabilityFees
            };
            
            // Save to Supabase
            await saveScienceGentToSupabase(enrichedData, tokenStats);
            
            syncCount++;
            console.log(`Successfully synced token ${tokenAddress} (${syncCount}/${tokens.length})`);
          } else {
            console.error(`Failed to fetch data for token ${tokenAddress}`);
            errorCount++;
          }
        } catch (error) {
          console.error(`Error syncing token ${tokenAddress}:`, error);
          errorCount++;
        }
      }
    }
    
    console.log(`Sync completed. Synced ${syncCount} tokens with ${errorCount} errors.`);
    
    return { syncCount, errorCount };
  } catch (error) {
    console.error("Error syncing ScienceGents:", error);
    throw error;
  }
};

/**
 * Utility function to extract token address from transaction hash
 * @param transactionHash Transaction hash
 * @returns Token address if found
 */
export const extractTokenAddressFromTransactionHash = async (transactionHash: string): Promise<string | null> => {
  try {
    console.log("Extracting token address from transaction hash:", transactionHash);
    
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(transactionHash);
    if (!receipt || receipt.status !== 1) {
      console.log("Transaction not confirmed or failed:", receipt);
      return null;
    }
    
    console.log("Transaction receipt:", receipt);
    
    // Get the factory contract
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );
    
    // Find the TokenCreated event
    if (receipt.logs && receipt.logs.length > 0) {
      for (const log of receipt.logs) {
        // Check if the log is from our factory contract
        if (log.address.toLowerCase() === contractConfig.addresses.ScienceGentsFactory.toLowerCase()) {
          try {
            // Try to parse the log using our contract interface
            const parsedLog = factoryContract.interface.parseLog(log);
            console.log("Parsed log:", parsedLog);
            
            // Check if this is the TokenCreated event
            if (parsedLog && parsedLog.name === "TokenCreated") {
              // The first parameter should be the token address
              return parsedLog.args[0];
            }
          } catch (parseError) {
            console.log("Could not parse log:", parseError);
            // Continue to next log
          }
        }
      }
    }
    
    console.log("Could not find TokenCreated event in logs");
    return null;
  } catch (error) {
    console.error("Error extracting token address from transaction hash:", error);
    return null;
  }
};

