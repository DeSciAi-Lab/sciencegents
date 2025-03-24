
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import WizardProgress from './WizardProgress';
import { useCapabilityWizard, wizardSteps } from './CapabilityWizardContext';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({ children }) => {
  const { 
    currentStep, 
    prevStep, 
    nextStep,
    canProceed,
    submitCapability,
    isSubmitting
  } = useCapabilityWizard();
  
  const isLastStep = currentStep === wizardSteps.length;
  const isFirstStep = currentStep === 1;
  
  const renderNextButton = () => {
    if (isLastStep) {
      return (
        <Button 
          onClick={submitCapability} 
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Launch
        </Button>
      );
    }
    
    return (
      <Button onClick={nextStep} disabled={!canProceed} className="min-w-[120px]">
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Create Capability</h2>
        </div>
        
        <div className="flex">
          <div className="w-56 p-6 border-r bg-gray-50">
            <WizardProgress 
              steps={wizardSteps} 
              currentStep={currentStep} 
            />
          </div>
          
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-between">
          <div>
            {!isFirstStep && (
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          
          <div>
            {renderNextButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
