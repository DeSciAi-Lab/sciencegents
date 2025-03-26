
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import OverviewTab from './OverviewTab';
import TradeTab from './TradeTab';
import ChatTab from './ChatTab';
import CapabilitiesTab from './CapabilitiesTab';

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
  const [activeTradingTab, setActiveTradingTab] = useState('tradebook');
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        <Tabs value={activeTradingTab} onValueChange={setActiveTradingTab} className="w-full">
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

      <TabsContent value="agent">
        <ChatTab 
          address={address} 
          scienceGent={scienceGentData} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
