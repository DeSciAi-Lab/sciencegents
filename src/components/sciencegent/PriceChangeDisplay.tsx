import React from 'react';
import { usePriceChange24h } from '@/hooks/usePriceChange24h';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChangeDisplayProps {
  tokenAddress: string;
  className?: string;
}

/**
 * Component that displays the 24h price change percentage
 */
export const PriceChangeDisplay: React.FC<PriceChangeDisplayProps> = ({ 
  tokenAddress,
  className = ''
}) => {
  const { priceChange, isLoading, error } = usePriceChange24h(tokenAddress);
  
  if (isLoading) {
    return <Skeleton className={`h-6 w-20 ${className}`} />;
  }
  
  if (error || priceChange === null) {
    return <span className={`text-gray-500 ${className}`}>N/A</span>;
  }
  
  const isPositive = priceChange >= 0;
  const color = isPositive ? 'text-green-600' : 'text-red-600';
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const sign = isPositive ? '+' : '';
  
  return (
    <span className={`flex items-center ${color} ${className}`}>
      <Icon className="h-4 w-4 mr-1" />
      {sign}{priceChange.toFixed(2)}%
    </span>
  );
};

export default PriceChangeDisplay; 