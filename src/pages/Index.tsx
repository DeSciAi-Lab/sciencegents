
import React, { useEffect, useState } from 'react';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Featured from '@/components/home/Featured';
import CallToAction from '@/components/home/CallToAction';
import { toast } from '@/components/ui/use-toast';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { fetchScienceGents } from '@/services/scienceGentExploreService';

const Index = () => {
  const { ethPrice, isLoading: ethPriceLoading, refreshEthPrice } = useEthPriceContext();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [scienceGents, setScienceGents] = useState([]);
  
  // Scroll to top on component mount and initialize
  useEffect(() => {
    const initialize = async () => {
      window.scrollTo(0, 0);
      
      // Show welcome toast on first visit
      const hasVisited = localStorage.getItem('scienceGents_visited');
      if (!hasVisited) {
        setTimeout(() => {
          toast({
            title: "Welcome to ScienceGents Protocol!",
            description: "Explore our platform to create and monetize AI agents with scientific capabilities."
          });
          localStorage.setItem('scienceGents_visited', 'true');
        }, 1500);
      }
      
      // Refresh ETH price if needed
      if (!ethPriceLoading && (!ethPrice || ethPrice === 0)) {
        try {
          await refreshEthPrice();
        } catch (error) {
          console.error("Failed to fetch ETH price:", error);
        }
      }
      
      // Fetch science gents data for featured section
      try {
        setIsLoadingData(true);
        const data = await fetchScienceGents();
        setScienceGents(data);
      } catch (error) {
        console.error("Failed to fetch ScienceGents:", error);
      } finally {
        setIsLoadingData(false);
      }
      
      setIsInitialized(true);
    };
    
    initialize();
  }, [ethPrice, ethPriceLoading, refreshEthPrice]);

  return (
    <NavbarLayout>
      <main className="min-h-screen">
        <Hero />
        <Stats />
        <Featured 
          scienceGents={scienceGents} 
          isLoading={isLoadingData} 
        />
        <CallToAction />
      </main>
    </NavbarLayout>
  );
};

export default Index;
