import { ethers } from "ethers";
import { getProvider } from "@/services/walletService";
import { contractConfig } from "@/utils/contractConfig";
import { ScienceGentData, TokenStats } from "./types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches ScienceGent data from the blockchain
 * @param address Token address 
 * @returns ScienceGent data or null if not found
 */
export const fetchScienceGentFromBlockchain = async (
  address: string
): Promise<ScienceGentData | null> => {
  try {
    console.log("Fetching ScienceGent from blockchain:", address);
    
    const provider = await getProvider();
    
    // ABI fragments for the specific functions we need
    const factoryAbi = [
      "function getTokenDetails(address token) view returns (string, string, uint256, address, bool, bool, uint256, uint256, uint256, bool)",
      "function getTokenCapabilitiesPage(address token, uint256 offset, uint256 limit) view returns (string[])"
    ];
    
    // Initialize contract interfaces
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryAbi,
      provider
    );
    
    // Fetch token details from factory
    const tokenDetails = await factoryContract.getTokenDetails(address);
    
    // --- DEBUG LOG --- 
    // Log the raw creator address returned by the contract at index 3
    console.log(`DEBUG: Raw creator address from tokenDetails[3] for ${address}:`, tokenDetails[3]);
    // --- END DEBUG LOG ---
    
    // Fetch token capabilities
    const capabilities = await factoryContract.getTokenCapabilitiesPage(address, 0, 100);
    
    // Process timestamp safely
    let creationTimestampStr = "0";
    if (tokenDetails[6]) {
      try {
        // Prefer toString() for BigNumbers
        creationTimestampStr = tokenDetails[6].toString(); 
      } catch (e) {
          console.warn("Could not convert creationTimestamp to string:", tokenDetails[6]);
      }
    }

    // Process maturity deadline safely
    let maturityDeadlineStr = "0";
    if (tokenDetails[7]) {
        try {
            // Prefer toString() for BigNumbers
            maturityDeadlineStr = tokenDetails[7].toString(); 
        } catch (e) {
            console.warn("Could not convert maturityDeadline to string:", tokenDetails[7]);
        }
    }
    
    // Create ScienceGent data object
    const scienceGentData: ScienceGentData = {
      address: address,
      name: tokenDetails[0],
      symbol: tokenDetails[1],
      totalSupply: tokenDetails[2].toString(),
      creator: tokenDetails[3],
      isMigrated: tokenDetails[5],
      creationTimestamp: creationTimestampStr,
      maturityDeadline: maturityDeadlineStr,
      capabilities: capabilities || []
    };
    
    console.log("Blockchain data:", scienceGentData);
    return scienceGentData;
  } catch (error) {
    console.error("Error fetching from blockchain:", error);
    return null;
  }
};

/**
 * Fetches token statistics from the blockchain
 * @param address Token address
 * @returns Token statistics or null if not found
 */
export const fetchTokenStatsFromBlockchain = async (
  address: string
): Promise<TokenStats | null> => {
  try {
    console.log("Fetching token stats from blockchain:", address);
    
    const provider = await getProvider();
    
    // ABI fragments for the specific functions we need
    const swapAbi = [
      "function getTokenStats(address token) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)"
    ];
    
    // Initialize contract interfaces
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      swapAbi,
      provider
    );
    
    // Fetch token stats from swap
    const tokenStats = await swapContract.getTokenStats(address);
    
    // Create TokenStats object - Fix the property name from 'isMigrated' to 'migrated'
    const stats: TokenStats = {
      tokenReserve: tokenStats[0].toString(),
      ethReserve: tokenStats[1].toString(),
      virtualETH: tokenStats[2].toString(),
      collectedFees: tokenStats[3].toString(),
      tradingEnabled: tokenStats[4],
      creator: tokenStats[5],
      creationTimestamp: tokenStats[6].toString(),
      maturityDeadline: tokenStats[7].toString(),
      migrated: tokenStats[8],
      lpUnlockTime: tokenStats[9].toString(),
      lockedLPAmount: tokenStats[10].toString(),
      currentPrice: tokenStats[11].toString(),
      migrationEligible: tokenStats[12]
    };
    
    console.log("Token stats:", stats);
    return stats;
  } catch (error) {
    console.error("Error fetching token stats from blockchain:", error);
    return null;
  }
};

/**
 * Extracts token address from a transaction receipt
 * @param transactionHash Transaction hash
 * @returns Token address or null if not found
 */
export const extractTokenAddressFromReceipt = async (transactionHash: string): Promise<string | null> => {
  try {
    console.log("Extracting token address from transaction:", transactionHash);
    
    const provider = await getProvider();
    
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(transactionHash);
    if (!receipt || !receipt.logs) {
      console.error("No receipt or logs found");
      return null;
    }
    
    // Look for the TokenCreated event in the logs
    for (const log of receipt.logs) {
      // Check if this log is from the ScienceGentsFactory contract
      if (log.address.toLowerCase() === contractConfig.addresses.ScienceGentsFactory.toLowerCase()) {
        try {
          // The first topic is the event signature
          // The first parameter is usually the token address
          const tokenAddress = ethers.utils.defaultAbiCoder.decode(['address'], log.topics[1])[0];
          console.log("Found token address:", tokenAddress);
          return tokenAddress;
        } catch (e) {
          console.error("Error decoding log:", e);
          continue;
        }
      }
    }
    
    // Fallback: iterate over logs and check for Transfer events
    for (const log of receipt.logs) {
      try {
        // Check if this log has a Transfer event signature
        if (log.topics[0] === ethers.utils.id("Transfer(address,address,uint256)")) {
          // The token address is the contract that emitted this event
          console.log("Found potential token address from Transfer event:", log.address);
          return log.address;
        }
      } catch (e) {
        continue;
      }
    }
    
    console.error("Token address not found in logs");
    return null;
  } catch (error) {
    console.error("Error extracting token address:", error);
    return null;
  }
};

