
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, Share2, ExternalLink, Settings2 } from 'lucide-react';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';
import ScienceGentStatsCards from '@/components/sciencegent/ScienceGentStatsCards';
import { toast } from '@/components/ui/use-toast';
import TokenSwapInterface from '@/components/sciencegent/TokenSwapInterface';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);
  const [copied, setCopied] = React.useState(false);

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
    return `${address.substring(0, 8)}...${address.slice(-5)}`;
  };

  if (status === LoadingStatus.Loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-6 pb-10">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === LoadingStatus.Error || status === LoadingStatus.NotFound) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-6 pb-10">
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

  const symbol = scienceGent?.symbol || "TICKER";
  const tokenPrice = scienceGent?.tokenPrice || "0.000004";
  const priceUSD = scienceGent?.tokenPriceUSD || "0.0003";
  const priceChange24h = scienceGent?.priceChange24h || -942.38;
  const highPrice24h = scienceGent?.highPrice24h || 47444.1;
  const lowPrice24h = scienceGent?.lowPrice24h || 45555.1;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg border overflow-hidden mb-4">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    {scienceGent?.profilePic ? (
                      <img src={scienceGent.profilePic} alt={scienceGent.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {scienceGent?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{scienceGent?.name || "ScienceGent Name"}</h1>
                      <Badge className="ml-2 bg-gray-100 text-gray-800 font-medium border-0 rounded">${symbol}</Badge>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center bg-gray-100 rounded px-2 py-1 max-w-[220px]">
                        <span className="text-sm text-gray-600 mr-1">{formatAddress(address || '')}</span>
                        <button 
                          onClick={() => address && copyToClipboard(address)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>

                      <div className="flex items-center ml-3 gap-2">
                        <Button size="sm" variant="outline" className="h-7 rounded-md px-3">
                          Domain
                        </Button>
                        
                        <Button size="sm" variant="outline" className="rounded-full bg-[#1DA1F2] text-white h-7 w-7 p-0 flex items-center justify-center">
                          <Twitter className="h-3.5 w-3.5" />
                        </Button>
                        
                        <Button size="sm" variant="outline" className="rounded-full bg-[#4267B2] text-white h-7 w-7 p-0 flex items-center justify-center">
                          <Facebook className="h-3.5 w-3.5" />
                        </Button>
                        
                        <div className="flex items-center gap-2 ml-2">
                          <Button variant="outline" size="sm" className="h-7 rounded-md px-3 flex items-center gap-1">
                            <Share2 className="h-3.5 w-3.5" />
                            <span>Share</span>
                          </Button>

                          <Button variant="outline" size="sm" className="h-7 rounded-md px-3 flex items-center gap-1">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Save</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-full px-4 py-1.5 w-full md:max-w-[500px] text-sm text-gray-600">
                      {scienceGent?.description || "Description ----- ---- ----- ------ ----- ------ ---"}
                      <button className="text-blue-500 ml-1 text-xs">see more</button>
                    </div>
                  </div>
                </div>

                <ScienceGentStatsCards scienceGent={scienceGent} />

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="text-lg font-bold flex items-center">
                        {symbol}/ETH <span className="ml-1">▼</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-gray-600 mr-2">Price</span>
                        <span className="text-[#00bfa5] text-2xl font-medium mr-1">{tokenPrice}</span>
                        <span className="text-gray-800">ETH</span>
                        <div>
                          <span className="text-[#00bfa5]">${priceUSD}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-10">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">24h change</p>
                        <p className="font-medium text-red-500">{priceChange24h}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">24h high</p>
                        <p className="font-medium">{highPrice24h}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">24h low</p>
                        <p className="font-medium">{lowPrice24h}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-md h-[300px] border p-4 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/805373ea-b8fd-4d94-827d-c33afa2bcf0c.png" 
                      alt="Trading chart" 
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-l">
                <div className="p-4">
                  <TokenSwapInterface 
                    tokenAddress={address || ''}
                    tokenSymbol={symbol}
                    isMigrated={scienceGent?.is_migrated || false}
                    uniswapPair={scienceGent?.uniswapPair}
                    scienceGent={scienceGent}
                  />
                </div>
              </div>
            </div>
          </div>

          <ScienceGentDetailsDashboard
            address={address || ''}
            scienceGentData={scienceGent}
            status={status}
            isRefreshing={isRefreshing}
            refreshData={refreshData}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScienceGentDetails;
