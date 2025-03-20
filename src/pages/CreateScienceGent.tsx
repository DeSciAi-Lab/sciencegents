
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import ScienceGentWizard from '@/components/create-sciencegent/ScienceGentWizard';

const CreateScienceGent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">Create ScienceGent</h1>
              <p className="text-muted-foreground">
                Create your own AI agent with specialized scientific capabilities and an associated token
              </p>
            </div>
          </Reveal>
          
          <ScienceGentWizard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateScienceGent;
