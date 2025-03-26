
import React from 'react';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ scienceGent }) => {
  // Default values if data isn't available
  const marketCap = scienceGent?.marketCap || 4.32;
  const marketCapUsd = (marketCap * 3000).toFixed(2); // Assuming 1 ETH = $3000
  
  const liquidity = scienceGent?.liquidity || 2.14;
  const liquidityUsd = (liquidity * 3000).toFixed(2);
  
  const volume24h = scienceGent?.volume24h || 4.32;
  const volume24hUsd = (volume24h * 3000).toFixed(2);
  
  const holders = scienceGent?.holders || 877;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-white rounded-md p-3 border">
        <div className="text-gray-500 text-sm mb-1">Market Cap</div>
        <div className="font-medium">{marketCap.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${marketCapUsd}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-gray-500 text-sm mb-1">Liquidity</div>
        <div className="font-medium">{liquidity.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${liquidityUsd}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-gray-500 text-sm mb-1">24h volume</div>
        <div className="font-medium">{volume24h.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${volume24hUsd}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-gray-500 text-sm mb-1">Holders</div>
        <div className="font-medium">{holders}</div>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
