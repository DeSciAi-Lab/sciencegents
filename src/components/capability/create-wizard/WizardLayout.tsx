
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useCapabilityWizard, wizardSteps } from './CapabilityWizardContext';
import WizardProgress from './WizardProgress';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({ children }) => {
  const { 
    currentStep, 
    goToNextStep, 
    goToPreviousStep, 
    canProceed,
    isSubmitting
  } = useCapabilityWizard();

  const totalSteps = wizardSteps.length;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  
  const handleBack = () => {
    goToPreviousStep();
  };
  
  const handleContinue = () => {
    if (isLastStep) {
      // Submit form logic would be in the Review component
      return;
    }
    goToNextStep();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Create Capability</h1>
        
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* Left sidebar with steps */}
            <div className="w-full md:w-1/4 border-r p-6">
              <WizardProgress 
                steps={wizardSteps.map(step => ({
                  id: step.id,
                  title: step.title
                }))} 
                currentStep={currentStep} 
              />
            </div>
            
            {/* Main content area */}
            <div className="w-full md:w-3/4 p-6">
              {children}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isFirstStep || isSubmitting}
                  className="px-6"
                >
                  Back
                </Button>
                
                {!isLastStep && (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={!canProceed || isSubmitting}
                    className="px-6"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
