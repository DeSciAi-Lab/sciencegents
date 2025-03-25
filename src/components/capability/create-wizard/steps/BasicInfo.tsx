
import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

  const domainOptions = [
    'Chemistry',
    'Physics',
    'Biochemistry',
    'Materials Science',
    'Protein Analysis',
    'Drug Discovery',
    'Genomics',
    'General Science'
  ];
  
  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDisplayImage(e.target.files[0]);
    }
  };
  
  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { type: '', url: '' }]);
  };
  
  const removeSocialLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };
  
  const updateSocialLink = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSocialLinks(newLinks);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label htmlFor="name">Capability Name</Label>
          <Input
            id="name"
            placeholder="e.g. Molecule Vision"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="id">Capability ID</Label>
          <Input
            id="id"
            placeholder="e.g. Molecular_vision_44"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Unique identifier. Use letters, numbers and underscores only.</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="domain">Domain</Label>
          <Select 
            value={domain} 
            onValueChange={(value) => setDomain(value)}
          >
            <SelectTrigger id="domain" className="mt-1">
              <SelectValue placeholder="e.g. Biochemistry" />
            </SelectTrigger>
            <SelectContent>
              {domainOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Short Description of your ScienceGents (40 words)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="display-image">Display Picture for capability (optional)</Label>
          <div className="mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer" onClick={() => document.getElementById('display-image')?.click()}>
            {displayImage ? (
              <div className="flex flex-col items-center">
                <img 
                  src={URL.createObjectURL(displayImage)} 
                  alt="Display" 
                  className="h-24 w-24 object-cover mb-2" 
                />
                <span className="text-sm text-gray-500">{displayImage.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">No file choosen (under 1MB)</span>
              </div>
            )}
          </div>
          <input
            id="display-image"
            type="file"
            accept="image/*"
            onChange={handleDisplayImageChange}
            className="hidden"
          />
        </div>
        
        <div>
          <Label htmlFor="fee">Fee (ETH)</Label>
          <Input
            id="fee"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g. 0.5"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Fee that ScienceGent creators will pay to use this capability.</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="creator-address">Fee recieving address</Label>
          <Input
            id="creator-address"
            placeholder="0x10x...F463e3"
            value={creatorAddress}
            onChange={(e) => setCreatorAddress(e.target.value)}
            className="mt-1"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Ethereum address that will receive capability fees.</p>
          </div>
        </div>
        
        <div>
          <Label>Socials links for capability (optional)</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <Label htmlFor="twitter" className="text-sm">Twitter</Label>
              <Input
                id="twitter"
                placeholder="https://..."
                value={socialLinks.find(link => link.type === 'twitter')?.url || ''}
                onChange={(e) => {
                  const twitterIndex = socialLinks.findIndex(link => link.type === 'twitter');
                  if (twitterIndex >= 0) {
                    updateSocialLink(twitterIndex, 'url', e.target.value);
                  } else {
                    setSocialLinks([...socialLinks, { type: 'twitter', url: e.target.value }]);
                  }
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telegram" className="text-sm">Telegram</Label>
              <Input
                id="telegram"
                placeholder="https://..."
                value={socialLinks.find(link => link.type === 'telegram')?.url || ''}
                onChange={(e) => {
                  const telegramIndex = socialLinks.findIndex(link => link.type === 'telegram');
                  if (telegramIndex >= 0) {
                    updateSocialLink(telegramIndex, 'url', e.target.value);
                  } else {
                    setSocialLinks([...socialLinks, { type: 'telegram', url: e.target.value }]);
                  }
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="github" className="text-sm">Github</Label>
              <Input
                id="github"
                placeholder="https://..."
                value={socialLinks.find(link => link.type === 'github')?.url || ''}
                onChange={(e) => {
                  const githubIndex = socialLinks.findIndex(link => link.type === 'github');
                  if (githubIndex >= 0) {
                    updateSocialLink(githubIndex, 'url', e.target.value);
                  } else {
                    setSocialLinks([...socialLinks, { type: 'github', url: e.target.value }]);
                  }
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="website" className="text-sm">Website</Label>
              <Input
                id="website"
                placeholder="https://..."
                value={socialLinks.find(link => link.type === 'website')?.url || ''}
                onChange={(e) => {
                  const websiteIndex = socialLinks.findIndex(link => link.type === 'website');
                  if (websiteIndex >= 0) {
                    updateSocialLink(websiteIndex, 'url', e.target.value);
                  } else {
                    setSocialLinks([...socialLinks, { type: 'website', url: e.target.value }]);
                  }
                }}
                className="mt-1"
              />
            </div>
          </div>
          
          {socialLinks.filter(link => !['twitter', 'telegram', 'github', 'website'].includes(link.type)).map((link, index) => (
            <div key={index} className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Type (e.g. Discord)"
                value={link.type}
                onChange={(e) => updateSocialLink(
                  socialLinks.indexOf(link),
                  'type',
                  e.target.value
                )}
                className="flex-1"
              />
              <Input
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateSocialLink(
                  socialLinks.indexOf(link),
                  'url',
                  e.target.value
                )}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(socialLinks.indexOf(link))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSocialLink}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
