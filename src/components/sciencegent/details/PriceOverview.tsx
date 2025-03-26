
import React from 'react';
import { useEthPriceContext, formatEthToUsd } from '@/context/EthPriceContext';

interface PriceOverviewProps {
  scienceGent: any;
}

const PriceOverview: React.FC<PriceOverviewProps> = ({ scienceGent }) => {
  const { ethPrice } = useEthPriceContext();
  const symbol = scienceGent?.symbol || "TICKER";
  const tokenPrice = scienceGent?.tokenPrice || 0.000004;
  const priceUSD = formatEthToUsd(tokenPrice, ethPrice);
  const priceChange24h = scienceGent?.priceChange24h || -942.38;
  const highPrice24h = scienceGent?.highPrice24h || 47444.1;
  const lowPrice24h = scienceGent?.lowPrice24h || 45555.1;

  const timeframes = ['8h', '12h', '16h', '20h'];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <div className="flex items-baseline">
            <div className="text-xl font-bold flex items-center mr-2">
              {symbol}/ETH 
              <span className="text-sm ml-2">▼</span>
            </div>
            <div className="text-2xl font-medium text-[#00bfa5] mr-1">
              {tokenPrice.toFixed(7)}
            </div>
            <div>
              <span className="text-gray-500 text-sm">{priceUSD}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-6 mt-2 md:mt-0">
          <div>
            <p className="text-xs text-gray-500">24h change</p>
            <p className="font-medium text-red-500">{priceChange24h}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">24h high</p>
            <p className="font-medium">{highPrice24h.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">24h low</p>
            <p className="font-medium">{lowPrice24h.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        {timeframes.map((timeframe) => (
          <button 
            key={timeframe}
            className="px-3 py-1 text-sm rounded-md hover:bg-gray-100"
          >
            {timeframe}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-md h-[300px] border p-4 flex items-center justify-center">
        <img 
          src="/lovable-uploads/805373ea-b8fd-4d94-827d-c33afa2bcf0c.png" 
          alt="Trading chart" 
          className="max-h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default PriceOverview;
