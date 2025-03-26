
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import OverviewTab from './OverviewTab';
import TradeTab from './TradeTab';
import ChatTab from './ChatTab';
import CapabilitiesTab from './CapabilitiesTab';
import InfoTab from './InfoTab';

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
  const [activeMainTab, setActiveMainTab] = useState('overview');
  const [activeTradingTab, setActiveTradingTab] = useState('tradebook');
  const [activeOverviewTab, setActiveOverviewTab] = useState('detailed-description');
  
  return (
    <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
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
        <div className="border-b">
          <TabsList className="w-full bg-white justify-start rounded-none p-0">
            <TabsTrigger 
              value="detailed-description"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveOverviewTab('detailed-description')}
            >
              Detailed Description
            </TabsTrigger>
            <TabsTrigger 
              value="capabilities"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveOverviewTab('capabilities')}
            >
              Capabilities
            </TabsTrigger>
            <TabsTrigger 
              value="developer"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveOverviewTab('developer')}
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
      </TabsContent>

      {/* Trades Tab Content */}
      <TabsContent value="trades">
        <div className="border-b">
          <TabsList className="w-full bg-white justify-start rounded-none p-0">
            <TabsTrigger 
              value="tradebook"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveTradingTab('tradebook')}
            >
              Tradebook
            </TabsTrigger>
            <TabsTrigger 
              value="holders"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveTradingTab('holders')}
            >
              Holders
            </TabsTrigger>
            <TabsTrigger 
              value="transactions"
              className="rounded-none px-6 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
              onClick={() => setActiveTradingTab('transactions')}
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
      </TabsContent>

      {/* Agent Interface Tab */}
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
