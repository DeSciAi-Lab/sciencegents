
import React from 'react';
import WizardLayout from './WizardLayout';
import { CapabilityWizardProvider, useCapabilityWizard, wizardSteps } from './CapabilityWizardContext';
import BasicInfo from './steps/BasicInfo';
import UploadDocuments from './steps/UploadDocuments';
import PersonalDetails from './steps/PersonalDetails';
import Review from './steps/Review';

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
