
import React from 'react';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ scienceGent }) => {
  // Use the values from the image
  const marketCap = scienceGent?.marketCap || 4.32;
  const liquidity = scienceGent?.liquidity || 2.14;
  const volume24h = scienceGent?.volume24h || 4.32;
  const holders = scienceGent?.holders || 877;

  // Format dollar values as shown in the image
  const formatDollars = (ethValue: number) => {
    return `$${(ethValue * 3000).toFixed(2)}k`;
  };

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div className="bg-white rounded-md p-3 border relative overflow-hidden">
        <p className="text-sm text-gray-500 mb-1">Market Cap</p>
        <p className="font-medium">{marketCap.toFixed(2)} ETH</p>
        <p className="text-xs text-gray-500">{formatDollars(marketCap)}</p>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
      </div>
      
      <div className="bg-white rounded-md p-3 border relative overflow-hidden">
        <p className="text-sm text-gray-500 mb-1">Liquidity</p>
        <p className="font-medium">{liquidity.toFixed(2)} ETH</p>
        <p className="text-xs text-gray-500">{formatDollars(liquidity)}</p>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
      </div>
      
      <div className="bg-white rounded-md p-3 border relative overflow-hidden">
        <p className="text-sm text-gray-500 mb-1">24h volume</p>
        <p className="font-medium">{volume24h.toFixed(2)} ETH</p>
        <p className="text-xs text-gray-500">{formatDollars(volume24h)}</p>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
      </div>
      
      <div className="bg-white rounded-md p-3 border relative overflow-hidden">
        <p className="text-sm text-gray-500 mb-1">Holders</p>
        <p className="font-medium">{holders}</p>
        <p className="text-xs text-gray-500">&nbsp;</p>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
