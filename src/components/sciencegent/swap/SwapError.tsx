
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface SwapErrorProps {
  error: string | null;
}

const SwapError: React.FC<SwapErrorProps> = ({ error }) => {
  // Only show errors that are actually relevant
  if (!error || 
      error.includes('decimal places') || // Skip showing decimal errors 
      error.includes('NUMERIC_FAULT')) {
    return null;
  }
  
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );
};

export default SwapError;
