import React, { useState, useEffect } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Domain, getAllDomains, createDomain } from '@/services/domains';

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
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [isCreatingDomain, setIsCreatingDomain] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  // Set creator address from wallet if connected
  React.useEffect(() => {
    if (isConnected && address && !creatorAddress) {
      setCreatorAddress(address);
    }
  }, [isConnected, address, creatorAddress, setCreatorAddress]);
  
  // Fetch domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const domainsData = await getAllDomains();
        setDomains(domainsData);
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);
  
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
  
  // Handle creating a new domain
  const handleCreateDomain = async () => {
    if (!newDomain.trim()) return;
    
    try {
      setIsCreatingDomain(true);
      const createdDomain = await createDomain(newDomain, address);
      
      if (createdDomain) {
        // Add to domains list
        setDomains(prev => [...prev, createdDomain]);
        
        // Select the new domain
        setDomain(createdDomain.name);
        
        // Clear input and close popover
        setNewDomain('');
        setPopoverOpen(false);
      }
    } catch (error) {
      console.error('Error creating domain:', error);
    } finally {
      setIsCreatingDomain(false);
    }
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
          <div className="flex gap-2">
            <select
              id="domain"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={domain}
              onChange={handleDomainChange}
              disabled={loading}
            >
              <option value="" disabled>Select a domain</option>
              {domains.map(domain => (
                <option key={domain.id} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
            
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button 
                  type="button"
                  variant="outline" 
                  size="icon" 
                  className="flex-shrink-0"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Add Custom Domain</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. Quantum Physics"
                      value={newDomain}
                      onChange={e => setNewDomain(e.target.value)}
                    />
                    <Button 
                      type="button"
                      onClick={handleCreateDomain} 
                      disabled={isCreatingDomain || !newDomain.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Select a domain or add a custom one
          </p>
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
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fee charged per use of your capability
          </p>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description" className="mb-1 block">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what your capability does..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px]"
        />
        <p className="text-xs text-gray-500 mt-1">
          Provide a clear and concise description of your capability's functionality
        </p>
      </div>

      <div>
        <Label htmlFor="display-image" className="mb-1 block">Display Picture (optional)</Label>
        <div className="mt-1 flex items-center gap-4">
          <label
            htmlFor="display-image-upload"
            className="flex flex-col items-center justify-center w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
          >
            {displayImage ? (
              <Avatar className="w-full h-full rounded-lg">
                <AvatarImage 
                  src={URL.createObjectURL(displayImage)} 
                  alt="Display" 
                  className="object-cover rounded-lg" 
        />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Upload className="h-8 w-8" />
                <span className="text-sm text-center">Click to upload<br/>(under 1MB)</span>
              </div>
            )}
          </label>
          <input
            id="display-image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">
              Add a visual representation of your capability. This will be displayed in the marketplace and capability details.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Recommended: Square image, at least 400x400px. Maximum size: 1MB
            </p>
          </div>
        </div>
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
