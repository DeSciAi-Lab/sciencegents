
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { ScienceGentFormData } from '@/types/sciencegent';
import { validateStep } from '@/components/create-sciencegent/utils';
import WizardProgress from '@/components/create-sciencegent/WizardProgress';

// Import step components
import BasicInfo from '@/components/create-sciencegent/steps/BasicInfo';
import PersonaCustomization from '@/components/create-sciencegent/steps/PersonaCustomization';
import CapabilitySelection from '@/components/create-sciencegent/steps/CapabilitySelection';
import LiquiditySettings from '@/components/create-sciencegent/steps/LiquiditySettings';
import ReviewAndLaunch from '@/components/create-sciencegent/steps/ReviewAndLaunch';
import SuccessScreen from '@/components/create-sciencegent/steps/SuccessScreen';
import { CreationStatus } from '@/hooks/useScienceGentCreation';

const CreateScienceGent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScienceGentFormData>({
    name: '',
    symbol: '',
    totalSupply: '',
    description: '',
    profileImage: null,
    website: '',
    twitter: '',
    github: '',
    persona: '',
    selectedCapabilities: [],
    initialLiquidity: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profileImage: e.target.files?.[0] || null }));
    }
  };

  const handleCapabilityToggle = (capabilityId: string) => {
    setFormData(prev => {
      if (prev.selectedCapabilities.includes(capabilityId)) {
        return {
          ...prev,
          selectedCapabilities: prev.selectedCapabilities.filter(id => id !== capabilityId)
        };
      } else {
        return {
          ...prev,
          selectedCapabilities: [...prev.selectedCapabilities, capabilityId]
        };
      }
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleLaunch = () => {
    nextStep(); // Move to success step
  };

  const navigateToDetails = () => {
    if (tokenAddress) {
      navigate(`/sciencegent/${tokenAddress}`);
    } else {
      navigate('/sciencegents');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        );
      case 2:
        return (
          <PersonaCustomization 
            formData={formData} 
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <CapabilitySelection 
            formData={formData} 
            handleCapabilityToggle={handleCapabilityToggle}
          />
        );
      case 4:
        return (
          <LiquiditySettings 
            formData={formData} 
            handleInputChange={handleInputChange}
          />
        );
      case 5:
        return (
          <ReviewAndLaunch 
            formData={formData}
            onSubmit={handleLaunch}
          />
        );
      case 6:
        return (
          <SuccessScreen navigateToDetails={navigateToDetails} />
        );
      default:
        return null;
    }
  };

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
          
          {currentStep < 6 && (
            <Reveal delay={100}>
              <WizardProgress currentStep={currentStep} />
            </Reveal>
          )}
          
          <Reveal delay={200}>
            <div className="max-w-3xl mx-auto">
              {renderStep()}
              
              {currentStep < 6 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 5 ? (
                    <Button 
                      className="bg-science-600 hover:bg-science-700 text-white"
                      onClick={nextStep}
                      disabled={!validateStep(currentStep, formData)}
                    >
                      <span>Continue</span>
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    currentStep === 5 && null // Removed the button from here as it's now inside ReviewAndLaunch
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateScienceGent;
