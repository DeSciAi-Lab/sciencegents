
import { ethers } from "ethers";
import { contractConfig, dsiTokenABI } from "@/utils/contractConfig";
import { toast } from "@/components/ui/use-toast";
import { 
  pendingTransactions, 
  addPendingTransaction, 
  removePendingTransaction, 
  clearPendingTransactions 
} from './transaction';

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
    
    // Generate a unique key for this approval request
    const approvalKey = `approve-${Date.now()}`;
    
    // Check if we already have a pending approval
    if (pendingTransactions.has(approvalKey)) {
      console.log("Approval already in progress, skipping duplicate call");
      return "pending_approval";
    }
    
    // Add to pending transactions
    addPendingTransaction(approvalKey);
    
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
    
    // Remove from pending transactions
    removePendingTransaction(approvalKey);
    
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error approving DSI tokens:", error);
    
    // Clear pending transactions on error
    clearPendingTransactions();
    
    toast({
      title: "Approval Failed",
      description: error.message || "Failed to approve DSI tokens",
      variant: "destructive",
    });
    
    throw error;
  }
};
