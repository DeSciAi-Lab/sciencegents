
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import TokenStatistics from './TokenStatistics';
import TokenSwapInterface from './TokenSwapInterface';
import ScienceGentChat from './ScienceGentChat';
import CapabilitiesList from './CapabilitiesList';
import MaturityTracker from './MaturityTracker';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowUpRight, MessageCircle, Brain } from 'lucide-react';

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

  const hasPersona = Boolean(scienceGentData?.persona);
  const capabilitiesCount = scienceGentData?.capabilities?.length || 0;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
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
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="capabilities" className="flex items-center gap-1.5">
            <span>Capabilities</span>
            {capabilitiesCount > 0 && (
              <Badge variant="outline" className="ml-1 text-xs">{capabilitiesCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <TokenStatistics 
            scienceGent={scienceGentData} 
            isRefreshing={isRefreshing} 
            refreshData={refreshData} 
          />
          
          {/* Add maturity details section */}
          {scienceGentData && !scienceGentData.isMigrated && (
            <Card>
              <CardHeader>
                <CardTitle>Migration Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This ScienceGent token is currently trading on the internal DEX. Once it has collected
                  enough trading fees, it can be migrated to Uniswap for external trading.
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Virtual ETH</p>
                      <p className="font-medium">{scienceGentData.virtual_eth?.toFixed(2) || 0} ETH</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Required Fees</p>
                      <p className="font-medium">
                        {((scienceGentData.virtual_eth || 0) * 2 + (scienceGentData.capabilityFees || 0)).toFixed(2)} ETH
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Collected Fees</p>
                      <p className="font-medium">{scienceGentData.collected_fees?.toFixed(2) || 0} ETH</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capability Fees</p>
                      <p className="font-medium">{scienceGentData.capabilityFees?.toFixed(2) || 0} ETH</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <MaturityTracker
                      maturityProgress={scienceGentData.maturity_progress || 0}
                      isMigrated={scienceGentData.is_migrated || false}
                      virtualETH={scienceGentData.virtual_eth || 0}
                      collectedFees={scienceGentData.collected_fees || 0}
                      capabilityFees={scienceGentData.capabilityFees || 0}
                      remainingMaturityTime={scienceGentData.remaining_maturity_time}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-science-600" />
                    Chat with {scienceGentData?.name || "ScienceGent"}
                  </CardTitle>
                  <CardDescription>
                    {hasPersona 
                      ? 'This AI agent has a custom scientific persona' 
                      : 'This AI agent uses a default scientific assistant persona'}
                    {capabilitiesCount > 0 
                      ? ` and ${capabilitiesCount} specialized scientific capabilities` 
                      : ''}
                  </CardDescription>
                </div>
              </div>
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
              <CardDescription>
                {capabilitiesCount > 0 
                  ? `This ScienceGent has ${capabilitiesCount} specialized capabilities` 
                  : "This ScienceGent doesn't have any specialized capabilities yet"}
              </CardDescription>
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
