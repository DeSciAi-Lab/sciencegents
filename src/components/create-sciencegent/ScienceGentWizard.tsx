
import React from 'react';
import WizardStepRenderer from '@/components/create-sciencegent/WizardStepRenderer';
import WizardLayout from '@/components/create-sciencegent/WizardLayout';
import { WizardProvider } from '@/components/create-sciencegent/WizardContext';

const ScienceGentWizard: React.FC = () => {
  return (
    <WizardProvider>
      <WizardLayout>
        <WizardStepRenderer />
      </WizardLayout>
    </WizardProvider>
  );
};

export default ScienceGentWizard;
