
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { updateEthPrice, formatEthValue, convertEthToUsd, getEthPrice } from '@/utils/scienceGentCalculations';
import { useEthPrice } from '@/hooks/useEthPrice';

interface EthPriceContextType {
  ethPrice: number;
  formatEthPrice: (amount: number) => string;
  formatEthToUsd: (amount: number) => string;
  isLoading: boolean;
  refreshEthPrice: () => Promise<number>;
}

const EthPriceContext = createContext<EthPriceContextType>({
  ethPrice: 0,
  formatEthPrice: () => '',
  formatEthToUsd: () => '',
  isLoading: true,
  refreshEthPrice: async () => 0
});

export const useEthPriceContext = () => useContext(EthPriceContext);

// Export these functions directly to allow importing them without the hook
export const formatEthToUsd = (amount: number, ethPrice: number = getEthPrice()): string => {
  return convertEthToUsd(amount);
};

export const EthPriceProvider = ({ children }: { children: ReactNode }) => {
  const { ethPrice, isLoading, refreshEthPrice } = useEthPrice();

  // Format ETH price with the ETH symbol
  const formatEthPrice = (amount: number): string => {
    return formatEthValue(amount);
  };

  return (
    <EthPriceContext.Provider value={{ 
      ethPrice, 
      formatEthPrice, 
      formatEthToUsd: (amount: number) => convertEthToUsd(amount), 
      isLoading,
      refreshEthPrice
    }}>
      {children}
    </EthPriceContext.Provider>
  );
};

export default EthPriceContext;
