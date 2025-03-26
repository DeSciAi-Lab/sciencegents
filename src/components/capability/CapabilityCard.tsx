
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Capability } from '@/types/capability';

interface CapabilityCardProps {
  capability: {
    id: string;
    name: string;
    description?: string;
    price?: string | number;
    domain?: string;
    stats?: {
      usageCount?: number;
      rating?: number;
      revenue?: number;
    };
    display_image?: string;
  };
  onClick?: () => void;
  showImage?: boolean;
  className?: string;
}

export const renderRating = (rating: number) => {
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

const CapabilityCard: React.FC<CapabilityCardProps> = ({ 
  capability, 
  onClick, 
  showImage = true,
  className = '' 
}) => {
  const { 
    id, 
    name, 
    description, 
    price, 
    domain, 
    stats = {}, 
    display_image 
  } = capability;
  
  const { usageCount = 0, rating = 0, revenue = 0 } = stats;
  
  return (
    <div 
      className={`bg-white rounded-md border hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-800">{name}</h3>
            <div className="text-xs text-blue-600">{id}</div>
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {description}
          </p>
        )}
        
        {price !== undefined && (
          <div className="font-medium mb-2">
            Price {typeof price === 'number' ? `${price} ETH` : price}
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {usageCount !== undefined && (
            <div className="text-xs flex items-center gap-1">
              usage {usageCount}
            </div>
          )}
          
          {rating > 0 && (
            <div className="text-xs flex items-center gap-1">
              rating {renderRating(rating)}
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-between items-center">
          {revenue > 0 && (
            <div className="text-xs text-gray-500">
              revenue {revenue} DSI
            </div>
          )}
          
          {domain && (
            <Badge variant="outline" className="text-xs">
              {domain}
            </Badge>
          )}
        </div>
      </div>
      
      {showImage && display_image && (
        <div className="h-32 w-full">
          <img 
            src={display_image} 
            alt={name} 
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default CapabilityCard;
