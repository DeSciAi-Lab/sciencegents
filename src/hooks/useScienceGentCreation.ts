
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
        // We'll poll for token address in the component using this hook
      } else if (result.tokenAddress) {
        // We have the token address, we can proceed
        setTokenAddress(result.tokenAddress);
        setStatus(CreationStatus.Success);
        
        // Try to sync the newly created ScienceGent
        try {
          await syncSingleScienceGent(result.tokenAddress);
        } catch (syncError) {
          console.error("Failed to sync newly created ScienceGent:", syncError);
          // Don't block the flow if sync fails
        }
        
        // Navigate to ScienceGent details page after 3 seconds
        setTimeout(() => {
          navigate(`/sciencegent/${result.tokenAddress}`);
        }, 3000);
      }
      
      return result;
    } catch (err) {
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
    createToken,
    refreshScienceGent,
    resetState
  };
};

export default useScienceGentCreation;
