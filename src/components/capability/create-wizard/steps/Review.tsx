import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2,
  Info
} from 'lucide-react';
import { upsertCapabilityToSupabase } from '@/services/capability/supabase';
import { registerCapabilityOnBlockchain } from '@/services/capability/blockchain';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

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
    displayImage,
    isSubmitting,
    setIsSubmitting,
    handleFileUploads,
    resetForm,
    developerProfile,
    isLoadingProfile
  } = useCapabilityWizard();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // First, register on blockchain
      toast({
        title: "Registering capability on blockchain",
        description: "Please confirm the transaction in your wallet...",
      });
      
      // Convert price to string for blockchain registration
      const feeInEth = price.toString();
      
      const txHash = await registerCapabilityOnBlockchain(
        id,
        description,
        feeInEth,
        creatorAddress
      );
      
      setTxHash(txHash);
      
      toast({
        title: "Blockchain registration successful",
        description: "Your capability is now being uploaded to the database...",
      });
      
      // Now, upload files to storage
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
        },
        display_image: fileUploadResults.displayImageUrl,
        developer_profile_pic: developerProfile?.profile_pic
      };
      
      // Save to database
      await upsertCapabilityToSupabase(capabilityData, true);

      // Update developer's created_capabilities array
      try {
        const { data: existingProfile } = await supabase
          .from('developer_profiles')
          .select('created_capabilities')
          .eq('wallet_address', creatorAddress.toLowerCase())
          .single();

        if (existingProfile) {
          const updatedCapabilities = [...(existingProfile.created_capabilities || []), id];
          
          await supabase
            .from('developer_profiles')
            .update({
              created_capabilities: updatedCapabilities
            } as any) // Cast to any to bypass type checking
            .eq('wallet_address', creatorAddress.toLowerCase());
        }
      } catch (error) {
        console.error('Error updating developer profile:', error);
      }
      
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
        description: error.message || "There was an error creating your capability. Please try again.",
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
        
        {txHash && (
          <p className="text-sm text-gray-500 mb-4">
            Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate max-w-xs inline-block">{txHash.substring(0, 20)}...</a>
          </p>
        )}
        
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
            <a href={`/capability/${id}`}>
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
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium mb-2">Review Your Capability</h3>
        <p className="text-sm text-gray-500">
          Please review all information below before submitting. Once submitted, your capability will be available for ScienceGent creators to include in their agents.
        </p>
      </div>
      
      {/* Basic Information Card */}
      <div className="bg-blue-50 rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Basic Information</h4>
          {displayImage && (
            <Avatar className="h-12 w-12">
              <AvatarImage src={URL.createObjectURL(displayImage)} alt="Capability" />
              <AvatarFallback>LO</AvatarFallback>
            </Avatar>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-1">
              <p className="text-gray-500 text-sm">Capability Name</p>
              <p className="font-medium">{name || 'XXXXXXXXXX'}</p>
            </div>
            
            <div className="col-span-3 md:col-span-1">
              <p className="text-gray-500 text-sm">ID</p>
              <p className="font-medium">{id || 'XXXXXXXXXX'}</p>
            </div>
            
            <div className="col-span-3 md:col-span-1">
              <p className="text-gray-500 text-sm">Domain</p>
              <p className="font-medium">{domain || 'XXXXXXXXXX'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Description</p>
            <p className="font-medium">{description || 'XXXXXXXXXX'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">capability Fee</p>
              <p className="font-medium">{price || 'XXXXXX'} ETH</p>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">capability receiving address</p>
              <p className="font-medium">{creatorAddress || 'XXXXXXX'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Social Links</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <p className="text-gray-500 text-xs">Twitter</p>
                <p className="text-sm">{socialLinks.find(link => link.type === 'twitter')?.url || 'XXXXXXXX'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Telegram</p>
                <p className="text-sm">{socialLinks.find(link => link.type === 'telegram')?.url || 'XXXXXXX'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Github</p>
                <p className="text-sm">{socialLinks.find(link => link.type === 'github')?.url || 'XXXXXXX'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Website</p>
                <p className="text-sm">{socialLinks.find(link => link.type === 'website')?.url || 'XXXXXXXXXX'}</p>
              </div>
              
              {/* Display additional social links */}
              {socialLinks.filter(link => !['twitter', 'telegram', 'github', 'website'].includes(link.type)).map((link, idx) => (
                <div key={idx} className="col-span-2">
                  <p className="text-gray-500 text-xs">{link.type}</p>
                  <p className="text-sm">{link.url || 'XXXXXXXXXX'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Documents Card */}
      <div className="bg-orange-50 rounded-md p-6">
        <h4 className="font-medium mb-4">Documents Uploaded</h4>
        <div className="space-y-1">
          {documentation && (
            <div className="inline-block bg-white px-3 py-1 rounded text-sm mr-2 mb-2">
              {documentation.name}
            </div>
          )}
          {integrationGuide && (
            <div className="inline-block bg-white px-3 py-1 rounded text-sm mr-2 mb-2">
              {integrationGuide.name}
            </div>
          )}
          {additionalFiles.map((file, idx) => (
            <div key={idx} className="inline-block bg-white px-3 py-1 rounded text-sm mr-2 mb-2">
              {file.name}
            </div>
          ))}
          {!documentation && !integrationGuide && additionalFiles.length === 0 && (
            <p className="text-gray-500 text-sm">XXXXXXXXXX.pdf, XXXXXXXX.jpg, XXXXXXX.pdf, XXXXXXX.txt, XXXXXXXX.md</p>
          )}
        </div>
      </div>
      
      {/* Developer Information Card */}
      <div className="bg-blue-50 rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Developer Information</h4>
          <Avatar className="h-12 w-12">
            <AvatarImage src={developerProfile?.profile_pic || ''} alt="Developer" />
            <AvatarFallback>{generateInitials()}</AvatarFallback>
          </Avatar>
        </div>
        
        {isLoadingProfile ? (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading developer profile...</p>
          </div>
        ) : developerProfile ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Developer Name</p>
                <p className="font-medium">{developerProfile.developer_name || 'XXXXXXXXXX'}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Ethereum Address</p>
                <p className="font-medium truncate">{creatorAddress || 'XXXXXXXXXX'}</p>
              </div>
              
              {developerProfile.bio && (
                <div className="col-span-2">
                  <p className="text-gray-500 text-sm">Bio</p>
                  <p className="text-sm">{developerProfile.bio}</p>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-gray-500 text-sm">Developer Social Links</p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <p className="text-gray-500 text-xs">Twitter</p>
                  <p className="text-sm">{developerProfile.developer_twitter || 'XXXXXXXX'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Telegram</p>
                  <p className="text-sm">{developerProfile.developer_telegram || 'XXXXXXX'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Github</p>
                  <p className="text-sm">{developerProfile.developer_github || 'XXXXXXX'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Website</p>
                  <p className="text-sm">{developerProfile.developer_website || 'XXXXXXXXXX'}</p>
                </div>
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
