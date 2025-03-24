
import React, { useEffect, useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { formatFileSize } from '../utils';
import { FileText } from 'lucide-react';

const Review: React.FC = () => {
  const { 
    formData, 
    documentation, 
    integrationGuide, 
    additionalFiles,
    displayImage,
    profileImage
  } = useCapabilityWizard();
  
  const [displayImagePreview, setDisplayImagePreview] = useState<string | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  
  useEffect(() => {
    if (displayImage) {
      const url = URL.createObjectURL(displayImage);
      setDisplayImagePreview(url);
      
      return () => URL.revokeObjectURL(url);
    }
  }, [displayImage]);
  
  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setProfileImagePreview(url);
      
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);
  
  const hasDeveloperInfo = formData.developerName || 
    formData.developerEmail || 
    formData.bio || 
    profileImage || 
    formData.developerTwitter || 
    formData.developerGithub || 
    formData.developerTelegram || 
    formData.developerWebsite ||
    formData.developerSocialLinks.length > 0;
  
  const hasCapabilitySocialLinks = formData.twitter || 
    formData.github || 
    formData.telegram || 
    formData.website ||
    formData.socialLinks.length > 0;
  
  const hasDocuments = documentation || integrationGuide || (additionalFiles && additionalFiles.length > 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review & Launch</h3>
        <p className="text-sm text-gray-500 mb-6">
          Review all the details of your capability before launching. Once launched, some properties cannot be changed.
        </p>
      </div>
      
      <div className="bg-blue-50 rounded-md p-6 space-y-6">
        <div className="flex justify-center">
          {displayImagePreview ? (
            <div className="w-32 h-32 rounded-md overflow-hidden mb-4 border border-gray-200">
              <img src={displayImagePreview} alt="Capability" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 bg-blue-100 rounded-md flex items-center justify-center text-2xl text-blue-600 font-bold mb-4">
              {formData.name.charAt(0) || "C"}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-gray-500">ID</p>
              <p className="font-medium">{formData.id}</p>
            </div>
            <div>
              <p className="text-gray-500">Domain</p>
              <p className="font-medium">{formData.domain}</p>
            </div>
            <div>
              <p className="text-gray-500">Fee</p>
              <p className="font-medium">{formData.fee} ETH</p>
            </div>
            <div>
              <p className="text-gray-500">Creator Address</p>
              <p className="font-medium truncate">{formData.creatorAddress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md p-4 border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-sm">{formData.description}</p>
        </div>
        
        {hasCapabilitySocialLinks && (
          <div className="bg-white rounded-md p-4 border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {formData.twitter && (
                <div>
                  <p className="text-gray-500">Twitter</p>
                  <p className="font-medium truncate">{formData.twitter}</p>
                </div>
              )}
              {formData.github && (
                <div>
                  <p className="text-gray-500">GitHub</p>
                  <p className="font-medium truncate">{formData.github}</p>
                </div>
              )}
              {formData.website && (
                <div>
                  <p className="text-gray-500">Website</p>
                  <p className="font-medium truncate">{formData.website}</p>
                </div>
              )}
              {formData.telegram && (
                <div>
                  <p className="text-gray-500">Telegram</p>
                  <p className="font-medium truncate">{formData.telegram}</p>
                </div>
              )}
              {formData.socialLinks.filter(link => link.type && link.url).map((link, index) => (
                <div key={index}>
                  <p className="text-gray-500">{link.type}</p>
                  <p className="font-medium truncate">{link.url}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {hasDocuments && (
          <div className="bg-white rounded-md p-4 border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Documentation</h3>
            <div className="space-y-2">
              {documentation && (
                <div className="flex items-center p-2 border rounded bg-gray-50">
                  <FileText size={16} className="text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Documentation</p>
                    <p className="text-xs text-gray-500">{documentation.name} ({formatFileSize(documentation.size)})</p>
                  </div>
                </div>
              )}
              
              {integrationGuide && (
                <div className="flex items-center p-2 border rounded bg-gray-50">
                  <FileText size={16} className="text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Integration Guide</p>
                    <p className="text-xs text-gray-500">{integrationGuide.name} ({formatFileSize(integrationGuide.size)})</p>
                  </div>
                </div>
              )}
              
              {additionalFiles && additionalFiles.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Additional Files ({additionalFiles.length})</p>
                  <div className="space-y-1">
                    {additionalFiles.map((file, index) => (
                      <div key={index} className="flex items-center p-2 border rounded bg-gray-50">
                        <FileText size={16} className="text-blue-500 mr-2" />
                        <p className="text-xs">{file.name} ({formatFileSize(file.size)})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {hasDeveloperInfo && (
          <div className="bg-white rounded-md p-4 border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2">Developer Information</h3>
            <div className="flex items-start mb-4">
              {profileImagePreview && (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 mr-4">
                  <img src={profileImagePreview} alt="Developer" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                {formData.developerName && (
                  <p className="font-medium">{formData.developerName}</p>
                )}
                {formData.developerEmail && (
                  <p className="text-sm text-gray-600">{formData.developerEmail}</p>
                )}
                {formData.bio && (
                  <p className="text-sm mt-2">{formData.bio}</p>
                )}
              </div>
            </div>
            
            {(formData.developerTwitter || formData.developerGithub || formData.developerWebsite || formData.developerTelegram || formData.developerSocialLinks.length > 0) && (
              <div>
                <p className="text-sm font-medium mb-2">Developer Social Links</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {formData.developerTwitter && (
                    <div>
                      <p className="text-gray-500">Twitter</p>
                      <p className="font-medium truncate">{formData.developerTwitter}</p>
                    </div>
                  )}
                  {formData.developerGithub && (
                    <div>
                      <p className="text-gray-500">GitHub</p>
                      <p className="font-medium truncate">{formData.developerGithub}</p>
                    </div>
                  )}
                  {formData.developerWebsite && (
                    <div>
                      <p className="text-gray-500">Website</p>
                      <p className="font-medium truncate">{formData.developerWebsite}</p>
                    </div>
                  )}
                  {formData.developerTelegram && (
                    <div>
                      <p className="text-gray-500">Telegram</p>
                      <p className="font-medium truncate">{formData.developerTelegram}</p>
                    </div>
                  )}
                  {formData.developerSocialLinks.filter(link => link.type && link.url).map((link, index) => (
                    <div key={index}>
                      <p className="text-gray-500">{link.type}</p>
                      <p className="font-medium truncate">{link.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
