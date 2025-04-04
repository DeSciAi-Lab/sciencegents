import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to calculate 24h price change percentage for a token
 * @param tokenAddress The address of the token
 * @returns An object containing the calculated price change percentage and loading state
 */
export const usePriceChange24h = (tokenAddress: string) => {
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculatePriceChange = async () => {
      if (!tokenAddress) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Get price data for the last 24 hours from trades table
        const { data, error } = await supabase
          .from('trades')
          .select('price_in_usd, time')
          .eq('token_id', tokenAddress)
          .gte('time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
          .order('time', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('No price change data available for token:', tokenAddress);
          setPriceChange(0);
          return;
        }
        
        // Get the latest and earliest prices
        const latestPrice = data[0]?.price_in_usd;
        const earliestPrice = data[data.length - 1]?.price_in_usd;
        
        // Calculate percentage change
        if (latestPrice && earliestPrice && earliestPrice !== 0) {
          const changePercentage = ((latestPrice - earliestPrice) / earliestPrice) * 100;
          
          console.log('24h price change calculation:', {
            tokenAddress,
            latestPrice,
            earliestPrice,
            changePercentage
          });
          
          setPriceChange(changePercentage);
        } else {
          setPriceChange(0);
        }
      } catch (error) {
        console.error('Error calculating 24h price change:', error);
        setError('Failed to calculate 24h price change');
        setPriceChange(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculatePriceChange();
  }, [tokenAddress]);
  
  return { priceChange, isLoading, error };
}; 