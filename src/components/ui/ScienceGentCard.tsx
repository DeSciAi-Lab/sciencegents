
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  Beaker, 
  Clock, 
  DollarSign,
  GitMerge
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScienceGentCardProps {
  id: string;
  name: string;
  profilePic?: string;
  address: string;
  marketCap: number;
  tokenPrice: number;
  age: string;
  roi: number;
  domain: string;
  featured?: boolean;
  isMigrated?: boolean;
  migrationEligible?: boolean;
}

const ScienceGentCard: React.FC<ScienceGentCardProps> = ({
  id,
  name,
  profilePic,
  address,
  marketCap,
  tokenPrice,
  age,
  roi,
  domain,
  featured = false,
  isMigrated = false,
  migrationEligible = false
}) => {
  const navigate = useNavigate();
  
  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  // Format market cap for display
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M ETH`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K ETH`;
    }
    return `${value.toFixed(4)} ETH`;
  };

  // Format token price for display
  const formatTokenPrice = (value: number) => {
    return `${value.toFixed(4)} ETH`;
  };

  // Format ROI for display with + or - sign
  const formatROI = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const handleClick = () => {
    navigate(`/sciencegent/${address}`);
  };

  return (
    <Card 
      onClick={handleClick}
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-glass cursor-pointer ${featured ? 'glass-card border-science-200' : ''}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                  profilePic 
                    ? '' 
                    : 'bg-gradient-to-br from-science-400 to-science-600'
                }`}
              >
                {profilePic ? (
                  <img 
                    src={profilePic} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy" 
                  />
                ) : (
                  name.substring(0, 2).toUpperCase()
                )}
              </div>
              {featured && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-science-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground">{formatAddress(address)}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-xs font-medium text-science-700 bg-science-50 px-2 py-1 rounded-full">
              <Beaker size={12} />
              <span>{domain}</span>
            </div>
            {isMigrated && (
              <Badge className="bg-green-100 text-green-800 flex items-center">
                <GitMerge size={10} className="mr-1" />
                Uniswap
              </Badge>
            )}
            {!isMigrated && migrationEligible && (
              <Badge className="bg-blue-100 text-blue-800 flex items-center">
                <GitMerge size={10} className="mr-1" />
                Ready for Migration
              </Badge>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <DollarSign size={12} />
              Market Cap
            </p>
            <p className="font-medium">{formatMarketCap(marketCap)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <DollarSign size={12} />
              Token Price
            </p>
            <p className="font-medium">{formatTokenPrice(tokenPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Clock size={12} />
              Age
            </p>
            <p className="font-medium">{age}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <TrendingUp size={12} />
              Capability ROI
            </p>
            <p className={`font-medium ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatROI(roi)}
            </p>
          </div>
        </div>
        
        {/* Action */}
        <div className="flex justify-end">
          <button className="text-sm font-medium text-science-600 hover:text-science-700 flex items-center gap-1 transition-colors">
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      
      {/* Gradient border indicator for featured cards */}
      {featured && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-science-400 to-science-600" />
      )}
    </Card>
  );
};

export default ScienceGentCard;
