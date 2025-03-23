
import React, { useState, useEffect } from 'react';
import { useWizard } from './WizardContext';
import { CreationStatus } from '@/hooks/useScienceGentCreation';
import { Capability } from '@/types/capability';
import { getAllCapabilities } from '@/data/capabilities';

// Import step components
import BasicInfo from './steps/BasicInfo';
import PersonaCustomization from './steps/PersonaCustomization';
import CapabilitySelection from './steps/CapabilitySelection';
import LiquiditySettings from './steps/LiquiditySettings';
import PersonalInfo from './steps/PersonalInfo';
import ReviewAndLaunch from './steps/ReviewAndLaunch';
import SuccessScreen from './steps/SuccessScreen';

const WizardStepRenderer: React.FC = () => {
  const { 
    currentStep, 
    formData, 
    handleInputChange, 
    handleFileChange, 
    handleSelectChange,
    handleCapabilityToggle,
    status,
    error,
    transactionHash,
    tokenAddress,
    handleApproveAndLaunch,
    isLaunching,
    isDSIApproved
  } = useWizard();
  
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const data = await getAllCapabilities();
        setCapabilities(data);
      } catch (error) {
        console.error('Error fetching capabilities:', error);
      }
    };
    
    fetchCapabilities();
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSelectChange={handleSelectChange}
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
          <PersonalInfo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );  
      case 6:
        return (
          <ReviewAndLaunch 
            formData={formData}
            onSubmit={handleApproveAndLaunch}
            isLaunching={isLaunching}
            capabilities={capabilities}
            status={status}
          />
        );
      case 7:
        return (
          <SuccessScreen 
            navigateToDetails={() => window.location.href = `/sciencegent/${tokenAddress}`}
            tokenAddress={tokenAddress}
            transactionHash={transactionHash}
            isLoading={status !== CreationStatus.Success || isLaunching}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default WizardStepRenderer;
