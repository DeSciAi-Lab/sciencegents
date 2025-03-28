
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
  
  // Use the provided maturity progress or calculate it if not provided
  const progress = maturityProgress !== undefined ? maturityProgress : calculateMaturityProgress(
    virtualETH,
    collectedFees,
    capabilityFees
  );
  
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
        text: "Maturity Reached",
        color: "bg-amber-100 text-amber-800",
        progress: 100
      };
    }
    
    if (progress >= 100) {
      return {
        text: "Ready for Migration",
        color: "bg-blue-100 text-blue-800",
        progress
      };
    }
    
    return {
      text: "Accumulating Fees",
      color: "bg-slate-100 text-slate-800",
      progress
    };
  };
  
  const status = getStatusInfo();
  
  // Format the remaining time until maturity
  const formatRemainingTime = () => {
    if (!remainingMaturityTime || remainingMaturityTime <= 0) return "Matured";
    
    const days = Math.floor(remainingMaturityTime / 86400);
    const hours = Math.floor((remainingMaturityTime % 86400) / 3600);
    
    if (days > 0) {
      return `${days} days ${hours} hours remaining`;
    }
    return `${hours} hours remaining`;
  };
  
  return (
    <div className="border rounded-xl p-4">
      <div className="text-center mb-2">
        <div className="text-xl font-medium">Maturity Status</div>
        <div className="text-2xl font-bold">{progress.toFixed(4)}%</div>
      </div>
      <Progress value={status.progress} className="h-2 bg-gray-200" />
      <p className="mt-3 text-sm">
        The ScienceGent will become eligible to migrate to Uniswap on generating {requiredFees.toFixed(4)} ETH in trading fee 
        (2× virtualETH = {(virtualETH * 2).toFixed(4)} + capability fees = {capabilityFees.toFixed(4)})
      </p>
      
      {remainingMaturityTime !== undefined && (
        <div className="mt-2 text-xs text-muted-foreground">
          Maturity deadline: {formatRemainingTime()}
        </div>
      )}
    </div>
  );
};

export default MaturityTracker;
