
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const PersonalDetails: React.FC = () => {
  const { formData, handleInputChange, profileImage, setProfileImage } = useCapabilityWizard();

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
                  No file choosen (under 1MB)
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
            placeholder="e.g. Molecular_vision_44"
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
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="developerTwitter" className="block text-xs text-gray-500">
                Twitter
              </label>
              <Input
                id="developerTwitter"
                name="developerTwitter"
                placeholder="https://..."
                value={formData.developerTwitter}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="developerTelegram" className="block text-xs text-gray-500">
                Telegram
              </label>
              <Input
                id="developerTelegram"
                name="developerTelegram"
                placeholder="https://..."
                value={formData.developerTelegram}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="developerGithub" className="block text-xs text-gray-500">
                Github
              </label>
              <Input
                id="developerGithub"
                name="developerGithub"
                placeholder="https://..."
                value={formData.developerGithub}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="developerWebsite" className="block text-xs text-gray-500">
                Website
              </label>
              <Input
                id="developerWebsite"
                name="developerWebsite"
                placeholder="https://..."
                value={formData.developerWebsite}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
