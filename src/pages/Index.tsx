
import React, { useEffect } from 'react';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Featured from '@/components/home/Featured';
import CallToAction from '@/components/home/CallToAction';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
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
  }, []);

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
