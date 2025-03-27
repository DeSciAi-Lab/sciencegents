
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
   * Formats ETH value to USD with appropriate scaling (k, M)
   * @param ethValue The amount in ETH
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
   * Formats ETH value with appropriate scaling (k, M)
   * @param value The amount in ETH
   * @returns Formatted ETH string (e.g. 1.23k ETH, 4.56M ETH)
   */
  const formatEthPrice = (value: number): string => {
    if (!value || isNaN(value)) return '0 ETH';
    
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M ETH`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K ETH`;
    } else if (value < 0.0001) {
      return `${value.toExponential(2)} ETH`;
    }
    return `${value.toFixed(4)} ETH`;
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
  if (!value || isNaN(value)) return '0 ETH';
  
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M ETH`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K ETH`;
  } else if (value < 0.0001) {
    return `${value.toExponential(2)} ETH`;
  }
  return `${value.toFixed(4)} ETH`;
};
