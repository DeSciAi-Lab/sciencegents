
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import WizardProgress from './WizardProgress';
import { useWizard } from './WizardContext';
import { wizardSteps } from './utils';
import { CreationStatus } from '@/hooks/useScienceGentCreation';

interface WizardLayoutProps {
  children: React.ReactNode;
}

const WizardLayout: React.FC<WizardLayoutProps> = ({ children }) => {
  const { 
    currentStep, 
    prevStep, 
    nextStep,
    canProceed,
    handleApproveAndLaunch,
    isLaunching,
    status,
    isDSIApproved,
    isCheckingAllowance
  } = useWizard();
  
  const isLastStep = currentStep === wizardSteps.length;
  const isFirstStep = currentStep === 1;
  const isSuccessStep = currentStep === wizardSteps.length + 1;
  
  const isDisabled = isLaunching || !canProceed || 
    status === CreationStatus.Creating || 
    status === CreationStatus.WaitingConfirmation || 
    status === CreationStatus.Success;
  
  const renderNextButton = () => {
    if (isLastStep) {
      if (isCheckingAllowance) {
        return (
          <Button disabled className="min-w-[120px]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking
          </Button>
        );
      }
      
      if (!isDSIApproved) {
        return (
          <Button 
            onClick={handleApproveAndLaunch} 
            disabled={isDisabled || status === CreationStatus.ApprovingDSI}
            className="min-w-[180px] bg-purple-600 hover:bg-purple-700"
          >
            {(isLaunching || status === CreationStatus.ApprovingDSI) && 
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Approve DSI Spending
          </Button>
        );
      }
      
      return (
        <Button 
          onClick={handleApproveAndLaunch} 
          disabled={isDisabled}
          className="min-w-[120px] bg-purple-600 hover:bg-purple-700"
        >
          {isLaunching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Launch
        </Button>
      );
    }
    
    return (
      <Button 
        onClick={nextStep} 
        disabled={!canProceed}
        className="bg-purple-600 hover:bg-purple-700"
      >
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    );
  };
  
  return (
    <div className="max-w-6xl mx-auto bg-white">
      <div className="bg-white rounded-lg shadow-sm border">
        {!isSuccessStep && (
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Create ScienceGent</h2>
          </div>
        )}
        
        <div className="flex">
          {!isSuccessStep && (
            <div className="w-72 p-6 border-r bg-gray-50">
              <WizardProgress 
                steps={wizardSteps} 
                currentStep={currentStep} 
              />
            </div>
          )}
          
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
        
        {!isSuccessStep && (
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
        )}
      </div>
    </div>
  );
};

export default WizardLayout;
