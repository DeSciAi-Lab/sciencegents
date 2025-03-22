
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageCircle, Brain, GitMerge } from 'lucide-react';
import OverviewTab from './OverviewTab';
import ChatTab from './ChatTab';
import TradeTab from './TradeTab';
import MigrationTab from './MigrationTab';
import CapabilitiesTab from './CapabilitiesTab';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';

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
  const hasPersona = Boolean(scienceGentData?.persona);
  const capabilitiesCount = scienceGentData?.capabilities?.length || 0;
  const isMigrated = scienceGentData?.is_migrated || false;

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" />
          <span>Chat</span>
          {hasPersona && (
            <Badge variant="outline" className="ml-1 text-xs bg-purple-50 text-purple-700 border-purple-200">
              <Brain className="h-3 w-3 mr-1" />
              Custom Persona
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="trade" className="flex items-center gap-1.5">
          <span>Trade</span>
          {isMigrated && (
            <Badge variant="outline" className="ml-1 text-xs bg-green-50 text-green-700 border-green-200">
              Uniswap
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="migrate" className="flex items-center gap-1.5">
          <GitMerge className="h-4 w-4" />
          <span>Migration</span>
          {isMigrated && (
            <Badge variant="outline" className="ml-1 text-xs bg-green-50 text-green-700 border-green-200">
              Completed
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="capabilities" className="flex items-center gap-1.5">
          <span>Capabilities</span>
          {capabilitiesCount > 0 && (
            <Badge variant="outline" className="ml-1 text-xs">{capabilitiesCount}</Badge>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab 
          scienceGentData={scienceGentData}
          isRefreshing={isRefreshing}
          refreshData={refreshData}
        />
      </TabsContent>
      
      <TabsContent value="chat">
        <ChatTab 
          scienceGentData={scienceGentData}
          address={address}
        />
      </TabsContent>
      
      <TabsContent value="trade">
        <TradeTab 
          address={address}
          scienceGentData={scienceGentData}
        />
      </TabsContent>

      <TabsContent value="migrate">
        <MigrationTab 
          tokenAddress={address}
          scienceGent={scienceGentData}
          refreshData={refreshData}
        />
      </TabsContent>
      
      <TabsContent value="capabilities">
        <CapabilitiesTab 
          scienceGent={scienceGentData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
