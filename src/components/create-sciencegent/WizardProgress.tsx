
import React from 'react';
import { Check } from 'lucide-react';
import { stepInfo } from './utils';

interface WizardProgressProps {
  currentStep: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Step {currentStep} of 5</span>
          <span>•</span>
          <span>{stepInfo[currentStep-1].title}</span>
        </div>
        <div className="flex md:hidden items-center gap-1 text-sm text-muted-foreground">
          <span>{currentStep}/5</span>
        </div>
        <div className="text-sm text-muted-foreground hidden md:block">
          {stepInfo[currentStep-1].description}
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-secondary rounded-full" />
        <div className="relative z-10 flex justify-between">
          {stepInfo.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index + 1 === currentStep
                  ? 'text-science-600'
                  : index + 1 < currentStep
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index + 1 === currentStep
                    ? 'bg-science-600 text-white'
                    : index + 1 < currentStep
                    ? 'bg-muted-foreground text-white'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {index + 1 < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-xs font-medium hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WizardProgress;
