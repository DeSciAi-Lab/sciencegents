
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
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="mb-4 border-b">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          {scienceGentData?.isMigrationEligible && (
            <TabsTrigger value="migration">Migration</TabsTrigger>
          )}
        </TabsList>
      </div>

      <TabsContent value="overview">
        <OverviewTab 
          scienceGentData={scienceGentData} 
          isRefreshing={isRefreshing} 
          refreshData={refreshData} 
        />
      </TabsContent>

      <TabsContent value="trade">
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

      <TabsContent value="migration">
        <MigrationTab 
          tokenAddress={address}
          scienceGent={scienceGentData} 
          refreshData={refreshData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
