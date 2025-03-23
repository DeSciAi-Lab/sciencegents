
import React from 'react';
import { Image, Link } from 'lucide-react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ 
  formData, 
  handleInputChange, 
  handleFileChange 
}) => {
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
          <Label htmlFor="profileImage">Logo</Label>
          <div className="flex items-center gap-4 mt-2">
            {formData.profileImage ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={URL.createObjectURL(formData.profileImage)} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Image className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <Input 
              id="profileImage" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Short Description of your ScienceGents (40 words)" 
          value={formData.description} 
          onChange={handleInputChange} 
          rows={3}
          className="mt-2"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Socials of Agent</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="twitter">Twitter (optional)</Label>
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
            <Label htmlFor="telegram">Telegram (optional)</Label>
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
            <Label htmlFor="github">Github (optional)</Label>
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
            <Label htmlFor="website">Website (optional)</Label>
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
