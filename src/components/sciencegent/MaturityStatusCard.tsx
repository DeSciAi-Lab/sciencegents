
import React from 'react';
import { Card } from '@/components/ui/card';

interface MaturityStatusCardProps {
  progress: number;
  compact?: boolean;
  className?: string;
}

const MaturityStatusCard: React.FC<MaturityStatusCardProps> = ({ 
  progress, 
  compact = false,
  className = '' 
}) => {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">Maturity Status</h3>
      <div className="mb-3">
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-2">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500">{progress}%</div>
      </div>
      
      {!compact && (
        <p className="text-sm text-gray-600">
          Migration condition: trading fee &gt;= 2× virtualETH + capability fees
        </p>
      )}
    </div>
  );
};

export default MaturityStatusCard;
