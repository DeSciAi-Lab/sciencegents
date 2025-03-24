
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
    loadProfile();
  }, [loadProfile]);

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

    try {
      // Merge current profile with updates
      const profileToUpdate: DeveloperProfile = {
        ...(profile || { additional_social_links: [] }),
        ...updatedProfile,
        wallet_address: address
      };

      const updated = await upsertDeveloperProfile(profileToUpdate);
      if (updated) {
        setProfile(updated);
        toast({
          title: "Success",
          description: "Developer profile updated successfully."
        });
        return updated;
      }
      return null;
    } catch (err) {
      console.error('Error updating developer profile:', err);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }, [address, profile, toast]);

  // Force refresh the profile
  const refreshProfile = useCallback(() => {
    return loadProfile();
  }, [loadProfile]);

  return { profile, isLoading, error, updateProfile, refreshProfile };
}
