
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const Review: React.FC = () => {
  const { 
    formData, 
    documentation, 
    integrationGuide, 
    additionalFiles,
    profileImage 
  } = useCapabilityWizard();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Avatar className="h-16 w-16 rounded-full">
          {profileImage ? (
            <AvatarImage src={URL.createObjectURL(profileImage)} alt={formData.name} />
          ) : (
            <AvatarFallback className="bg-indigo-500 text-white text-lg">
              {formData.name ? getInitials(formData.name) : 'LO'}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="bg-blue-50 border-blue-100 p-6 rounded-md">
        <h3 className="font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex flex-wrap">
            <span>Capability Name - {formData.name || 'XXXXXXXXXXX'},</span>
            <span className="ml-2">ID - {formData.id || 'XXXXXXXXXXX'},</span>
            <span className="ml-2">Domain - {formData.domain || 'XXXXXXXXXXX'}</span>
          </div>
          <div>
            <span>Description - {formData.description || 'XXXXXXXXXXX'}</span>
          </div>
          <div className="flex flex-wrap">
            <span>capability Fee - {formData.fee || 'XXXXXXXX'},</span>
            <span className="ml-2">capability receiving address - {formData.creatorAddress || 'XXXXXXX'}</span>
          </div>
          <div className="flex flex-wrap">
            <span>Twitter- {formData.twitter || 'XXXXXXXX'},</span>
            <span className="ml-2">Telegram - {formData.telegram || 'XXXXXXX'},</span>
            <span className="ml-2">Github - {formData.github || 'XXXXXXX'},</span>
            <span className="ml-2">Website - {formData.website || 'XXXXXXXXXX'}</span>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border-orange-100 p-6 rounded-md">
        <h3 className="font-medium mb-4">Documents Uploaded</h3>
        <div className="text-sm">
          {documentation || integrationGuide || additionalFiles ? (
            <div>
              {documentation?.name || 'XXXXXXXXXX.pdf'}, {integrationGuide?.name || 'xxxxxxxx.jpeg'}, {additionalFiles?.name || 'xxxxxxx.pdf'}, xxxxxxx.txt, xxxxxxxx.md
            </div>
          ) : (
            <div>No documents uploaded</div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Avatar className="h-16 w-16 rounded-full">
          {profileImage ? (
            <AvatarImage src={URL.createObjectURL(profileImage)} alt={formData.name} />
          ) : (
            <AvatarFallback className="bg-indigo-500 text-white text-lg">
              {formData.name ? getInitials(formData.name) : 'LO'}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <div className="bg-blue-50 border-blue-100 p-6 rounded-md">
        <h3 className="font-medium mb-4">Developer Information</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex flex-wrap">
            <span>Developer Name - {formData.developerName || 'XXXXXXXXXXX'},</span>
          </div>
          <div className="flex flex-wrap">
            <span>email - {formData.developerEmail || 'XXXXXXXXXXX'},</span>
            <span className="ml-2">Ethereum Address - {formData.creatorAddress || 'XXXXXXXXXXX'},</span>
          </div>
          <div>
            <span>bio - {formData.bio || 'XXXXXXXXXXX'}</span>
          </div>
          <div className="flex flex-wrap">
            <span>Twitter- {formData.developerTwitter || 'XXXXXXXX'},</span>
            <span className="ml-2">Telegram - {formData.developerTelegram || 'XXXXXXX'},</span>
            <span className="ml-2">Github - {formData.developerGithub || 'XXXXXXX'},</span>
            <span className="ml-2">Website - {formData.developerWebsite || 'XXXXXXXXXX'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