/**
 * Synchronizes all ScienceGents from the blockchain to Supabase
 * @returns Object with counts of synced tokens and errors
 */
export const syncAllScienceGentsFromBlockchain = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    console.log("Starting blockchain sync for all ScienceGents...");
    
    const provider = await getProvider();
    
    // ABI fragments for the specific functions we need
    const factoryAbi = [
      "function getTokenCount() view returns (uint256)",
      "function getTokensWithPagination(uint256 offset, uint256 limit) view returns (address[], uint256)"
    ];
    
    // Initialize contract interface
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryAbi,
      provider
    );
    
    // Get total token count
    const tokenCount = await factoryContract.getTokenCount();
    console.log(`Total ScienceGent tokens: ${tokenCount}`);
    
    // Fetch tokens in batches of 50
    const batchSize = 50;
    let syncCount = 0;
    let errorCount = 0;
    
    for (let offset = 0; offset < tokenCount.toNumber(); offset += batchSize) {
      console.log(`Fetching tokens ${offset} to ${offset + batchSize}...`);
      
      // Get batch of token addresses
      const [tokenAddresses] = await factoryContract.getTokensWithPagination(offset, batchSize);
      
      // Process each token
      for (const address of tokenAddresses) {
        try {
          // Import syncScienceGent directly to avoid circular dependencies
          const { syncScienceGent } = await import("@/services/scienceGent");
          
          // Sync the token
          await syncScienceGent(address);
          syncCount++;
        } catch (error) {
          console.error(`Error syncing token ${address}:`, error);
          errorCount++;
        }
      }
    }
    
    console.log(`Sync completed: ${syncCount} synced, ${errorCount} errors`);
    return { syncCount, errorCount };
  } catch (error) {
    console.error("Error in syncAllScienceGentsFromBlockchain:", error);
    return { syncCount: 0, errorCount: 1 };
  }
};

/**
 * Fetches the creation timestamp for a ScienceGent token from the blockchain
 * @param address Token address
 * @returns Creation timestamp in seconds since epoch, or null if failed
 */
export const fetchCreationTimestampFromBlockchain = async (
  address: string
): Promise<number | null> => {
  try {
    console.log("Fetching creation timestamp from blockchain for:", address);
    
    const provider = await getProvider();
    
    // ABI fragments for the specific functions we need
    const factoryAbi = [
      "function getTokenDetails(address token) view returns (string, string, uint256, address, bool, bool, uint256, uint256, uint256, bool)"
    ];
    
    // Initialize contract interface
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryAbi,
      provider
    );
    
    // Fetch token details from factory
    const tokenDetails = await factoryContract.getTokenDetails(address);
    
    // Extract creation timestamp from the return value (index 6 is creationTimestamp)
    let creationTimestamp = 0;
    if (tokenDetails[6] && typeof tokenDetails[6] === 'object' && tokenDetails[6]._isBigNumber) {
      creationTimestamp = tokenDetails[6].toNumber();
    } else if (tokenDetails[6]) {
      creationTimestamp = Number(tokenDetails[6]);
    }
    
    console.log("Blockchain creation timestamp:", creationTimestamp);
    return creationTimestamp;
  } catch (error) {
    console.error("Error fetching creation timestamp from blockchain:", error);
    return null;
  }
};

/**
 * Syncs creation timestamps for all ScienceGents from blockchain to Supabase
 * @returns Object with counts of synced and failed tokens
 */
export const syncAllCreationTimestampsFromBlockchain = async (): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    console.log("Starting sync of creation timestamps for all ScienceGents...");
    
    const provider = await getProvider();
    
    // ABI fragments for the specific functions we need
    const factoryAbi = [
      "function getTokenCount() view returns (uint256)",
      "function getTokensWithPagination(uint256 offset, uint256 limit) view returns (address[], uint256)"
    ];
    
    // Initialize contract interface
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryAbi,
      provider
    );
    
    // Get total token count
    const tokenCount = await factoryContract.getTokenCount();
    console.log(`Total ScienceGent tokens: ${tokenCount}`);
    
    // Fetch tokens in batches of 50
    const batchSize = 50;
    let syncCount = 0;
    let errorCount = 0;
    
    for (let offset = 0; offset < tokenCount.toNumber(); offset += batchSize) {
      console.log(`Fetching tokens ${offset} to ${offset + batchSize}...`);
      
      // Get batch of token addresses
      const [tokenAddresses] = await factoryContract.getTokensWithPagination(offset, batchSize);
      
      // Process each token
      for (const address of tokenAddresses) {
        try {
          const timestamp = await fetchCreationTimestampFromBlockchain(address);
          
          if (timestamp) {
            // Update the timestamp in Supabase
            const { error } = await supabase
              .from('sciencegents')
              .update({ 
                created_on_chain_at: new Date(timestamp * 1000).toISOString(),
                last_synced_at: new Date().toISOString()
              })
              .eq('address', address);
              
            if (error) {
              console.error(`Error updating timestamp for ${address}:`, error);
              errorCount++;
            } else {
              console.log(`Updated creation timestamp for ${address}: ${new Date(timestamp * 1000).toISOString()}`);
              syncCount++;
            }
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error(`Error syncing timestamp for ${address}:`, error);
          errorCount++;
        }
      }
    }
    
    console.log(`Timestamp sync completed: ${syncCount} synced, ${errorCount} errors`);
    return { syncCount, errorCount };
  } catch (error) {
    console.error("Error in syncAllCreationTimestampsFromBlockchain:", error);
    return { syncCount: 0, errorCount: 1 };
  }
};
