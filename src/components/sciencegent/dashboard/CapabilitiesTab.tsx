
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CapabilityCard from '@/components/capability/CapabilityCard';

interface CapabilitiesTabProps {
  scienceGent: any;
}

const CapabilitiesTab: React.FC<CapabilitiesTabProps> = ({ scienceGent }) => {
  // Sample capabilities data - in real implementation, this would come from scienceGent
  const capabilities = [
    {
      id: 'molecular_vision',
      name: 'Molecular Vision',
      description: 'Visualize molecular structures in 2D/3D with advanced rendering capabilities.',
      price: '0.2 ETH',
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
      price: '0.2 ETH',
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
      price: '0.2 ETH',
      domain: 'Protein Analysis',
      display_image: null
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capabilities</CardTitle>
        <CardDescription>Scientific capabilities of this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.id} capability={capability} showImage={false} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitiesTab;
