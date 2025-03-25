
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Beaker, Twitter, Github, Globe, MessageCircle, Star } from 'lucide-react';
import { Capability } from '@/types/capability';
import ReactMarkdown from 'react-markdown';

interface CapabilityDetailsProps {
  capability: Capability;
}

const CapabilityDetails: React.FC<CapabilityDetailsProps> = ({ capability }) => {
  // Get developer initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'D';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-60" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <ReactMarkdown>
              {capability.description}
            </ReactMarkdown>
            
            {capability.features && capability.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  {capability.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 bg-blue-600 rounded-full w-1.5 h-1.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Integration Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Domain</h3>
              </div>
              <p className="text-gray-700">{capability.domain}</p>
            </div>
            
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Price</h3>
              </div>
              <p className="text-gray-700">{capability.price} ETH</p>
            </div>
            
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">ID</h3>
              </div>
              <p className="text-gray-700">{capability.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapabilityDetails;
