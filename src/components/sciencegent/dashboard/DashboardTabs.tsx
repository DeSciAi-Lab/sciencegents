
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import OverviewTab from './OverviewTab';
import TradeTab from './TradeTab';
import ChatTab from './ChatTab';
import InfoTab from './InfoTabs/InfoTab';
import ScienceGentMaturityStatus from '../ScienceGentMaturityStatus';
import ScienceGentCapabilities from '../ScienceGentCapabilities';

interface DashboardTabsProps {
  address: string;
  scienceGentData: any;
  status: LoadingStatus;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  address,
  scienceGentData,
  status,
  isRefreshing,
  refreshData
}) => {
  // Main tab state
  const [activeMainTab, setActiveMainTab] = useState('overview');
  
  // Inner tab states - each main tab has its own inner tab state
  const [activeOverviewTab, setActiveOverviewTab] = useState('detailed-description');
  const [activeTradingTab, setActiveTradingTab] = useState('tradebook');
  
  // Handle main tab change
  const handleMainTabChange = (value: string) => {
    setActiveMainTab(value);
  };
  
  // Handle inner tab changes
  const handleOverviewTabChange = (value: string) => {
    setActiveOverviewTab(value);
  };
  
  const handleTradingTabChange = (value: string) => {
    setActiveTradingTab(value);
  };

  // Maturity and capability data
  const maturityProgress = scienceGentData?.maturity_progress || 75;
  const virtualETH = scienceGentData?.virtual_eth || 1;
  const collectedFees = scienceGentData?.collected_fees || 0;
  const isMigrated = scienceGentData?.is_migrated || false;
  const capabilityFees = scienceGentData?.capability_fees || 1;
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main content */}
      <div className="flex-1">
        <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start bg-white rounded-none p-0">
              <TabsTrigger 
                value="overview"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="trades"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Trades
              </TabsTrigger>
              <TabsTrigger 
                value="agent"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Agent Interface
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <Tabs value={activeOverviewTab} onValueChange={handleOverviewTabChange}>
              <div className="border-b">
                <TabsList className="w-full bg-white justify-start rounded-none p-0">
                  <TabsTrigger 
                    value="detailed-description"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Detailed Description
                  </TabsTrigger>
                  <TabsTrigger 
                    value="capabilities"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Capabilities
                  </TabsTrigger>
                  <TabsTrigger 
                    value="developer"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Developer
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <InfoTab 
                  activeTab={activeOverviewTab}
                  scienceGent={scienceGentData}
                />
              </div>
            </Tabs>
          </TabsContent>

          {/* Trades Tab Content */}
          <TabsContent value="trades">
            <Tabs value={activeTradingTab} onValueChange={handleTradingTabChange}>
              <div className="border-b">
                <TabsList className="w-full bg-white justify-start rounded-none p-0">
                  <TabsTrigger 
                    value="tradebook"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Tradebook
                  </TabsTrigger>
                  <TabsTrigger 
                    value="holders"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Holders
                  </TabsTrigger>
                  <TabsTrigger 
                    value="transactions"
                    className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
                  >
                    Transactions
                  </TabsTrigger>
                </TabsList>
              </div>
            
              <div className="p-6">
                <TradeTab 
                  address={address} 
                  scienceGentData={scienceGentData}
                  activeTab={activeTradingTab}
                />
              </div>
            </Tabs>
          </TabsContent>

          {/* Agent Interface Tab */}
          <TabsContent value="agent">
            <ChatTab 
              address={address} 
              scienceGent={scienceGentData} 
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sidebar: Maturity status and capabilities */}
      <div className="md:w-80 space-y-4">
        <ScienceGentMaturityStatus 
          maturityProgress={maturityProgress}
          virtualETH={virtualETH}
          collectedFees={collectedFees}
          isMigrated={isMigrated}
          capabilityFees={capabilityFees}
        />
        
        <ScienceGentCapabilities scienceGent={scienceGentData} />
      </div>
    </div>
  );
};

export default DashboardTabs;
