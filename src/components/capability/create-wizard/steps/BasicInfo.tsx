
import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    displayImage,
    setDisplayImage,
    socialLinks,
    updateSocialLink,
    addSocialLink,
    removeSocialLink
  } = useCapabilityWizard();
  
  const { address, isConnected } = useWallet();
  const [newSocialType, setNewSocialType] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  
  // Set creator address from wallet if connected
  React.useEffect(() => {
    if (isConnected && address && !creatorAddress) {
      setCreatorAddress(address);
    }
  }, [isConnected, address, creatorAddress, setCreatorAddress]);
  
  // Handle display image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDisplayImage(e.target.files[0]);
    }
  };
  
  // Handle domain selection
  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDomain(e.target.value);
  };
  
  // Add custom social link
  const handleAddSocialLink = () => {
    if (newSocialType && newSocialUrl) {
      addSocialLink(newSocialType, newSocialUrl);
      setNewSocialType('');
      setNewSocialUrl('');
    }
  };
  
  // Check if a social link exists
  const socialLinkExists = (type: string) => {
    const standardTypes = ['twitter', 'github', 'website', 'telegram'];
    return standardTypes.includes(type.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div>
          <label htmlFor="display-image-upload" className="cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
              {displayImage ? (
                <Avatar className="w-16 h-16">
                  <AvatarImage 
                    src={URL.createObjectURL(displayImage)} 
                    alt="Display" 
                    className="object-cover" 
                  />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
              ) : (
                <Upload className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </label>
          <input
            id="display-image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <p className="text-sm text-gray-500 mb-2">
            Provide essential details about your capability.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="mb-1 block">Capability Name</Label>
          <Input
            id="name"
            placeholder="e.g., Molecule Visualization"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="id" className="mb-1 block">Capability ID</Label>
          <Input
            id="id"
            placeholder="e.g., mol-viz-3d"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Used in smart contracts. Use lowercase letters, numbers, and hyphens.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="domain" className="mb-1 block">Scientific Domain</Label>
          <select
            id="domain"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={domain}
            onChange={handleDomainChange}
          >
            <option value="" disabled>Select a domain</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Materials Science">Materials Science</option>
            <option value="Protein Analysis">Protein Analysis</option>
            <option value="Drug Discovery">Drug Discovery</option>
            <option value="Genomics">Genomics</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="price" className="mb-1 block">Capability Fee (ETH)</Label>
          <div className="relative">
            <Input
              id="price"
              placeholder="e.g., 0.25"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ETH
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description" className="mb-1 block">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what your capability does and how it can help ScienceGents..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none"
        />
      </div>
      
      <div>
        <Label htmlFor="creator-address" className="mb-1 block">Creator Ethereum Address</Label>
        <Input
          id="creator-address"
          placeholder="0x..."
          value={creatorAddress}
          onChange={(e) => setCreatorAddress(e.target.value)}
          className={isConnected ? "bg-gray-50" : ""}
        />
        <p className="text-xs text-gray-500 mt-1">
          {isConnected ? "Using your connected wallet address" : "Address that will receive capability fees"}
        </p>
      </div>
      
      <div>
        <Label className="mb-2 block">Social Links</Label>
        
        <div className="space-y-3">
          {/* Standard social links */}
          {socialLinks.filter(link => ['twitter', 'github', 'website', 'telegram'].includes(link.type)).map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-24 flex-shrink-0">
                <span className="text-sm font-medium capitalize">{link.type}</span>
              </div>
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(
                  socialLinks.findIndex(l => l.type === link.type),
                  link.type,
                  e.target.value
                )}
                placeholder={`${link.type} URL`}
                className="flex-grow"
              />
            </div>
          ))}
          
          {/* Custom social links */}
          {socialLinks.filter(link => !['twitter', 'github', 'website', 'telegram'].includes(link.type)).map((link, index) => (
            <div key={`custom-${index}`} className="flex items-center gap-2">
              <div className="w-24 flex-shrink-0">
                <span className="text-sm font-medium capitalize">{link.type}</span>
              </div>
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(
                  socialLinks.findIndex(l => l.type === link.type && l.url === link.url),
                  link.type,
                  e.target.value
                )}
                placeholder={`${link.type} URL`}
                className="flex-grow"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(
                  socialLinks.findIndex(l => l.type === link.type && l.url === link.url)
                )}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {/* Add new social link */}
          <div className="flex items-end gap-2 pt-2">
            <div className="w-24 flex-shrink-0">
              <Input
                value={newSocialType}
                onChange={(e) => setNewSocialType(e.target.value)}
                placeholder="Type"
                className="text-sm"
              />
            </div>
            <Input
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              placeholder="URL"
              className="flex-grow"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddSocialLink}
              disabled={!newSocialType || !newSocialUrl || socialLinkExists(newSocialType)}
              className="flex-shrink-0 h-10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
