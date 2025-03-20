
import React, { useState, useEffect } from 'react';
import { Beaker, DollarSign, Check, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Capability } from '@/types/capability';
import { calculateTotalCapabilityFees } from '../utils';
import { getAllCapabilities } from '@/data/capabilities';
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from '@/services/capability';

interface CapabilitySelectionProps {
  formData: ScienceGentFormData;
  handleCapabilityToggle: (capabilityId: string) => void;
}

const CapabilitySelection: React.FC<CapabilitySelectionProps> = ({ formData, handleCapabilityToggle }) => {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to fetch from blockchain
        const capabilityIds = await fetchCapabilityIdsFromBlockchain();
        
        if (capabilityIds && capabilityIds.length > 0) {
          console.log(`Fetched ${capabilityIds.length} capability IDs from blockchain`);
          
          // Fetch details for each capability
          const fetchedCapabilities = await Promise.all(
            capabilityIds.map(async (id) => {
              try {
                const details = await fetchCapabilityDetailsFromBlockchain(id);
                return {
                  id,
                  name: details.name || id,
                  domain: details.domain || 'Unknown',
                  description: details.description || '',
                  price: details.price || 0,
                  creator: details.creator || '',
                  createdAt: new Date().toISOString(),
                  stats: details.stats || { usageCount: 0, rating: 4.5, revenue: 0 },
                  features: details.features || []
                } as Capability;
              } catch (err) {
                console.error(`Error fetching details for capability ${id}:`, err);
                return null;
              }
            })
          );
          
          // Filter out any null results
          const validCapabilities = fetchedCapabilities.filter(Boolean) as Capability[];
          setCapabilities(validCapabilities);
          
          console.log(`Successfully fetched ${validCapabilities.length} capabilities from blockchain`);
        } else {
          // Fallback to Supabase/local data
          console.log('No capabilities found on blockchain, falling back to database');
          const dbCapabilities = await getAllCapabilities(true);
          setCapabilities(dbCapabilities);
        }
      } catch (err) {
        console.error('Error fetching capabilities:', err);
        setError('Failed to load capabilities. Please try again later.');
        
        // Fallback to database/mock data
        try {
          const dbCapabilities = await getAllCapabilities();
          setCapabilities(dbCapabilities);
        } catch (fallbackErr) {
          console.error('Error fetching fallback capabilities:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, []);

  // Calculate total fees based on current selection and available capabilities
  const getTotalFees = () => {
    const selectedCapabilities = capabilities.filter(cap => 
      formData.selectedCapabilities.includes(cap.id)
    );
    
    return selectedCapabilities.reduce((total, cap) => total + cap.price, 0);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Capability Selection</CardTitle>
          <CardDescription>
            Loading capabilities from the blockchain...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-science-600" />
            <p className="text-sm text-muted-foreground">Fetching available capabilities...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Capability Selection</CardTitle>
          <CardDescription>
            There was an error loading capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-destructive/20 bg-destructive/10 rounded-lg text-destructive">
            {error}
          </div>
          <button 
            className="mt-4 text-sm text-science-700 hover:text-science-800 font-medium"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  if (capabilities.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Capability Selection</CardTitle>
          <CardDescription>
            No capabilities are currently available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            There are no capabilities available at this time. Please check back later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Capability Selection</CardTitle>
        <CardDescription>
          Select the capabilities that your ScienceGent will have
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            {capabilities.map((capability) => (
              <div 
                key={capability.id} 
                className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                  formData.selectedCapabilities.includes(capability.id)
                    ? 'border-science-400 bg-science-50'
                    : 'border-border hover:border-science-200'
                }`}
                onClick={() => handleCapabilityToggle(capability.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 w-10 h-10 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                      <Beaker size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">{capability.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{capability.domain}</p>
                      <div className="flex items-center text-xs font-medium text-science-700 bg-science-100 w-fit px-2 py-0.5 rounded-full">
                        <DollarSign size={10} className="mr-0.5" />
                        <span>{capability.price} ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.selectedCapabilities.includes(capability.id)
                      ? 'bg-science-500 border-science-500 text-white'
                      : 'border-muted-foreground'
                  }`}>
                    {formData.selectedCapabilities.includes(capability.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between text-sm mb-1">
              <span>Selected Capabilities</span>
              <span>{formData.selectedCapabilities.length}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Total Capability Fee</span>
              <span>{getTotalFees().toFixed(2)} ETH</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitySelection;
