
import React from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScienceGentHeader from './ScienceGentHeader';
import ScienceGentStatsCards from '../ScienceGentStatsCards';
import PriceOverview from './PriceOverview';
import TokenSwapInterface from '../TokenSwapInterface';
import ScienceGentDetailsDashboard from '../ScienceGentDetailsDashboard';

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg border overflow-hidden mb-4">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-5">
                <ScienceGentHeader scienceGent={scienceGent} address={address} />
                <ScienceGentStatsCards scienceGent={scienceGent} />
                <PriceOverview scienceGent={scienceGent} />
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
      </main>
      <Footer />
    </div>
  );
};

export default DetailsLayout;
