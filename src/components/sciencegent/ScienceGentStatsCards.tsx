
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div className="bg-gray-50 rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Market Cap</p>
        <p className="font-semibold">{formatEth(scienceGent.marketCap)} ETH</p>
        <p className="text-xs text-gray-500">{formatUsd(scienceGent.marketCap ? scienceGent.marketCap * 3000 : 0)}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Liquidity</p>
        <p className="font-semibold">{formatEth(scienceGent.virtualEth || 0)} ETH</p>
        <p className="text-xs text-gray-500">
          {formatUsd(scienceGent.virtualEth ? scienceGent.virtualEth * 3000 : 0)}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">24h volume</p>
        <p className="font-semibold">{formatEth(scienceGent.volume_24h || 0)} ETH</p>
        <p className="text-xs text-gray-500">
          {formatUsd(scienceGent.volume_24h ? scienceGent.volume_24h * 3000 : 0)}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Holders</p>
        <p className="font-semibold">877</p>
        <p className="text-xs text-gray-500">&nbsp;</p>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
