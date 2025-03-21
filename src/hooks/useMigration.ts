
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { toast } from '@/components/ui/use-toast';

const SWAP_ABI = [
  "function isMigrationEligible(address token) external view returns (bool)",
  "function migrateToUniswap(address token) external",
  "function isMigrated(address token) external view returns (bool)",
  "function getLPLockTimeRemaining(address token) external view returns (uint256)"
];

export interface MigrationState {
  isEligible: boolean;
  isMigrated: boolean;
  isCheckingEligibility: boolean;
  isMigrating: boolean;
  error: string | null;
  lpUnlockTimeRemaining: number | null;
}

export const useMigration = (tokenAddress: string, onSuccess: () => Promise<void>) => {
  const [state, setState] = useState<MigrationState>({
    isEligible: false,
    isMigrated: false,
    isCheckingEligibility: false,
    isMigrating: false,
    error: null,
    lpUnlockTimeRemaining: null
  });

  // Check if token is eligible for migration
  const checkMigrationEligibility = useCallback(async () => {
    if (!window.ethereum || !tokenAddress) return;
    
    setState(prev => ({ ...prev, isCheckingEligibility: true, error: null }));
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        SWAP_ABI,
        provider
      );
      
      // Check if already migrated
      const migrated = await swapContract.isMigrated(tokenAddress);
      
      let eligible = false;
      let lpTimeRemaining = null;
      
      if (migrated) {
        // If migrated, check LP lock time
        const lockTimeRemaining = await swapContract.getLPLockTimeRemaining(tokenAddress);
        lpTimeRemaining = lockTimeRemaining.toNumber();
      } else {
        // If not migrated, check eligibility
        eligible = await swapContract.isMigrationEligible(tokenAddress);
      }
      
      setState(prev => ({
        ...prev,
        isEligible: eligible,
        isMigrated: migrated,
        lpUnlockTimeRemaining: lpTimeRemaining,
        isCheckingEligibility: false
      }));
      
      return { isEligible: eligible, isMigrated: migrated };
    } catch (e: any) {
      console.error('Error checking migration eligibility:', e);
      setState(prev => ({
        ...prev,
        isCheckingEligibility: false,
        error: e.message || 'Failed to check migration eligibility'
      }));
      return null;
    }
  }, [tokenAddress]);

  // Migrate token to Uniswap
  const migrateToUniswap = useCallback(async () => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setState(prev => ({ ...prev, isMigrating: true, error: null }));
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        SWAP_ABI,
        signer
      );
      
      // First check if eligible
      const eligibilityResult = await checkMigrationEligibility();
      if (!eligibilityResult?.isEligible) {
        throw new Error('Token is not eligible for migration');
      }
      
      toast({
        title: "Preparing Migration",
        description: "Confirm the transaction in your wallet...",
      });
      
      const tx = await swapContract.migrateToUniswap(tokenAddress);
      
      toast({
        title: "Migration Submitted",
        description: "Your migration transaction is being processed...",
      });
      
      await tx.wait();
      
      toast({
        title: "Migration Successful",
        description: "Your token has been successfully migrated to Uniswap!",
      });
      
      // Refresh data after migration
      await onSuccess();
      
      // Update state to reflect migration
      setState(prev => ({
        ...prev,
        isMigrated: true,
        isEligible: false,
        isMigrating: false
      }));
      
      return true;
    } catch (e: any) {
      console.error('Error migrating token:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to migrate token. Please try again.';
      
      // Check for common errors
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('not eligible')) {
        errorMsg = 'This token is not eligible for migration yet.';
      }
      
      setState(prev => ({
        ...prev,
        isMigrating: false,
        error: errorMsg
      }));
      
      toast({
        title: "Migration Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      return false;
    }
  }, [tokenAddress, checkMigrationEligibility, onSuccess]);

  return {
    ...state,
    checkMigrationEligibility,
    migrateToUniswap
  };
};

export default useMigration;
