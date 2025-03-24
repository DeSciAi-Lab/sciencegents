
import React, { useState, useEffect } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  X, 
  Plus, 
  Twitter, 
  Github, 
  Globe, 
  MessageCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PersonalDetails: React.FC = () => {
  const { 
    formData, 
    handleInputChange, 
    profileImage, 
    setProfileImage,
    addSocialLink,
    removeSocialLink,
    updateSocialLink
  } = useCapabilityWizard();
  
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setProfileImagePreview(url);
      
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image size should be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profileImage: 'Please upload an image file' }));
        return;
      }
      
      setProfileImage(file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.profileImage;
        return newErrors;
      });
    }
  };
  
  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };
  
  const renderSocialInputs = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="developerTwitter">Twitter</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Twitter size={16} className="text-gray-500" />
              </div>
              <Input
                id="developerTwitter"
                name="developerTwitter"
                placeholder="https://twitter.com/yourusername"
                value={formData.developerTwitter}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="developerGithub">GitHub</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Github size={16} className="text-gray-500" />
              </div>
              <Input
                id="developerGithub"
                name="developerGithub"
                placeholder="https://github.com/yourusername"
                value={formData.developerGithub}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="developerWebsite">Website</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <Globe size={16} className="text-gray-500" />
              </div>
              <Input
                id="developerWebsite"
                name="developerWebsite"
                placeholder="https://yourwebsite.com"
                value={formData.developerWebsite}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="developerTelegram">Telegram</Label>
            <div className="flex">
              <div className="bg-gray-100 flex items-center justify-center px-3 border border-r-0 rounded-l">
                <MessageCircle size={16} className="text-gray-500" />
              </div>
              <Input
                id="developerTelegram"
                name="developerTelegram"
                placeholder="https://t.me/yourusername"
                value={formData.developerTelegram}
                onChange={handleInputChange}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>
        
        {/* Additional social links */}
        {formData.developerSocialLinks.map((link, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label>Social Platform</Label>
              <Input
                placeholder="Platform name (e.g. Discord, Medium)"
                value={link.type}
                onChange={(e) => updateSocialLink('developerSocialLinks', index, 'type', e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://..."
                value={link.url}
                onChange={(e) => updateSocialLink('developerSocialLinks', index, 'url', e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeSocialLink('developerSocialLinks', index)}
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
          onClick={() => addSocialLink('developerSocialLinks')}
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
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your personal information to build trust with users (optional).
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="developerName">Your Name</Label>
          <Input
            id="developerName"
            name="developerName"
            placeholder="John Doe"
            value={formData.developerName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="developerEmail">Email Address</Label>
          <Input
            id="developerEmail"
            name="developerEmail"
            placeholder="you@example.com"
            type="email"
            value={formData.developerEmail}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell users about yourself and your expertise..."
            value={formData.bio}
            onChange={handleInputChange}
            className="min-h-24"
          />
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-start">
            {profileImagePreview ? (
              <div className="relative w-32 h-32 border rounded-full overflow-hidden">
                <img 
                  src={profileImagePreview} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={removeProfileImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-6 h-6 rounded-full"
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
                   onClick={() => document.getElementById('profile-image-upload')?.click()}>
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">Upload</p>
              </div>
            )}
            <input 
              type="file"
              id="profile-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
          {errors.profileImage && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.profileImage}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-gray-500">This image will be displayed as your developer profile picture.</p>
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label>Social Links</Label>
          {renderSocialInputs()}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
