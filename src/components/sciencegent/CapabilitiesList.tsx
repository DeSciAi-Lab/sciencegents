
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';

interface CapabilitiesListProps {
  scienceGent: any;
}

interface CapabilityDetail {
  id: string;
  name: string;
  description: string;
  domain: string;
  price: number;
}

const CapabilitiesList: React.FC<CapabilitiesListProps> = ({ scienceGent }) => {
  const [capabilities, setCapabilities] = useState<CapabilityDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCapabilities = async () => {
      if (!scienceGent?.address) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Get all capability IDs for this ScienceGent
        const { data: capabilityLinks, error: linksError } = await supabase
          .from('sciencegent_capabilities')
          .select('capability_id')
          .eq('sciencegent_address', scienceGent.address);
          
        if (linksError) throw linksError;
        
        if (!capabilityLinks || capabilityLinks.length === 0) {
          setCapabilities([]);
          setLoading(false);
          return;
        }
        
        // Extract capability IDs
        const capabilityIds = capabilityLinks.map(link => link.capability_id);
        
        // Fetch capability details
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
        setLoading(false);
      }
    };
    
    fetchCapabilities();
  }, [scienceGent?.address]);
  
  // Group capabilities by domain
  const groupedCapabilities = capabilities.reduce((acc, capability) => {
    const domain = capability.domain || 'General';
    if (!acc[domain]) {
      acc[domain] = [];
    }
    acc[domain].push(capability);
    return acc;
  }, {} as Record<string, CapabilityDetail[]>);
  
  if (loading) {
    return <LoadingSkeleton />;
  }
  
  if (error) {
    return (
      <Card className="p-4 bg-destructive/10 border-destructive">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Card>
    );
  }
  
  if (capabilities.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CardDescription>
          This ScienceGent doesn't have any capabilities yet.
        </CardDescription>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedCapabilities).map(([domain, domainCapabilities]) => (
        <div key={domain}>
          <h3 className="text-lg font-medium mb-3">{domain}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainCapabilities.map(capability => (
              <Card key={capability.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{capability.name}</h4>
                    <Badge variant="outline">{domain}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {capability.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Fee: {capability.price} ETH
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div>
      <Skeleton className="h-6 w-32 mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
    <div>
      <Skeleton className="h-6 w-32 mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

export default CapabilitiesList;
