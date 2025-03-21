
import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";

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
