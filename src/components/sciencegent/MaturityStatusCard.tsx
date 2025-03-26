
import React from 'react';
import { Card } from '@/components/ui/card';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MaturityStatusCardProps {
  progress: number;
  compact?: boolean;
  className?: string;
  virtualEth?: number;
  capabilityFees?: number;
  collectedFees?: number;
}

const MaturityStatusCard: React.FC<MaturityStatusCardProps> = ({ 
  progress, 
  compact = false,
  className = '',
  virtualEth = 0,
  capabilityFees = 0,
  collectedFees = 0
}) => {
  const { formatEthToUsd } = useEthPriceContext();
  
  // Calculate threshold (2× virtualETH + capability fees)
  const migrationThreshold = (2 * virtualEth) + capabilityFees;
  
  // Determine color based on progress
  const getColorClass = () => {
    if (progress >= 100) return 'bg-green-500'; // Eligible for migration
    if (progress >= 75) return 'bg-blue-500';   // Getting close
    if (progress >= 50) return 'bg-yellow-500'; // Halfway there
    return 'bg-purple-500';                     // Still far
  };

  // Determine status text
  const getStatusText = () => {
    if (progress >= 100) return 'Ready for migration';
    return `${Math.floor(progress)}% complete`;
  };

  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Maturity Status</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-400 hover:text-gray-600">
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>A ScienceGent becomes eligible for migration to external DEX when collected trading fees
            reach the migration threshold (2× virtualETH + capability fees).</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-2">
          <div 
            className={`${getColorClass()} h-2.5 rounded-full transition-all duration-500`} 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-700 font-medium">{getStatusText()}</div>
          {progress >= 100 && 
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
              Eligible
            </span>
          }
        </div>
      </div>
      
      {!compact && (
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            Migration threshold: 2× virtualETH + capability fees
          </p>
          
          {(virtualEth > 0 || capabilityFees > 0 || collectedFees > 0) && (
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Virtual ETH</div>
                <div className="font-medium">{virtualEth.toFixed(4)} ETH</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Capability Fees</div>
                <div className="font-medium">{capabilityFees.toFixed(4)} ETH</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Collected Fees</div>
                <div className="font-medium">{collectedFees.toFixed(4)} ETH</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Threshold</div>
                <div className="font-medium">{migrationThreshold.toFixed(4)} ETH</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaturityStatusCard;
