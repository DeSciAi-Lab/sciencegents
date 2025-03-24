
import React from 'react';
import WizardLayout from './WizardLayout';
import { CapabilityWizardProvider, useCapabilityWizard, wizardSteps } from './CapabilityWizardContext';
import BasicInfo from './steps/BasicInfo';
import UploadDocuments from './steps/UploadDocuments';
import PersonalDetails from './steps/PersonalDetails';
import Review from './steps/Review';

// This component uses the context, so it must be wrapped by the provider
const WizardStepRenderer: React.FC = () => {
  const { currentStep } = useCapabilityWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <UploadDocuments />;
      case 3:
        return <PersonalDetails />;
      case 4:
        return <Review />;
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

// The main component that provides the context
const CapabilityWizard: React.FC = () => {
  return (
    <CapabilityWizardProvider>
      <WizardLayout>
        <WizardStepRenderer />
      </WizardLayout>
    </CapabilityWizardProvider>
  );
};

export default CapabilityWizard;
