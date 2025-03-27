
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCurrentEthPrice, convertEthToUsd, formatEthValue } from '@/utils/scienceGentCalculations';

interface EthPriceContextType {
  ethPrice: number;
  isLoading: boolean;
  formatEthToUsd: (ethValue: number) => string;
  formatEthPrice: (ethValue: number) => string;
  refreshEthPrice: () => Promise<void>;
}

const EthPriceContext = createContext<EthPriceContextType>({
  ethPrice: 3000, // Default value
  isLoading: true,
  formatEthToUsd: () => '$0.00',
  formatEthPrice: () => '0 ETH',
  refreshEthPrice: async () => {}
});

export const useEthPriceContext = () => useContext(EthPriceContext);

export const EthPriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<number>(3000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const refreshEthPrice = async () => {
    try {
      setIsLoading(true);
      const price = await fetchCurrentEthPrice();
      setEthPrice(price);
    } catch (error) {
      console.error("Error refreshing ETH price:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format ETH to USD with the current exchange rate
  const formatEthToUsd = (ethValue: number): string => {
    return convertEthToUsd(ethValue, ethPrice);
  };
  
  // Format ETH value
  const formatEthPrice = (ethValue: number): string => {
    return formatEthValue(ethValue);
  };
  
  // Initial fetch
  useEffect(() => {
    refreshEthPrice();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(refreshEthPrice, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <EthPriceContext.Provider 
      value={{ 
        ethPrice, 
        isLoading, 
        formatEthToUsd,
        formatEthPrice,
        refreshEthPrice 
      }}
    >
      {children}
    </EthPriceContext.Provider>
  );
};
