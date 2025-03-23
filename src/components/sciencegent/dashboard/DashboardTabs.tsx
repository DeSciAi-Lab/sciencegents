
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

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="border-b">
        <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-science-600 data-[state=active]:bg-white rounded-none px-6 py-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="trade" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-science-600 data-[state=active]:bg-white rounded-none px-6 py-4"
          >
            Trades
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-science-600 data-[state=active]:bg-white rounded-none px-6 py-4"
          >
            Agent Interface
          </TabsTrigger>
          <TabsTrigger 
            value="capabilities" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-science-600 data-[state=active]:bg-white rounded-none px-6 py-4"
          >
            Capabilities
          </TabsTrigger>
          {scienceGentData?.isMigrationEligible && (
            <TabsTrigger 
              value="migration"
              className="data-[state=active]:border-b-2 data-[state=active]:border-science-600 data-[state=active]:bg-white rounded-none px-6 py-4"
            >
              Migration
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      <div className="p-6">
        <TabsContent value="overview" className="m-0">
          <OverviewTab 
            scienceGentData={scienceGentData} 
            isRefreshing={isRefreshing} 
            refreshData={refreshData} 
          />
        </TabsContent>

        <TabsContent value="trade" className="m-0">
          <TradeTab 
            address={address} 
            scienceGentData={scienceGentData}
          />
        </TabsContent>

        <TabsContent value="chat" className="m-0">
          <ChatTab 
            address={address} 
            scienceGent={scienceGentData} 
          />
        </TabsContent>

        <TabsContent value="capabilities" className="m-0">
          <CapabilitiesTab 
            scienceGent={scienceGentData}
          />
        </TabsContent>

        <TabsContent value="migration" className="m-0">
          <MigrationTab 
            tokenAddress={address}
            scienceGent={scienceGentData} 
            refreshData={refreshData}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
