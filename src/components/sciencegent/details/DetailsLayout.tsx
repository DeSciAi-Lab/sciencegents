import React, { useEffect, useState } from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentHeader from './ScienceGentHeader';
import PriceOverview from './PriceOverview';
import TokenSwapInterface from '../TokenSwapInterface';
import ScienceGentDetailsDashboard from '../ScienceGentDetailsDashboard';
import SecondaryStatsCards from './SecondaryStatsCards';
import TokenPriceDisplay from '../TokenPriceDisplay';
import PriceChangeDisplay from '../PriceChangeDisplay';
import MarketCapDisplay from '../MarketCapDisplay';
import LiquidityDisplay from '../LiquidityDisplay';
import { fetchTokenStats24h } from '@/services/tradeService';

interface DetailsLayoutProps {
  scienceGent: any;
  address: string;
  status: LoadingStatus;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const DetailsLayout: React.FC<DetailsLayoutProps> = ({
  scienceGent,
  address,
  status,
  isRefreshing,
  refreshData
}) => {
  const symbol = scienceGent?.symbol || "TICKER";
  const [stats24h, setStats24h] = useState<{
    high_24h: number;
    low_24h: number;
    volume_24h: number;
    price_change_percentage_24h: number;
  } | null>(null);
  const [loading24hStats, setLoading24hStats] = useState(false);

  useEffect(() => {
    const loadStats24h = async () => {
      if (!address) return;
      
      setLoading24hStats(true);
      try {
        const stats = await fetchTokenStats24h(address);
        console.log('Fetched 24h stats:', stats);
        setStats24h(stats);
      } catch (error) {
        console.error('Error fetching 24h stats:', error);
      } finally {
        setLoading24hStats(false);
      }
    };
    
    loadStats24h();
  }, [address]);
  
  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Top section: Header + Stats */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-5">
                {/* Header with title, address and description */}
                <ScienceGentHeader scienceGent={scienceGent} address={address} />
                
                {/* Secondary stats (Holders, Txns, Users, etc.) */}
                <div className="mt-4">
                  <SecondaryStatsCards scienceGent={scienceGent} isLoading={status === 'loading'} />
                </div>
                
                {/* Price stats and chart section */}
                <div className="mt-6">
                  {/* Price stats row with left-aligned labels */}
                  <div className="grid grid-cols-7 mb-2">
                    <div className="p-2 rounded-sm bg-gray-50">
                      <div className="text-sm font-medium">Price</div>
                      <div className="font-bold">
                        <TokenPriceDisplay tokenAddress={address} />
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">24h Change</div>
                      <div className="font-bold">
                        <PriceChangeDisplay tokenAddress={address} />
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">Market Cap</div>
                      <div className="font-bold">
                        <MarketCapDisplay tokenAddress={address} />
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">Liquidity</div>
                      <div className="font-bold">
                        <LiquidityDisplay tokenAddress={address} />
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">24h volume</div>
                      <div className="font-bold">
                        {loading24hStats ? (
                          <span className="text-gray-400">Loading...</span>
                        ) : (
                          stats24h?.volume_24h ? `$${stats24h.volume_24h.toFixed(2)}` : "N/A"
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">24h high</div>
                      <div className="font-bold">
                        {loading24hStats ? (
                          <span className="text-gray-400">Loading...</span>
                        ) : (
                          stats24h?.high_24h ? `$${stats24h.high_24h.toFixed(8)}` : "N/A"
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <div className="text-sm font-medium">24h low</div>
                      <div className="font-bold">
                        {loading24hStats ? (
                          <span className="text-gray-400">Loading...</span>
                        ) : (
                          stats24h?.low_24h ? `$${stats24h.low_24h.toFixed(8)}` : "N/A"
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <PriceOverview tokenId={address} />
                </div>
              </div>
              
              {/* Right side swap panel */}
              <div className="border-l">
                <div className="p-4">
                  <TokenSwapInterface 
                    tokenAddress={address || ''}
                    tokenSymbol={symbol}
                    isMigrated={scienceGent?.is_migrated || false}
                    uniswapPair={scienceGent?.uniswapPair}
                    scienceGent={scienceGent}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main dashboard with tabs */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <ScienceGentDetailsDashboard
              address={address || ''}
              scienceGentData={scienceGent}
              status={status}
              isRefreshing={isRefreshing}
              refreshData={refreshData}
            />
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default DetailsLayout;
