
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { fetchDeveloperProfile } from '@/services/developerProfileService';
import { DeveloperProfile } from '@/types/profile';

/**
 * Hook to fetch and manage developer profile
 * @returns Developer profile data and loading state
 */
export function useDeveloperProfile() {
  const { address } = useAccount();
  const [profile, setProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!address) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchDeveloperProfile(address);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
        console.error('Error loading developer profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [address]);

  return { profile, isLoading, error };
}
