
import React from 'react';
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
  const totalCapabilityFees = calculateTotalCapabilityFeesSynchronous(
    formData.selectedCapabilities,
    capabilities
  );
  
  const selectedCapabilityNames = formData.selectedCapabilities.map(capId => {
    const cap = capabilities.find(c => c.id === capId);
    return cap ? cap.name : capId;
  });
  
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
      <form id="review-form" onSubmit={handleLaunch}>
        <div className="bg-blue-50 rounded-md p-6 mb-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white font-bold mb-4">
              {formData.symbol?.charAt(0) || "LO"}
            </div>
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
                  <p className="text-gray-500">Description</p>
                  <p className="font-medium">{formData.description || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Twitter</p>
                  <p className="font-medium">{formData.twitter || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Website</p>
                  <p className="font-medium">{formData.website || "N/A"}</p>
                </div>
              </div>
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
                Total capability Fee = {totalCapabilityFees.toFixed(2)} ETH
              </p>
            </div>
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Initial Liquidity</h3>
              <p className="text-lg font-medium">{formData.initialLiquidity} virtual ETH</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center">
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Agent Fee per Interaction</p>
                <p className="font-medium">2 DSI</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Launch Fee</p>
                <p className="font-medium">1000 DSI</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Trading Fee</p>
                <p className="font-medium">5 %</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-gray-200">
                <p className="text-xs text-gray-500">Migration Condition</p>
                <p className="text-xs font-medium">Trading FEE = 2 x vETH + Total Capability FEE</p>
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
