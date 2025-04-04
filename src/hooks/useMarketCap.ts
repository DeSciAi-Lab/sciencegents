import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTokenUsdPrice } from './useTokenUsdPrice';
import { useEthPriceContext } from '@/context/EthPriceContext';

/**
 * Hook to calculate market cap (token price * total supply)
 * @param tokenAddress The address of the token
 * @returns An object containing the calculated market cap and loading state
 */
export const useMarketCap = (tokenAddress: string) => {
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { usdPrice, isLoading: isPriceLoading } = useTokenUsdPrice(tokenAddress);
  const { ethPrice } = useEthPriceContext();

  useEffect(() => {
    const calculateMarketCap = async () => {
      if (!tokenAddress || isPriceLoading || !ethPrice) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch total_supply from Supabase
        const { data, error } = await supabase
          .from('sciencegents')
          .select('total_supply')
          .eq('address', tokenAddress)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data || !data.total_supply) {
          setMarketCap(0);
          return;
        }
        
        const totalSupply = data.total_supply;
        
        // If we have a valid price, calculate the market cap using our corrected price formula
        if (usdPrice !== null) {
          const calculatedMarketCap = usdPrice * totalSupply;
          
          console.log('Market cap calculation:', {
            tokenAddress,
            price: usdPrice,
            totalSupply,
            marketCap: calculatedMarketCap
          });
          
          setMarketCap(calculatedMarketCap);
        } else {
          // Fallback calculation using raw data
          const { data: reservesData } = await supabase
            .from('sciencegents')
            .select('eth_reserves, token_reserves')
            .eq('address', tokenAddress)
            .single();
            
          if (reservesData?.eth_reserves && reservesData?.token_reserves && reservesData.token_reserves > 0) {
            const tokenPrice = (reservesData.eth_reserves * ethPrice) / reservesData.token_reserves;
            const marketCapFromRawData = tokenPrice * totalSupply;
            setMarketCap(marketCapFromRawData);
          } else {
            setMarketCap(0);
          }
        }
      } catch (error) {
        console.error('Error calculating market cap:', error);
        setError('Failed to calculate market cap');
        setMarketCap(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateMarketCap();
  }, [tokenAddress, usdPrice, isPriceLoading, ethPrice]);
  
  return { marketCap, isLoading, error };
}; 