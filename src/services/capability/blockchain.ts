import { ethers } from "ethers";
import { contractConfig, factoryABI } from "@/utils/contractConfig";
import { Capability } from "@/types/capability";
import { getProvider } from "@/services/walletService";
import { CapabilityDetail } from "@/services/scienceGent/types";

// Function to get all registered capability IDs from the blockchain
export const fetchCapabilityIdsFromBlockchain = async (): Promise<string[]> => {
  try {
    console.log("Fetching capability IDs from blockchain...");
    const provider = await getProvider();
    
    const factory = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );

    const capabilityIds = await factory.getAllRegisteredCapabilityIDs();
    console.log(`${capabilityIds.length} capability IDs fetched from blockchain`);
    return capabilityIds;
  } catch (error) {
    console.error('Error fetching capability IDs from blockchain:', error);
    throw error;
  }
};

// Function to get capability details from the blockchain
export const fetchCapabilityDetailsFromBlockchain = async (id: string): Promise<CapabilityDetail> => {
  try {
    console.log(`Fetching details for capability ${id} from blockchain...`);
    const provider = await getProvider();
    
    const factory = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      provider
    );

    const [description, feeInETH, creator] = await factory.getCapabilityDetails(id);
    console.log(`Capability ${id} details retrieved from blockchain`);
    
    // Return data in CapabilityDetail format
    return {
      id,
      name: id, // Using the ID as the name since blockchain doesn't store a separate name
      description,
      feeInETH: feeInETH.toString(), // Convert BigNumber to string
      creator,
      domain: "Unknown" // Default domain
    };
  } catch (error) {
    console.error(`Error fetching capability ${id} from blockchain:`, error);
    throw error;
  }
};

// Function to register a new capability on the blockchain
export const registerCapabilityOnBlockchain = async (
  id: string,
  description: string,
  feeInEth: string,
  creatorAddress: string
): Promise<string> => {
  try {
    console.log(`Registering capability ${id} on blockchain...`);
    if (!window.ethereum) {
      throw new Error("No wallet detected. Please install MetaMask or another Web3 provider.");
    }
    
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const factory = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryABI,
      signer
    );

    // Convert fee from ETH to Wei
    const feeInWei = ethers.utils.parseEther(feeInEth);
    
    // Register the capability
    const tx = await factory.registerGlobalCapability(
      id,
      description,
      feeInWei,
      creatorAddress
    );
    
    console.log(`Capability registration transaction sent: ${tx.hash}`);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log(`Capability ${id} registered successfully`, receipt);
    
    return tx.hash;
  } catch (error) {
    console.error(`Error registering capability ${id} on blockchain:`, error);
    throw error;
  }
};
