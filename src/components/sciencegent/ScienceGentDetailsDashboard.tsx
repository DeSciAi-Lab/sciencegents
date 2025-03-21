
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, ExternalLink, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TokenStatistics from "./TokenStatistics";
import TradingChart from "./TradingChart";
import TokenSwapInterface from "./TokenSwapInterface";
import ScienceGentChat from "./ScienceGentChat";
import { useScienceGentDetails, LoadingStatus } from '@/hooks/useScienceGentDetails';

interface ScienceGentDetailsDashboardProps {
  address: string;
}

const ScienceGentDetailsDashboard = ({ address }: ScienceGentDetailsDashboardProps) => {
  const [copied, setCopied] = useState(false);
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);
  
  // Check if loading
  if (status === LoadingStatus.Loading || isRefreshing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="h-24 bg-secondary rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-secondary rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-secondary rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  // Check if error or not found
  if (status === LoadingStatus.Error || status === LoadingStatus.NotFound || !scienceGent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Error Loading ScienceGent</h2>
              <p className="text-muted-foreground mt-2">
                {status === LoadingStatus.NotFound 
                  ? "Could not find the requested ScienceGent" 
                  : "Error loading ScienceGent details"}
              </p>
              <Button asChild className="mt-4">
                <a href="/explore">Back to Explore</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Mock data for now - in real app these would come from the API
  const dummyStats = {
    marketCap: scienceGent.market_cap || 1000000,
    price: scienceGent.token_price || 0.024122,
    priceChange24h: 5.7,
    volume24h: 69850,
    holders: 266547,
    maturityProgress: scienceGent.maturity_progress || 45,
    migrationStatus: scienceGent.is_migrated ? 'migrated' : 'pending' as 'pending' | 'eligible' | 'migrated',
    createdAt: scienceGent.created_on_chain_at || new Date().toISOString(),
  };
  
  const truncateAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Token Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={scienceGent.profile_image || `/placeholder.svg`} alt={scienceGent.name} />
                  <AvatarFallback>{scienceGent.name?.substring(0, 2) || 'SG'}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{scienceGent.name}</h1>
                    <Badge variant="outline" className="uppercase">{scienceGent.token_symbol}</Badge>
                    {scienceGent.is_migrated && <Badge className="bg-green-500">Migrated</Badge>}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{truncateAddress(address)}</span>
                    <button 
                      onClick={copyAddressToClipboard}
                      className="text-primary hover:text-primary/80"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {scienceGent.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={scienceGent.website} target="_blank" rel="noopener noreferrer">
                      <Link className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Etherscan
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Token Statistics */}
        <TokenStatistics {...dummyStats} />
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Trading Chart */}
          <div className="lg:col-span-2">
            <TradingChart tokenSymbol={scienceGent.token_symbol || 'TOKEN'} />
          </div>
          
          {/* Right Column: Swap Interface */}
          <div>
            <TokenSwapInterface 
              tokenAddress={address}
              tokenSymbol={scienceGent.token_symbol || 'TOKEN'}
              tokenPrice={scienceGent.token_price || 0.024122}
            />
          </div>
        </div>
        
        {/* Tabs Section */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
                <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="holders">Holders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {scienceGent.description || 'No description available.'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Domain</h3>
                  <Badge variant="secondary" className="text-sm">
                    {scienceGent.domain || 'General'}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Creator</h3>
                  <div className="flex items-center gap-2">
                    <span>{truncateAddress(scienceGent.creator_address || address)}</span>
                    <a
                      href={`https://etherscan.io/address/${scienceGent.creator_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ai-chat">
                <ScienceGentChat scienceGent={scienceGent} />
              </TabsContent>
              
              <TabsContent value="capabilities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scienceGent.capabilities && scienceGent.capabilities.length > 0 ? (
                    scienceGent.capabilities.map((capability: any) => (
                      <Card key={capability.id}>
                        <CardHeader>
                          <CardTitle>{capability.capability_id}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {capability.description || 'No description available.'}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="col-span-2 text-center text-muted-foreground py-8">
                      No capabilities added to this ScienceGent.
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="min-h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Analytics data will be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="holders">
                <div className="min-h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Token holders data will be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScienceGentDetailsDashboard;
