
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface MaturityTrackerProps {
  maturityProgress: number;
  isMigrated: boolean;
  virtualETH: number;
  collectedFees: number;
  capabilityFees: number;
}

const MaturityTracker: React.FC<MaturityTrackerProps> = ({
  maturityProgress,
  isMigrated,
  virtualETH,
  collectedFees,
  capabilityFees
}) => {
  // Calculate the required fees for migration
  const requiredFees = virtualETH * 2 + capabilityFees;
  const feesPercentage = (collectedFees / requiredFees) * 100;
  
  // Determine status text and color
  const getStatusInfo = () => {
    if (isMigrated) {
      return {
        text: "Migrated to Uniswap",
        color: "bg-green-100 text-green-800",
        progress: 100
      };
    }
    
    if (maturityProgress === 100) {
      return {
        text: "Maturity Reached",
        color: "bg-amber-100 text-amber-800",
        progress: 100
      };
    }
    
    if (feesPercentage >= 100) {
      return {
        text: "Ready for Migration",
        color: "bg-blue-100 text-blue-800",
        progress: maturityProgress
      };
    }
    
    return {
      text: "Accumulating Fees",
      color: "bg-slate-100 text-slate-800",
      progress: maturityProgress
    };
  };
  
  const status = getStatusInfo();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Maturity Progress</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px]">
                <p>ScienceGents tokens have a 2-year maturity period. Once a token has collected enough trading fees (2x virtual ETH + capability fees), it can be migrated to Uniswap.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Badge className={status.color}>{status.text}</Badge>
      </div>
      
      <Progress value={status.progress} className="h-2" />
      
      {!isMigrated && (
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-xs text-muted-foreground">Time Progress</p>
            <p className="text-sm font-medium">{maturityProgress}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fee Progress</p>
            <p className="text-sm font-medium">{Math.min(Math.round(feesPercentage), 100)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaturityTracker;
