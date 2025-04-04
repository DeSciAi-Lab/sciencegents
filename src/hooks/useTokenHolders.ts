import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch the number of token holders for a token from Etherscan
 * @param tokenAddress The address of the token
 * @returns An object containing the token holders count, loading state, and refetch function
 */
export const useTokenHolders = (tokenAddress: string) => {
  const [holdersCount, setHoldersCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Store a cache of addresses to holders count to prevent fluctuations
  const CACHE_KEY = `holders_${tokenAddress}`;

  const fetchHoldersCount = async () => {
    if (!tokenAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Check localStorage cache first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { count, timestamp } = JSON.parse(cachedData);
        // Use cached data if it's less than 1 hour old
        if (Date.now() - timestamp < 60 * 60 * 1000) {
          setHoldersCount(count);
          setIsLoading(false);
          return;
        }
      }
      
      // Use Etherscan API to get holders count directly
      // For Ethereum mainnet: https://api.etherscan.io/api
      // For Sepolia testnet: https://api-sepolia.etherscan.io/api
      
      // Change this based on the network you're using
      const baseUrl = 'https://api-sepolia.etherscan.io/api';
      const apiKey = '9QHPYVQFNY5PEP1EY8SWN1PB78XX7DKU81'; // Using the API key from .env
      
      // Method 1: Use tokenholderlist endpoint
      const holderListResponse = await fetch(
        `${baseUrl}?module=token&action=tokenholderlist&contractaddress=${tokenAddress}&page=1&offset=1000&apikey=${apiKey}`
      );
      
      const holderListData = await holderListResponse.json();
      console.log('Etherscan holder list:', holderListData);
      
      if (holderListData.status === '1' && Array.isArray(holderListData.result)) {
        const count = holderListData.result.length;
        console.log(`Found ${count} holders from Etherscan tokenholderlist`);
        setHoldersCount(count);
        
        // Cache the result
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          count,
          timestamp: Date.now()
        }));
        
        setIsLoading(false);
        return;
      }
      
      // Method 2: Get token info (some tokens have holders count in token info)
      try {
        const tokenInfoResponse = await fetch(
          `${baseUrl}?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${apiKey}`
        );
        
        const tokenInfoData = await tokenInfoResponse.json();
        console.log('Etherscan token info:', tokenInfoData);
        
        if (tokenInfoData.status === '1' && Array.isArray(tokenInfoData.result)) {
          // Look for holders count in token info
          for (const info of tokenInfoData.result) {
            if (info.holderCount || info.holders) {
              const count = parseInt(info.holderCount || info.holders, 10);
              if (!isNaN(count)) {
                console.log(`Found ${count} holders from Etherscan tokeninfo`);
                setHoldersCount(count);
                
                // Cache the result
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                  count,
                  timestamp: Date.now()
                }));
                
                setIsLoading(false);
                return;
              }
            }
          }
        }
      } catch (infoError) {
        console.warn('Error fetching token info from Etherscan:', infoError);
      }
      
      // If we couldn't get the data from Etherscan, set to null
      console.log('Could not fetch holders from Etherscan');
      setHoldersCount(null);
      setError('Could not fetch holders data');
      
    } catch (error) {
      console.error('Error fetching token holders count:', error);
      setError('Failed to fetch holders count');
      setHoldersCount(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHoldersCount();
  }, [tokenAddress]);
  
  return { holdersCount, isLoading, error, refetch: fetchHoldersCount };
}; 