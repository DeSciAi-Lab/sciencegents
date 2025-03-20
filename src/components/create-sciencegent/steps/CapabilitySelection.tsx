
import React from 'react';
import { Beaker, DollarSign, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScienceGentFormData } from '@/types/sciencegent';
import { mockCapabilities, calculateTotalCapabilityFees } from '../utils';

interface CapabilitySelectionProps {
  formData: ScienceGentFormData;
  handleCapabilityToggle: (capabilityId: string) => void;
}

const CapabilitySelection: React.FC<CapabilitySelectionProps> = ({ formData, handleCapabilityToggle }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Capability Selection</CardTitle>
        <CardDescription>
          Select the capabilities that your ScienceGent will have
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            {mockCapabilities.map((capability) => (
              <div 
                key={capability.id} 
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  formData.selectedCapabilities.includes(capability.id)
                    ? 'border-science-400 bg-science-50'
                    : 'border-border hover:border-science-200'
                }`}
                onClick={() => handleCapabilityToggle(capability.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                      <Beaker size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">{capability.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{capability.domain}</p>
                      <div className="flex items-center text-xs font-medium text-science-700 bg-science-100 w-fit px-2 py-0.5 rounded-full">
                        <DollarSign size={10} className="mr-0.5" />
                        <span>{capability.fee} ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.selectedCapabilities.includes(capability.id)
                      ? 'bg-science-500 border-science-500 text-white'
                      : 'border-muted-foreground'
                  }`}>
                    {formData.selectedCapabilities.includes(capability.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm mb-1">
              <span>Selected Capabilities</span>
              <span>{formData.selectedCapabilities.length}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Capability Fee</span>
              <span>{calculateTotalCapabilityFees(formData.selectedCapabilities).toFixed(2)} ETH</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitySelection;
