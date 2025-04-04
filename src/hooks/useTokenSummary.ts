import { useState, useEffect } from 'react';

interface TokenSummary {
  holdersCount: number;
  transactionsCount: number;
}

/**
 * Hook to fetch token summary data from Moralis
 * @param tokenAddress The address of the token
 * @returns An object containing the summary data, loading state, error, and refetch function
 */
export const useTokenSummary = (tokenAddress: string) => {
  const [summary, setSummary] = useState<TokenSummary>({
    holdersCount: 0,
    transactionsCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const CACHE_KEY = `token_summary_${tokenAddress}`;

  const fetchSummary = async () => {
    if (!tokenAddress) {
      setIsLoading(false);
      setError('Token address is required.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Check cache
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < 15 * 60 * 1000) { // 15 min cache
          setSummary(data);
          setIsLoading(false);
          return;
        }
      }
      
      // Use Moralis API
      const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
      
      if (!moralisApiKey) {
        console.warn('Moralis API key not found in environment variables.');
        setError('API key not configured.');
        setIsLoading(false);
        return;
      }
      
      // Fetch holders count
      const holdersResponse = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?chain=sepolia`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      // Fetch token transfers (for transaction count)
      const transfersResponse = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/transfers?chain=sepolia`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      if (holdersResponse.ok && transfersResponse.ok) {
        const holdersData = await holdersResponse.json();
        const transfersData = await transfersResponse.json();
        
        console.log('Moralis holders summary:', holdersData);
        console.log('Moralis transfers summary:', transfersData);
        
        // Get exact counts from the result arrays
        const holdersCount = holdersData.result?.length || 0;
        const transactionsCount = transfersData.result?.length || 0;
        
        const summaryData = {
          holdersCount,
          transactionsCount
        };
        
        console.log('Parsed summary data:', summaryData);
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: summaryData,
          timestamp: Date.now()
        }));
        
        setSummary(summaryData);
      } else {
        throw new Error('Failed to fetch token summary data');
      }
    } catch (error) {
      console.error('Error fetching token summary:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch token summary data');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSummary();
  }, [tokenAddress]);
  
  return { summary, isLoading, error, refetch: fetchSummary };
}; 