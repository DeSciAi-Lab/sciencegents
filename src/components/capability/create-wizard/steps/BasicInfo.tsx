
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const domains = [
  "Chemistry",
  "Physics",
  "Biochemistry",
  "Materials Science",
  "Protein Analysis",
  "Drug Discovery",
  "Genomics"
];

const BasicInfo: React.FC = () => {
  const { formData, handleInputChange, handleSelectChange } = useCapabilityWizard();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Capability Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Molecule Vision"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="id" className="block text-sm font-medium">
              Capability ID <span className="text-red-500">*</span>
            </label>
            <Input
              id="id"
              name="id"
              placeholder="e.g. molecular_vision_v1"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Unique identifier. Use lowercase letters, numbers and underscores only.
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="domain" className="block text-sm font-medium">
              Domain <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.domain}
              onValueChange={(value) => handleSelectChange("domain", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Short Description of your ScienceGents (40 words)"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="fee" className="block text-sm font-medium">
              Fee (ETH) <span className="text-red-500">*</span>
            </label>
            <Input
              id="fee"
              name="fee"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 0.1"
              value={formData.fee}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Fee that ScienceGent creators will pay to use this capability.
            </p>
          </div>
        
          <div className="space-y-2">
            <label htmlFor="creatorAddress" className="block text-sm font-medium">
              Creator Address <span className="text-red-500">*</span>
            </label>
            <Input
              id="creatorAddress"
              name="creatorAddress"
              placeholder="0x..."
              value={formData.creatorAddress}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-muted-foreground">
              Ethereum address that will receive capability fees.
            </p>
          </div>
         
          <div className="space-y-2">
            <label htmlFor="profilePicture" className="block text-sm font-medium">
              Profile Picture (optional)
            </label>
            <div className="border border-dashed border-gray-300 rounded-md px-6 py-8 flex flex-col items-center justify-center bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">No file chosen (under 1MB)</p>
                <Button variant="outline" size="sm">Select File</Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                Twitter (optional)
              </label>
              <Input
                id="twitter"
                name="twitter"
                placeholder="https://..."
                value={formData.twitter}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="telegram" className="block text-sm font-medium text-gray-700">
                Telegram (optional)
              </label>
              <Input
                id="telegram"
                name="telegram"
                placeholder="https://..."
                value={formData.telegram}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                Github (optional)
              </label>
              <Input
                id="github"
                name="github"
                placeholder="https://..."
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website (optional)
              </label>
              <Input
                id="website"
                name="website"
                placeholder="https://..."
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-blue-50 rounded-md p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-2">About Capabilities</h4>
                <div className="text-sm text-blue-700 space-y-4">
                  <p>
                    Capabilities are specialized functions that enhance ScienceGents with domain-specific features. As a capability creator, you define what your capability does and set a fee.
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Capability fees are paid when a ScienceGent migrates to an external DEX.</li>
                    <li>Well-documented capabilities with clear integration guides attract more users.</li>
                    <li>All capability data is stored on-chain for transparency and security.</li>
                  </ul>
                  
                  <h5 className="font-medium mt-4">Creating Great Capabilities</h5>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Be Specific</strong> - Focus on a single, well-defined scientific function.</li>
                    <li><strong>Explain Clearly</strong> - Describe exactly what your capability does and its limitations.</li>
                    <li><strong>Price Appropriately</strong> - Set fees based on the value and complexity of your capability.</li>
                    <li><strong>Document Well</strong> - Provide comprehensive documentation and integration guides.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
