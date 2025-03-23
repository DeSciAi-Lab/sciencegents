
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
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Main Tabs */}
      <div className="border-b">
        <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
          <TabsTrigger 
            value="overview" 
            onClick={() => setActiveTab('overview')}
            className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="trades" 
            onClick={() => setActiveTab('trades')}
            className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4 ${activeTab === 'trades' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
          >
            Trades
          </TabsTrigger>
          <TabsTrigger 
            value="chat" 
            onClick={() => setActiveTab('chat')}
            className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4 ${activeTab === 'chat' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
          >
            Agent Interface
          </TabsTrigger>
          <TabsTrigger 
            value="capabilities" 
            onClick={() => setActiveTab('capabilities')}
            className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4 ${activeTab === 'capabilities' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
          >
            Capabilities
          </TabsTrigger>
          {scienceGentData?.isMigrationEligible && (
            <TabsTrigger 
              value="migration"
              onClick={() => setActiveTab('migration')}
              className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-4 ${activeTab === 'migration' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            >
              Migration
            </TabsTrigger>
          )}
        </TabsList>
      </div>

      {/* Secondary Tabs for Trades */}
      {activeTab === 'trades' && (
        <div className="border-b">
          <TabsList className="w-full bg-white justify-start rounded-none border-0 p-0">
            <TabsTrigger 
              value="tradebook" 
              onClick={() => setActiveSubTab('tradebook')}
              className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm ${activeSubTab === 'tradebook' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            >
              Tradebook
            </TabsTrigger>
            <TabsTrigger 
              value="holders" 
              onClick={() => setActiveSubTab('holders')}
              className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm ${activeSubTab === 'holders' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            >
              Holders
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              onClick={() => setActiveSubTab('transactions')}
              className={`data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white rounded-none px-6 py-3 text-sm ${activeSubTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            >
              Transactions
            </TabsTrigger>
          </TabsList>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="p-0">
        {activeTab === 'overview' && (
          <OverviewTab 
            scienceGentData={scienceGentData} 
            isRefreshing={isRefreshing} 
            refreshData={refreshData} 
          />
        )}

        {activeTab === 'trades' && (
          <TradeTab 
            address={address} 
            scienceGentData={scienceGentData}
          />
        )}

        {activeTab === 'chat' && (
          <ChatTab 
            address={address} 
            scienceGent={scienceGentData} 
          />
        )}

        {activeTab === 'capabilities' && (
          <CapabilitiesTab 
            scienceGent={scienceGentData}
          />
        )}

        {activeTab === 'migration' && scienceGentData?.isMigrationEligible && (
          <MigrationTab 
            tokenAddress={address}
            scienceGent={scienceGentData} 
            refreshData={refreshData}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardTabs;
