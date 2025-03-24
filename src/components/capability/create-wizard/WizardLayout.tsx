
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
    isSubmitting,
    submitCapability
  } = useCapabilityWizard();
  
  const isLastStep = currentStep === wizardSteps.length;
  const isFirstStep = currentStep === 1;
  
  const handleNext = () => {
    if (isLastStep) {
      submitCapability();
    } else {
      nextStep();
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Create Capability</h2>
        </div>
        
        <div className="flex">
          <div className="w-72 p-6 border-r bg-gray-50">
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
            <Button 
              onClick={handleNext} 
              disabled={!canProceed || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLastStep ? "Launch" : "Continue"}
              {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
