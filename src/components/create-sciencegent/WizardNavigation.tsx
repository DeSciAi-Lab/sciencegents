
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWizard } from './WizardContext';

const WizardNavigation: React.FC = () => {
  const { currentStep, nextStep, prevStep, canProceed } = useWizard();
  
  if (currentStep >= 5) {
    return null;
  }
  
  return (
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
        disabled={!canProceed}
      >
        <span>Continue</span>
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default WizardNavigation;
