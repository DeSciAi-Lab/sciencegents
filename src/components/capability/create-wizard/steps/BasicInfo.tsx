
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Plus, HelpCircle, X } from 'lucide-react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
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
    profileImage, 
    setProfileImage,
    addSocialLink,
    removeSocialLink,
    updateSocialLink
  } = useCapabilityWizard();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="col-span-2 space-y-6">
        <div className="space-y-4">
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
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Unique identifier. Use letters, numbers and underscores only.
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="domain" className="block text-sm font-medium">
              Domain
            </label>
            <Select
              value={formData.domain}
              onValueChange={(value) => handleSelectChange("domain", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="e.g. Biochemistry" />
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
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Short Description of your ScienceGents (40 words)"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="profileImage" className="block text-sm font-medium">
              Display Picture for capability (optional)
            </label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
              {profileImage ? (
                <div className="flex items-center gap-2 text-sm w-full">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    className="h-10 w-10 object-cover rounded-md"
                  />
                  <span>{profileImage.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-auto"
                    onClick={() => setProfileImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground mb-2">No file chosen (under 1MB)</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById('profileImage')?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                    onChange={handleProfileImageChange}
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
              placeholder="e.g. 0.5"
              value={formData.fee}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Fee that ScienceGent creators will pay to use this capability.
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="creatorAddress" className="block text-sm font-medium">
              Fee receiving address
            </label>
            <Input
              id="creatorAddress"
              name="creatorAddress"
              placeholder="0x1C4C...F463x3"
              value={formData.creatorAddress}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Ethereum address that will receive capability fees.
            </div>
          </div>
         
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Social links for capability (optional)
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 opacity-50">
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500">
                    Twitter
                  </label>
                  <Input placeholder="https://..." disabled />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500">
                    Telegram
                  </label>
                  <Input placeholder="https://..." disabled />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500">
                    Github
                  </label>
                  <Input placeholder="https://..." disabled />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs text-gray-500">
                    Website
                  </label>
                  <Input placeholder="https://..." disabled />
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
              Add social link
            </Button>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-1">
        <div className="bg-blue-50 rounded-md p-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-start">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">About Capabilities</h4>
              </div>
            </div>
            
            <div className="text-sm text-blue-700 space-y-3">
              <p>
                Capabilities are specialized functions that enhance ScienceGents with domain-specific features. As a capability creator, you define what your capability does and set a fee.
              </p>
              
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Capability fees are paid when a ScienceGent migrates to an external DEX.</li>
                <li>Well-documented capabilities with clear integration guides attract more users.</li>
                <li>All capability data is stored on-chain for transparency and security.</li>
              </ul>
            </div>
              
            <h5 className="font-medium text-sm text-blue-800 mt-2">Creating Great Capabilities</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs text-blue-700">
              <li><strong>Be Specific</strong> - Focus on a single, well-defined scientific function.</li>
              <li><strong>Explain Clearly</strong> - Describe exactly what your capability does and its limitations.</li>
              <li><strong>Price Appropriately</strong> - Set fees based on the value and complexity of your capability.</li>
              <li><strong>Document Well</strong> - Provide comprehensive documentation and integration guides.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
