
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScienceGentMaturityStatusProps {
  maturityProgress: number;
  virtualETH: number;
  collectedFees: number;
  isMigrated: boolean;
  capabilityFees?: number;
  scienceGent?: any; // Add scienceGent prop
}

const ScienceGentMaturityStatus: React.FC<ScienceGentMaturityStatusProps> = ({
  maturityProgress,
  virtualETH,
  collectedFees,
  isMigrated,
  capabilityFees = 1,
  scienceGent // Add the prop here
}) => {
  // If values are not defined, use defaults
  const progress = maturityProgress || 0;
  const vETH = virtualETH || 1;
  const fees = collectedFees || 0;
  const totalRequiredFees = (2 * vETH) + capabilityFees;
  
  // Default values when scienceGent is undefined
  const usersCount = scienceGent?.users_count || "0";
  const interactionCount = scienceGent?.interaction_count || "0";
  const revenue = scienceGent?.revenue || "0";
  
  return (
    <div className="border rounded-lg p-4">
      <div className="text-center mb-2">
        <div className="text-lg font-medium">Maturity Status</div>
        <div className="text-xl font-bold">{progress}%</div>
      </div>
      
      <div className="mb-3">
        <Progress 
          value={progress} 
          className="h-2" 
        />
      </div>
      
      <div className="text-sm text-gray-600">
        {isMigrated ? (
          "This ScienceGent has been migrated to Uniswap."
        ) : (
          <>
            The ScienceGent will become eligible to migrate to Uniswap on generating {totalRequiredFees.toFixed(2)} ETH in trading fee 
            (2× virtualETH = {(vETH * 2).toFixed(2)} + capability fees = {capabilityFees.toFixed(2)})
          </>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-gray-50 border rounded p-2 text-center">
          <p className="text-xs text-gray-500">Users</p>
          <p className="font-medium">{usersCount}</p>
        </div>
        <div className="bg-gray-50 border rounded p-2 text-center">
          <p className="text-xs text-gray-500">Interactions</p>
          <p className="font-medium">{interactionCount}</p>
        </div>
        <div className="bg-gray-50 border rounded p-2 text-center">
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="font-medium">{revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default ScienceGentMaturityStatus;
