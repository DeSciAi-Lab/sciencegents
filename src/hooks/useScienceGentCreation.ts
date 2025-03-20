
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

export enum CreationStatus {
  Idle = "idle",
  CheckingWallet = "checking_wallet",
  CheckingAllowance = "checking_allowance",
  ApprovingDSI = "approving_dsi",
  Creating = "creating",
  Success = "success",
  Error = "error"
}

export const useScienceGentCreation = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);
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
      const address = await createScienceGent(formData);
      
      // Handle success
      setTokenAddress(address);
      setStatus(CreationStatus.Success);
      
      // Navigate to ScienceGent details page after 3 seconds
      setTimeout(() => {
        navigate(`/sciencegent/${address}`);
      }, 3000);
      
      return address;
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

  const resetState = () => {
    setStatus(CreationStatus.Idle);
    setError(null);
    setTokenAddress(null);
  };

  return {
    status,
    error,
    tokenAddress,
    launchFee,
    createToken,
    resetState
  };
};

export default useScienceGentCreation;
