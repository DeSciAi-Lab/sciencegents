
import React, { useEffect, useState } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Capability } from '@/types/capability';
import { Loader2 } from 'lucide-react';
import { calculateTotalCapabilityFeesSynchronous } from '../utils';
import { CreationStatus } from '@/hooks/useScienceGentCreation';

interface ReviewAndLaunchProps {
  formData: ScienceGentFormData;
  onSubmit: () => void;
  isLaunching?: boolean;
  capabilities: Capability[];
  status: CreationStatus;
}

const ReviewAndLaunch: React.FC<ReviewAndLaunchProps> = ({ 
  formData, 
  onSubmit, 
  isLaunching = false,
  capabilities,
  status
}) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [tradingFeeAmount, setTradingFeeAmount] = useState<string>("0");
  
  // Calculate total capability fees
  const totalCapabilityFees = calculateTotalCapabilityFeesSynchronous(
    formData.selectedCapabilities,
    capabilities
  );
  
  // Get names of selected capabilities
  const selectedCapabilityNames = formData.selectedCapabilities.map(capId => {
    const cap = capabilities.find(c => c.id === capId);
    return cap ? cap.name : capId;
  });
  
  // Calculate trading fee (2x virtualETH + capability fees)
  useEffect(() => {
    if (formData.initialLiquidity) {
      const virtualEth = parseFloat(formData.initialLiquidity);
      const tradingFee = (2 * virtualEth) + totalCapabilityFees;
      setTradingFeeAmount(tradingFee.toFixed(2));
    }
  }, [formData.initialLiquidity, totalCapabilityFees]);
  
  // Load profile image if available
  useEffect(() => {
    if (formData.profileImage) {
      const url = URL.createObjectURL(formData.profileImage);
      setProfileImageUrl(url);
      
      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(url);
    }
  }, [formData.profileImage]);
  
  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  const isButtonDisabled = isLaunching || 
    status === CreationStatus.Creating || 
    status === CreationStatus.WaitingConfirmation || 
    status === CreationStatus.Success;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review & Launch</h3>
        <p className="text-sm text-gray-500 mb-6">
          Review all the details of your ScienceGent before launching. Once launched, some properties cannot be changed.
        </p>
      </div>
      
      <form id="review-form" onSubmit={handleLaunch}>
        <div className="bg-blue-50 rounded-md p-6 mb-6">
          <div className="flex justify-center">
            {profileImageUrl ? (
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold mb-4">
                {formData.symbol?.charAt(0) || "SG"}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ticker</p>
                  <p className="font-medium">{formData.symbol}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Supply</p>
                  <p className="font-medium">{formData.totalSupply}</p>
                </div>
                <div>
                  <p className="text-gray-500">Domain</p>
                  <p className="font-medium">{formData.domain || "General Science"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Agent Fee</p>
                  <p className="font-medium">{formData.agentFee || "2"} DSI</p>
                </div>
                <div>
                  <p className="text-gray-500">Website</p>
                  <p className="font-medium">{formData.website || "N/A"}</p>
                </div>
              </div>
            </div>
            
            {/* Developer Information Section */}
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Developer Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{formData.developerName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{formData.developerEmail || "N/A"}</p>
                </div>
                {formData.bio && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Bio</p>
                    <p className="font-medium">{formData.bio}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                <p className="text-gray-500 text-sm">Developer Social Links</p>
                <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                  <div>
                    <p className="text-gray-500">Twitter</p>
                    <p className="font-medium">{formData.developerTwitter || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">GitHub</p>
                    <p className="font-medium">{formData.developerGithub || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Telegram</p>
                    <p className="font-medium">{formData.developerTelegram || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Website</p>
                    <p className="font-medium">{formData.developerWebsite || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Social Links</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Twitter</p>
                  <p className="font-medium">{formData.twitter || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">GitHub</p>
                  <p className="font-medium">{formData.github || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Telegram</p>
                  <p className="font-medium">{formData.telegram || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Website</p>
                  <p className="font-medium">{formData.website || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-sm">{formData.description || "No description provided"}</p>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Persona</h3>
              <p className="text-sm line-clamp-3">{formData.persona}</p>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Selected Capabilities</h3>
              {selectedCapabilityNames.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedCapabilityNames.map((name, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 text-xs py-1 px-2 rounded">
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No capabilities selected</p>
              )}
              <p className="mt-2 text-sm font-medium">
                Total Capability Fee: {totalCapabilityFees.toFixed(2)} ETH
              </p>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Initial Liquidity</h3>
              <p className="text-lg font-medium">{formData.initialLiquidity} virtual ETH</p>
              <p className="text-sm text-gray-500">
                Initial Price: {
                  formData.initialLiquidity && formData.totalSupply
                    ? (parseFloat(formData.initialLiquidity) / (parseFloat(formData.totalSupply) * 0.99)).toFixed(8)
                    : "0.00000000"
                } ETH
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center">
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Agent Fee per Interaction</p>
                <p className="font-medium">{formData.agentFee || "2"} DSI</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Launch Fee</p>
                <p className="font-medium">1000 DSI</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Trading Fee</p>
                <p className="font-medium">5%</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Migration Condition</p>
                <p className="text-xs font-medium">{tradingFeeAmount} ETH</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hidden submit button for form submission - actual button is in WizardLayout */}
        <button type="submit" className="hidden" disabled={isButtonDisabled}></button>
      </form>
      
      {(isLaunching || status !== CreationStatus.Idle) && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-blue-700">
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Processing your request...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAndLaunch;
