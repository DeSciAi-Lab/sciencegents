
import React from 'react';
import { Loader2, CheckCircle, XCircle, Wallet, CreditCard, Sparkles, Clock } from 'lucide-react';
import { CreationStatus } from '@/hooks/useScienceGentCreation';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface TransactionStatusProps {
  status: CreationStatus;
  error: string | null;
  transactionHash: string | null;
  tokenAddress: string | null;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ 
  status,
  error,
  transactionHash,
  tokenAddress
}) => {
  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    switch (status) {
      case CreationStatus.CheckingWallet:
        return 15;
      case CreationStatus.CheckingAllowance:
        return 30;
      case CreationStatus.ApprovingDSI:
        return 45;
      case CreationStatus.Creating:
        return 60;
      case CreationStatus.WaitingConfirmation:
        return 80;
      case CreationStatus.Success:
        return 100;
      case CreationStatus.Error:
        return 100;
      default:
        return 0;
    }
  };

  if (status === CreationStatus.Idle) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      <Progress value={getProgressPercentage()} className="h-2" />
      
      <div className="space-y-3">
        <StatusItem 
          icon={<Wallet />}
          text="Checking wallet connection"
          status={getStatusForStep(status, CreationStatus.CheckingWallet)}
        />
        
        <StatusItem 
          icon={<CreditCard />}
          text="Checking DSI token allowance"
          status={getStatusForStep(status, CreationStatus.CheckingAllowance)}
        />
        
        {(status === CreationStatus.ApprovingDSI || status > CreationStatus.ApprovingDSI || status === CreationStatus.Error) && (
          <StatusItem 
            icon={<CreditCard />}
            text="Approving DSI tokens for ScienceGents Factory"
            status={getStatusForStep(status, CreationStatus.ApprovingDSI)}
          />
        )}
        
        <StatusItem 
          icon={<Sparkles />}
          text="Creating ScienceGent token"
          status={getStatusForStep(status, CreationStatus.Creating)}
        />
        
        {(status === CreationStatus.WaitingConfirmation || status > CreationStatus.WaitingConfirmation || status === CreationStatus.Error) && (
          <StatusItem 
            icon={<Clock />}
            text="Waiting for blockchain confirmation"
            status={getStatusForStep(status, CreationStatus.WaitingConfirmation)}
          />
        )}
      </div>
      
      {transactionHash && (status === CreationStatus.WaitingConfirmation || status === CreationStatus.Success) && (
        <Alert className="mt-4 border-blue-200 bg-blue-50">
          <div className="flex flex-col gap-2">
            <AlertTitle className="text-blue-800">Transaction submitted!</AlertTitle>
            <AlertDescription className="text-blue-700">
              <p className="mb-2">Your transaction has been submitted to the blockchain.</p>
              <div className="text-xs">
                <span className="font-medium">Transaction Hash:</span>{' '}
                <a 
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono underline text-blue-600 break-all"
                >
                  {transactionHash}
                </a>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      )}
      
      {status === CreationStatus.Error && error && (
        <Alert variant="destructive" className="mt-4">
          <XCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {status === CreationStatus.Success && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your ScienceGent has been created successfully.
            {tokenAddress && (
              <div className="mt-2">
                <span className="font-medium">Token Address:</span>{' '}
                <code className="px-1 py-0.5 bg-green-100 rounded text-sm">{tokenAddress}</code>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

// Helper function to determine the status for a specific step
function getStatusForStep(currentStatus: CreationStatus, stepStatus: CreationStatus): 'pending' | 'loading' | 'complete' | 'error' {
  if (currentStatus === CreationStatus.Error) {
    // If we're in error state and this step was the active one when error occurred
    return currentStatus === stepStatus ? 'error' : 
           currentStatus > stepStatus ? 'complete' : 'pending';
  }
  
  if (currentStatus === stepStatus) {
    return 'loading';
  } else if (currentStatus > stepStatus) {
    return 'complete';
  } else {
    return 'pending';
  }
}

// Individual status item component
interface StatusItemProps {
  icon: React.ReactNode;
  text: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, text, status }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        status === 'pending' ? 'bg-gray-100 text-gray-400' :
        status === 'loading' ? 'bg-blue-100 text-blue-600 animate-pulse' :
        status === 'complete' ? 'bg-green-100 text-green-600' :
        'bg-red-100 text-red-600'
      }`}>
        {status === 'loading' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : status === 'complete' ? (
          <CheckCircle className="h-5 w-5" />
        ) : status === 'error' ? (
          <XCircle className="h-5 w-5" />
        ) : (
          React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })
        )}
      </div>
      
      <span className={`text-sm ${
        status === 'pending' ? 'text-gray-500' :
        status === 'loading' ? 'text-blue-700 font-medium' :
        status === 'complete' ? 'text-green-700' :
        'text-red-700'
      }`}>
        {text}
      </span>
    </div>
  );
};

export default TransactionStatus;
