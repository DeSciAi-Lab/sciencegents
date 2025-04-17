import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { toast } from '@/components/ui/use-toast';

// ABI fragments needed for the faucet
const faucetAbi = [
  "function requestTokens() external nonReentrant",
  "function getRemainingCooldown(address _user) external view returns (uint256)",
  // Include events for better feedback if needed later
  "event TokensRequested(address indexed recipient, uint256 amount)",
  "event CooldownActive()" // Assuming this is an error event or use require message
];

// Get the faucet contract address from environment variables
const faucetAddress = import.meta.env.VITE_SEPOLIA_DSI_FAUCET;

/**
 * Helper to get the faucet contract instance
 */
const getFaucetContract = async (signerOrProvider: ethers.Signer | ethers.providers.Provider) => {
  if (!faucetAddress) {
    throw new Error("Faucet contract address not found in environment variables (VITE_SEPOLIA_DSI_FAUCET).");
  }
  return new ethers.Contract(faucetAddress, faucetAbi, signerOrProvider);
};

/**
 * Requests tokens from the faucet.
 * Requires a signer to send the transaction.
 * @returns {Promise<boolean>} True if the transaction was sent successfully, false otherwise.
 */
export const requestDsiTokens = async (): Promise<boolean> => {
  if (!window.ethereum) {
    toast({ title: "Wallet not connected", description: "Please connect your wallet.", variant: "destructive" });
    return false;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = await getFaucetContract(signer);

    console.log("Requesting DSI tokens...");
    const tx = await contract.requestTokens();
    
    toast({ title: "Transaction Sent", description: "Requesting DSI tokens... Please wait for confirmation." });

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    
    if (receipt.status === 1) {
        toast({ title: "Success", description: "Successfully claimed DSI tokens!" });
        return true;
    } else {
        toast({ title: "Transaction Failed", description: "The transaction reverted.", variant: "destructive" });
        return false;
    }
  } catch (error: any) {
    console.error("Error requesting tokens:", error);
    let description = "An unexpected error occurred.";
    if (error.code === 'ACTION_REJECTED') {
        description = "Transaction rejected by user.";
    } else if (error.reason) {
        // Try to parse common contract errors
        if (error.reason.includes("CooldownActive")) {
            description = "Cooldown period active. Please wait before requesting again.";
        } else if (error.reason.includes("FaucetInsufficientBalance")) {
            description = "Faucet has insufficient balance. Please try again later.";
        } else {
            description = error.reason;
        }
    } else if (error.message) {
        description = error.message;
    }
    
    toast({ title: "Error Requesting Tokens", description, variant: "destructive" });
    return false;
  }
};

/**
 * Gets the remaining cooldown time for a user.
 * @param userAddress The address of the user to check.
 * @returns {Promise<number>} Remaining cooldown in seconds, or 0 if eligible.
 */
export const getFaucetCooldown = async (userAddress: string): Promise<number> => {
  if (!window.ethereum) {
    console.warn("Wallet not connected, cannot check cooldown.");
    return 0; // Assume eligible if wallet not connected
  }
  if (!userAddress) return 0;

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = await getFaucetContract(provider); // Use provider for read-only call
    
    const remainingSecondsBN = await contract.getRemainingCooldown(userAddress);
    return remainingSecondsBN.toNumber();
  } catch (error) {
    console.error("Error fetching cooldown:", error);
    // Don't show error toast for read operation, just return 0
    return 0; 
  }
}; 