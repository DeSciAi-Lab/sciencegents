
import React from 'react';
import { Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScienceGentFormData } from '@/types/sciencegent';

interface BasicInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details for your ScienceGent and its associated token
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="e.g., SpectrumAI" 
              value={formData.name} 
              onChange={handleInputChange} 
            />
            <p className="text-xs text-muted-foreground">
              This will be used for both your AI agent and token
            </p>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="symbol">Token Symbol</Label>
            <Input 
              id="symbol" 
              name="symbol" 
              placeholder="e.g., SPEC" 
              maxLength={6}
              value={formData.symbol} 
              onChange={handleInputChange} 
            />
            <p className="text-xs text-muted-foreground">
              A short symbol for your token (max 6 characters)
            </p>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="totalSupply">Total Supply</Label>
            <Input 
              id="totalSupply" 
              name="totalSupply" 
              type="number" 
              placeholder="e.g., 1000000" 
              value={formData.totalSupply} 
              onChange={handleInputChange} 
            />
            <p className="text-xs text-muted-foreground">
              The total number of tokens that will be created
            </p>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe what your ScienceGent does and its purpose..." 
              value={formData.description} 
              onChange={handleInputChange} 
              rows={4}
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="profileImage">Profile Picture</Label>
            <div className="flex items-center gap-4">
              {formData.profileImage ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <img 
                    src={URL.createObjectURL(formData.profileImage)} 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                  <Image className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <Input 
                id="profileImage" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="max-w-xs"
              />
            </div>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input 
              id="website" 
              name="website" 
              placeholder="https://..." 
              value={formData.website} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="twitter">Twitter (Optional)</Label>
              <Input 
                id="twitter" 
                name="twitter" 
                placeholder="https://twitter.com/..." 
                value={formData.twitter} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="github">GitHub (Optional)</Label>
              <Input 
                id="github" 
                name="github" 
                placeholder="https://github.com/..." 
                value={formData.github} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
