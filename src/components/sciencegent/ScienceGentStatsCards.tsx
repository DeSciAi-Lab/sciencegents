import React from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Skeleton } from '@/components/ui/skeleton';
import { CircleCheckBig, CircleX, Clock } from 'lucide-react';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
  isLoading?: boolean;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ 
  scienceGent,
  isLoading = false
}) => {
  const { formatEthToUsd, formatEthPrice } = useEthPriceContext();
  
  // Get values from scienceGent object or use fallbacks
  const marketCap = scienceGent?.marketCap || scienceGent?.market_cap || 0;
  const marketCapUsd = scienceGent?.marketCapUsd || scienceGent?.market_cap_usd || 0;
  const liquidity = scienceGent?.liquidity || scienceGent?.total_liquidity || 0;
  const volume24h = scienceGent?.volume24h || scienceGent?.volume_24h || 0;
  const holders = scienceGent?.holders || 0;
  const maturityProgress = scienceGent?.maturityProgress || scienceGent?.maturity_progress || 0;
  const age = scienceGent?.age || 0;
  const createdOnChainAt = scienceGent?.createdOnChainAt || scienceGent?.created_on_chain_at;
  
  // Calculate age if not directly available
  const ageDisplay = age ? `${age} days` : createdOnChainAt ? 
    `${Math.floor((Date.now() - new Date(createdOnChainAt).getTime()) / (1000 * 60 * 60 * 24))} days` : 
    'Unknown';
  
  // Check if token is migrated or migration eligible
  const isMigrated = scienceGent?.isMigrated || scienceGent?.is_migrated || false;
  const isEligible = scienceGent?.migrationEligible || scienceGent?.migration_eligible || false;
  const maturityStatus = isMigrated ? 'Migrated' : isEligible ? 'Ready' : 'Immature';

  const CardWithBorder = ({ 
    title, 
    value, 
    ethValue, 
    dollarValue, 
    isLoading,
    status,
    progress
  }: { 
    title: string, 
    value?: number, 
    ethValue?: number, 
    dollarValue?: string,
    isLoading?: boolean,
    status?: string,
    progress?: number
  }) => (
    <div className="bg-white rounded-md p-3 border">
      <div className="text-gray-800">
        <div className="text-sm">{title}</div>
        {isLoading ? (
          <>
            <Skeleton className="h-5 w-20 mt-1" />
            <Skeleton className="h-3 w-16 mt-1" />
          </>
        ) : ethValue !== undefined ? (
          <>
            <div className="font-medium">{formatEthPrice(ethValue)}</div>
            <div className="text-xs text-gray-500">{dollarValue}</div>
          </>
        ) : status ? (
          <div className="flex items-center gap-2 mt-1">
            {status === 'Migrated' ? (
              <>
                <CircleCheckBig size={16} className="text-green-500" />
                <span className="font-medium text-green-600">Migrated</span>
              </>
            ) : status === 'Ready' ? (
              <>
                <Clock size={16} className="text-blue-500" />
                <span className="font-medium text-blue-600">Ready</span>
              </>
            ) : (
              <>
                <CircleX size={16} className="text-gray-400" />
                <span className="font-medium text-gray-500">Immature {progress}%</span>
              </>
            )}
          </div>
        ) : (
          <div className="font-medium">{value?.toLocaleString() || 0}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {/* Market Cap */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-md p-3 hover:shadow-md transition">
        <h3 className="font-medium text-sm text-gray-600 mb-1">Market Cap</h3>
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-gray-900">
              {marketCapUsd ? `$${marketCapUsd.toLocaleString()}` : formatEthToUsd(marketCap)}
            </p>
            <p className="text-xs text-gray-500">{marketCap.toFixed(4)} ETH</p>
          </div>
        )}
      </div>
      
      <CardWithBorder 
        title="Liquidity" 
        ethValue={liquidity} 
        dollarValue={formatEthToUsd(liquidity)} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="24h Volume" 
        ethValue={volume24h} 
        dollarValue={formatEthToUsd(volume24h)} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="Holders" 
        value={holders} 
        isLoading={isLoading}
      />
      
      <CardWithBorder 
        title="Maturity" 
        status={maturityStatus}
        progress={maturityProgress}
        isLoading={isLoading}
      />

      {/* Age */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-md p-3 hover:shadow-md transition">
        <h3 className="font-medium text-sm text-gray-600 mb-1">Token Age</h3>
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : (
          <p className="text-lg font-semibold text-gray-900">{ageDisplay}</p>
        )}
      </div>
    </div>
  );
};

export default ScienceGentStatsCards;
