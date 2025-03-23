
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const PersonalDetails: React.FC = () => {
  const { formData, handleInputChange, profileImage, setProfileImage } = useCapabilityWizard();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
        <p className="text-sm text-gray-500 mb-6">
          Information about you or your team that builds trust and helps others connect with you.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md flex gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-800">Disclaimer</h4>
          <p className="text-sm text-blue-700">
            This information will be publicly visible and completely optional to provide. 
            They help build trust on developer and connect with you, also contact you.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="developerName" className="block text-sm font-medium">
              Developer Name
            </label>
            <Input
              id="developerName"
              name="developerName"
              placeholder="Your name or team name"
              value={formData.developerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="developerEmail" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="developerEmail"
              name="developerEmail"
              placeholder="Contact email for inquiries"
              value={formData.developerEmail}
              onChange={handleInputChange}
              type="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell users about your background, expertise, and why you created this capability (40 words max)"
            value={formData.bio}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="profileImage" className="block text-sm font-medium">
            Profile picture /Avatar
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
            {profileImage ? (
              <div className="flex items-center gap-2 text-sm">
                <img 
                  src={URL.createObjectURL(profileImage)} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span>{profileImage.name}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setProfileImage(null)}
                  className="h-auto p-1"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <h4 className="font-medium text-gray-700 pt-2">Social Links (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="developerTwitter" className="block text-sm font-medium text-gray-700">
              Developer Twitter
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
            <label htmlFor="developerTelegram" className="block text-sm font-medium text-gray-700">
              Developer Telegram
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
            <label htmlFor="developerGithub" className="block text-sm font-medium text-gray-700">
              Developer Github
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
            <label htmlFor="developerWebsite" className="block text-sm font-medium text-gray-700">
              Developer Website
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
    </div>
  );
};

export default PersonalDetails;
