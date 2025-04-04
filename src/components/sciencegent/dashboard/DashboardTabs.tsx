import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import OverviewTab from './OverviewTab';
import TradeTab from './TradeTab';
import ChatTab from './ChatTab';
import InfoTab from './InfoTab';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, MessageCircle, FileText } from 'lucide-react';

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

  // Determine if content is loading
  const isLoading = status === LoadingStatus.Loading || isRefreshing;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Main content - now it takes full width */}
      <div className="flex-1">
        <Tabs value={activeMainTab} onValueChange={handleMainTabChange} className="w-full">
          <div className="border-b">
            <TabsList className="w-full justify-start bg-white rounded-none p-0">
              <TabsTrigger 
                value="overview"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="trades"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Trades
              </TabsTrigger>
              <TabsTrigger 
                value="agent"
                className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
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
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                ) : (
                  <InfoTab 
                    activeTab={activeOverviewTab}
                    scienceGent={scienceGentData}
                  />
                )}
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
                </TabsList>
              </div>
            
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-32" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : scienceGentData ? (
                  <TradeTab 
                    address={address} 
                    scienceGentData={scienceGentData}
                    activeTab={activeTradingTab}
                  />
                ) : (
                  <div className="text-center text-red-500 p-4">
                    Could not load ScienceGent data. Please refresh.
                  </div>
                )}
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
    </div>
  );
};

export default DashboardTabs;
