
import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { upsertCapabilityToSupabase } from '@/services/capability/supabase';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Review: React.FC = () => {
  const {
    name,
    id,
    domain,
    description,
    detailedDescription,
    price,
    features,
    creatorAddress,
    socialLinks,
    documentation,
    integrationGuide,
    additionalFiles,
    isSubmitting,
    setIsSubmitting,
    handleFileUploads,
    resetForm,
    developerProfile,
    isLoadingProfile
  } = useCapabilityWizard();
  
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // First, upload any files to storage
      const fileUploadResults = await handleFileUploads();
      
      // Prepare capability data
      const capabilityData = {
        id,
        name,
        domain,
        description,
        detailed_description: detailedDescription,
        price: parseFloat(price),
        creator: creatorAddress,
        stats: {
          usageCount: 0,
          rating: 4.5,
          revenue: 0
        },
        features,
        social_links: socialLinks,
        files: {
          documentation: fileUploadResults.documentationUrl,
          integrationGuide: fileUploadResults.integrationGuideUrl,
          additionalFiles: fileUploadResults.additionalFilesUrls
        }
      };
      
      // Save to database
      await upsertCapabilityToSupabase(capabilityData, true);
      
      setIsSuccess(true);
      toast({
        title: "Capability Created",
        description: "Your capability has been successfully created.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating capability:', error);
      toast({
        title: "Error",
        description: "There was an error creating your capability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCreateAnother = () => {
    resetForm();
    setIsSuccess(false);
  };
  
  // Success screen
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Capability Created Successfully</h2>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          Your capability has been created and is now available for ScienceGent creators to include in their agents.
        </p>
        
        <div className="space-x-4">
          <Button 
            variant="outline" 
            onClick={handleCreateAnother}
          >
            Create Another Capability
          </Button>
          
          <Button 
            variant="default"
            asChild
          >
            <a href={`/capabilities/${id}`}>
              View Capability
            </a>
          </Button>
        </div>
      </div>
    );
  }
  
  // Generate developer initials for the avatar
  const generateInitials = () => {
    if (developerProfile?.developer_name) {
      return developerProfile.developer_name.charAt(0).toUpperCase();
    }
    return creatorAddress ? creatorAddress.substring(2, 4).toUpperCase() : 'LO';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review Your Capability</h3>
        <p className="text-sm text-gray-500">
          Please review all information below before submitting. Once submitted, your capability will be available for ScienceGent creators to include in their agents.
        </p>
      </div>
      
      {/* Basic Information Section */}
      <div className="bg-blue-50 rounded-md p-6">
        <h4 className="font-medium text-center mb-4">Basic Information</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">Capability Name:</span>
              <span className="font-medium ml-2">{name}</span>
            </div>
            
            <div>
              <span className="text-gray-500">ID:</span>
              <span className="font-medium ml-2">{id}</span>
            </div>
            
            <div>
              <span className="text-gray-500">Domain:</span>
              <span className="font-medium ml-2">{domain}</span>
            </div>
            
            <div>
              <span className="text-gray-500">Description:</span>
              <span className="font-medium ml-2">{description}</span>
            </div>
            
            <div>
              <span className="text-gray-500">Capability Fee:</span>
              <span className="font-medium ml-2">{price} ETH</span>
            </div>
            
            <div>
              <span className="text-gray-500">Fee Receiving Address:</span>
              <span className="font-medium ml-2 truncate">{creatorAddress}</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-4">
            <span className="text-gray-500">Social Links:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {socialLinks.map((link, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="font-medium">{link.type}:</span>
                  <span className="text-sm truncate ml-1">{link.url}</span>
                </div>
              ))}
              {socialLinks.length === 0 && (
                <span className="text-sm text-gray-400">No social links provided</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Documents Section */}
      <div className="bg-orange-50 rounded-md p-6">
        <h4 className="font-medium text-center mb-4">Documents Uploaded</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-gray-500">Documentation:</span>
              {documentation ? (
                <div className="flex items-center">
                  <Check className="text-green-600 h-4 w-4 mr-1" />
                  <span className="text-sm truncate">{documentation.name}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-1" />
                  <span className="text-sm text-gray-400">Not uploaded</span>
                </div>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Integration Guide:</span>
              {integrationGuide ? (
                <div className="flex items-center">
                  <Check className="text-green-600 h-4 w-4 mr-1" />
                  <span className="text-sm truncate">{integrationGuide.name}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-1" />
                  <span className="text-sm text-gray-400">Not uploaded</span>
                </div>
              )}
            </div>
            
            <div>
              <span className="text-gray-500">Additional Files:</span>
              {additionalFiles.length > 0 ? (
                <div className="flex items-center">
                  <Check className="text-green-600 h-4 w-4 mr-1" />
                  <span className="text-sm">{additionalFiles.length} files</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-1" />
                  <span className="text-sm text-gray-400">None uploaded</span>
                </div>
              )}
            </div>
          </div>
          
          {additionalFiles.length > 0 && (
            <div className="mt-2">
              <span className="text-gray-500">Additional File List:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {additionalFiles.map((file, idx) => (
                  <span key={idx} className="text-sm bg-white px-2 py-1 rounded border border-gray-200">
                    {file.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Developer Information */}
      <div className="bg-blue-50 rounded-md p-6">
        <h4 className="font-medium text-center mb-4">Developer Information</h4>
        
        {isLoadingProfile ? (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading developer profile...</p>
          </div>
        ) : developerProfile ? (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={developerProfile.profile_pic || ''} alt="Developer" />
                <AvatarFallback>{generateInitials()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">Developer Name:</span>
                <span className="font-medium ml-2">{developerProfile.developer_name || 'Not provided'}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Ethereum Address:</span>
                <span className="font-medium ml-2 truncate">{creatorAddress}</span>
              </div>
              
              {developerProfile.bio && (
                <div className="col-span-2">
                  <span className="text-gray-500">Bio:</span>
                  <p className="text-sm mt-1">{developerProfile.bio}</p>
                </div>
              )}
            </div>
            
            {/* Developer Social Links */}
            <div>
              <span className="text-gray-500">Developer Social Links:</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {developerProfile.developer_website && (
                  <div>
                    <span className="text-gray-500">Website:</span>
                    <span className="text-sm ml-2 truncate">{developerProfile.developer_website}</span>
                  </div>
                )}
                
                {developerProfile.developer_twitter && (
                  <div>
                    <span className="text-gray-500">Twitter:</span>
                    <span className="text-sm ml-2 truncate">{developerProfile.developer_twitter}</span>
                  </div>
                )}
                
                {developerProfile.developer_github && (
                  <div>
                    <span className="text-gray-500">GitHub:</span>
                    <span className="text-sm ml-2 truncate">{developerProfile.developer_github}</span>
                  </div>
                )}
                
                {developerProfile.developer_telegram && (
                  <div>
                    <span className="text-gray-500">Telegram:</span>
                    <span className="text-sm ml-2 truncate">{developerProfile.developer_telegram}</span>
                  </div>
                )}
                
                {(!developerProfile.developer_website && 
                  !developerProfile.developer_twitter && 
                  !developerProfile.developer_github && 
                  !developerProfile.developer_telegram) && (
                  <div className="col-span-2 text-sm text-gray-400">
                    No social links provided
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
            <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-700">No developer profile found</p>
              <p className="text-sm text-yellow-600 mt-1">
                Please consider completing your developer profile after capability creation.
                This will help users better understand who created this capability.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4">
        <Button 
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Capability...' : 'Launch'}
        </Button>
      </div>
    </div>
  );
};

export default Review;
