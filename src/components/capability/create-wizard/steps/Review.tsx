
import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Loader2 } from 'lucide-react';

const Review: React.FC = () => {
  const { formData, isSubmitting, documentation, integrationGuide, additionalFiles, displayImage, profileImage } = useCapabilityWizard();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Your Capability</h3>
        <p className="text-gray-600 mb-4">
          Please review all the information below before submitting your capability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-medium text-lg mb-3">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Capability Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Capability ID</p>
              <p className="font-medium">{formData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Domain</p>
              <p className="font-medium">{formData.domain}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fee (ETH)</p>
              <p className="font-medium">{formData.fee} ETH</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Short Description</p>
              <p className="font-medium">{formData.description}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Fee Receiving Address</p>
              <p className="font-medium">{formData.creatorAddress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-lg mb-3">Detailed Description</h4>
          <div>
            <p className="whitespace-pre-wrap">{formData.detailedDescription}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-lg mb-3">Documents</h4>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Display Image</p>
              <p className="font-medium">{displayImage ? displayImage.name : 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Documentation</p>
              <p className="font-medium">{documentation ? documentation.name : 'None'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Integration Guide</p>
              <p className="font-medium">{integrationGuide ? integrationGuide.name : 'None'}</p>
            </div>
            {additionalFiles && additionalFiles.length > 0 && (
              <div>
                <p className="text-sm text-gray-500">Additional Files</p>
                <ul className="list-disc list-inside">
                  {additionalFiles.map((file, index) => (
                    <li key={index} className="font-medium">{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {(formData.developerName || formData.bio || profileImage) && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-lg mb-3">Developer Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.developerName && (
                <div>
                  <p className="text-sm text-gray-500">Developer Name</p>
                  <p className="font-medium">{formData.developerName}</p>
                </div>
              )}
              {profileImage && (
                <div>
                  <p className="text-sm text-gray-500">Profile Picture</p>
                  <p className="font-medium">{profileImage.name}</p>
                </div>
              )}
              {formData.bio && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Bio</p>
                  <p className="font-medium">{formData.bio}</p>
                </div>
              )}
            </div>
            
            {/* Developer Social Links */}
            {(formData.developerTwitter || formData.developerGithub || formData.developerWebsite || formData.developerTelegram) && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Social Links</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formData.developerTwitter && (
                    <div>
                      <p className="text-sm font-medium">Twitter: {formData.developerTwitter}</p>
                    </div>
                  )}
                  {formData.developerGithub && (
                    <div>
                      <p className="text-sm font-medium">GitHub: {formData.developerGithub}</p>
                    </div>
                  )}
                  {formData.developerWebsite && (
                    <div>
                      <p className="text-sm font-medium">Website: {formData.developerWebsite}</p>
                    </div>
                  )}
                  {formData.developerTelegram && (
                    <div>
                      <p className="text-sm font-medium">Telegram: {formData.developerTelegram}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isSubmitting && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
          <p className="text-blue-700">Submitting your capability to the blockchain...</p>
        </div>
      )}
    </div>
  );
};

export default Review;
