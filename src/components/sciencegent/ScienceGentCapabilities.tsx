
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ScienceGentCapabilitiesProps {
  scienceGent: any;
}

const ScienceGentCapabilities: React.FC<ScienceGentCapabilitiesProps> = ({ scienceGent }) => {
  // Map capability IDs to more user-friendly names and categories
  const capabilityMap: Record<string, { name: string, category?: string }> = {
    'chat': { name: 'Chat', category: 'Core' },
    'molecular_vision': { name: 'Molecular Vision', category: 'Chemistry' },
    'llamps': { name: 'LLAMPS', category: 'Physics' },
    'bose_einstein_simulation': { name: 'Bose-Einstein Simulation', category: 'Physics' },
    'spectroscopy': { name: 'Spectroscopy Analysis', category: 'Chemistry' },
    'protein_folding': { name: 'Protein Folding', category: 'Biology' },
  };
  
  // Process capabilities data to ensure we have an array of capability IDs
  let displayCapabilities: string[] = [];
  
  if (scienceGent?.capabilities) {
    // Handle different capability formats
    if (Array.isArray(scienceGent.capabilities)) {
      displayCapabilities = scienceGent.capabilities.map((cap: any) => {
        // Handle case where capabilities is an array of objects
        if (typeof cap === 'object' && cap !== null) {
          return cap.capability_id || cap.id || 'unknown';
        }
        // Handle case where capabilities is an array of strings
        return typeof cap === 'string' ? cap : 'unknown';
      }).filter((id: string) => id !== 'unknown');
    }
  }
  
  // If no capabilities found, use sample data
  if (displayCapabilities.length === 0) {
    displayCapabilities = ['chat', 'molecular_vision', 'llamps', 'bose_einstein_simulation'];
  }
  
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
              key={index} 
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
