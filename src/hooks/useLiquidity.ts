import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useEthPriceContext } from '@/context/EthPriceContext';

/**
 * Hook to calculate liquidity (2 * ETH reserves * ETH price in USD)
 * @param tokenAddress The address of the token
 * @returns An object containing the calculated liquidity and loading state
 */
export const useLiquidity = (tokenAddress: string) => {
  const [liquidity, setLiquidity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ethPrice } = useEthPriceContext();

  useEffect(() => {
    const calculateLiquidity = async () => {
      if (!tokenAddress || !ethPrice) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch eth_reserves from Supabase
        const { data, error } = await supabase
          .from('sciencegents')
          .select('eth_reserves')
          .eq('address', tokenAddress)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data || !data.eth_reserves) {
          setLiquidity(0);
          return;
        }
        
        const ethReserves = data.eth_reserves;
        
        // Calculate liquidity as  ETH reserves * ETH price
        const calculatedLiquidity = ethReserves * ethPrice;
        
        console.log('Liquidity calculation:', {
          tokenAddress,
          ethReserves,
          ethPrice,
          liquidity: calculatedLiquidity
        });
        
        setLiquidity(calculatedLiquidity);
      } catch (error) {
        console.error('Error calculating liquidity:', error);
        setError('Failed to calculate liquidity');
        setLiquidity(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateLiquidity();
  }, [tokenAddress, ethPrice]);
  
  return { liquidity, isLoading, error };
}; 