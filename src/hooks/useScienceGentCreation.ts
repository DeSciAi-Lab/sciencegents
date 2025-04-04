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
import { supabase } from '@/integrations/supabase/client';

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

// Maximum time to wait for blockchain confirmation (3 minutes)
const MAX_CONFIRMATION_WAIT_TIME = 3 * 60 * 1000;

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
  const confirmationStartTimeRef = useRef<number | null>(null);

  // Add a timeout for waiting confirmation
  useEffect(() => {
    if (status === CreationStatus.WaitingConfirmation) {
      if (confirmationStartTimeRef.current === null) {
        confirmationStartTimeRef.current = Date.now();
      }
      
      const checkTimeout = () => {
        if (
          confirmationStartTimeRef.current && 
          Date.now() - confirmationStartTimeRef.current > MAX_CONFIRMATION_WAIT_TIME
        ) {
          // Reset the state if confirmation is taking too long
          console.log("Transaction confirmation timed out after waiting too long");
          resetCreation();
          
          toast({
            title: "Transaction Timeout",
            description: "Your transaction is taking longer than expected. Please check your wallet for transaction status and try again if needed.",
            variant: "destructive"
          });
        }
      };
      
      const timeoutId = setTimeout(checkTimeout, 10000); // Check every 10 seconds
      return () => clearTimeout(timeoutId);
    } else {
      // Reset the confirmation start time when status changes
      confirmationStartTimeRef.current = null;
    }
  }, [status]);

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
            
            // Removing blockchain sync process
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

  useEffect(() => {
    if (status === CreationStatus.Success && tokenAddress) {
      // Update developer's created_sciencegents array
      const updateDeveloperProfile = async () => {
        try {
          // Get the current wallet address
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const currentAddress = accounts[0].toLowerCase();

          const { data: existingProfile } = await supabase
            .from('developer_profiles')
            .select('created_sciencegents, wallet_address')
            .eq('wallet_address', currentAddress)
            .single();

          if (existingProfile) {
            // Cast the response type to include our new columns
            const profile = existingProfile as any;
            const updatedSciencegents = [...(profile.created_sciencegents || []), tokenAddress];
            
            await supabase
              .from('developer_profiles')
              .update({
                created_sciencegents: updatedSciencegents
              } as any) // Cast the update data to any to bypass type checking
              .eq('wallet_address', currentAddress);
          }
        } catch (error) {
          console.error('Error updating developer profile:', error);
        }
      };

      updateDeveloperProfile();
    }
  }, [status, tokenAddress]);

  const syncNewScienceGent = async (address: string) => {
    setIsSyncing(true);
    
    try {
      console.log("Manually syncing ScienceGent data for address:", address);
      const success = await syncSingleScienceGent(address);
      
      if (success) {
        toast({
          title: "Manual Sync Successful",
          description: "ScienceGent data has been manually synced from the blockchain",
        });
      } else {
        throw new Error("Manual sync operation did not complete successfully");
      }
    } catch (error) {
      console.error("Failed to manually sync ScienceGent:", error);
      toast({
        title: "Manual Sync Failed",
        description: "There was an issue manually syncing data from the blockchain.",
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
          
          // Removing blockchain sync process
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
    confirmationStartTimeRef.current = null;
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
