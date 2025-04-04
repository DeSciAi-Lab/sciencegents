import React, { useState, useEffect } from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber, formatPercent } from '@/utils/formatters';
import { fetchTokenStats24h } from '@/services/tradeService';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
  isLoading?: boolean;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ scienceGent, isLoading }) => {
  const { ethPrice } = useEthPriceContext();
  const [stats24h, setStats24h] = useState<{
    high_24h: number;
    low_24h: number;
    volume_24h: number;
    price_change_percentage_24h: number;
  } | null>(null);
  const [loading24hStats, setLoading24hStats] = useState(false);
  
  // Use data from scienceGent or provide defaults
  const currentEthPrice = ethPrice || 3000; // Fallback ETH price
  
  // Main stats from scienceGent data
  const currentPrice = scienceGent?.currentPrice ?? 0;
  const priceChangePercent = scienceGent?.priceChangePercent ?? (stats24h?.price_change_percentage_24h ?? 0);
  const marketCap = scienceGent?.marketCapEth ?? 0;
  const marketCapUsd = (marketCap * currentEthPrice).toFixed(2);
  const liquidity = scienceGent?.liquidityEth ?? 0;
  const liquidityUsd = (liquidity * currentEthPrice).toFixed(2);
  
  // Using values from 24h stats if available, fallback to scienceGent data
  const high24h = stats24h?.high_24h ?? (scienceGent?.high24h ?? null);
  const low24h = stats24h?.low_24h ?? (scienceGent?.low24h ?? null);
  
  // Other stats
  const holders = scienceGent?.holderCount ?? 0;
  const users = scienceGent?.usersCount ?? holders; // Fallback to holders count if users count is not available
  const interactions = scienceGent?.interactions ?? 0;
  const revenue = scienceGent?.revenue ?? 0;
  const totalTxns = scienceGent?.total_txns ?? 0;

  useEffect(() => {
    const loadStats24h = async () => {
      if (!scienceGent?.address) return;
      
      setLoading24hStats(true);
      try {
        const stats = await fetchTokenStats24h(scienceGent.address);
        console.log('ScienceGentStatsCards - Fetched 24h stats:', stats);
        if (stats) {
          setStats24h(stats);
        }
      } catch (error) {
        console.error('Error fetching 24h stats in ScienceGentStatsCards:', error);
      } finally {
        setLoading24hStats(false);
      }
    };
    
    loadStats24h();
  }, [scienceGent?.address]);

  if (isLoading || loading24hStats) {
    return (
      <div className="flex flex-nowrap overflow-x-auto gap-3 w-full py-1">
        {[...Array(8)].map((_, i) => (
           <div key={i} className="flex-shrink-0">
             <Skeleton className="h-3 w-16 mb-1" />
             <Skeleton className="h-4 w-20" />
           </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-3 w-full py-1">
      {/* Price */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">Price</div>
        <div className="font-semibold flex items-center gap-1">
          ${formatNumber(currentPrice, 8)}
          <span className={priceChangePercent >= 0 ? "text-green-600 text-xs" : "text-red-600 text-xs"}>
            {formatPercent(priceChangePercent)}
          </span>
        </div>
      </div>
      
      {/* 24h Change */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">24h Change</div>
        <div className={priceChangePercent >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {formatPercent(priceChangePercent)}
        </div>
      </div>
      
      {/* Market Cap */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">Market Cap</div>
        <div className="font-semibold">${formatNumber(parseFloat(marketCapUsd), 2)}</div>
      </div>
      
      {/* Liquidity */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">Liquidity</div>
        <div className="font-semibold">${formatNumber(parseFloat(liquidityUsd), 2)}</div>
      </div>
      
      {/* 24h Volume */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">24h volume</div>
        <div className="font-semibold">
          {/* Display volume directly from stats24h, which is now in USD */}
          {stats24h?.volume_24h !== null && stats24h?.volume_24h !== undefined ? 
            `$${formatNumber(stats24h.volume_24h, 2)}` : 
            "N/A"
          }
        </div>
      </div>
      
      {/* 24h High */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">24h high</div>
        <div className="font-semibold">
          {high24h !== null ? `$${formatNumber(high24h, 8)}` : "N/A"}
        </div>
      </div>
      
      {/* 24h Low */}
      <div className="flex-shrink-0">
        <div className="text-xs text-gray-500">24h low</div>
        <div className="font-semibold">
          {low24h !== null ? `$${formatNumber(low24h, 8)}` : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
