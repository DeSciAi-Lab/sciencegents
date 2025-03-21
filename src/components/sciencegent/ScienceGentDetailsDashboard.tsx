
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import TokenStatistics from './TokenStatistics';
import TokenSwapInterface from './TokenSwapInterface';
import ScienceGentChat from './ScienceGentChat';
import CapabilitiesList from './CapabilitiesList';

interface ScienceGentDetailsDashboardProps {
  address: string;
  scienceGentData: any;
  status: LoadingStatus;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const ScienceGentDetailsDashboard: React.FC<ScienceGentDetailsDashboardProps> = ({
  address,
  scienceGentData,
  status,
  isRefreshing,
  refreshData
}) => {
  const isLoading = status === LoadingStatus.Loading;
  const isError = status === LoadingStatus.Error || status === LoadingStatus.NotFound;

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (isError) {
    return <ErrorDashboard address={address} />;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <TokenStatistics 
            scienceGent={scienceGentData} 
            isRefreshing={isRefreshing} 
            refreshData={refreshData} 
          />
        </TabsContent>
        
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat with {scienceGentData?.name || "ScienceGent"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScienceGentChat 
                scienceGent={scienceGentData}
                address={address}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trade">
          <Card>
            <CardHeader>
              <CardTitle>Trade {scienceGentData?.symbol || "Tokens"}</CardTitle>
            </CardHeader>
            <CardContent>
              <TokenSwapInterface 
                tokenAddress={address}
                tokenSymbol={scienceGentData?.symbol || "Token"}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="capabilities">
          <Card>
            <CardHeader>
              <CardTitle>Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <CapabilitiesList 
                scienceGent={scienceGentData}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Loading skeleton component
const LoadingDashboard = () => (
  <div className="space-y-6">
    <Skeleton className="h-12 w-full mb-6" />
    <div className="space-y-4">
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

// Error display component
const ErrorDashboard = ({ address }: { address: string }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-destructive">Error Loading ScienceGent</CardTitle>
    </CardHeader>
    <CardContent>
      <p>We couldn't load the ScienceGent with address: {address}</p>
      <p className="mt-2">This could be because:</p>
      <ul className="list-disc list-inside mt-2">
        <li>The address is invalid</li>
        <li>The ScienceGent doesn't exist</li>
        <li>There was a network error</li>
      </ul>
    </CardContent>
  </Card>
);

export default ScienceGentDetailsDashboard;
