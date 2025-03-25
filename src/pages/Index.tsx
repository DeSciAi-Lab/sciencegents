
import React, { useEffect } from 'react';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Featured from '@/components/home/Featured';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <NavbarLayout>
      <main className="pt-16">
        <Hero />
        <Stats />
        <Featured />
        <CallToAction />
      </main>
    </NavbarLayout>
  );
};

export default Index;
