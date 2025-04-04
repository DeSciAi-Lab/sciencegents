import React from 'react';
import { useMarketCap } from '@/hooks/useMarketCap';
import { Skeleton } from '@/components/ui/skeleton';

interface MarketCapDisplayProps {
  tokenAddress: string;
  className?: string;
}

/**
 * Component that displays the market cap calculated using token price * total supply
 */
export const MarketCapDisplay: React.FC<MarketCapDisplayProps> = ({ 
  tokenAddress,
  className = ''
}) => {
  const { marketCap, isLoading, error } = useMarketCap(tokenAddress);
  
  if (isLoading) {
    return <Skeleton className={`h-6 w-28 ${className}`} />;
  }
  
  if (error || marketCap === null) {
    return <span className={`text-gray-500 ${className}`}>$0.00</span>;
  }
  
  // Format the market cap based on its magnitude
  const formatMarketCap = (value: number): string => {
    if (value === 0) return '$0.00';
    
    if (value < 1000) {
      return `$${value.toFixed(2)}`;
    } else if (value < 1000000) {
      return `$${(value / 1000).toFixed(2)}k`;
    } else if (value < 1000000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
  };
  
  return (
    <span className={className}>
      {formatMarketCap(marketCap)}
    </span>
  );
};

export default MarketCapDisplay; 