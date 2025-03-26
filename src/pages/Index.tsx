
import React, { useEffect, useState } from 'react';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Featured from '@/components/home/Featured';
import CallToAction from '@/components/home/CallToAction';
import { toast } from '@/components/ui/use-toast';
import { useEthPriceContext } from '@/context/EthPriceContext';

const Index = () => {
  const { ethPrice, isLoading: ethPriceLoading, refreshEthPrice } = useEthPriceContext();
  const [isInitialized, setIsInitialized] = useState(false);
  
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
      
      setIsInitialized(true);
    };
    
    initialize();
  }, [ethPrice, ethPriceLoading, refreshEthPrice]);

  return (
    <NavbarLayout>
      <main className="min-h-screen">
        <Hero />
        <Stats />
        <Featured />
        <CallToAction />
      </main>
    </NavbarLayout>
  );
};

export default Index;
