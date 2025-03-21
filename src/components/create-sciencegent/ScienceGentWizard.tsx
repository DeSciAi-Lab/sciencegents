
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateStep } from '@/components/create-sciencegent/utils';
import WizardProgress from '@/components/create-sciencegent/WizardProgress';
import { ScienceGentFormData } from '@/types/sciencegent';
import Reveal from '@/components/animations/Reveal';
import useScienceGentCreation, { CreationStatus } from '@/hooks/useScienceGentCreation';
import TransactionStatus from '@/components/create-sciencegent/TransactionStatus';

// Import step components
import BasicInfo from '@/components/create-sciencegent/steps/BasicInfo';
import PersonaCustomization from '@/components/create-sciencegent/steps/PersonaCustomization';
import CapabilitySelection from '@/components/create-sciencegent/steps/CapabilitySelection';
import LiquiditySettings from '@/components/create-sciencegent/steps/LiquiditySettings';
import ReviewAndLaunch from '@/components/create-sciencegent/steps/ReviewAndLaunch';
import SuccessScreen from '@/components/create-sciencegent/steps/SuccessScreen';

interface ScienceGentWizardProps {
  // No props needed as it manages its own state
}

const ScienceGentWizard: React.FC<ScienceGentWizardProps> = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    status,
    error,
    transactionHash,
    tokenAddress,
    launchFee,
    createToken,
    isSyncing
  } = useScienceGentCreation();
  
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

  useEffect(() => {
    // If we've successfully created a token, move to the success step
    if (status === CreationStatus.Creating || 
        status === CreationStatus.WaitingConfirmation || 
        status === CreationStatus.Success) {
      setCurrentStep(6);
    }
  }, [status]);

  useEffect(() => {
    // Navigate to details page when token is successfully synced
    if (status === CreationStatus.Success && tokenAddress && !isSyncing) {
      // Small delay to show success state before redirecting
      const redirectTimer = setTimeout(() => {
        navigate(`/sciencegent/${tokenAddress}`);
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [status, tokenAddress, isSyncing, navigate]);

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
    createToken(formData);
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
          <SuccessScreen 
            navigateToDetails={() => navigate(`/sciencegent/${tokenAddress}`)}
            tokenAddress={tokenAddress}
            transactionHash={transactionHash}
            isLoading={status !== CreationStatus.Success || isSyncing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {currentStep < 6 && (
        <Reveal delay={100}>
          <WizardProgress currentStep={currentStep} />
        </Reveal>
      )}
      
      <Reveal delay={200}>
        <div className="max-w-3xl mx-auto">
          {renderStep()}
          
          {/* Show transaction status during creation (except on success screen) */}
          {status !== CreationStatus.Idle && currentStep !== 6 && (
            <TransactionStatus 
              status={status}
              error={error}
              transactionHash={transactionHash}
              tokenAddress={tokenAddress}
            />
          )}
          
          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                className="bg-science-600 hover:bg-science-700 text-white"
                onClick={nextStep}
                disabled={!validateStep(currentStep, formData)}
              >
                <span>Continue</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default ScienceGentWizard;
