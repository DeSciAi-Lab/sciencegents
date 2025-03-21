
import { ethers } from "ethers";

/**
 * Extracts token address from transaction receipt
 * @param transactionHash The transaction hash
 * @returns The token address if found
 */
export const extractTokenAddressFromReceipt = async (transactionHash: string): Promise<string | null> => {
  try {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const receipt = await provider.getTransactionReceipt(transactionHash);
    
    if (!receipt || !receipt.logs) {
      return null;
    }
    
    // Look for TokenCreated event
    // The event signature is TokenCreated(address indexed token, string name, string symbol, uint256 totalSupply)
    // The token address is the first indexed parameter (topics[1])
    
    // Get the TokenCreated event signature
    const eventSignatureHash = ethers.utils.id("TokenCreated(address,string,string,uint256)");
    
    for (const log of receipt.logs) {
      if (log.topics[0] === eventSignatureHash) {
        // The token address is the first indexed parameter
        const tokenAddress = ethers.utils.defaultAbiCoder.decode(['address'], log.topics[1])[0];
        console.log("Extracted token address:", tokenAddress);
        return tokenAddress;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting token address:", error);
    return null;
  }
};
