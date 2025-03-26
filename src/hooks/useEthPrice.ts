
import { useState, useEffect, useCallback } from 'react';

// Cache the ETH price and last fetch time
let cachedEthPrice: number | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState<number | null>(cachedEthPrice);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEthPrice = useCallback(async (force: boolean = false) => {
    // Use cached value if available and not expired
    const now = Date.now();
    if (!force && cachedEthPrice && now - lastFetchTime < CACHE_DURATION) {
      setEthPrice(cachedEthPrice);
      return cachedEthPrice;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch ETH price from CoinGecko API
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch ETH price');
      }
      
      const data = await response.json();
      const price = data.ethereum.usd;
      
      // Update cache
      cachedEthPrice = price;
      lastFetchTime = now;
      
      setEthPrice(price);
      return price;
    } catch (err) {
      console.error('Error fetching ETH price:', err);
      setError('Failed to fetch ETH price');
      // Return a reasonable fallback value if fetch fails
      return 3000; // Fallback value
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch price on mount if not already cached
  useEffect(() => {
    if (!cachedEthPrice) {
      fetchEthPrice();
    }

    // Set up periodic refresh (every 5 minutes)
    const intervalId = setInterval(() => {
      fetchEthPrice(true);
    }, CACHE_DURATION);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchEthPrice]);

  return {
    ethPrice: ethPrice || 3000, // Default to 3000 if not available
    isLoading,
    error,
    refreshEthPrice: () => fetchEthPrice(true)
  };
};
