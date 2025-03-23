
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
  const progress = maturityProgress || 75;
  const vETH = virtualETH || 0;
  const fees = collectedFees || 0;
  
  // Calculate the remaining ETH needed
  const requiredETH = vETH * 2;
  const remainingETH = Math.max(0, requiredETH - fees);
  
  return (
    <Card className="shadow-none border">
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
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-white p-3 rounded-md text-center">
            <p className="text-sm">Users</p>
            <p className="font-medium">1273</p>
          </div>
          <div className="bg-white p-3 rounded-md text-center">
            <p className="text-sm">Interactions</p>
            <p className="font-medium">1273</p>
          </div>
          <div className="bg-white p-3 rounded-md text-center">
            <p className="text-sm">Revenue</p>
            <p className="font-medium">1273</p>
          </div>
        </div>
        
        <div className="mt-2">
          <h4 className="text-sm mb-2">5 Capabilities:</h4>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white border rounded-md px-3 py-1 text-sm">Chat</div>
            <div className="bg-white border rounded-md px-3 py-1 text-sm">Molecular Vision</div>
            <div className="bg-white border rounded-md px-3 py-1 text-sm">LLAMPS</div>
            <div className="bg-white border rounded-md px-3 py-1 text-sm">Bose-Einstein Simulation</div>
            <div className="bg-white border rounded-md px-3 py-1 text-sm">more</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentMaturityStatus;
