
import React, { useState } from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentHeader from './ScienceGentHeader';
import PriceOverview from './PriceOverview';
import TokenSwapInterface from '../TokenSwapInterface';
import ScienceGentDetailsDashboard from '../ScienceGentDetailsDashboard';
import ScienceGentStatsCards from './ScienceGentStatsCards';
import ScienceGentMaturityStatus from '../ScienceGentMaturityStatus';
import ScienceGentCapabilities from '../ScienceGentCapabilities';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeMainTab, setActiveMainTab] = useState('overview');
  
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
                    <div className="text-xl font-bold flex items-center gap-2">
                      <span>TICKER/ETH</span>
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

          {/* Main tabs */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
              <div className="border-b">
                <TabsList className="w-full justify-start bg-white rounded-none p-0">
                  <TabsTrigger 
                    value="overview"
                    className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                    onClick={() => setActiveMainTab('overview')}
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trades"
                    className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                    onClick={() => setActiveMainTab('trades')}
                  >
                    Trades
                  </TabsTrigger>
                  <TabsTrigger 
                    value="agent"
                    className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
                    onClick={() => setActiveMainTab('agent')}
                  >
                    Agent Interface
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            {/* Render dashboard content based on active tab */}
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
