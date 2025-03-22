
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import { ExternalLink, ChevronLeft, Beaker, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ScienceGentDetailsDashboard from '@/components/sciencegent/ScienceGentDetailsDashboard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);

  const formatDate = (timestamp: string | number) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{scienceGent.name}</h1>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-muted-foreground">{scienceGent.symbol}</p>
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
                    
                    <div className="flex flex-col items-end gap-2">
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
                      
                      <div className="flex gap-2">
                        {scienceGent.domain && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Beaker className="h-3 w-3" />
                            {scienceGent.domain}
                          </Badge>
                        )}
                        {scienceGent.created_on_chain_at && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Created {formatDate(scienceGent.created_on_chain_at)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {scienceGent.description && (
                    <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">Description</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{scienceGent.description}</p>
                    </div>
                  )}
                </div>
              )}
              
              {status === LoadingStatus.Loading && (
                <div className="mb-8">
                  <Skeleton className="h-8 w-60 mb-2" />
                  <Skeleton className="h-4 w-40 mb-4" />
                  <Skeleton className="h-24 w-full" />
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
