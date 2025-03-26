
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface CapabilityItemProps {
  capability: {
    id: string;
    name: string;
    description: string;
    price: string;
    usage?: number;
    rating?: number;
    domain?: string;
    image?: string;
  };
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ capability }) => {
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{capability.name}</h4>
              <Badge variant="outline" className="text-xs">{capability.id}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{capability.description}</p>
            <p className="text-sm font-medium mb-3">Price {capability.price}</p>
            
            <div className="flex flex-wrap gap-2">
              {capability.usage !== undefined && (
                <div className="text-xs text-gray-600">usage {capability.usage}</div>
              )}
              
              {capability.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600">rating</span>
                  {renderRating(capability.rating)}
                  <span className="text-xs">{capability.rating}</span>
                </div>
              )}
              
              {capability.domain && (
                <Badge variant="secondary" className="text-xs">{capability.domain}</Badge>
              )}
            </div>
          </div>
          
          {capability.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={capability.image} 
                alt={capability.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

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
      usage: 5,
      rating: 4.1,
      domain: 'Chemistry',
      image: null
    },
    {
      id: 'spectroscopy',
      name: 'Spectroscopy Analysis',
      description: 'Analyze spectroscopic data with AI-powered pattern recognition.',
      price: '0.2 ETH',
      usage: 5,
      rating: 4.1,
      domain: 'Chemistry',
      image: null
    },
    {
      id: 'protein_folding',
      name: 'Protein Folding',
      description: 'Predict protein folding patterns with advanced neural networks.',
      price: '0.2 ETH',
      domain: 'Protein Analysis',
      image: null
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
            <CapabilityItem key={capability.id} capability={capability} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CapabilitiesTab;
