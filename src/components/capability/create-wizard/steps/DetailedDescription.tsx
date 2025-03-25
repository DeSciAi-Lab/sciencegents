
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const DetailedDescription: React.FC = () => {
  const { formData, handleInputChange } = useCapabilityWizard();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Description of the Capability</h3>
        <p className="text-gray-600 mb-4">
          Provide a comprehensive description of your capability, including how it works, what problems it solves, and its limitations.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-800">
          This can be filled and updated later also from your user dashboard. You can use Markdown to format your text.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700">
          Detailed Description
        </label>
        <Textarea
          id="detailedDescription"
          name="detailedDescription"
          value={formData.detailedDescription}
          onChange={handleInputChange}
          placeholder="Enter a detailed description of your capability..."
          className="min-h-[300px] w-full"
        />
        <p className="text-xs text-gray-500">
          Use markdown to format your text and provide a detailed explanation of how your capability works.
        </p>
      </div>
    </div>
  );
};

export default DetailedDescription;
