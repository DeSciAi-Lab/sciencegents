
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { ethers } from 'ethers';

const Review: React.FC = () => {
  const { 
    formData, 
    documentation, 
    integrationGuide, 
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
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-16 w-16 rounded-full">
          {profileImage ? (
            <AvatarImage src={URL.createObjectURL(profileImage)} alt={formData.name} />
          ) : (
            <AvatarFallback className="bg-primary text-white text-lg">
              {formData.name ? getInitials(formData.name) : 'CP'}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-gray-500 mr-2">Capability Name:</span>
              <span className="font-medium">{formData.name || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">ID:</span>
              <span className="font-medium">{formData.id || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Domain:</span>
              <span className="font-medium">{formData.domain || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Description:</span>
              <span className="font-medium line-clamp-1">{formData.description || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Twitter:</span>
              <span className="font-medium">{formData.twitter || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Telegram:</span>
              <span className="font-medium">{formData.telegram || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Github:</span>
              <span className="font-medium">{formData.github || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Website:</span>
              <span className="font-medium">{formData.website || 'XXXXXXXXXX'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-100">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Documents Uploaded</h3>
          <div className="space-y-2 text-sm">
            {documentation || integrationGuide ? (
              <>
                {documentation && (
                  <div className="flex items-center gap-2">
                    <span>• Documentation:</span>
                    <span className="font-medium">{documentation.name}</span>
                  </div>
                )}
                {integrationGuide && (
                  <div className="flex items-center gap-2">
                    <span>• Integration Guide:</span>
                    <span className="font-medium">{integrationGuide.name}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500">No documents uploaded</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Developer Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-gray-500 mr-2">Developer Name:</span>
              <span className="font-medium">{formData.developerName || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Email:</span>
              <span className="font-medium">{formData.developerEmail || 'XXXXXXXXXX'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 mr-2">Bio:</span>
              <span className="font-medium">{formData.bio || '-'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Twitter:</span>
              <span className="font-medium">{formData.developerTwitter || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Telegram:</span>
              <span className="font-medium">{formData.developerTelegram || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Github:</span>
              <span className="font-medium">{formData.developerGithub || 'XXXXXXXXXX'}</span>
            </div>
            <div>
              <span className="text-gray-500 mr-2">Website:</span>
              <span className="font-medium">{formData.developerWebsite || 'XXXXXXXXXX'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 mr-2">Fee:</span>
              <span className="font-semibold text-primary">
                {formData.fee ? `${formData.fee} ETH` : '0 ETH'}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 mr-2">Creator Address:</span>
              <span className="font-medium font-mono text-xs">{formData.creatorAddress || '0x0000...0000'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Review;
