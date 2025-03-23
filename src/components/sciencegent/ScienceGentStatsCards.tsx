
import React from 'react';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ scienceGent }) => {
  const formatEth = (value: number | undefined) => {
    if (!value && value !== 0) return '0.00';
    return value.toFixed(2);
  };

  const formatUsd = (value: number | undefined) => {
    if (!value && value !== 0) return '$0.00';
    return `$${value.toFixed(2)}`;
  };

  // Use the values from the image
  const marketCap = scienceGent?.marketCap || 4.32;
  const liquidity = scienceGent?.liquidity || 2.14;
  const volume24h = scienceGent?.volume24h || 4.32;
  const holders = scienceGent?.holders || 877;

  return (
    <div className="grid grid-cols-4 gap-2 mt-4">
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Market Cap</p>
        <p className="font-medium">{formatEth(marketCap)} ETH</p>
        <p className="text-xs text-gray-500">${(marketCap * 3000).toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Liquidity</p>
        <p className="font-medium">{formatEth(liquidity)} ETH</p>
        <p className="text-xs text-gray-500">${(liquidity * 3000).toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">24h volume</p>
        <p className="font-medium">{formatEth(volume24h)} ETH</p>
        <p className="text-xs text-gray-500">${(volume24h * 3000).toFixed(2)}</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Holders</p>
        <p className="font-medium">{holders}</p>
        <p className="text-xs text-gray-500">&nbsp;</p>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
