
import { useState, useEffect } from 'react';
import { 
  fetchScienceGentFromSupabase, 
  fetchScienceGentFromBlockchain, 
  fetchTokenStatsFromBlockchain,
  saveScienceGentToSupabase,
  formatAge
} from '@/services/scienceGent';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

export enum LoadingStatus {
  Idle = 'idle',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
  NotFound = 'not_found'
}

export const useScienceGentDetails = (address: string | undefined) => {
  const [scienceGent, setScienceGent] = useState<any>(null);
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Idle);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    if (!address) {
      setStatus(LoadingStatus.Error);
      return;
    }

    try {
      setStatus(LoadingStatus.Loading);
      console.log(`Fetching data for ScienceGent address: ${address}`);
      
      // First try to fetch from Supabase
      const dbData = await fetchScienceGentFromSupabase(address);
      console.log("Data from Supabase:", dbData ? "Found" : "Not found");
      
      if (dbData) {
        // Calculate additional properties if needed
        const enrichedData = {
          ...dbData,
          // Format token age using date-fns
          formattedAge: dbData.created_at 
            ? formatDistanceToNow(new Date(dbData.created_at), { addSuffix: false })
            : 'Unknown',
          // Format maturity status
          maturityStatus: getMaturityStatus(dbData)
        };
        
        setScienceGent(enrichedData);
        setStatus(LoadingStatus.Loaded);
      } else {
        // If not found in Supabase, fetch from blockchain and save
        console.log("Fetching from blockchain instead");
        try {
          const blockchainData = await fetchScienceGentFromBlockchain(address);
          console.log("Blockchain data fetched:", blockchainData ? "Success" : "Failed");
          
          const tokenStats = await fetchTokenStatsFromBlockchain(address);
          console.log("Token stats fetched:", tokenStats ? "Success" : "Failed");
          
          if (blockchainData && tokenStats) {
            console.log("Saving to Supabase");
            await saveScienceGentToSupabase(blockchainData, tokenStats);
            
            // Fetch the saved data from Supabase
            const savedData = await fetchScienceGentFromSupabase(address);
            if (savedData) {
              const enrichedData = {
                ...savedData,
                formattedAge: savedData.created_at 
                  ? formatDistanceToNow(new Date(savedData.created_at), { addSuffix: false })
                  : 'Unknown',
                maturityStatus: getMaturityStatus(savedData)
              };
              
              setScienceGent(enrichedData);
              setStatus(LoadingStatus.Loaded);
            } else {
              console.error("Failed to retrieve saved data from Supabase");
              setStatus(LoadingStatus.Error);
            }
          } else {
            console.error("Blockchain data or token stats not available");
            setStatus(LoadingStatus.NotFound);
          }
        } catch (blockchainError) {
          console.error("Error fetching from blockchain:", blockchainError);
          setStatus(LoadingStatus.Error);
          toast({
            title: "Blockchain Error",
            description: "Could not fetch data from the blockchain",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching ScienceGent details:", error);
      setStatus(LoadingStatus.Error);
      toast({
        title: "Error",
        description: "Failed to load ScienceGent details",
        variant: "destructive",
      });
    }
  };

  // Helper function to determine maturity status
  const getMaturityStatus = (data: any): string => {
    if (!data) return 'Unknown';
    
    if (data.is_migrated) {
      return 'Migrated';
    } else if (data.migration_eligible) {
      return 'Ready for Migration';
    } else if (data.maturity_progress >= 50) {
      return 'Near Maturity';
    } else {
      return 'Immature';
    }
  };

  // Refresh data from blockchain
  const refreshData = async () => {
    if (!address) return;
    
    try {
      setIsRefreshing(true);
      console.log(`Refreshing data for ScienceGent address: ${address}`);
      
      // Fetch from blockchain and save to Supabase
      const blockchainData = await fetchScienceGentFromBlockchain(address);
      const tokenStats = await fetchTokenStatsFromBlockchain(address);
      
      if (blockchainData && tokenStats) {
        console.log("Saving refreshed data to Supabase");
        await saveScienceGentToSupabase(blockchainData, tokenStats);
        
        // Fetch the updated data from Supabase
        const updatedData = await fetchScienceGentFromSupabase(address);
        if (updatedData) {
          const enrichedData = {
            ...updatedData,
            // Make sure we're passing a number or properly formatted timestamp to formatAge
            formattedAge: typeof updatedData.created_at === 'string' 
              ? formatDistanceToNow(new Date(updatedData.created_at), { addSuffix: false })
              : (updatedData.created_at 
                ? formatDistanceToNow(new Date(updatedData.created_at), { addSuffix: false })
                : 'Unknown'),
            maturityStatus: getMaturityStatus(updatedData)
          };
          
          setScienceGent(enrichedData);
          toast({
            title: "Refresh Successful",
            description: "ScienceGent data has been updated",
          });
        } else {
          throw new Error("Failed to fetch updated data after refresh");
        }
      } else {
        throw new Error("Failed to fetch blockchain data during refresh");
      }
    } catch (error) {
      console.error("Error refreshing ScienceGent details:", error);
      toast({
        title: "Refresh Failed",
        description: "Failed to update ScienceGent data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Setup real-time subscription for updates
  useEffect(() => {
    if (!address) return;

    const subscription = supabase
      .channel('sciencegent-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sciencegents',
          filter: `address=eq.${address}`
        },
        (payload) => {
          console.log("Received real-time update from Supabase:", payload);
          // Refresh data when updates occur
          fetchData();
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up Supabase subscription");
      supabase.removeChannel(subscription);
    };
  }, [address]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [address]);

  return {
    scienceGent,
    status,
    isRefreshing,
    refreshData
  };
};

export default useScienceGentDetails;
