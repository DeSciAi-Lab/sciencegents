
import React, { useState, useEffect } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { domains } from '../utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  AlertCircle, 
  X, 
  Plus, 
  Twitter, 
  Github, 
  Globe, 
  MessageCircle,
  Trash2
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BasicInfo: React.FC = () => {
  const { 
    formData, 
    handleInputChange, 
    handleSelectChange, 
    displayImage, 
    setDisplayImage,
    addSocialLink,
    removeSocialLink,
    updateSocialLink
  } = useCapabilityWizard();
  
  const [displayImagePreview, setDisplayImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (displayImage) {
      const url = URL.createObjectURL(displayImage);
      setDisplayImagePreview(url);
      
      return () => URL.revokeObjectURL(url);
    }
  }, [displayImage]);
  
  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, displayImage: 'Image size should be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, displayImage: 'Please upload an image file' }));
        return;
      }
      
      setDisplayImage(file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.displayImage;
        return newErrors;
      });
    }
  };
  
  const removeDisplayImage = () => {
    setDisplayImage(null);
    setDisplayImagePreview(null);
  };
  
  const renderSocialInputs = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Twitter size={16} className="text-gray-500" />
              </div>
              <Input
                id="twitter"
                name="twitter"
                placeholder="https://twitter.com/yourusername"
                value={formData.twitter}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Github size={16} className="text-gray-500" />
              </div>
              <Input
                id="github"
                name="github"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Globe size={16} className="text-gray-500" />
              </div>
              <Input
                id="website"
                name="website"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <MessageCircle size={16} className="text-gray-500" />
              </div>
              <Input
                id="telegram"
                name="telegram"
                placeholder="https://t.me/yourusername"
                value={formData.telegram}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>
        
        {/* Additional social links */}
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label>Social Platform</Label>
              <Input
                placeholder="Platform name (e.g. Discord, Medium)"
                value={link.type}
                onChange={(e) => updateSocialLink('socialLinks', index, 'type', e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://..."
                value={link.url}
                onChange={(e) => updateSocialLink('socialLinks', index, 'url', e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeSocialLink('socialLinks', index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => addSocialLink('socialLinks')}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" />
          Add More
        </Button>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p className="text-sm text-gray-500 mt-1">
          Enter the basic details about your capability.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="name">Capability Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter capability name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="id">Capability ID</Label>
          <Input
            id="id"
            name="id"
            placeholder="unique-id-with-hyphens"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
          <p className="text-xs text-gray-500">Unique identifier, use lowercase with hyphens.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <Select 
            defaultValue={formData.domain}
            onValueChange={(value) => handleSelectChange('domain', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select domain" />
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
          <Label htmlFor="fee">Fee (in ETH)</Label>
          <Input
            id="fee"
            name="fee"
            type="number"
            step="0.001"
            min="0"
            placeholder="0.05"
            value={formData.fee}
            onChange={handleInputChange}
            required
          />
          <p className="text-xs text-gray-500">Fee per use in ETH.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="creatorAddress">Creator Address</Label>
          <Input
            id="creatorAddress"
            name="creatorAddress"
            placeholder="0x..."
            value={formData.creatorAddress}
            onChange={handleInputChange}
            required
          />
          <p className="text-xs text-gray-500">Ethereum address that will receive capability fees.</p>
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe what your capability does and how it works..."
            value={formData.description}
            onChange={handleInputChange}
            required
            className="min-h-32"
          />
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label>Capability Display Image</Label>
          <div className="flex items-start">
            {displayImagePreview ? (
              <div className="relative w-40 h-40 border rounded overflow-hidden">
                <img 
                  src={displayImagePreview} 
                  alt="Capability preview" 
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={removeDisplayImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6 rounded-full"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div className="w-40 h-40 border-2 border-dashed border-gray-200 rounded flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                   onClick={() => document.getElementById('display-image-upload')?.click()}>
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload image</p>
                <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
              </div>
            )}
            <input 
              type="file"
              id="display-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleDisplayImageChange}
            />
          </div>
          {errors.displayImage && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.displayImage}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-gray-500">This image will be displayed as the main image for your capability.</p>
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label>Social Links</Label>
          {renderSocialInputs()}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
