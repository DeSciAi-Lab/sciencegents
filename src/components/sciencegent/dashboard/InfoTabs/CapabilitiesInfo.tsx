
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CapabilitiesInfoProps {
  scienceGent: any;
}

const CapabilitiesInfo: React.FC<CapabilitiesInfoProps> = ({ scienceGent }) => {
  // Function to process capabilities into a standard format
  const processCapabilities = () => {
    if (!scienceGent?.capabilities) return [];
    
    if (Array.isArray(scienceGent.capabilities)) {
      return scienceGent.capabilities.map((cap: any) => {
        // If capability is an object, extract the needed data
        if (typeof cap === 'object' && cap !== null) {
          const id = cap.capability_id || cap.id || 'unknown';
          return {
            id,
            name: getCapabilityName(id),
            description: getCapabilityDescription(id)
          };
        }
        // If capability is a string (just the ID)
        if (typeof cap === 'string') {
          return {
            id: cap,
            name: getCapabilityName(cap),
            description: getCapabilityDescription(cap)
          };
        }
        return null;
      }).filter(Boolean);
    }
    
    return [];
  };
  
  // Helper functions to get capability details
  const getCapabilityName = (id: string): string => {
    const capabilityNames: Record<string, string> = {
      'chat': 'Chat Interaction',
      'molecular_vision': 'Molecular Vision',
      'spectroscopy': 'Spectroscopy Analysis',
      'llamps': 'LLAMPS',
      'bose_einstein_simulation': 'Bose-Einstein Simulation',
      'protein_folding': 'Protein Folding'
    };
    return capabilityNames[id] || id;
  };
  
  const getCapabilityDescription = (id: string): string => {
    const descriptions: Record<string, string> = {
      'chat': 'Basic chat capability',
      'molecular_vision': 'Visualize molecular structures in 2D/3D',
      'spectroscopy': 'Analyze spectroscopic data',
      'llamps': 'Physics simulation capabilities',
      'bose_einstein_simulation': 'Quantum mechanics simulation',
      'protein_folding': 'Analyze and predict protein folding patterns'
    };
    return descriptions[id] || 'Advanced scientific capability';
  };
  
  const capabilities = processCapabilities();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capabilities</CardTitle>
        <CardDescription>Features and capabilities of this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {capabilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capabilities.map((capability: any) => (
                <Card key={capability.id} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{capability.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{capability.description}</p>
                      </div>
                      <Badge variant="outline">{capability.id}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No capabilities found for this ScienceGent.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitiesInfo;
