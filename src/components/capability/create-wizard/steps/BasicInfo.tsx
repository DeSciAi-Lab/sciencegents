
import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info, Plus, Trash2, UploadCloud } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';

const BasicInfo: React.FC = () => {
  const {
    name,
    setName,
    id,
    setId,
    domain,
    setDomain,
    description,
    setDescription,
    price,
    setPrice,
    creatorAddress,
    setCreatorAddress,
    socialLinks,
    setSocialLinks,
    displayImage,
    setDisplayImage
  } = useCapabilityWizard();
  
  const { address } = useWallet();
  const [newSocialLink, setNewSocialLink] = useState({ type: '', url: '' });
  
  const updateSocialLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setSocialLinks(updatedLinks);
  };
  
  const addSocialLink = () => {
    if (newSocialLink.type && newSocialLink.url) {
      setSocialLinks([...socialLinks, { ...newSocialLink }]);
      setNewSocialLink({ type: '', url: '' });
    }
  };
  
  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };
  
  // Use connected wallet address if available
  React.useEffect(() => {
    if (address && !creatorAddress) {
      setCreatorAddress(address);
    }
  }, [address, creatorAddress, setCreatorAddress]);
  
  const domains = [
    { value: '', label: 'Select a domain' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Biochemistry', label: 'Biochemistry' },
    { value: 'Materials Science', label: 'Materials Science' },
    { value: 'Protein Analysis', label: 'Protein Analysis' },
    { value: 'Drug Discovery', label: 'Drug Discovery' },
    { value: 'Genomics', label: 'Genomics' },
  ];

  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDisplayImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Capability Name</Label>
              <Input
                id="name"
                placeholder="e.g. Molecule Vision"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="id">Capability ID</Label>
              <Input
                id="id"
                placeholder="e.g. molecular_vision_44"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                <Info className="w-3 h-3 inline mr-1" />
                Unique identifier. Use letters, numbers and underscores only.
              </p>
            </div>
            
            <div>
              <Label htmlFor="domain">Domain</Label>
              <select
                id="domain"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                {domains.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Short Description of your ScienceGents (40 words)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24"
              />
            </div>
            
            <div>
              <Label htmlFor="display-picture">Display Picture for capability (optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mt-1">
                {displayImage ? (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden mb-2">
                      <img 
                        src={URL.createObjectURL(displayImage)} 
                        alt="Display" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDisplayImage(null)}
                      className="text-red-500"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer">
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">No file chosen (under 1MB)</span>
                    <input
                      id="display-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleDisplayImageChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => document.getElementById('display-picture')?.click()}
                    >
                      Choose Image
                    </Button>
                  </label>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="fee">Fee (ETH)</Label>
              <Input
                id="fee"
                type="text"
                placeholder="e.g. 0.5"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                <Info className="w-3 h-3 inline mr-1" />
                Fee that ScienceGent creators will pay to use this capability.
              </p>
            </div>
            
            <div>
              <Label htmlFor="creator-address">Fee receiving address</Label>
              <Input
                id="creator-address"
                placeholder="0x..."
                value={creatorAddress}
                onChange={(e) => setCreatorAddress(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                <Info className="w-3 h-3 inline mr-1" />
                Ethereum address that will receive capability fees.
              </p>
            </div>
            
            <div className="space-y-3">
              <Label>Social links for capability (optional)</Label>
              
              {socialLinks.length > 0 && (
                <div className="space-y-2 mt-2">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div>
                        <span className="font-medium">{link.type}: </span>
                        <span className="text-sm">{link.url}</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeSocialLink(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="social-type" className="text-xs">Social Type</Label>
                    <Input
                      id="social-type"
                      placeholder="e.g. Twitter"
                      value={newSocialLink.type}
                      onChange={(e) => setNewSocialLink({...newSocialLink, type: e.target.value})}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="social-url" className="text-xs">URL</Label>
                    <Input
                      id="social-url"
                      placeholder="https://..."
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={addSocialLink}
                    disabled={!newSocialLink.type || !newSocialLink.url}
                    className="whitespace-nowrap mb-0"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">About Capabilities</h3>
            </div>
            <p className="text-sm mb-3">
              Capabilities are specialized functions that enhance ScienceGents with domain-specific features. As a capability creator, you define what your capability does and set a fee.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-200 rounded-full h-1.5 w-1.5 mt-1.5 mr-2"></span>
                Capability fees are paid when a ScienceGent migrates to an external DEX.
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 rounded-full h-1.5 w-1.5 mt-1.5 mr-2"></span>
                Well-documented capabilities with clear integration guides attract more users.
              </li>
              <li className="flex items-start">
                <span className="bg-blue-200 rounded-full h-1.5 w-1.5 mt-1.5 mr-2"></span>
                All capability data is stored on-chain for transparency and security.
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">✨</span>
              <h3 className="font-medium">Creating Great Capabilities</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-col">
                <span className="font-medium">Be Specific</span>
                <span className="text-xs text-gray-600">Focus on a single, well-defined scientific function.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Explain Clearly</span>
                <span className="text-xs text-gray-600">Describe exactly what your capability does and its limitations.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Price Appropriately</span>
                <span className="text-xs text-gray-600">Set fees based on the value and complexity of your capability.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Document Well</span>
                <span className="text-xs text-gray-600">Provide comprehensive documentation and integration guides.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
