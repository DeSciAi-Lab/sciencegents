
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
import { ethers } from 'ethers';
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';
import { contractConfig } from '@/utils/contractConfig';

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

  // Helper function to get current price from blockchain
  const getCurrentPriceFromBlockchain = async (tokenAddress: string) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(contractConfig.rpcUrl);
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        [
          'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
        ],
        provider
      );
      
      const stats = await swapContract.getTokenStats(tokenAddress);
      // currentPrice is at index 11
      return stats[11] ? parseFloat(ethers.utils.formatEther(stats[11])) : 0;
    } catch (error) {
      console.error("Error fetching current price from blockchain:", error);
      return 0;
    }
  };

  // Helper function to calculate market cap based on token price and total supply
  const calculateMarketCap = (price: number, totalSupply: string | number) => {
    if (!price || !totalSupply) return 0;
    
    try {
      // Convert supply to a number if it's a string
      const formattedSupply = typeof totalSupply === 'string' 
        ? parseFloat(ethers.utils.formatUnits(totalSupply, 18))
        : totalSupply;
        
      return formattedSupply * price;
    } catch (error) {
      console.error("Error calculating market cap:", error);
      return 0;
    }
  };

  const fetchData = async () => {
    if (!address) {
      setStatus(LoadingStatus.Error);
      return;
    }

    try {
      setStatus(LoadingStatus.Loading);
      
      // First try to fetch from Supabase
      const dbData = await fetchScienceGentFromSupabase(address);
      
      if (dbData) {
        // Get current price from blockchain for most up-to-date data
        const currentPrice = await getCurrentPriceFromBlockchain(address);
        
        // Calculate market cap using current price and total supply
        const marketCap = calculateMarketCap(currentPrice, dbData.total_supply);
        
        // Calculate maturity progress
        const maturityProgress = calculateMaturityProgress(
          dbData.virtual_eth || 0,
          dbData.collected_fees || 0,
          dbData.capability_fees || 0
        );
        
        // Calculate additional properties if needed
        const enrichedData = {
          ...dbData,
          // Format token age using date-fns
          formattedAge: dbData.created_at 
            ? formatDistanceToNow(new Date(dbData.created_at), { addSuffix: false })
            : 'Unknown',
          // Format maturity status
          maturityStatus: getMaturityStatus(dbData),
          // Add current price from blockchain
          token_price: currentPrice || dbData.token_price,
          // Add calculated market cap
          market_cap: marketCap || dbData.market_cap,
          // Add calculated maturity progress
          maturity_progress: maturityProgress || dbData.maturity_progress
        };
        
        setScienceGent(enrichedData);
        setStatus(LoadingStatus.Loaded);
      } else {
        // If not found in Supabase, fetch from blockchain and save
        const blockchainData = await fetchScienceGentFromBlockchain(address);
        const tokenStats = await fetchTokenStatsFromBlockchain(address);
        
        if (blockchainData && tokenStats) {
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
            setStatus(LoadingStatus.Error);
          }
        } else {
          setStatus(LoadingStatus.NotFound);
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
      
      // Fetch from blockchain and save to Supabase
      const blockchainData = await fetchScienceGentFromBlockchain(address);
      const tokenStats = await fetchTokenStatsFromBlockchain(address);
      
      if (blockchainData && tokenStats) {
        await saveScienceGentToSupabase(blockchainData, tokenStats);
        
        // Get current price from blockchain
        const currentPrice = await getCurrentPriceFromBlockchain(address);
        
        // Fetch the updated data from Supabase
        const updatedData = await fetchScienceGentFromSupabase(address);
        if (updatedData) {
          // Calculate market cap using current price and total supply
          const marketCap = calculateMarketCap(currentPrice, updatedData.total_supply);
          
          // Calculate maturity progress
          const maturityProgress = calculateMaturityProgress(
            updatedData.virtual_eth || 0,
            updatedData.collected_fees || 0,
            updatedData.capability_fees || 0
          );
          
          const enrichedData = {
            ...updatedData,
            formattedAge: formatAge(updatedData.created_on_chain_at),
            maturityStatus: getMaturityStatus(updatedData),
            // Add current price from blockchain
            token_price: currentPrice || updatedData.token_price,
            // Add calculated market cap
            market_cap: marketCap || updatedData.market_cap,
            // Add calculated maturity progress
            maturity_progress: maturityProgress || updatedData.maturity_progress
          };
          
          setScienceGent(enrichedData);
          toast({
            title: "Refresh Successful",
            description: "ScienceGent data has been updated",
          });
        }
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
          // Refresh data when updates occur
          fetchData();
        }
      )
      .subscribe();

    return () => {
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
