
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CapabilitiesInfoProps {
  scienceGent: any;
}

const CapabilitiesInfo: React.FC<CapabilitiesInfoProps> = ({ scienceGent }) => {
  // Mock data for capabilities (replace with actual data when available)
  const capabilities = [
    { id: "chat", name: "Chat Interaction", description: "Basic chat capability" },
    { id: "molecular-vision", name: "Molecular Vision", description: "Visualize molecular structures in 2D/3D" },
    { id: "spectroscopy", name: "Spectroscopy Analysis", description: "Analyze spectroscopic data" }
  ];
  
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
              {capabilities.map(capability => (
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
