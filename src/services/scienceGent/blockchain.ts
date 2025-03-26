
import { ethers } from "ethers";
import { getProvider } from "@/services/walletService";
import { contractConfig } from "@/utils/contractConfig";
import { ScienceGentData, TokenStats } from "./types";

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
    
    // Fetch token capabilities
    const capabilities = await factoryContract.getTokenCapabilitiesPage(address, 0, 100);
    
    // Process timestamp
    let creationTimestamp = 0;
    if (tokenDetails[6] && typeof tokenDetails[6] === 'object' && tokenDetails[6]._isBigNumber) {
      creationTimestamp = tokenDetails[6].toNumber();
    } else if (tokenDetails[6]) {
      creationTimestamp = Number(tokenDetails[6]);
    }
    
    // Create ScienceGent data object
    const scienceGentData: ScienceGentData = {
      address: address,
      name: tokenDetails[0],
      symbol: tokenDetails[1],
      totalSupply: tokenDetails[2].toString(),
      creator: tokenDetails[3],
      isMigrated: tokenDetails[5],
      creationTimestamp: creationTimestamp,
      maturityDeadline: tokenDetails[7]?.toNumber() || 0,
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
    
    // Create TokenStats object
    const stats: TokenStats = {
      tokenReserve: tokenStats[0].toString(),
      ethReserve: tokenStats[1].toString(),
      virtualETH: tokenStats[2].toString(),
      collectedFees: tokenStats[3].toString(),
      tradingEnabled: tokenStats[4],
      creator: tokenStats[5],
      creationTimestamp: tokenStats[6].toNumber(),
      maturityDeadline: tokenStats[7].toNumber(),
      isMigrated: tokenStats[8],
      lpUnlockTime: tokenStats[9].toNumber(),
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
