
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Plus, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const socialTypes = [
  { value: "twitter", label: "Twitter" },
  { value: "telegram", label: "Telegram" },
  { value: "github", label: "Github" },
  { value: "website", label: "Website" }
];

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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h3 className="text-lg font-medium mb-2">Information about you or your team that builds trust and helps others connect with you.</h3>

      <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-800">Disclaimer</h4>
          <p className="text-sm text-blue-700">
            This information will be publicly visible and completely optional to provide. They help build trust on developer and connect with you, also contact you.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="developerName" className="block text-sm font-medium">
            Developer Name
          </label>
          <Input
            id="developerName"
            name="developerName"
            placeholder="e.g. Molecule Vision"
            value={formData.developerName}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profileImage" className="block text-sm font-medium">
            Profile picture /Avatar
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
            {profileImage ? (
              <div className="flex items-center justify-between w-full text-sm py-2">
                <div className="flex items-center">
                  <img 
                    src={URL.createObjectURL(profileImage)} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                  <span>{profileImage.name}</span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setProfileImage(null)}
                  className="h-auto px-2 py-1"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                <p className="text-sm text-muted-foreground mb-2">
                  No file chosen (under 1MB)
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById("profileImage")?.click()}
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
          <label htmlFor="developerEmail" className="block text-sm font-medium">
            Developer email ID
          </label>
          <Input
            id="developerEmail"
            name="developerEmail"
            placeholder="e.g. developer@example.com"
            value={formData.developerEmail}
            onChange={handleInputChange}
            type="email"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="(40 words)"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Socials links of Developer (optional)
          </label>
          
          {formData.developerSocialLinks.length > 0 ? (
            <div className="space-y-3">
              {formData.developerSocialLinks.map((social, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={social.type}
                    onValueChange={(value) => updateSocialLink('developerSocialLinks', index, 'type', value)}
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
                    onChange={(e) => updateSocialLink('developerSocialLinks', index, 'url', e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeSocialLink('developerSocialLinks', index)}
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
            onClick={() => addSocialLink('developerSocialLinks')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add social link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
