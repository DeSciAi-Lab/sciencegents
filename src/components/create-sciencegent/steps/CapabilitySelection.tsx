
import React, { useEffect, useState } from 'react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchCapabilitiesFromSupabase } from '@/services/capability/supabase';
import { CapabilityDetail } from '@/services/scienceGent/types';
import { Capability } from '@/types/capability';

interface CapabilitySelectionProps {
  formData: ScienceGentFormData;
  handleCapabilityToggle: (capabilityId: string) => void;
}

const CapabilitySelection: React.FC<CapabilitySelectionProps> = ({ 
  formData, 
  handleCapabilityToggle 
}) => {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCapabilitiesFromSupabase();
        setCapabilities(data);
      } catch (err: any) {
        console.error('Error fetching capabilities:', err);
        setError(err.message || 'Failed to fetch capabilities');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCapabilities();
  }, []);
  
  const isSelected = (id: string) => {
    return formData.selectedCapabilities.includes(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Select Capabilities</h3>
        <p className="text-sm text-gray-500">
          Choose capabilities for your ScienceGent. Each capability adds functionality and has an associated fee.
        </p>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md border">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <ScrollArea className="h-96 border rounded-md bg-gray-50">
          <div className="p-4 space-y-6">
            {capabilities.map((capability) => (
              <div key={capability.id} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id={capability.id}
                    checked={isSelected(capability.id)}
                    onCheckedChange={() => handleCapabilityToggle(capability.id)}
                    className="mt-1"
                  />
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between items-start">
                      <label htmlFor={capability.id} className="text-base font-medium cursor-pointer">
                        {capability.name}
                      </label>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-medium">
                        {capability.price} ETH
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{capability.description}</p>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <div>Usage: {capability.stats?.usageCount || 0}</div>
                      <div>Rating: {capability.stats?.rating || 0}/5</div>
                    </div>
                    
                    {capability.features && capability.features.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-600 mb-1">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {capability.features.map((feature, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {capabilities.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                <p>No capabilities found. Please try again later.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
      
      <div className="bg-blue-50 p-4 rounded-md text-blue-700 text-sm">
        <p>
          <strong>Note:</strong> The capability fees will be collected from trading fees and paid to capability creators upon migration to Uniswap.
        </p>
      </div>
    </div>
  );
};

export default CapabilitySelection;
