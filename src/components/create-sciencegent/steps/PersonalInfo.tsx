
import React from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';

interface PersonalInfoProps {
  formData: ScienceGentFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Developer Information</h3>
        <p className="text-sm text-gray-500 mb-6">
          Tell us about yourself or your development team. This information helps users trust your ScienceGent.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="developerName" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
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
            placeholder="Tell users about your background, expertise, and why you're building this ScienceGent"
            value={formData.bio || ''}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-md flex gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            This information will be publicly visible and helps users trust your ScienceGent. 
            The email will be used for important notifications about your ScienceGent.
          </div>
        </div>

        <h4 className="font-medium text-gray-700 pt-2">Social Links (Optional)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="developerTwitter" className="block text-sm font-medium text-gray-700">
              Twitter
            </label>
            <Input
              id="developerTwitter"
              name="developerTwitter"
              placeholder="Twitter profile URL"
              value={formData.developerTwitter || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="developerGithub" className="block text-sm font-medium text-gray-700">
              GitHub
            </label>
            <Input
              id="developerGithub"
              name="developerGithub"
              placeholder="GitHub profile URL"
              value={formData.developerGithub || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="developerTelegram" className="block text-sm font-medium text-gray-700">
              Telegram
            </label>
            <Input
              id="developerTelegram"
              name="developerTelegram"
              placeholder="Telegram username"
              value={formData.developerTelegram || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="developerWebsite" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <Input
              id="developerWebsite"
              name="developerWebsite"
              placeholder="Personal or team website URL"
              value={formData.developerWebsite || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
