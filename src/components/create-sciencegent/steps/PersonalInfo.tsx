
import React, { useEffect } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { Skeleton } from '@/components/ui/skeleton';

interface PersonalInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, handleInputChange }) => {
  const { profile, isLoading } = useDeveloperProfile();
  
  // Prefill form with developer profile data when available
  useEffect(() => {
    if (profile && !isLoading) {
      // Create a synthetic event for each field we want to update
      const createChangeEvent = (name: string, value: string) => ({
        target: { name, value }
      } as React.ChangeEvent<HTMLInputElement>);
      
      // Only update fields that are empty or not set yet
      if (!formData.developerName && profile.developer_name) {
        handleInputChange(createChangeEvent('developerName', profile.developer_name));
      }
      
      if (!formData.developerEmail && profile.developer_email) {
        handleInputChange(createChangeEvent('developerEmail', profile.developer_email));
      }
      
      if (!formData.bio && profile.bio) {
        handleInputChange(createChangeEvent('bio', profile.bio));
      }
      
      if (!formData.developerTwitter && profile.developer_twitter) {
        handleInputChange(createChangeEvent('developerTwitter', profile.developer_twitter));
      }
      
      if (!formData.developerTelegram && profile.developer_telegram) {
        handleInputChange(createChangeEvent('developerTelegram', profile.developer_telegram));
      }
      
      if (!formData.developerGithub && profile.developer_github) {
        handleInputChange(createChangeEvent('developerGithub', profile.developer_github));
      }
      
      if (!formData.developerWebsite && profile.developer_website) {
        handleInputChange(createChangeEvent('developerWebsite', profile.developer_website));
      }
    }
  }, [profile, isLoading, formData, handleInputChange]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
        <p className="text-sm text-gray-500 mb-6">
          Tell us about yourself or your development team. This information helps users trust your ScienceGent.
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

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-4 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="developerName" className="block text-sm font-medium">
                Developer Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="developerName"
                name="developerName"
                placeholder="Your name or team name"
                value={formData.developerName || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="developerEmail" className="block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="developerEmail"
                name="developerEmail"
                placeholder="Contact email for inquiries"
                value={formData.developerEmail || ''}
                onChange={handleInputChange}
                type="email"
                required
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
              placeholder="Tell users about your background, expertise, and why you're building this ScienceGent (40 words max)"
              value={formData.bio || ''}
              onChange={handleInputChange}
              rows={3}
            />
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
                value={formData.developerTwitter || ''}
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
                value={formData.developerTelegram || ''}
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
                value={formData.developerGithub || ''}
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
                value={formData.developerWebsite || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
