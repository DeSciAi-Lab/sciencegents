
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, ExternalLink, Share2, Save } from 'lucide-react';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';
import { toast } from '@/components/ui/use-toast';
import ScienceGentStatsCards from '@/components/sciencegent/ScienceGentStatsCards';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);
  const [copied, setCopied] = React.useState(false);

  console.log("ScienceGentDetails render:", { address, status });

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* ScienceGent Header - New Layout */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="flex flex-col space-y-4">
            {/* Top section with profile and basic info */}
            <div className="flex items-center gap-4">
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
                  
                  <Button size="sm" variant="outline" className="rounded-full h-7">
                    <span className="px-2">Domain</span>
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full bg-blue-500 text-white hover:bg-blue-600 h-7">
                    <Twitter className="h-3.5 w-3.5" />
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full bg-blue-700 text-white hover:bg-blue-800 h-7">
                    <Facebook className="h-3.5 w-3.5" />
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full h-7">
                    <Share2 className="h-3.5 w-3.5 mr-1" />
                    <span>Share</span>
                  </Button>
                  
                  <Button size="sm" variant="outline" className="rounded-full h-7">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    <span>Save</span>
                  </Button>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {scienceGent?.description || "Description ----- ---- ----- ------ ----- ------ ---"}
                    <button className="text-blue-500 ml-1 text-xs">see more</button>
                  </p>
                </div>
              </div>
              
              {/* Current price info */}
              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="text-center">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <Badge className="bg-gray-100 text-gray-800">@ Slippage</Badge>
                  </div>
                  <div className="mt-1 flex justify-center items-baseline">
                    <h2 className="text-2xl font-bold text-gray-900">{(scienceGent?.tokenPrice || 0.000004).toFixed(7)} ETH</h2>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    ${(scienceGent?.tokenPriceUSD || 0.0003).toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm text-gray-500 mb-1">Market Cap</p>
                <p className="font-medium">{(scienceGent?.marketCap || 4.32).toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">${((scienceGent?.marketCap || 4.32) * 3000).toFixed(2)}</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm text-gray-500 mb-1">Liquidity</p>
                <p className="font-medium">{(scienceGent?.liquidity || 2.14).toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">${((scienceGent?.liquidity || 2.14) * 3000).toFixed(2)}</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm text-gray-500 mb-1">24h volume</p>
                <p className="font-medium">{(scienceGent?.volume24h || 4.32).toFixed(2)} ETH</p>
                <p className="text-xs text-gray-500">${((scienceGent?.volume24h || 4.32) * 3000).toFixed(2)}</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm text-gray-500 mb-1">Holders</p>
                <p className="font-medium">{scienceGent?.holders || 877}</p>
                <p className="text-xs text-gray-500">&nbsp;</p>
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
