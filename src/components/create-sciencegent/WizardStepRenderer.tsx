
import React from 'react';
import { useWizard } from './WizardContext';
import TransactionStatus from './TransactionStatus';
import { CreationStatus } from '@/hooks/useScienceGentCreation';

// Import step components
import BasicInfo from './steps/BasicInfo';
import PersonaCustomization from './steps/PersonaCustomization';
import CapabilitySelection from './steps/CapabilitySelection';
import LiquiditySettings from './steps/LiquiditySettings';
import ReviewAndLaunch from './steps/ReviewAndLaunch';
import SuccessScreen from './steps/SuccessScreen';

const WizardStepRenderer: React.FC = () => {
  const { 
    currentStep, 
    formData, 
    handleInputChange, 
    handleFileChange, 
    handleCapabilityToggle,
    status,
    error,
    transactionHash,
    tokenAddress,
    handleLaunch,
    isLaunching
  } = useWizard();

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
            isLaunching={isLaunching || status !== CreationStatus.Idle}
          />
        );
      case 6:
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
    </div>
  );
};

export default WizardStepRenderer;
