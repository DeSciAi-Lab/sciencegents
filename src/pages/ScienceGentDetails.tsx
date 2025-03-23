
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Check, Twitter, Facebook, ExternalLink, Share2 } from 'lucide-react';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import ScienceGentChart from '@/components/sciencegent/ScienceGentChart';
import ScienceGentMaturityStatus from '@/components/sciencegent/ScienceGentMaturityStatus';
import ScienceGentCapabilities from '@/components/sciencegent/ScienceGentCapabilities';
import ScienceGentStatsCards from '@/components/sciencegent/ScienceGentStatsCards';
import ScienceGentSwapPanel from '@/components/sciencegent/ScienceGentSwapPanel';
import ScienceGentChat from '@/components/sciencegent/ScienceGentChat';
import { toast } from '@/components/ui/use-toast';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard",
          variant: "destructive"
        });
      });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  if (status === LoadingStatus.Loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-20 pb-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="w-full md:w-1/3">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === LoadingStatus.Error || !scienceGent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-20 pb-10">
          <div className="p-6 bg-destructive/10 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Error Loading ScienceGent</h2>
            <p>Unable to load details for this ScienceGent. Please try again later.</p>
            <p className="text-sm text-gray-500 mt-2">Address: {address}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  console.log("Rendering ScienceGent:", scienceGent);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-20 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column (about 2/3 width) */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* ScienceGent header */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  {scienceGent.profilePic ? (
                    <img src={scienceGent.profilePic} alt={scienceGent.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold">{scienceGent.name?.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-1 gap-2">
                    <h1 className="text-2xl font-bold">{scienceGent.name}</h1>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">{scienceGent.symbol}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                      <span className="text-sm text-gray-600">{formatAddress(scienceGent.address)}</span>
                      <button 
                        onClick={() => copyToClipboard(scienceGent.address)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    
                    <Badge variant="outline" className="bg-gray-50">{scienceGent.domain}</Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                    {scienceGent.description || "No description available"}
                    {scienceGent.description && scienceGent.description.length > 60 && (
                      <button className="text-blue-500 hover:underline ml-1">see more</button>
                    )}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Twitter size={16} className="mr-1" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Facebook size={16} className="mr-1" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Share2 size={16} className="mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats cards */}
              <ScienceGentStatsCards scienceGent={scienceGent} />
            </div>
            
            {/* Chart section */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{scienceGent.symbol}/ETH</h2>
                  <span className="text-2xl font-bold text-green-500">
                    {scienceGent.tokenPrice?.toFixed(8) || '0.00000000'}
                  </span>
                </div>
                
                <div className="flex gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">24h change:</span>
                    <span className={scienceGent.priceChange24h >= 0 ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                      {(scienceGent.priceChange24h || 0).toFixed(2)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">24h high:</span>
                    <span className="ml-1">{scienceGent.tokenPrice?.toFixed(8) || '0.00000000'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">24h low:</span>
                    <span className="ml-1">{(scienceGent.tokenPrice * 0.9)?.toFixed(8) || '0.00000000'}</span>
                  </div>
                </div>
              </div>
              
              <ScienceGentChart address={scienceGent.address} symbol={scienceGent.symbol} />
            </div>
            
            {/* Tabs section */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full border-b">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="trades" className="flex-1">Trades</TabsTrigger>
                  <TabsTrigger value="agent" className="flex-1">Agent Interface</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">ScienceGent Overview</h3>
                  <div className="space-y-4">
                    <p>{scienceGent.description || "No description available"}</p>
                    
                    {scienceGent.website && (
                      <div>
                        <h4 className="font-medium mb-2">Website</h4>
                        <a 
                          href={scienceGent.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          {scienceGent.website} <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Creator</h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {formatAddress(scienceGent.creator_address || '')}
                        </span>
                        <button 
                          onClick={() => scienceGent.creator_address && copyToClipboard(scienceGent.creator_address)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="trades" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
                  <div className="text-center text-gray-500 py-10">
                    Trade history will appear here
                  </div>
                </TabsContent>
                
                <TabsContent value="agent" className="p-0">
                  <ScienceGentChat 
                    address={scienceGent.address} 
                    scienceGent={scienceGent} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right column (about 1/3 width) */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Swap panel */}
            <ScienceGentSwapPanel 
              tokenAddress={scienceGent.address} 
              tokenSymbol={scienceGent.symbol} 
              isMigrated={scienceGent.isMigrated}
            />
            
            {/* Maturity status */}
            <ScienceGentMaturityStatus 
              maturityProgress={scienceGent.maturityProgress}
              virtualETH={scienceGent.virtualEth || 0}
              collectedFees={scienceGent.collectedFees || 0}
              isMigrated={scienceGent.isMigrated}
            />
            
            {/* Community stats */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-3 border-b">
                <div className="p-4 text-center border-r">
                  <p className="text-sm text-gray-500 mb-1">Users</p>
                  <p className="font-bold">{scienceGent.stats?.[0]?.holders || 0}</p>
                </div>
                <div className="p-4 text-center border-r">
                  <p className="text-sm text-gray-500 mb-1">Interactions</p>
                  <p className="font-bold">{scienceGent.stats?.[0]?.transactions || 0}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Revenue</p>
                  <p className="font-bold">{scienceGent.stats?.[0]?.trade_volume_eth?.toFixed(4) || 0}</p>
                </div>
              </div>
            </Card>
            
            {/* Capabilities */}
            <ScienceGentCapabilities scienceGent={scienceGent} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScienceGentDetails;
