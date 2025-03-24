
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
  const { address } = useAccount();
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
      const data = await fetchDeveloperProfile(address);
      console.log("Fetched profile data:", data);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load profile'));
      console.error('Error loading developer profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  // Load profile on mount and when address changes
  useEffect(() => {
    if (address) {
      loadProfile();
    } else {
      setProfile(null);
      setIsLoading(false);
    }
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

      console.log("Updating profile with:", profileToUpdate);
      
      const updated = await upsertDeveloperProfile(profileToUpdate);
      
      if (updated) {
        console.log("Profile updated successfully:", updated);
        setProfile(updated);
        toast({
          title: "Success",
          description: "Developer profile updated successfully."
        });
        return updated;
      }
      
      toast({
        title: "Error",
        description: "Failed to update profile. No data returned.",
        variant: "destructive"
      });
      return null;
    } catch (err) {
      console.error('Error updating developer profile:', err);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      return null;
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
