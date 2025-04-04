import React from 'react';
import { useTokenUsdPrice } from '@/hooks/useTokenUsdPrice';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenPriceDisplayProps {
  tokenAddress: string;
  className?: string;
}

/**
 * Component that displays the token price in USD calculated using eth_reserves * eth_price / token_reserves
 */
export const TokenPriceDisplay: React.FC<TokenPriceDisplayProps> = ({ 
  tokenAddress,
  className = ''
}) => {
  const { usdPrice, isLoading, error } = useTokenUsdPrice(tokenAddress);
  
  if (isLoading) {
    return <Skeleton className={`h-6 w-28 ${className}`} />;
  }
  
  if (error || usdPrice === null) {
    return <span className={`text-red-500 ${className}`}>Price unavailable</span>;
  }
  
  // Format the price based on its magnitude
  const formatPrice = (price: number): string => {
    if (price === 0) return '$0.00';
    
    if (price < 1) {
      return `$${price.toFixed(8)}`;
    } else if (price < 1000) {
      return `$${price.toFixed(2)}`;
    } else if (price < 1000000) {
      return `$${(price / 1000).toFixed(2)}k`;
    } else {
      return `$${(price / 1000000).toFixed(2)}M`;
    }
  };
  
  return (
    <span className={className}>
      {formatPrice(usdPrice)}
    </span>
  );
};

export default TokenPriceDisplay; 