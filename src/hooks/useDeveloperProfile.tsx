
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { fetchDeveloperProfile, upsertDeveloperProfile } from '@/services/developerProfileService';
import { DeveloperProfile } from '@/types/profile';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook to fetch and manage developer profile
 * @returns Developer profile data, loading state, and update function
 */
export function useDeveloperProfile() {
  // Try to get account information, handling potential errors
  let address: string | undefined;
  try {
    const accountResult = useAccount();
    address = accountResult.address;
  } catch (error) {
    console.error("Wagmi provider error:", error);
    // Re-throw the error to be caught by the component
    throw new Error("Wallet connection required");
  }

  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch the profile
  const loadProfile = useCallback(async () => {
    if (!address) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching developer profile for address:", address);
      const data = await fetchDeveloperProfile(address);
      console.log("Fetched profile data:", data);
      setProfile(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load profile');
      setError(error);
      console.error('Error loading developer profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Load profile on mount and when address changes
  useEffect(() => {
    loadProfile();
  }, [address, loadProfile]);

  // Function to update the profile
  const updateProfile = useCallback(async (updatedProfile: Partial<DeveloperProfile>) => {
    if (!address) {
      toast({
        title: "Error",
        description: "Wallet not connected. Please connect your wallet first.",
        variant: "destructive"
      });
      return null;
    }

    setIsSaving(true);
    try {
      console.log("Starting profile update with data:", updatedProfile);
      
      // Create a new object with defaults to avoid undefined values
      const defaultProfile: DeveloperProfile = {
        wallet_address: address,
        additional_social_links: []
      };
      
      // Merge the existing profile (if any) with the defaults and the updates
      const profileToUpdate: DeveloperProfile = {
        ...defaultProfile,
        ...(profile || {}),
        ...updatedProfile,
        wallet_address: address
      };

      console.log("Sending final profile data to service:", profileToUpdate);
      
      const updated = await upsertDeveloperProfile(profileToUpdate);
      
      if (updated) {
        console.log("Profile updated successfully:", updated);
        setProfile(updated);
        return updated;
      }
      
      console.error("No data returned from upsertDeveloperProfile");
      return null;
    } catch (err) {
      console.error('Error updating developer profile:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [address, profile]);

  // Force refresh the profile
  const refreshProfile = useCallback(() => {
    return loadProfile();
  }, [loadProfile]);

  return { profile, isLoading, isSaving, error, updateProfile, refreshProfile };
}
