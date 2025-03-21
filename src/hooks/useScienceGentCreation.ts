
import { useState, useEffect } from "react";
import { ScienceGentFormData } from "@/types/sciencegent";
import { 
  getLaunchFee, 
  checkDSIAllowance, 
  approveDSIForFactory, 
  createScienceGent,
  extractTokenAddressFromReceipt
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
        try {
          console.log("Polling for token address from transaction:", transactionHash);
          const extractedAddress = await extractTokenAddressFromReceipt(transactionHash);
          
          if (extractedAddress) {
            console.log("Found token address:", extractedAddress);
            setTokenAddress(extractedAddress);
            setStatus(CreationStatus.Success);
            
            // Automatically sync the new ScienceGent data
            syncNewScienceGent(extractedAddress);
          }
        } catch (err) {
          console.error("Error polling for token address:", err);
        }
      } else if (tokenAddress || status !== CreationStatus.WaitingConfirmation) {
        // We have a token address or we're not waiting for confirmation, stop polling
        if (pollingInterval) clearInterval(pollingInterval);
      }
    };
    
    // Start polling if needed
    if (transactionHash && !tokenAddress && status === CreationStatus.WaitingConfirmation) {
      pollForTokenAddress(); // Initial check
      pollingInterval = setInterval(pollForTokenAddress, 3000); // Then every 3 seconds
    }
    
    // Clean up
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [transactionHash, tokenAddress, status]);

  const syncNewScienceGent = async (address: string) => {
    setIsSyncing(true);
    
    try {
      console.log("Syncing new ScienceGent data for address:", address);
      await syncSingleScienceGent(address);
      
      toast({
        title: "ScienceGent Ready",
        description: "Your ScienceGent data has been loaded and is ready to view",
      });
    } catch (error) {
      console.error("Failed to sync new ScienceGent:", error);
      toast({
        title: "Sync Warning",
        description: "Created successfully, but there was an issue syncing data.",
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
      
      // If we have a transaction hash, we're waiting for confirmation
      if (result.transactionHash) {
        setStatus(CreationStatus.WaitingConfirmation);
        
        // If we also have a token address, we can move to success
        if (result.tokenAddress) {
          setTokenAddress(result.tokenAddress);
          setStatus(CreationStatus.Success);
          
          // Sync the newly created ScienceGent
          await syncNewScienceGent(result.tokenAddress);
        }
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

  return {
    status,
    error,
    transactionHash,
    tokenAddress,
    launchFee,
    isSyncing,
    createToken
  };
};

export default useScienceGentCreation;
