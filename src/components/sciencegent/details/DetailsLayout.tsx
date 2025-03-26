
import React from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentHeader from './ScienceGentHeader';
import PriceOverview from './PriceOverview';
import TokenSwapInterface from '../TokenSwapInterface';
import ScienceGentDetailsDashboard from '../ScienceGentDetailsDashboard';
import ScienceGentStatsCards from './ScienceGentStatsCards';
import ScienceGentMaturityStatus from '../ScienceGentMaturityStatus';
import ScienceGentCapabilities from '../ScienceGentCapabilities';

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
        <div className="bg-white rounded-lg border overflow-hidden mb-4">
          <div className="grid md:grid-cols-3">
            <div className="md:col-span-2 p-5">
              <ScienceGentHeader scienceGent={scienceGent} address={address} />
              
              <div className="mt-4">
                <ScienceGentStatsCards scienceGent={scienceGent} />
              </div>
              
              <div className="mt-6">
                <PriceOverview scienceGent={scienceGent} />
              </div>
            </div>
            
            <div className="border-l">
              <div className="p-4">
                <TokenSwapInterface 
                  tokenAddress={address || ''}
                  tokenSymbol={symbol}
                  isMigrated={scienceGent?.is_migrated || false}
                  uniswapPair={scienceGent?.uniswapPair}
                  scienceGent={scienceGent}
                />
                
                <div className="mt-4 space-y-4">
                  <ScienceGentMaturityStatus 
                    maturityProgress={scienceGent?.maturity_progress || 75}
                    virtualETH={scienceGent?.virtual_eth || 1}
                    collectedFees={scienceGent?.collected_fees || 0}
                    isMigrated={scienceGent?.is_migrated || false}
                    capabilityFees={scienceGent?.capability_fees || 1}
                  />
                  
                  <ScienceGentCapabilities scienceGent={scienceGent} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScienceGentDetailsDashboard
          address={address || ''}
          scienceGentData={scienceGent}
          status={status}
          isRefreshing={isRefreshing}
          refreshData={refreshData}
        />
      </div>
    </NavbarLayout>
  );
};

export default DetailsLayout;
