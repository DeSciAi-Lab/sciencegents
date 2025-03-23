
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, ExternalLink, Share2 } from 'lucide-react';
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
        {/* ScienceGent Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left Column with Profile Pic and Info */}
            <div className="flex items-start gap-4 md:w-2/3">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                {scienceGent?.profilePic ? (
                  <img src={scienceGent.profilePic} alt={scienceGent.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold">{scienceGent?.name?.charAt(0) || '?'}</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-1 gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold">{scienceGent?.name || 'Unknown ScienceGent'}</h1>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200">{scienceGent?.symbol || '???'}</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
                    <span className="text-sm text-gray-600">{formatAddress(scienceGent?.address || '')}</span>
                    <button 
                      onClick={() => scienceGent?.address && copyToClipboard(scienceGent.address)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  
                  <Badge variant="outline" className="bg-gray-50">{scienceGent?.domain || 'General'}</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {scienceGent?.description || "No description available"}
                  {scienceGent?.description && scienceGent.description.length > 100 && (
                    <button className="text-science-600 ml-1 text-xs">...see more</button>
                  )}
                </p>
                
                <div className="flex flex-wrap gap-2">
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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => refreshData()}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column with Price */}
            <div className="md:w-1/3 mt-4 md:mt-0 bg-gray-50 p-4 rounded-lg border">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <div className="flex justify-center items-baseline gap-2">
                  <h2 className="text-2xl font-bold">{(scienceGent?.tokenPrice || 0).toFixed(7)} ETH</h2>
                  <span className="text-gray-500">${(scienceGent?.tokenPriceUSD || 0).toFixed(4)}</span>
                </div>
                
                <div className="border-t border-gray-200 my-3 pt-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Sell</span>
                      <span className="font-medium text-red-500">0.0001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Buy</span>
                      <span className="font-medium text-green-500">0.0002</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-3 bg-purple-500 hover:bg-purple-600">
                  Trade Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <ScienceGentStatsCards scienceGent={scienceGent} />
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
