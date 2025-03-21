
import React from 'react';
import Reveal from '@/components/animations/Reveal';
import WizardProgress from '@/components/create-sciencegent/WizardProgress';
import WizardStepRenderer from '@/components/create-sciencegent/WizardStepRenderer';
import WizardNavigation from '@/components/create-sciencegent/WizardNavigation';
import { WizardProvider, useWizard } from '@/components/create-sciencegent/WizardContext';

const WizardContent: React.FC = () => {
  const { currentStep } = useWizard();
  
  return (
    <div className="max-w-3xl mx-auto">
      {currentStep < 6 && (
        <Reveal delay={100}>
          <WizardProgress currentStep={currentStep} />
        </Reveal>
      )}
      
      <Reveal delay={200}>
        <div className="max-w-3xl mx-auto">
          <WizardStepRenderer />
          <WizardNavigation />
        </div>
      </Reveal>
    </div>
  );
};

const ScienceGentWizard: React.FC = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};

export default ScienceGentWizard;
