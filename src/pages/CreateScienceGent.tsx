
import React from 'react';
import NavHeader from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import ScienceGentWizard from '@/components/create-sciencegent/ScienceGentWizard';

const CreateScienceGent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavHeader />
      
      <main className="flex-grow py-12 pt-24">
        <ScienceGentWizard />
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateScienceGent;
