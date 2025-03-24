
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { FileIcon } from 'lucide-react';

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

  // Count total files
  const totalFiles = [
    documentation, 
    integrationGuide
  ].filter(Boolean).length + (additionalFiles?.length || 0);

  // Function to render social links if they exist
  const renderSocialLinks = (links: {type: string, url: string}[]) => {
    if (links.length === 0) return null;
    return (
      <div className="flex flex-wrap">
        {links.map((link, idx) => (
          <React.Fragment key={idx}>
            <span>{link.type} - {link.url}</span>
            {idx < links.length - 1 && <span className="mx-2">•</span>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {profileImage && (
        <div className="flex justify-end">
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage src={URL.createObjectURL(profileImage)} alt={formData.name} />
            <AvatarFallback className="bg-indigo-500 text-white text-lg">
              {formData.name ? getInitials(formData.name) : 'CA'}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="bg-blue-50 border-blue-100 p-6 rounded-md">
        <h3 className="font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex flex-wrap">
            {formData.name && <span>Capability Name - {formData.name}</span>}
            {formData.id && <span className="ml-2">{formData.name ? ',' : ''} ID - {formData.id}</span>}
            {formData.domain && <span className="ml-2">{(formData.name || formData.id) ? ',' : ''} Domain - {formData.domain}</span>}
          </div>
          
          {formData.description && (
            <div>
              <span>Description - {formData.description}</span>
            </div>
          )}
          
          <div className="flex flex-wrap">
            {formData.fee && <span>Capability Fee - {formData.fee} ETH</span>}
            {formData.creatorAddress && (
              <span className="ml-2">
                {formData.fee ? ',' : ''} Fee receiving address - {formData.creatorAddress}
              </span>
            )}
          </div>
          
          {formData.socialLinks.length > 0 && (
            <div className="flex flex-wrap">
              {renderSocialLinks(formData.socialLinks)}
            </div>
          )}
        </div>
      </div>

      {totalFiles > 0 && (
        <div className="bg-orange-50 border-orange-100 p-6 rounded-md">
          <h3 className="font-medium mb-4">Documents Uploaded</h3>
          <div className="text-sm">
            <div className="space-y-1">
              {documentation && (
                <div className="flex items-center">
                  <FileIcon className="h-4 w-4 mr-2" />
                  <span>{documentation.name}</span>
                </div>
              )}
              
              {integrationGuide && (
                <div className="flex items-center">
                  <FileIcon className="h-4 w-4 mr-2" />
                  <span>{integrationGuide.name}</span>
                </div>
              )}
              
              {additionalFiles && additionalFiles.length > 0 && (
                <>
                  {additionalFiles.map((file, index) => (
                    <div key={index} className="flex items-center">
                      <FileIcon className="h-4 w-4 mr-2" />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {(formData.developerName || formData.developerEmail || formData.bio || formData.developerSocialLinks.length > 0) && (
        <>
          {profileImage && (
            <div className="flex justify-end">
              <Avatar className="h-16 w-16 rounded-full">
                <AvatarImage src={URL.createObjectURL(profileImage)} alt={formData.developerName} />
                <AvatarFallback className="bg-indigo-500 text-white text-lg">
                  {formData.developerName ? getInitials(formData.developerName) : 'DV'}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          <div className="bg-blue-50 border-blue-100 p-6 rounded-md">
            <h3 className="font-medium mb-4">Developer Information</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {formData.developerName && (
                <div className="flex flex-wrap">
                  <span>Developer Name - {formData.developerName}</span>
                </div>
              )}
              
              {formData.developerEmail && (
                <div className="flex flex-wrap">
                  <span>Email - {formData.developerEmail}</span>
                </div>
              )}
              
              {formData.bio && (
                <div>
                  <span>Bio - {formData.bio}</span>
                </div>
              )}
              
              {formData.developerSocialLinks.length > 0 && (
                <div className="flex flex-wrap">
                  {renderSocialLinks(formData.developerSocialLinks)}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
