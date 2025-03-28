
import React from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
  isLoading?: boolean;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ 
  scienceGent,
  isLoading = false
}) => {
  const { formatEthToUsd } = useEthPriceContext();
  
  // Get values from scienceGent object or use fallbacks
  const marketCap = scienceGent?.marketCap || scienceGent?.market_cap || 4.32;
  const liquidity = scienceGent?.liquidity || scienceGent?.total_liquidity || 2.14;
  const volume24h = scienceGent?.volume24h || scienceGent?.volume_24h || 4.32;
  const holders = scienceGent?.holders || 877;
  
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-white rounded-md p-3 border">
        <div className="text-sm text-gray-500 mb-1">Market Cap</div>
        <div className="font-medium">{marketCap.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${(marketCap * 3000).toFixed(2)}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-sm text-gray-500 mb-1">Liquidity</div>
        <div className="font-medium">{liquidity.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${(liquidity * 3000).toFixed(2)}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-sm text-gray-500 mb-1">24h volume</div>
        <div className="font-medium">{volume24h.toFixed(2)} ETH</div>
        <div className="text-xs text-gray-500">${(volume24h * 3000).toFixed(2)}</div>
      </div>
      
      <div className="bg-white rounded-md p-3 border">
        <div className="text-sm text-gray-500 mb-1">Holders</div>
        <div className="font-medium">{holders}</div>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
