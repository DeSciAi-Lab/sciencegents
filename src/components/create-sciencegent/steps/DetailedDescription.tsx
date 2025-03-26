
import React from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';

interface DetailedDescriptionProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DetailedDescription: React.FC<DetailedDescriptionProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Detailed Description of the Capability</h2>
      
      <div className="bg-blue-50 rounded-md p-4 mb-4 flex items-start">
        <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
        <p className="text-sm text-blue-700">
          This can be filled and updated later also from user dashboard. Use markdowns to format.
        </p>
      </div>
      
      <div>
        <Label htmlFor="detailedDescription" className="mb-2 block">Detailed Description</Label>
        <Textarea
          id="detailedDescription"
          name="detailedDescription"
          placeholder="Input text"
          value={formData.detailedDescription || ""}
          onChange={handleInputChange}
          className="min-h-72 resize-y font-mono text-sm"
        />
      </div>
    </div>
  );
};

export default DetailedDescription;
