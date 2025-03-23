
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

  const ethPrice = 3000; // Example ETH price in USD

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Market Cap</p>
        <p className="font-medium">4.32 ETH</p>
        <p className="text-xs text-gray-500">$11,532</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Liquidity</p>
        <p className="font-medium">2.14 ETH</p>
        <p className="text-xs text-gray-500">$5,823</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">24h volume</p>
        <p className="font-medium">4.32 ETH</p>
        <p className="text-xs text-gray-500">$11,532</p>
      </div>
      
      <div className="bg-white rounded-lg p-3 border">
        <p className="text-sm text-gray-500 mb-1">Holders</p>
        <p className="font-medium">877</p>
        <p className="text-xs text-gray-500">&nbsp;</p>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
