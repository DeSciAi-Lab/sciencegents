
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { updateEthPrice, formatEthValue, convertEthToUsd, getEthPrice } from '@/utils/scienceGentCalculations';

interface EthPriceContextType {
  ethPrice: number;
  formatEthPrice: (amount: number) => string;
  formatEthToUsd: (ethAmount: number) => string;
  isLoading: boolean;
}

const EthPriceContext = createContext<EthPriceContextType>({
  ethPrice: 0,
  formatEthPrice: () => '',
  formatEthToUsd: () => '',
  isLoading: true
});

export const useEthPriceContext = () => useContext(EthPriceContext);

export const EthPriceProvider = ({ children }: { children: ReactNode }) => {
  const [ethPrice, setEthPrice] = useState(getEthPrice());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        setIsLoading(true);
        const price = await updateEthPrice();
        setEthPrice(price);
      } catch (error) {
        console.error('Failed to fetch ETH price:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEthPrice();

    // Update price every hour
    const intervalId = setInterval(fetchEthPrice, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  // Format ETH price with the ETH symbol
  const formatEthPrice = (amount: number): string => {
    return formatEthValue(amount);
  };

  // Format ETH amount to USD
  const formatEthToUsd = (ethAmount: number): string => {
    return convertEthToUsd(ethAmount);
  };

  return (
    <EthPriceContext.Provider value={{ ethPrice, formatEthPrice, formatEthToUsd, isLoading }}>
      {children}
    </EthPriceContext.Provider>
  );
};

export default EthPriceContext;
