
import React, { createContext, useContext, ReactNode } from 'react';
import { useEthPrice } from '@/hooks/useEthPrice';

interface EthPriceContextType {
  ethPrice: number;
  isLoading: boolean;
  error: string | null;
  refreshEthPrice: () => Promise<number>;
}

const EthPriceContext = createContext<EthPriceContextType | undefined>(undefined);

export const EthPriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ethPriceData = useEthPrice();
  
  return (
    <EthPriceContext.Provider value={ethPriceData}>
      {children}
    </EthPriceContext.Provider>
  );
};

export const useEthPriceContext = (): EthPriceContextType => {
  const context = useContext(EthPriceContext);
  if (context === undefined) {
    throw new Error('useEthPriceContext must be used within an EthPriceProvider');
  }
  return context;
};

// Utility function to format ETH value to USD
export const formatEthToUsd = (ethValue: number, ethPrice: number): string => {
  const usdValue = ethValue * ethPrice;
  
  // Format based on value size
  if (usdValue >= 1000000) {
    return `$${(usdValue / 1000000).toFixed(2)}M`;
  } else if (usdValue >= 1000) {
    return `$${(usdValue / 1000).toFixed(2)}k`;
  } else {
    return `$${usdValue.toFixed(2)}`;
  }
};
