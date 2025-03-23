
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScienceGentMaturityStatusProps {
  maturityProgress: number;
  virtualETH: number;
  collectedFees: number;
  isMigrated: boolean;
  capabilityFees?: number;
}

const ScienceGentMaturityStatus: React.FC<ScienceGentMaturityStatusProps> = ({
  maturityProgress,
  virtualETH,
  collectedFees,
  isMigrated,
  capabilityFees = 1
}) => {
  // If values are not defined, use defaults
  const progress = maturityProgress || 75;
  const vETH = virtualETH || 1;
  const fees = collectedFees || 0;
  
  return (
    <div className="space-y-3">
      <div className="text-center font-medium text-lg">
        Maturity Status
        <span className="ml-2">{progress}%</span>
      </div>
      
      <div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>
      
      <div className="text-sm text-gray-600">
        {isMigrated ? (
          "This ScienceGent has been migrated to Uniswap."
        ) : (
          <>
            The ScienceGent will become eligible to migrate to Uniswap on generating _____ ETH in trading fee (
            2x virtualETH = {vETH * 2} + capability fees = {capabilityFees})
          </>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="bg-gray-50 border rounded-md p-3 text-center">
          <p className="text-sm text-gray-500">Users</p>
          <p className="font-medium">1273</p>
        </div>
        <div className="bg-gray-50 border rounded-md p-3 text-center">
          <p className="text-sm text-gray-500">Interactions</p>
          <p className="font-medium">1273</p>
        </div>
        <div className="bg-gray-50 border rounded-md p-3 text-center">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="font-medium">1273</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm mb-2">5 Capabilities:</h4>
        <div className="flex flex-wrap gap-2">
          <div className="bg-white border rounded-full px-3 py-1 text-sm">Chat</div>
          <div className="bg-white border rounded-full px-3 py-1 text-sm">Molecular Vision</div>
          <div className="bg-white border rounded-full px-3 py-1 text-sm">LLAMPS</div>
          <div className="bg-white border rounded-full px-3 py-1 text-sm">Bose-Einstein Simulation</div>
          <div className="bg-white border rounded-full px-3 py-1 text-sm">more</div>
        </div>
      </div>
    </div>
  );
};

export default ScienceGentMaturityStatus;
