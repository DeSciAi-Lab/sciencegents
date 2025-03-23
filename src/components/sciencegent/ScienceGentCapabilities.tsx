
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScienceGentCapabilitiesProps {
  scienceGent: any;
}

const ScienceGentCapabilities: React.FC<ScienceGentCapabilitiesProps> = ({ scienceGent }) => {
  // Sample capabilities for display
  const capabilities = scienceGent.capabilities || [];
  
  // Map capability IDs to more user-friendly names and categories
  const capabilityMap: Record<string, { name: string, category?: string }> = {
    'chat': { name: 'Chat', category: 'Core' },
    'molecular_vision': { name: 'Molecular Vision', category: 'Chemistry' },
    'llamps': { name: 'LLAMPS', category: 'Physics' },
    'bose_einstein_simulation': { name: 'Bose-Einstein Simulation', category: 'Physics' },
    'spectroscopy': { name: 'Spectroscopy Analysis', category: 'Chemistry' },
    'protein_folding': { name: 'Protein Folding', category: 'Biology' },
  };
  
  // Display sample capabilities if none are provided
  const displayCapabilities = capabilities.length > 0 
    ? capabilities 
    : ['chat', 'molecular_vision', 'llamps', 'bose_einstein_simulation'];
  
  const getCapabilityName = (id: string) => {
    return capabilityMap[id]?.name || id;
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">
            {displayCapabilities.length} Capabilities:
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {displayCapabilities.slice(0, 5).map((cap: string) => (
            <Badge 
              key={cap} 
              variant="outline" 
              className="bg-gray-50 hover:bg-gray-100"
            >
              {getCapabilityName(cap)}
            </Badge>
          ))}
          
          {displayCapabilities.length > 5 && (
            <Badge 
              variant="outline" 
              className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentCapabilities;
