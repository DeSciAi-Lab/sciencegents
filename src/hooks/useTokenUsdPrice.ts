import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEthPriceContext } from '@/context/EthPriceContext';

/**
 * Hook to calculate token price in USD based on eth_reserves * eth_price / token_reserves
 * @param tokenAddress The address of the token to calculate price for
 * @returns An object containing the calculated USD price and loading state
 */
export const useTokenUsdPrice = (tokenAddress: string) => {
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ethPrice } = useEthPriceContext();

  useEffect(() => {
    const calculateUsdPrice = async () => {
      if (!tokenAddress || !ethPrice) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch eth_reserves and token_reserves from Supabase
        const { data, error } = await supabase
          .from('sciencegents')
          .select('eth_reserves, token_reserves')
          .eq('address', tokenAddress)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data || !data.eth_reserves || !data.token_reserves || data.token_reserves === 0) {
          setUsdPrice(0);
          return;
        }
        
        // Calculate price using the formula: eth_reserves * eth_price / token_reserves
        const calculatedPrice = (data.eth_reserves * ethPrice) / data.token_reserves;
        
        console.log('Token USD price calculation:', {
          eth_reserves: data.eth_reserves,
          token_reserves: data.token_reserves,
          eth_price: ethPrice,
          calculated_price: calculatedPrice
        });
        
        setUsdPrice(calculatedPrice);
      } catch (error) {
        console.error('Error calculating token USD price:', error);
        setError('Failed to calculate token USD price');
        setUsdPrice(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateUsdPrice();
  }, [tokenAddress, ethPrice]);
  
  return { usdPrice, isLoading, error };
}; 