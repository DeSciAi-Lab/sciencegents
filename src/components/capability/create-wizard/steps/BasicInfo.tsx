
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const domains = [
  "Chemistry",
  "Physics",
  "Biochemistry",
  "Materials Science",
  "Protein Analysis",
  "Drug Discovery",
  "Genomics"
];

const socialTypes = [
  { value: "twitter", label: "Twitter" },
  { value: "telegram", label: "Telegram" },
  { value: "github", label: "Github" },
  { value: "website", label: "Website" }
];

const BasicInfo: React.FC = () => {
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    canProceed,
    displayImage,
    setDisplayImage,
    addSocialLink,
    removeSocialLink,
    updateSocialLink
  } = useCapabilityWizard();

  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDisplayImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-800">About Capabilities</h4>
          <p className="text-sm text-blue-700">
            Capabilities are specialized functions that enhance ScienceGents with domain-specific features. As a capability creator, you define what your capability does and set a fee.
          </p>
          <ul className="mt-2 text-sm text-blue-700 list-disc pl-4 space-y-1">
            <li>Capability fees are paid when a ScienceGent migrates to an external DEX.</li>
            <li>Well-documented capabilities with clear integration guides attract more users.</li>
            <li>All capability data is stored on-chain for transparency and security.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Capability Name
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
            Capability ID
          </label>
          <Input
            id="id"
            name="id"
            placeholder="e.g. molecular_vision_44"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>Unique identifier. Use letters, numbers and underscores only.</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="domain" className="block text-sm font-medium">
            Domain
          </label>
          <Select 
            value={formData.domain} 
            onValueChange={(value) => handleSelectChange('domain', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map(domain => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Short Description of your ScienceGent (40 words)"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="displayImage" className="block text-sm font-medium">
            Display Picture for capability (optional)
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
            {displayImage ? (
              <div className="flex items-center justify-between w-full text-sm py-2">
                <div className="flex items-center">
                  <img 
                    src={URL.createObjectURL(displayImage)} 
                    alt="Display" 
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                  <span>{displayImage.name}</span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDisplayImage(null)}
                  className="h-auto px-2 py-1"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                <p className="text-sm text-muted-foreground mb-2">
                  No file chosen (under 1MB)
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById("displayImage")?.click()}
                >
                  Select File
                </Button>
                <input
                  id="displayImage"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleDisplayImageChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="fee" className="block text-sm font-medium">
            Fee (ETH)
          </label>
          <Input
            id="fee"
            name="fee"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g. 0.05"
            value={formData.fee}
            onChange={handleInputChange}
            required
          />
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>Fee that ScienceGent creators will pay to use this capability.</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="creatorAddress" className="block text-sm font-medium">
            Fee recieving address
          </label>
          <Input
            id="creatorAddress"
            name="creatorAddress"
            placeholder="0x..."
            value={formData.creatorAddress}
            onChange={handleInputChange}
            required
          />
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>Ethereum address that will receive capability fees.</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Socials links for capability (optional)
          </label>
          
          {formData.socialLinks.length > 0 ? (
            <div className="space-y-3">
              {formData.socialLinks.map((social, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={social.type}
                    onValueChange={(value) => updateSocialLink('socialLinks', index, 'type', value)}
                  >
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="https://..."
                    value={social.url}
                    onChange={(e) => updateSocialLink('socialLinks', index, 'url', e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeSocialLink('socialLinks', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs text-gray-500">
                  Twitter
                </label>
                <Input name="twitter" placeholder="https://..." onChange={handleInputChange} value={formData.twitter || ''} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-gray-500">
                  Telegram
                </label>
                <Input name="telegram" placeholder="https://..." onChange={handleInputChange} value={formData.telegram || ''} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-gray-500">
                  Github
                </label>
                <Input name="github" placeholder="https://..." onChange={handleInputChange} value={formData.github || ''} />
              </div>
              <div className="space-y-2">
                <label className="block text-xs text-gray-500">
                  Website
                </label>
                <Input name="website" placeholder="https://..." onChange={handleInputChange} value={formData.website || ''} />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={() => addSocialLink('socialLinks')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add more
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mt-8">
        <h3 className="text-blue-800 font-medium mb-3">
          Creating Great Capabilities
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex flex-col">
            <span className="font-medium text-blue-700">Be Specific</span>
            <span className="text-blue-600">Focus on a single, well-defined scientific function.</span>
          </li>
          <li className="flex flex-col">
            <span className="font-medium text-blue-700">Explain Clearly</span>
            <span className="text-blue-600">Describe exactly what your capability does and its limitations.</span>
          </li>
          <li className="flex flex-col">
            <span className="font-medium text-blue-700">Price Appropriately</span>
            <span className="text-blue-600">Set fees based on the value and complexity of your capability.</span>
          </li>
          <li className="flex flex-col">
            <span className="font-medium text-blue-700">Document Well</span>
            <span className="text-blue-600">Provide comprehensive documentation and integration guides.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasicInfo;
