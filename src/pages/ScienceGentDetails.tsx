
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import { ExternalLink, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-4">
              <Link to="/explore">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Explore
                </Button>
              </Link>
              
              {status !== LoadingStatus.Loading && scienceGent && (
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">{scienceGent.name}</h1>
                    <div className="flex items-center mt-2">
                      <p className="text-muted-foreground mr-2">{scienceGent.symbol}</p>
                      <a 
                        href={`https://sepolia.etherscan.io/address/${scienceGent.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground flex items-center hover:underline"
                      >
                        {scienceGent.address.substring(0, 8)}...{scienceGent.address.substring(36)}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  
                  {scienceGent.website && (
                    <a
                      href={scienceGent.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-science-600 hover:text-science-700 flex items-center text-sm"
                    >
                      Visit Website
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              )}
              
              {status === LoadingStatus.Loading && (
                <div className="mb-8">
                  <div className="h-8 w-60 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                </div>
              )}
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="mt-4">
              <ScienceGentDetailsDashboard 
                address={address || ''}
                scienceGentData={scienceGent}
                status={status}
                isRefreshing={isRefreshing}
                refreshData={refreshData}
              />
            </div>
          </Reveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScienceGentDetails;
