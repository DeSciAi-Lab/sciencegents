
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardProgressProps {
  currentStep: number;
  steps: Array<{ id: number; title: string }>;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex flex-col space-y-10">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
        return (
          <div 
            key={step.id}
            className={cn(
              "flex items-center space-x-3", 
              isActive ? "text-primary" : isCompleted ? "text-muted-foreground" : "text-muted-foreground/50"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                isActive
                  ? "bg-primary"
                  : isCompleted
                  ? "bg-gray-400"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WizardProgress;
