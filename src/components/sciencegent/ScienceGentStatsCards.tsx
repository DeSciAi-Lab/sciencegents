
import React from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
  isLoading?: boolean;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ 
  scienceGent,
  isLoading = false
}) => {
  const { formatEthToUsd, formatEthPrice } = useEthPriceContext();
  
  // Get values from scienceGent object or use fallbacks
  const marketCap = scienceGent?.marketCap || scienceGent?.market_cap || 0;
  const liquidity = scienceGent?.liquidity || scienceGent?.total_liquidity || 0;
  const volume24h = scienceGent?.volume24h || scienceGent?.volume_24h || 0;
  const holders = scienceGent?.holders || 0;

  const CardWithBorder = ({ 
    title, 
    value, 
    ethValue, 
    dollarValue, 
    isLoading 
  }: { 
    title: string, 
    value?: number, 
    ethValue?: number, 
    dollarValue?: string,
    isLoading?: boolean
  }) => (
    <div className="bg-white rounded-md p-3 border">
      <div className="text-gray-800">
        <div className="text-sm">{title}</div>
        {isLoading ? (
          <>
            <Skeleton className="h-5 w-20 mt-1" />
            <Skeleton className="h-3 w-16 mt-1" />
          </>
        ) : ethValue !== undefined ? (
          <>
            <div className="font-medium">{formatEthPrice(ethValue)}</div>
            <div className="text-xs text-gray-500">{dollarValue}</div>
          </>
        ) : (
          <div className="font-medium">{value || 0}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <CardWithBorder 
        title="Market Cap" 
        ethValue={marketCap} 
        dollarValue={formatEthToUsd(marketCap)} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="Liquidity" 
        ethValue={liquidity} 
        dollarValue={formatEthToUsd(liquidity)} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="24h volume" 
        ethValue={volume24h} 
        dollarValue={formatEthToUsd(volume24h)} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="Holders" 
        value={holders} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default ScienceGentStatsCards;
