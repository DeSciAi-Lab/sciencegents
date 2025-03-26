
import React from 'react';
import NavHeader from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import CapabilityWizard from '@/components/capability/create-wizard/CapabilityWizard';

const CreateCapability = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavHeader />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <CapabilityWizard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCapability;
