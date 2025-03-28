
import React, { useState } from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface PriceOverviewProps {
  scienceGent: any;
  isLoading?: boolean;
}

const PriceOverview: React.FC<PriceOverviewProps> = ({ scienceGent, isLoading = false }) => {
  const { formatEthToUsd } = useEthPriceContext();
  const [activeTimeframe, setActiveTimeframe] = useState('8h');
  
  const symbol = scienceGent?.symbol || "TICKER";
  const tokenPrice = scienceGent?.tokenPrice || scienceGent?.token_price || 0.000004;
  const priceUSD = formatEthToUsd(tokenPrice);
  const priceChange24h = scienceGent?.priceChange24h || scienceGent?.price_change_24h || -942.38;
  const highPrice24h = scienceGent?.highPrice24h || scienceGent?.high_price_24h || 47444.1;
  const lowPrice24h = scienceGent?.lowPrice24h || scienceGent?.low_price_24h || 45555.1;

  const timeframes = ['1h', '4h', '8h', '12h', '16h', '20h'];

  const isPriceUp = priceChange24h >= 0;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-6 w-24" />
            </>
          ) : (
            <>
              <div className="flex items-baseline">
                <div className="text-md font-medium mr-1">
                  Price {tokenPrice.toFixed(7)} ETH
                </div>
                <div className="text-sm text-gray-500">
                  ${priceUSD}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </>
          ) : (
            <>
              <div>
                <p className="text-xs text-gray-500">24h change</p>
                <p className={`font-medium ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChange24h.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h high</p>
                <p className="font-medium">{highPrice24h.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h low</p>
                <p className="font-medium">{lowPrice24h.toFixed(1)}</p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        {timeframes.map((timeframe) => (
          <Button 
            key={timeframe}
            variant={activeTimeframe === timeframe ? "default" : "ghost"}
            size="sm"
            className="px-3 py-1 h-8 text-sm rounded-md"
            onClick={() => setActiveTimeframe(timeframe)}
          >
            {timeframe}
          </Button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-md h-[300px] border p-4 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="bg-white rounded-md h-[300px] border p-4 flex items-center justify-center">
          <img 
            src="/lovable-uploads/7495cb99-cbd8-410a-bec7-17e42383e4bc.png" 
            alt="Trading chart" 
            className="max-h-full w-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default PriceOverview;
