
import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const DetailedDescription: React.FC = () => {
  const {
    detailedDescription,
    setDetailedDescription
  } = useCapabilityWizard();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Detailed Description of the Capability</h2>
      
      <div className="bg-blue-50 rounded-md p-4 mb-6 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
        <p className="text-sm text-blue-700">
          This can be filled and updated later also from user dashboard. Use markdown to format.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="detailed-description" className="mb-2 block">Detailed Description</Label>
          <Textarea
            id="detailed-description"
            placeholder="Input text"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            className="min-h-72 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedDescription;
