
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ScienceGentCapabilitiesProps {
  scienceGent: any;
}

const ScienceGentCapabilities: React.FC<ScienceGentCapabilitiesProps> = ({ scienceGent }) => {
  // Sample capabilities for display
  const capabilities = scienceGent?.capabilities || [];
  
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
    <div className="border rounded-lg p-4">
      <div className="text-lg font-medium mb-2">
        {displayCapabilities.length} Capabilities:
      </div>
      <div className="flex flex-wrap gap-2">
        {displayCapabilities.map((cap: string, index: number) => (
          index < 4 && (
            <Badge 
              key={cap} 
              className="bg-white border rounded-full px-3 py-1 hover:bg-gray-100"
            >
              {getCapabilityName(cap)}
            </Badge>
          )
        ))}
        
        {displayCapabilities.length > 4 && (
          <Badge 
            className="bg-white border rounded-full px-3 py-1 hover:bg-gray-100 cursor-pointer"
          >
            more
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ScienceGentCapabilities;
