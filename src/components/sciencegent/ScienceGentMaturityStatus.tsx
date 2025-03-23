
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScienceGentMaturityStatusProps {
  maturityProgress: number;
  virtualETH: number;
  collectedFees: number;
  isMigrated: boolean;
}

const ScienceGentMaturityStatus: React.FC<ScienceGentMaturityStatusProps> = ({
  maturityProgress,
  virtualETH,
  collectedFees,
  isMigrated
}) => {
  // If values are not defined, use defaults
  const progress = maturityProgress || 0;
  const vETH = virtualETH || 0;
  const fees = collectedFees || 0;
  
  // Calculate the remaining ETH needed
  const requiredETH = vETH * 2;
  const remainingETH = Math.max(0, requiredETH - fees);
  
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">Maturity Status</h3>
            <span className="font-bold">{progress}%</span>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>
        
        <p className="text-sm text-gray-600">
          {isMigrated ? (
            "This ScienceGent has been migrated to Uniswap."
          ) : progress >= 100 ? (
            "This ScienceGent is eligible to migrate to Uniswap."
          ) : (
            <>
              The ScienceGent will become eligible to migrate to Uniswap on generating <span className="font-medium">{requiredETH.toFixed(4)} ETH</span> in trading fee (
              2x virtualETH + capability fees).
            </>
          )}
        </p>
        
        {!isMigrated && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Collected fees:</p>
              <p className="font-medium">{fees.toFixed(4)} ETH</p>
            </div>
            <div>
              <p className="text-gray-500">Remaining:</p>
              <p className="font-medium">{remainingETH.toFixed(4)} ETH</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScienceGentMaturityStatus;
