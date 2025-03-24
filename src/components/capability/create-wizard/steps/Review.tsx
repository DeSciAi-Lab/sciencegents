import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Loader2, Check, AlertCircle, Twitter, Github, Globe, FileText, MessageCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Review: React.FC = () => {
  const { 
    formData, 
    documentation, 
    integrationGuide, 
    additionalFiles,
    displayImage,
    profileImage,
    isSubmitting,
    submitCapability
  } = useCapabilityWizard();
  
  const [error, setError] = React.useState<string | null>(null);
  
  const hasCapabilitySocialLinks = formData.twitter || formData.github || formData.website || formData.telegram || formData.socialLinks.length > 0;
  const hasDeveloperSocialLinks = formData.developerTwitter || formData.developerGithub || formData.developerWebsite || formData.developerTelegram || formData.developerSocialLinks.length > 0;
  
  const renderCapabilitySocialLinks = () => {
    return (
      <div className="space-y-2">
        {formData.twitter && (
          <div className="flex items-center gap-2">
            <Twitter size={16} className="text-blue-500" />
            <span className="text-sm">{formData.twitter}</span>
          </div>
        )}
        {formData.github && (
          <div className="flex items-center gap-2">
            <Github size={16} className="text-gray-800" />
            <span className="text-sm">{formData.github}</span>
          </div>
        )}
        {formData.website && (
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-green-600" />
            <span className="text-sm">{formData.website}</span>
          </div>
        )}
        {formData.telegram && (
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-blue-500" />
            <span className="text-sm">{formData.telegram}</span>
          </div>
        )}
        {formData.socialLinks.map((link, index) => (
          link.type && link.url ? (
            <div key={index} className="flex items-center gap-2">
              <Globe size={16} className="text-purple-500" />
              <span className="text-sm">{link.type}: {link.url}</span>
            </div>
          ) : null
        ))}
      </div>
    );
  };
  
  const renderDeveloperSocialLinks = () => {
    return (
      <div className="space-y-2">
        {formData.developerTwitter && (
          <div className="flex items-center gap-2">
            <Twitter size={16} className="text-blue-500" />
            <span className="text-sm">{formData.developerTwitter}</span>
          </div>
        )}
        {formData.developerGithub && (
          <div className="flex items-center gap-2">
            <Github size={16} className="text-gray-800" />
            <span className="text-sm">{formData.developerGithub}</span>
          </div>
        )}
        {formData.developerWebsite && (
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-green-600" />
            <span className="text-sm">{formData.developerWebsite}</span>
          </div>
        )}
        {formData.developerTelegram && (
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-blue-500" />
            <span className="text-sm">{formData.developerTelegram}</span>
          </div>
        )}
        {formData.developerSocialLinks.map((link, index) => (
          link.type && link.url ? (
            <div key={index} className="flex items-center gap-2">
              <Globe size={16} className="text-purple-500" />
              <span className="text-sm">{link.type}: {link.url}</span>
            </div>
          ) : null
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Review your capability details before launching. Once launched, some properties cannot be changed.
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-6 bg-blue-50 p-6 rounded-lg">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            {displayImage && (
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="border rounded-md overflow-hidden bg-white h-40 w-full">
                  <img 
                    src={URL.createObjectURL(displayImage)} 
                    alt="Capability Display" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
            
            <div className={`${displayImage ? 'md:w-2/3' : 'w-full'} space-y-4`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-medium">{formData.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Domain</p>
                  <p className="font-medium">{formData.domain}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Fee</p>
                  <p className="font-medium">{formData.fee} ETH</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Creator Address</p>
                  <p className="font-medium truncate">{formData.creatorAddress}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm">{formData.description}</p>
              </div>
              
              {hasCapabilitySocialLinks && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Social Links</p>
                  {renderCapabilitySocialLinks()}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Documentation */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Documentation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Documentation</p>
              {documentation ? (
                <div className="p-3 border rounded-md bg-white flex items-center gap-3">
                  <FileText size={20} className="text-blue-500" />
                  <div>
                    <p className="font-medium truncate max-w-[200px]">{documentation.name}</p>
                    <p className="text-xs text-gray-500">{(documentation.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm italic text-gray-500">No documentation uploaded</p>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Integration Guide</p>
              {integrationGuide ? (
                <div className="p-3 border rounded-md bg-white flex items-center gap-3">
                  <FileText size={20} className="text-green-500" />
                  <div>
                    <p className="font-medium truncate max-w-[200px]">{integrationGuide.name}</p>
                    <p className="text-xs text-gray-500">{(integrationGuide.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm italic text-gray-500">No integration guide uploaded</p>
              )}
            </div>
          </div>
          
          {additionalFiles && additionalFiles.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Additional Files ({additionalFiles.length})</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {additionalFiles.map((file, index) => (
                  <div key={index} className="p-3 border rounded-md bg-white flex items-center gap-3">
                    <FileText size={20} className="text-purple-500" />
                    <div>
                      <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Developer Information */}
        {(formData.developerName || formData.developerEmail || formData.bio || hasDeveloperSocialLinks || profileImage) && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Developer Information</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              {profileImage && (
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="border rounded-md overflow-hidden bg-white h-40 w-40">
                    <img 
                      src={URL.createObjectURL(profileImage)} 
                      alt="Developer Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className={`${profileImage ? 'md:w-3/4' : 'w-full'} space-y-4`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.developerName && (
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{formData.developerName}</p>
                    </div>
                  )}
                  
                  {formData.developerEmail && (
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{formData.developerEmail}</p>
                    </div>
                  )}
                </div>
                
                {formData.bio && (
                  <div>
                    <p className="text-sm text-gray-500">Bio</p>
                    <p className="text-sm">{formData.bio}</p>
                  </div>
                )}
                
                {hasDeveloperSocialLinks && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Social Links</p>
                    {renderDeveloperSocialLinks()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
