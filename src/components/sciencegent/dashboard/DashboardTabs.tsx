
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import OverviewTab from './OverviewTab';
import TradeTab from './TradeTab';
import ChatTab from './ChatTab';
import CapabilitiesTab from './CapabilitiesTab';
import MigrationTab from './MigrationTab';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('tradebook');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSubTabChange = (value: string) => {
    setActiveSubTab(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="border-b">
          <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="trades"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4"
            >
              Trades
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4"
            >
              Agent Interface
            </TabsTrigger>
            <TabsTrigger 
              value="capabilities"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4"
            >
              Capabilities
            </TabsTrigger>
            {scienceGentData?.isMigrationEligible && (
              <TabsTrigger 
                value="migration"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4"
              >
                Migration
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* Secondary Tabs for Trades */}
        {activeTab === 'trades' && (
          <div className="border-b">
            <Tabs value={activeSubTab} onValueChange={handleSubTabChange} className="w-full">
              <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
                <TabsTrigger 
                  value="tradebook"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm"
                >
                  Tradebook
                </TabsTrigger>
                <TabsTrigger 
                  value="holders"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm"
                >
                  Holders
                </TabsTrigger>
                <TabsTrigger 
                  value="transactions"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Main Tab Content */}
        <div className="p-0">
          <TabsContent value="overview">
            <OverviewTab 
              scienceGentData={scienceGentData} 
              isRefreshing={isRefreshing} 
              refreshData={refreshData} 
            />
          </TabsContent>

          <TabsContent value="trades">
            <TradeTab 
              address={address} 
              scienceGentData={scienceGentData}
            />
          </TabsContent>

          <TabsContent value="chat">
            <ChatTab 
              address={address} 
              scienceGent={scienceGentData} 
            />
          </TabsContent>

          <TabsContent value="capabilities">
            <CapabilitiesTab 
              scienceGent={scienceGentData}
            />
          </TabsContent>

          {scienceGentData?.isMigrationEligible && (
            <TabsContent value="migration">
              <MigrationTab 
                tokenAddress={address}
                scienceGent={scienceGentData} 
                refreshData={refreshData}
              />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
