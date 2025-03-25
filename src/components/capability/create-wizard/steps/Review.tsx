
import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  AlertTriangle,
  CheckCircle2 
} from 'lucide-react';
import { upsertCapabilityToSupabase } from '@/services/capability/supabase';
import { toast } from '@/components/ui/use-toast';

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
    developerName,
    developerEmail,
    developerBio,
    socialLinks,
    documentation,
    integrationGuide,
    additionalFiles,
    isSubmitting,
    setIsSubmitting,
    handleFileUploads,
    resetForm
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
        developer_info: {
          name: developerName,
          email: developerEmail,
          bio: developerBio,
          social_links: socialLinks
        },
        stats: {
          usageCount: 0,
          rating: 4.5,
          revenue: 0
        },
        features,
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
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review Your Capability</h3>
        <p className="text-sm text-gray-500">
          Please review all information below before submitting. Once submitted, your capability will be available for ScienceGent creators to include in their agents.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium">Basic Information</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium">{name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">{id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Domain:</span>
              <span className="font-medium">{domain}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Price:</span>
              <span className="font-medium">{price} ETH</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Features:</span>
              <span className="font-medium">{features.length} features</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium">Developer Information</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium">{developerName || 'Not provided'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{developerEmail || 'Not provided'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Bio:</span>
              <span className="font-medium">{developerBio ? 'Provided' : 'Not provided'}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Social Links:</span>
              <span className="font-medium">{socialLinks.length} links</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Creator Address:</span>
              <span className="font-medium truncate max-w-[180px]">{creatorAddress || 'Not provided'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium">Uploaded Files</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="font-medium">Documentation</div>
            <div className="flex items-center">
              {documentation ? (
                <>
                  <Check className="text-green-600 h-4 w-4 mr-2" />
                  <span className="text-sm truncate max-w-[180px]">{documentation.name}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-500">Not uploaded</span>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="font-medium">Integration Guide</div>
            <div className="flex items-center">
              {integrationGuide ? (
                <>
                  <Check className="text-green-600 h-4 w-4 mr-2" />
                  <span className="text-sm truncate max-w-[180px]">{integrationGuide.name}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-500">Not uploaded</span>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="font-medium">Additional Files</div>
            <div className="flex items-center">
              {additionalFiles.length > 0 ? (
                <>
                  <Check className="text-green-600 h-4 w-4 mr-2" />
                  <span className="text-sm">{additionalFiles.length} files</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-amber-500 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-500">None uploaded</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          className="w-full"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Capability...' : 'Create Capability'}
        </Button>
      </div>
    </div>
  );
};

export default Review;
