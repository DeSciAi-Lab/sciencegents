
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, Share2, Save } from 'lucide-react';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

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
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  if (status === LoadingStatus.Loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-20 pb-10">
          <div className="p-8 bg-white rounded-lg shadow-sm border">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === LoadingStatus.Error || status === LoadingStatus.NotFound) {
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

  // Stats for UI display
  const marketCap = scienceGent?.marketCap || 4.32;
  const liquidity = scienceGent?.liquidity || 2.14;
  const volume24h = scienceGent?.volume24h || 4.32;
  const holders = scienceGent?.holders || 877;
  const maturityProgress = scienceGent?.maturityProgress || 75;
  const virtualETH = scienceGent?.virtualETH || 2;
  const capabilityFees = scienceGent?.capabilityFees || 1;
  
  // Format dollar values
  const formatDollars = (ethValue: number) => {
    return `$${(ethValue * 3000).toFixed(2)}k`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* ScienceGent Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="flex flex-col space-y-4">
            {/* Top section with profile and basic info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                {scienceGent?.profilePic ? (
                  <img src={scienceGent.profilePic} alt={scienceGent.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold">{scienceGent?.name?.charAt(0) || '?'}</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{scienceGent?.name || 'ScienceGent Name'}</h1>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">${scienceGent?.symbol || 'STICKER'}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                    <span className="text-sm text-gray-600">{formatAddress(scienceGent?.address || '')}</span>
                    <button 
                      onClick={() => scienceGent?.address && copyToClipboard(scienceGent.address)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  
                  <Button size="sm" variant="outline" className="rounded-md h-7 px-4">
                    Domain
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 h-7 w-7 p-0">
                    <Twitter className="h-3.5 w-3.5" />
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full bg-blue-700 text-white hover:bg-blue-800 h-7 w-7 p-0">
                    <Facebook className="h-3.5 w-3.5" />
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-md h-7">
                    <Share2 className="h-3.5 w-3.5 mr-1" />
                    <span>Share</span>
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-md h-7">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    <span>Save</span>
                  </Button>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    Description ----- ---- ----- ------ ----- ------ ---
                    <button className="text-blue-500 ml-1 text-xs">see more</button>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-md p-3 border relative overflow-hidden">
                <p className="text-sm text-gray-500 mb-1">Market Cap</p>
                <p className="font-medium">{marketCap.toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">{formatDollars(marketCap)}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
              </div>
              
              <div className="bg-white rounded-md p-3 border relative overflow-hidden">
                <p className="text-sm text-gray-500 mb-1">Liquidity</p>
                <p className="font-medium">{liquidity.toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">{formatDollars(liquidity)}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
              </div>
              
              <div className="bg-white rounded-md p-3 border relative overflow-hidden">
                <p className="text-sm text-gray-500 mb-1">24h volume</p>
                <p className="font-medium">{volume24h.toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">{formatDollars(volume24h)}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
              </div>
              
              <div className="bg-white rounded-md p-3 border relative overflow-hidden">
                <p className="text-sm text-gray-500 mb-1">Holders</p>
                <p className="font-medium">{holders}</p>
                <p className="text-xs text-gray-500">&nbsp;</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg flex items-center justify-center opacity-30"></div>
              </div>
            </div>
            
            {/* Maturity status section */}
            <div className="bg-white rounded-md p-4 border">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">Maturity Status</h3>
                <span className="font-bold">{maturityProgress}%</span>
              </div>
              
              <Progress value={maturityProgress} className="h-2 bg-gray-200" />
              
              <p className="text-sm text-gray-600 mt-3">
                The ScienceGent will become eligible to migrate to Uniswap on generating _____ ETH in trading fee (
                2x virtualETH = {virtualETH * 2} + capability fees = {capabilityFees})
              </p>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 border rounded-md p-3 text-center">
                  <p className="text-sm text-gray-500">Users</p>
                  <p className="font-medium">1273</p>
                </div>
                <div className="bg-gray-50 border rounded-md p-3 text-center">
                  <p className="text-sm text-gray-500">Interactions</p>
                  <p className="font-medium">1273</p>
                </div>
                <div className="bg-gray-50 border rounded-md p-3 text-center">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="font-medium">1273</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm mb-2">5 Capabilities:</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white border rounded-full px-3 py-1 text-sm">Chat</div>
                  <div className="bg-white border rounded-full px-3 py-1 text-sm">Molecular Vision</div>
                  <div className="bg-white border rounded-full px-3 py-1 text-sm">LLAMPS</div>
                  <div className="bg-white border rounded-full px-3 py-1 text-sm">Bose-Einstein Simulation</div>
                  <div className="bg-white border rounded-full px-3 py-1 text-sm">more</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <ScienceGentDetailsDashboard
          address={address || ''}
          scienceGentData={scienceGent}
          status={status}
          isRefreshing={isRefreshing}
          refreshData={refreshData}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ScienceGentDetails;
