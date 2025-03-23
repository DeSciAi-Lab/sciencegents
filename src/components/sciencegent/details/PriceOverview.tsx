
import React from 'react';

interface PriceOverviewProps {
  scienceGent: any;
}

const PriceOverview: React.FC<PriceOverviewProps> = ({ scienceGent }) => {
  const symbol = scienceGent?.symbol || "TICKER";
  const tokenPrice = scienceGent?.tokenPrice || "0.000004";
  const priceUSD = scienceGent?.tokenPriceUSD || "0.0003";
  const priceChange24h = scienceGent?.priceChange24h || -942.38;
  const highPrice24h = scienceGent?.highPrice24h || 47444.1;
  const lowPrice24h = scienceGent?.lowPrice24h || 45555.1;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="text-lg font-bold flex items-center">
            {symbol}/ETH <span className="ml-1">▼</span>
          </div>
          <div className="ml-8">
            <span className="text-gray-600 mr-2">Price</span>
            <span className="text-[#00bfa5] text-2xl font-medium mr-1">{tokenPrice}</span>
            <span className="text-gray-800">ETH</span>
            <div>
              <span className="text-[#00bfa5]">${priceUSD}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-10">
          <div className="text-right">
            <p className="text-xs text-gray-500">24h change</p>
            <p className="font-medium text-red-500">{priceChange24h}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">24h high</p>
            <p className="font-medium">{highPrice24h}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">24h low</p>
            <p className="font-medium">{lowPrice24h}</p>
          </div>
        </div>
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
