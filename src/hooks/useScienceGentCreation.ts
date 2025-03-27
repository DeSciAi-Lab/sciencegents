import { useState, useEffect, useRef } from "react";
import { ScienceGentFormData } from "@/types/sciencegent";
import { 
  getLaunchFee, 
  checkDSIAllowance, 
  approveDSIForFactory, 
  createScienceGent,
  extractTokenAddressFromReceipt
} from "@/services/scienceGentService";
import { syncSingleScienceGent } from "@/services/scienceGentDataService";
import { checkIfWalletIsConnected, connectWallet } from "@/utils/walletUtils";
import { toast } from "@/components/ui/use-toast";
import { useWallet } from "@/hooks/useWallet";

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
  const { connect, isConnected } = useWallet();
  const [status, setStatus] = useState<CreationStatus>(CreationStatus.Idle);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [launchFee, setLaunchFee] = useState<string>("1000"); // Default to 1000 DSI
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isDSIApproved, setIsDSIApproved] = useState<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);

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

  useEffect(() => {
    const checkAllowance = async () => {
      if (isConnected) {
        try {
          const hasAllowance = await checkDSIAllowance(launchFee);
          setIsDSIApproved(hasAllowance);
        } catch (error) {
          console.error("Error checking DSI allowance:", error);
          setIsDSIApproved(false);
        }
      }
    };
    
    checkAllowance();
  }, [isConnected, launchFee]);

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
            
            syncNewScienceGent(extractedAddress);
          }
        } catch (err) {
          console.error("Error polling for token address:", err);
        }
      } else if (tokenAddress || status !== CreationStatus.WaitingConfirmation) {
        if (pollingInterval) clearInterval(pollingInterval);
      }
    };
    
    if (transactionHash && !tokenAddress && status === CreationStatus.WaitingConfirmation) {
      pollForTokenAddress();
      pollingInterval = setInterval(pollForTokenAddress, 3000);
    }
    
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [transactionHash, tokenAddress, status]);

  const syncNewScienceGent = async (address: string) => {
    setIsSyncing(true);
    
    try {
      console.log("Syncing new ScienceGent data for address:", address);
      const success = await syncSingleScienceGent(address);
      
      if (success) {
        toast({
          title: "ScienceGent Ready",
          description: "Your ScienceGent data has been loaded and is ready to view",
        });
      } else {
        throw new Error("Sync operation did not complete successfully");
      }
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

  const approveDSI = async (): Promise<boolean> => {
    if (isProcessingRef.current || status !== CreationStatus.Idle) {
      console.log("Already processing a transaction, skipping duplicate call");
      return false;
    }
    
    isProcessingRef.current = true;
    setStatus(CreationStatus.CheckingWallet);
    setError(null);
    
    try {
      const isWalletConnected = await checkIfWalletIsConnected();
      if (!isWalletConnected) {
        await connect();
        if (!isConnected) {
          throw new Error("Failed to connect wallet");
        }
      }
      
      setStatus(CreationStatus.ApprovingDSI);
      await approveDSIForFactory(launchFee);
      
      setIsDSIApproved(true);
      
      setStatus(CreationStatus.Idle);
      isProcessingRef.current = false;
      
      toast({
        title: "DSI Approval Successful",
        description: "You can now launch your ScienceGent",
      });
      
      return true;
    } catch (err: any) {
      const errorMessage = err.message || "An unknown error occurred";
      setError(errorMessage);
      setStatus(CreationStatus.Error);
      
      toast({
        title: "Error Approving DSI",
        description: errorMessage,
        variant: "destructive",
      });
      
      isProcessingRef.current = false;
      return false;
    }
  };

  const createToken = async (formData: ScienceGentFormData) => {
    if (isProcessingRef.current || status !== CreationStatus.Idle) {
      console.log("Already processing a transaction, skipping duplicate call");
      return null;
    }
    
    isProcessingRef.current = true;
    
    setStatus(CreationStatus.CheckingWallet);
    setError(null);
    
    try {
      const isWalletConnected = await checkIfWalletIsConnected();
      if (!isWalletConnected) {
        await connect();
        if (!isConnected) {
          throw new Error("Failed to connect wallet");
        }
      }
      
      if (!isDSIApproved) {
        const hasAllowance = await checkDSIAllowance(launchFee);
        if (!hasAllowance) {
          throw new Error("DSI token approval required before launching");
        }
        setIsDSIApproved(true);
      }
      
      setStatus(CreationStatus.Creating);
      const result = await createScienceGent(formData);
      
      setTransactionHash(result.transactionHash);
      
      if (result.transactionHash) {
        setStatus(CreationStatus.WaitingConfirmation);
        
        if (result.tokenAddress) {
          setTokenAddress(result.tokenAddress);
          setStatus(CreationStatus.Success);
          
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
    } finally {
      isProcessingRef.current = false;
    }
  };

  const resetCreation = () => {
    setStatus(CreationStatus.Idle);
    setTransactionHash(null);
    setTokenAddress(null);
    setError(null);
    isProcessingRef.current = false;
  };

  return {
    status,
    error,
    transactionHash,
    tokenAddress,
    launchFee,
    isSyncing,
    isDSIApproved,
    createToken,
    resetCreation,
    approveDSI
  };
};

export default useScienceGentCreation;
