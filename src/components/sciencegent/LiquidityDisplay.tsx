import React from 'react';
import { useLiquidity } from '@/hooks/useLiquidity';
import { Skeleton } from '@/components/ui/skeleton';

interface LiquidityDisplayProps {
  tokenAddress: string;
  className?: string;
}

/**
 * Component that displays the liquidity calculated using 2 * eth_reserves * eth_price
 */
export const LiquidityDisplay: React.FC<LiquidityDisplayProps> = ({ 
  tokenAddress,
  className = ''
}) => {
  const { liquidity, isLoading, error } = useLiquidity(tokenAddress);
  
  if (isLoading) {
    return <Skeleton className={`h-6 w-28 ${className}`} />;
  }
  
  if (error || liquidity === null) {
    return <span className={`text-gray-500 ${className}`}>$0.00</span>;
  }
  
  // Format the liquidity based on its magnitude
  const formatLiquidity = (value: number): string => {
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
      {formatLiquidity(liquidity)}
    </span>
  );
};

export default LiquidityDisplay; 