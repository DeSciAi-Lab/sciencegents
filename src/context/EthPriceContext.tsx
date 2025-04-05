import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useEthPrice } from '@/hooks/useEthPrice';

interface EthPriceContextType {
  ethPrice: number;
  isLoading: boolean;
  error: string | null;
  refreshEthPrice: () => Promise<number>;
  formatEthToUsd: (ethValue: number) => string;
  formatEthPrice: (value: number) => string;
}

const EthPriceContext = createContext<EthPriceContextType | undefined>(undefined);

export const EthPriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { ethPrice, isLoading, error, refreshEthPrice } = useEthPrice();

  /**
   * Formats BNB value to USD with appropriate scaling (k, M)
   * @param ethValue The amount in BNB
   * @returns Formatted USD string (e.g. $1.23k, $4.56M)
   */
  const formatEthToUsd = (ethValue: number): string => {
    if (!ethValue || isNaN(ethValue)) return '$0.00';
    
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

  /**
   * Formats BNB value with appropriate scaling (k, M)
   * @param value The amount in BNB
   * @returns Formatted BNB string (e.g. 1.23k BNB, 4.56M BNB)
   */
  const formatEthPrice = (value: number): string => {
    if (!value || isNaN(value)) return '0 BNB';
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M BNB`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K BNB`;
    } else if (value < 0.0001) {
      return `${value.toExponential(2)} BNB`;
    }
    return `${value.toFixed(4)} BNB`;
  };
  
  const contextValue = {
    ethPrice,
    isLoading,
    error,
    refreshEthPrice,
    formatEthToUsd,
    formatEthPrice
  };
  
  return (
    <EthPriceContext.Provider value={contextValue}>
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

// For backward compatibility
export const formatEthToUsd = (ethValue: number, ethPrice: number): string => {
  if (!ethValue || isNaN(ethValue) || !ethPrice || isNaN(ethPrice)) return '$0.00';
  
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

// For backward compatibility
export const formatEthPrice = (value: number): string => {
  if (!value || isNaN(value)) return '0 BNB';
  
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M BNB`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K BNB`;
  } else if (value < 0.0001) {
    return `${value.toExponential(2)} BNB`;
  }
  return `${value.toFixed(4)} BNB`;
};
