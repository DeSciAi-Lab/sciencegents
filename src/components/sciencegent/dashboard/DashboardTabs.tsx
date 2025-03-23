
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
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-gray-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="trades"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-gray-700"
            >
              Trades
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-gray-700"
            >
              Agent Interface
            </TabsTrigger>
            <TabsTrigger 
              value="capabilities"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-gray-700"
            >
              Capabilities
            </TabsTrigger>
            {scienceGentData?.isMigrationEligible && (
              <TabsTrigger 
                value="migration"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-gray-700"
              >
                Migration
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        {/* Main Tab Content */}
        <TabsContent value="overview">
          <OverviewTab 
            scienceGentData={scienceGentData} 
            isRefreshing={isRefreshing} 
            refreshData={refreshData} 
          />
        </TabsContent>

        <TabsContent value="trades">
          {/* Secondary Tabs for Trades */}
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <div className="border-b">
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
            </div>
          
            <TabsContent value="tradebook">
              <TradeTab 
                address={address} 
                scienceGentData={scienceGentData}
              />
            </TabsContent>
            
            <TabsContent value="holders">
              <div className="p-8 flex items-center justify-center h-80">
                <p className="text-gray-500">Holders information will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="transactions">
              <div className="p-8 flex items-center justify-center h-80">
                <p className="text-gray-500">Transaction history will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
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
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
