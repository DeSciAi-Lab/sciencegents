
import React, { useEffect, useState } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Capability } from '@/types/capability';
import { Loader2, AlertCircle } from 'lucide-react';
import { calculateTotalCapabilityFeesSynchronous } from '../utils';
import { CreationStatus } from '@/hooks/useScienceGentCreation';
import { DeveloperProfile } from '@/types/profile';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ReviewAndLaunchProps {
  formData: ScienceGentFormData;
  onSubmit: () => void;
  isLaunching?: boolean;
  capabilities: Capability[];
  status: CreationStatus;
  developerProfile: DeveloperProfile | null;
  isLoadingProfile: boolean;
}

const ReviewAndLaunch: React.FC<ReviewAndLaunchProps> = ({ 
  formData, 
  onSubmit, 
  isLaunching = false,
  capabilities,
  status,
  developerProfile,
  isLoadingProfile
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

  const profileInitials = developerProfile?.developer_name 
    ? developerProfile.developer_name.charAt(0).toUpperCase() 
    : formData.symbol?.charAt(0) || "SG";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review & Launch</h3>
        <p className="text-sm text-gray-500 mb-6">
          Review all the details of your ScienceGent before launching. Once launched, some properties cannot be changed.
        </p>
      </div>
      
      <form id="review-form" onSubmit={handleLaunch}>
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="bg-blue-50 rounded-md p-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-purple-500 text-white text-2xl font-bold">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : profileInitials}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
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
            </div>
            <div className="mt-2">
              <p className="text-gray-500">Description</p>
              <p className="text-sm">{formData.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div>
                <p className="text-gray-500">Twitter</p>
                <p className="font-medium">{formData.twitter || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Telegram</p>
                <p className="font-medium">{formData.telegram || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">GitHub</p>
                <p className="font-medium">{formData.github || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Website</p>
                <p className="font-medium">{formData.website || "N/A"}</p>
              </div>
            </div>
          </div>
          
          {/* Persona */}
          <div className="bg-orange-50 rounded-md p-4 border border-orange-100">
            <h3 className="font-medium text-gray-700 mb-2">Persona</h3>
            <p className="text-sm line-clamp-3">
              {formData.persona || "No persona specified"}
            </p>
          </div>
            
          {/* Selected Capabilities */}
          <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
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
          
          {/* Initial Liquidity */}
          <div className="bg-orange-50 rounded-md p-4 border border-orange-100">
            <h3 className="font-medium text-gray-700 mb-2">Initial Liquidity</h3>
            <p className="text-lg font-medium">{formData.initialLiquidity} virtual ETH</p>
            <p className="text-sm text-gray-500">
              Initial Price: {
                formData.initialLiquidity && formData.totalSupply
                  ? (parseFloat(formData.initialLiquidity) / (parseFloat(formData.totalSupply) * 0.99)).toFixed(8)
                  : "0.00000000"
              } ETH
            </p>
            <p className="text-sm text-gray-500 mt-2">
              virtualETH is a synthetic representation of ETH used to initialize your token's price. 
              You don't need to deposit real ETH until your token is ready to migrate to a public DEX.
            </p>
          </div>
          
          {/* Developer Information Section */}
          <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
            <h3 className="font-medium text-gray-700 mb-2">Developer Information</h3>
            
            {isLoadingProfile ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
              </div>
            ) : developerProfile ? (
              <div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">{developerProfile.developer_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Wallet Address</p>
                    <p className="font-medium truncate">{developerProfile.wallet_address || "N/A"}</p>
                  </div>
                </div>
                
                {developerProfile.bio && (
                  <div className="mt-2">
                    <p className="text-gray-500">Bio</p>
                    <p className="text-sm">{developerProfile.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-gray-500">Twitter</p>
                    <p className="font-medium">{developerProfile.developer_twitter || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Telegram</p>
                    <p className="font-medium">{developerProfile.developer_telegram || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">GitHub</p>
                    <p className="font-medium">{developerProfile.developer_github || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Website</p>
                    <p className="font-medium">{developerProfile.developer_website || "N/A"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  Please consider completing your developer profile after ScienceGent launch.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          {/* Fees and Conditions */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
              <p className="text-xs text-gray-500">Agent Fee per Interaction</p>
              <p className="font-medium">{formData.agentFee || "2"} DSI</p>
            </div>
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
              <p className="text-xs text-gray-500">Launch Fee</p>
              <p className="font-medium">1000 DSI</p>
            </div>
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
              <p className="text-xs text-gray-500">Trading Fee</p>
              <p className="font-medium">5 %</p>
            </div>
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100">
              <p className="text-xs text-gray-500">Migration Condition</p>
              <p className="text-xs font-medium">{tradingFeeAmount} ETH</p>
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
