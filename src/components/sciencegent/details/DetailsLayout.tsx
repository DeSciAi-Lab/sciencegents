
import React from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentHeader from './ScienceGentHeader';
import PriceOverview from './PriceOverview';
import TokenSwapInterface from '../TokenSwapInterface';
import ScienceGentDetailsDashboard from '../ScienceGentDetailsDashboard';
import ScienceGentStatsCards from '../ScienceGentStatsCards';

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
  
  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Top section: Header + Stats */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-5">
                <ScienceGentHeader scienceGent={scienceGent} address={address} />
                
                <div className="mt-4">
                  <ScienceGentStatsCards scienceGent={scienceGent} />
                </div>
                
                {/* Price graph and overview */}
                <div className="mt-6">
                  <div className="flex items-center mb-2">
                    <div className="text-lg font-bold flex items-center gap-2">
                      <span>{symbol}/ETH</span>
                      <span className="text-sm text-gray-500">▼</span>
                    </div>
                  </div>
                  <PriceOverview scienceGent={scienceGent} />
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
