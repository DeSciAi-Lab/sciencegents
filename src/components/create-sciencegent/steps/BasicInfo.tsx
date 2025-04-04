import React, { useState, useEffect } from 'react';
import { Image, Plus } from 'lucide-react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getAllDomains, createDomain, Domain } from '@/services/domains';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BasicInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (name: string, value: string) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSelectChange
}) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [isCreatingDomain, setIsCreatingDomain] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  // Handle creating a new domain
  const handleCreateDomain = async () => {
    if (!newDomain.trim()) return;
    
    try {
      setIsCreatingDomain(true);
      const createdDomain = await createDomain(newDomain);
      
      if (createdDomain) {
        // Add to domains list
        setDomains(prev => [...prev, createdDomain]);
        
        // Select the new domain
        if (handleSelectChange) {
          handleSelectChange('domain', createdDomain.name);
        }
        
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">ScienceGent Name</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="e.g. Spectrum AI" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="mt-2" 
          />
        </div>
        
        <div>
          <Label htmlFor="symbol">Ticker</Label>
          <Input 
            id="symbol" 
            name="symbol" 
            placeholder="e.g. SPEC" 
            maxLength={6} 
            value={formData.symbol} 
            onChange={handleInputChange} 
            className="mt-2" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="totalSupply">Total Supply</Label>
          <Input 
            id="totalSupply" 
            name="totalSupply" 
            type="number" 
            placeholder="e.g. 1000000000" 
            value={formData.totalSupply} 
            onChange={handleInputChange} 
            className="mt-2" 
          />
        </div>
        
        <div>
          <Label htmlFor="domain">Domain</Label>
          <div className="flex gap-2 mt-2">
            <Select 
              value={formData.domain || ""} 
              onValueChange={value => handleSelectChange?.("domain", value)}
              disabled={loading}
            >
              <SelectTrigger className="flex-1" id="domain">
                <SelectValue placeholder="Select a domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map(domain => (
                  <SelectItem key={domain.id} value={domain.name}>
                    {domain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button 
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="profileImage">Logo</Label>
          <div className="flex items-center gap-4 mt-2">
            {formData.profileImage ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <Input 
                id="profileImage" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="mt-0 h-auto py-1.5" 
              />
              <p className="text-xs text-gray-500 mt-1">No file choosen (under 1MB)</p>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="agentFee">Agent Fee per Interaction (in DSI)</Label>
          <Input 
            id="agentFee" 
            name="agentFee" 
            type="number" 
            min="0" 
            step="0.1" 
            placeholder="e.g. 2" 
            value={formData.agentFee} 
            onChange={handleInputChange} 
            className="mt-2" 
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Short Description of your ScienceGents (40 words max)" 
          value={formData.description} 
          onChange={handleInputChange} 
          rows={3} 
          className="mt-2" 
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Socials of Agent (optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input 
              id="twitter" 
              name="twitter" 
              placeholder="https://..." 
              value={formData.twitter} 
              onChange={handleInputChange} 
              className="mt-2" 
            />
          </div>
          
          <div>
            <Label htmlFor="telegram">Telegram</Label>
            <Input 
              id="telegram" 
              name="telegram" 
              placeholder="https://..." 
              value={formData.telegram || ''} 
              onChange={handleInputChange} 
              className="mt-2" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <Label htmlFor="github">Github</Label>
            <Input 
              id="github" 
              name="github" 
              placeholder="https://..." 
              value={formData.github} 
              onChange={handleInputChange} 
              className="mt-2" 
            />
          </div>
          
          <div>
            <Label htmlFor="website">Website</Label>
            <Input 
              id="website" 
              name="website" 
              placeholder="https://..." 
              value={formData.website} 
              onChange={handleInputChange} 
              className="mt-2" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
