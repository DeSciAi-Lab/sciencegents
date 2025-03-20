
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import CapabilityForm from '@/components/capability/CapabilityForm';
import CapabilityInfoSidebar from '@/components/capability/CapabilityInfoSidebar';
import { useCapabilityCreation } from '@/hooks/useCapabilityCreation';

const CreateCapability = () => {
  const navigate = useNavigate();
  const {
    documentation,
    setDocumentation,
    integrationGuide,
    setIntegrationGuide,
    preview,
    isSubmitting,
    togglePreview,
    handleSubmit
  } = useCapabilityCreation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-8">
              <button 
                onClick={() => navigate('/capabilities')}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Capabilities
              </button>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Create New Capability</h1>
              <p className="text-muted-foreground">
                Define a new scientific capability that ScienceGents can integrate
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Reveal delay={100}>
                <div className="glass-card p-6">
                  <CapabilityForm
                    onSubmit={handleSubmit}
                    togglePreview={togglePreview}
                    preview={preview}
                    isSubmitting={isSubmitting}
                    documentation={documentation}
                    setDocumentation={setDocumentation}
                    integrationGuide={integrationGuide}
                    setIntegrationGuide={setIntegrationGuide}
                  />
                </div>
              </Reveal>
            </div>
            
            <div>
              <CapabilityInfoSidebar />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCapability;
