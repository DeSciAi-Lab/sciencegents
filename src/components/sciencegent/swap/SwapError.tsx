
import React from 'react';

interface SwapErrorProps {
  error: string | null;
}

const SwapError: React.FC<SwapErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
      {error}
    </div>
  );
};

export default SwapError;
