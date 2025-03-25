
import React from 'react';
import { CapabilityWizardProvider, useCapabilityWizard } from './CapabilityWizardContext';
import WizardLayout from './WizardLayout';
import BasicInfo from './steps/BasicInfo';
import DetailedDescription from './steps/DetailedDescription';
import UploadDocuments from './steps/UploadDocuments';
import Review from './steps/Review';

// This component uses the context, so it must be wrapped by the provider
const WizardStepRenderer: React.FC = () => {
  const { currentStep } = useCapabilityWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <DetailedDescription />;
      case 3:
        return <UploadDocuments />;
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

// Inner component that has access to the context
const WizardContent: React.FC = () => {
  return (
    <WizardLayout>
      <WizardStepRenderer />
    </WizardLayout>
  );
};

// The main component that provides the context
const CapabilityWizard: React.FC = () => {
  return (
    <CapabilityWizardProvider>
      <WizardContent />
    </CapabilityWizardProvider>
  );
};

export default CapabilityWizard;
