
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';

interface MaturityTrackerProps {
  maturityProgress: number;
  isMigrated: boolean;
  virtualETH: number;
  collectedFees: number;
  capabilityFees: number;
  remainingMaturityTime?: number;
}

const MaturityTracker: React.FC<MaturityTrackerProps> = ({
  maturityProgress,
  isMigrated,
  virtualETH,
  collectedFees,
  capabilityFees,
  remainingMaturityTime
}) => {
  // Calculate the required fees for migration
  const requiredFees = virtualETH * 2 + capabilityFees;
  
  // Use the maturity_progress value directly from props instead of calculating it
  const progress = maturityProgress || 0;
  
  // Format remaining time if provided
  const formatRemainingTime = (seconds?: number) => {
    if (!seconds) return 'Matured';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} remaining`;
    } else {
      return `${hours} hour${hours !== 1 ? 's' : ''} remaining`;
    }
  };
  
  // Determine status text and color
  const getStatusInfo = () => {
    if (isMigrated) {
      return {
        text: "Migrated to Uniswap",
        color: "bg-green-100 text-green-800",
        progress: 100
      };
    }
    
    if (progress >= 100) {
      return {
        text: "Ready for Migration",
        color: "bg-blue-100 text-blue-800",
        progress: 100
      };
    }
    
    return {
      text: "Accumulating Fees",
      color: "bg-slate-100 text-slate-800",
      progress
    };
  };
  
  const status = getStatusInfo();
  
  return (
    <div className="border rounded-xl p-4">
      <div className="text-center mb-2">
        <div className="text-xl font-medium">Maturity Status</div>
        <div className="text-2xl font-bold">{status.progress.toFixed(2)}%</div>
      </div>
      <Progress value={status.progress} className="h-2 bg-gray-200" />
      
      <div className="flex justify-between items-center mt-3">
        <Badge className={status.color}>{status.text}</Badge>
        {remainingMaturityTime !== undefined && !isMigrated && (
          <span className="text-sm text-gray-600">
            {formatRemainingTime(remainingMaturityTime)}
          </span>
        )}
      </div>
      
      <p className="mt-3 text-sm">
        The ScienceGent will become eligible to migrate to Uniswap on generating {requiredFees.toFixed(4)} ETH in trading fees (
        2× virtualETH = {(virtualETH * 2).toFixed(4)} + capability fees = {capabilityFees.toFixed(4)})
      </p>
      
      <TooltipProvider>
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <Info className="h-3.5 w-3.5" />
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              Current progress: {collectedFees.toFixed(4)} of {requiredFees.toFixed(4)} ETH collected ({progress.toFixed(2)}%)
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>When collected fees reach 2× virtualETH + capability fees, 
              the token becomes eligible for migration to Uniswap.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default MaturityTracker;
