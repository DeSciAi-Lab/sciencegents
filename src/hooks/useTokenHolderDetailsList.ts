import { useState, useEffect } from 'react';

interface TokenHolderInfo {
  rank: number;
  address: string;
  tag?: string;
  formattedQuantity: string;
  percentage: number;
}

/**
 * Hook to fetch the detailed list of token holders from Moralis
 * @param tokenAddress The address of the token
 * @param decimals Token decimals (default 18)
 * @param totalSupply Total supply of the token (as a string in base units)
 * @returns An object containing the holders list, loading state, error, and refetch function
 */
export const useTokenHolderDetailsList = (tokenAddress: string, decimals: number = 18, totalSupply: string | null) => {
  const [holders, setHolders] = useState<TokenHolderInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const CACHE_KEY = `holder_details_${tokenAddress}`;

  const fetchHolders = async () => {
    if (!tokenAddress) {
      setHolders([]);
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
          setHolders(data);
          setIsLoading(false);
          return;
        }
      }
      
      // Use Moralis API instead of Etherscan API
      const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
      
      if (!moralisApiKey) {
        console.warn('Moralis API key not found in environment variables.');
        setError('API key not configured.');
        setIsLoading(false);
        return;
      }
      
      // Call Moralis token owners endpoint
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?chain=sepolia&limit=100`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      const data = await response.json();
      console.log('Moralis holder list:', data);
      
      if (response.ok && data.result && Array.isArray(data.result)) {
        // Format the data
        const holdersData = data.result.map((holder: any, index: number) => {
          return {
            rank: index + 1,
            address: holder.owner_address,
            formattedQuantity: holder.balance_formatted,
            percentage: holder.percentage_relative_to_total_supply,
            tag: holder.owner_address_label
          };
        });
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: holdersData,
          timestamp: Date.now()
        }));
        
        setHolders(holdersData);
        setIsLoading(false);
      } else {
        throw new Error(data.message || 'Failed to fetch holders data');
      }
    } catch (error) {
      console.error('Error fetching token holders:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch holders data');
      setHolders([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHolders();
  }, [tokenAddress, decimals, totalSupply]);
  
  return { holders, isLoading, error, refetch: fetchHolders };
}; 