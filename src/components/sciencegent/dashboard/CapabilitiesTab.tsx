
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CapabilityCard from '@/components/capability/CapabilityCard';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CapabilitiesTabProps {
  scienceGent: any;
}

const CapabilitiesTab: React.FC<CapabilitiesTabProps> = ({ scienceGent }) => {
  const [capabilities, setCapabilities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCapabilities = async () => {
      if (!scienceGent?.address) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // First get capability IDs for this scienceGent
        const { data: capabilityLinks, error: linksError } = await supabase
          .from('sciencegent_capabilities')
          .select('capability_id')
          .eq('sciencegent_address', scienceGent.address);
          
        if (linksError) throw linksError;
        
        if (!capabilityLinks || capabilityLinks.length === 0) {
          setCapabilities([]);
          setIsLoading(false);
          return;
        }
        
        // Extract capability IDs
        const capabilityIds = capabilityLinks.map(link => link.capability_id);
        
        // Fetch full capability details
        const { data: capabilityDetails, error: detailsError } = await supabase
          .from('capabilities')
          .select('*')
          .in('id', capabilityIds);
          
        if (detailsError) throw detailsError;
        
        setCapabilities(capabilityDetails || []);
      } catch (err) {
        console.error('Error fetching capabilities:', err);
        setError('Failed to load capabilities');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCapabilities();
  }, [scienceGent?.address]);
  
  // Fallback to sample data if no capabilities found and not in loading state
  const useSampleData = !isLoading && !error && capabilities.length === 0;
  
  // Sample capabilities data for demonstration
  const sampleCapabilities = [
    {
      id: 'molecular_vision',
      name: 'Molecular Vision',
      description: 'Visualize molecular structures in 2D/3D with advanced rendering capabilities.',
      price: 0.2,
      stats: {
        usageCount: 5,
        rating: 4.1
      },
      domain: 'Chemistry',
      display_image: null
    },
    {
      id: 'spectroscopy',
      name: 'Spectroscopy Analysis',
      description: 'Analyze spectroscopic data with AI-powered pattern recognition.',
      price: 0.2,
      stats: {
        usageCount: 5,
        rating: 4.1
      },
      domain: 'Chemistry',
      display_image: null
    },
    {
      id: 'protein_folding',
      name: 'Protein Folding',
      description: 'Predict protein folding patterns with advanced neural networks.',
      price: 0.2,
      domain: 'Protein Analysis',
      display_image: null
    }
  ];
  
  const displayCapabilities = useSampleData ? sampleCapabilities : capabilities;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capabilities</CardTitle>
        <CardDescription>Scientific capabilities of this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded-lg p-4">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48 mb-1" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : displayCapabilities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {displayCapabilities.map((capability) => (
              <CapabilityCard 
                key={capability.id} 
                capability={capability} 
                showImage={false} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No capabilities found for this ScienceGent.</p>
            {scienceGent?.creator_address && (
              <p className="mt-2 text-sm">
                The creator can add capabilities after migration to external DEX.
              </p>
            )}
          </div>
        )}
        
        {useSampleData && (
          <div className="mt-4 text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200">
            Note: Sample data shown for demonstration purposes.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CapabilitiesTab;
