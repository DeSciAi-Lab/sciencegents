
import React from 'react';
import { wizardSteps } from './utils';
import WizardProgress from './WizardProgress';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWizard } from './WizardContext';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({ children }) => {
  const { currentStep, nextStep, prevStep, canProceed } = useWizard();
  
  const showNavigation = currentStep < 6;
  
  return (
    <div className="container max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Sciencegent</h1>
      
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <WizardProgress currentStep={currentStep} steps={wizardSteps} />
        </div>
        
        <div className="md:w-3/4">
          {children}
          
          {showNavigation && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 5 ? (
                <Button 
                  className="bg-science-600 hover:bg-science-700 text-white flex items-center gap-2"
                  onClick={nextStep}
                  disabled={!canProceed}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="bg-science-600 hover:bg-science-700 text-white"
                  disabled={!canProceed}
                  type="submit"
                  form="review-form" // Connect to the form in ReviewAndLaunch
                >
                  Launch
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
