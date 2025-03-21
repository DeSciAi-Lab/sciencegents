
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScienceGentFormData } from "@/types/sciencegent";
import { 
  getLaunchFee, 
  checkDSIAllowance, 
  approveDSIForFactory, 
  createScienceGent 
} from "@/services/scienceGentService";
import { checkIfWalletIsConnected, connectWallet } from "@/utils/walletUtils";
import { toast } from "@/components/ui/use-toast";
import { syncSingleScienceGent } from "@/services/scienceGentDataService";

export enum CreationStatus {
  Idle = "idle",
  CheckingWallet = "checking_wallet",
  CheckingAllowance = "checking_allowance",
  ApprovingDSI = "approving_dsi",
  Creating = "creating",
  WaitingConfirmation = "waiting_confirmation",
  Success = "success",
  Error = "error"
}

export const useScienceGentCreation = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [launchFee, setLaunchFee] = useState<string>("1000"); // Default to 1000 DSI
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Fetch the launch fee on mount
  useEffect(() => {
    const fetchLaunchFee = async () => {
      try {
        const fee = await getLaunchFee();
        setLaunchFee(fee);
      } catch (error) {
        console.error("Failed to fetch launch fee:", error);
        // Using the default value of 1000 DSI if fetch fails
      }
    };
    
    fetchLaunchFee();
  }, []);

  // Poll for token address if we have transaction hash but no token address
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null;
    
    const pollForTokenAddress = async () => {
      if (transactionHash && !tokenAddress && status === CreationStatus.WaitingConfirmation) {
        // Check the receipt
        if (window.ethereum) {
          const provider = new (window as any).ethers.providers.Web3Provider(window.ethereum);
          try {
            const receipt = await provider.getTransactionReceipt(transactionHash);
            
            if (receipt && receipt.status === 1 && receipt.logs) {
              // Look for the TokenCreated event
              // We need to parse the logs to find our event
              // This is simplified - in a real app, you'd want to decode the logs using the ABI
              console.log("Transaction confirmed, logs:", receipt.logs);
              
              // For now, let's check if any events were emitted at all
              if (receipt.logs.length > 0) {
                // Try to extract token address from the transaction details via the service
                try {
                  const { data } = await (window as any).ethers.providers.getDefaultProvider().getTransaction(transactionHash);
                  console.log("Transaction data:", data);
                  // Here we would parse the data to extract the token address
                  // For now, just notify the user that the transaction was successful
                  
                  toast({
                    title: "Transaction Confirmed",
                    description: "Fetching token details...",
                  });
                  
                  // Call our service to get the new token address
                  const result = await createScienceGent({ 
                    transactionHash, 
                    checkOnly: true 
                  } as any);
                  
                  if (result.tokenAddress) {
                    setTokenAddress(result.tokenAddress);
                    setStatus(CreationStatus.Success);
                    
                    // Sync the newly created ScienceGent
                    syncNewScienceGent(result.tokenAddress);
                  }
                } catch (err) {
                  console.error("Error fetching token address:", err);
                }
              }
            } else if (receipt && receipt.status === 0) {
              // Transaction failed
              setStatus(CreationStatus.Error);
              setError("Transaction failed. Please check Etherscan for details.");
              if (pollingInterval) clearInterval(pollingInterval);
            }
          } catch (err) {
            console.log("Error checking receipt, still pending:", err);
          }
        }
      } else if (tokenAddress || status !== CreationStatus.WaitingConfirmation) {
        // We have a token address or we're not waiting for confirmation, stop polling
        if (pollingInterval) clearInterval(pollingInterval);
      }
    };
    
    // Start polling if needed
    if (transactionHash && !tokenAddress && status === CreationStatus.WaitingConfirmation) {
      pollForTokenAddress(); // Initial check
      pollingInterval = setInterval(pollForTokenAddress, 5000); // Then every 5 seconds
    }
    
    // Clean up
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [transactionHash, tokenAddress, status]);

  const syncNewScienceGent = async (address: string) => {
    setIsSyncing(true);
    
    try {
      await syncSingleScienceGent(address);
      
      toast({
        title: "ScienceGent Synced",
        description: "Your ScienceGent data has been loaded from the blockchain",
      });
    } catch (error) {
      console.error("Failed to sync new ScienceGent:", error);
      toast({
        title: "Sync Warning",
        description: "Created successfully, but there was an issue syncing data. You can try refreshing.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const createToken = async (formData: ScienceGentFormData) => {
    setStatus(CreationStatus.CheckingWallet);
    setError(null);
    
    try {
      // Check if wallet is connected
      const isWalletConnected = await checkIfWalletIsConnected();
      if (!isWalletConnected) {
        const account = await connectWallet();
        if (!account) {
          throw new Error("Failed to connect wallet");
        }
      }
      
      // Check if user has enough DSI and has approved the factory
      setStatus(CreationStatus.CheckingAllowance);
      const hasAllowance = await checkDSIAllowance(launchFee);
      
      // If user hasn't approved, request approval
      if (!hasAllowance) {
        setStatus(CreationStatus.ApprovingDSI);
        await approveDSIForFactory(launchFee);
      }
      
      // Create the token
      setStatus(CreationStatus.Creating);
      const result = await createScienceGent(formData);
      
      setTransactionHash(result.transactionHash);
      
      // If we have transaction hash but not token address, we're waiting for confirmation
      if (result.transactionHash && !result.tokenAddress) {
        setStatus(CreationStatus.WaitingConfirmation);
        // We'll poll for token address in the effect
      } else if (result.tokenAddress) {
        // We have the token address, we can proceed
        setTokenAddress(result.tokenAddress);
        setStatus(CreationStatus.Success);
        
        // Sync the newly created ScienceGent
        await syncNewScienceGent(result.tokenAddress);
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred";
      setError(errorMessage);
      setStatus(CreationStatus.Error);
      
      toast({
        title: "Error Creating ScienceGent",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    }
  };

  const refreshScienceGent = async () => {
    if (!tokenAddress) {
      toast({
        title: "Cannot Refresh",
        description: "Token address not available yet",
        variant: "destructive",
      });
      return;
    }
    
    setIsSyncing(true);
    
    try {
      toast({
        title: "Refreshing",
        description: "Syncing your ScienceGent data from blockchain...",
      });
      
      await syncSingleScienceGent(tokenAddress);
      
      toast({
        title: "Refresh Complete",
        description: "Your ScienceGent data has been updated",
      });
    } catch (error) {
      console.error("Failed to refresh ScienceGent:", error);
      toast({
        title: "Refresh Failed",
        description: error.message || "Failed to sync ScienceGent data",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const resetState = () => {
    setStatus(CreationStatus.Idle);
    setError(null);
    setTransactionHash(null);
    setTokenAddress(null);
  };

  return {
    status,
    error,
    transactionHash,
    tokenAddress,
    launchFee,
    isSyncing,
    createToken,
    refreshScienceGent,
    resetState
  };
};

export default useScienceGentCreation;
