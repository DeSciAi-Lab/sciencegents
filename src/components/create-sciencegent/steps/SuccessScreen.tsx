
import React from 'react';
import { ArrowRight, Check, Loader2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessScreenProps {
  navigateToDetails: () => void;
  tokenAddress: string | null;
  transactionHash: string | null;
  isLoading: boolean;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  navigateToDetails, 
  tokenAddress,
  transactionHash,
  isLoading
}) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Check className="w-8 h-8" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isLoading ? "Creating ScienceGent..." : "ScienceGent Created!"}
          </h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            {isLoading 
              ? "Your transaction is being processed on the blockchain." 
              : "Congratulations! Your ScienceGent has been successfully created."}
          </p>
          
          {transactionHash && (
            <div className="w-full max-w-md bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
              <p className="text-sm font-medium text-slate-600 mb-2">Transaction Hash:</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-white px-3 py-2 rounded border border-slate-200 font-mono text-slate-800 block text-left overflow-x-auto w-full">
                  {transactionHash}
                </code>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="w-full max-w-md bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-sm text-blue-700 mb-2">Waiting for blockchain confirmation...</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          ) : tokenAddress ? (
            <div className="w-full max-w-md bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
              <p className="text-sm font-medium text-green-700 mb-2">Token Address:</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-white px-3 py-2 rounded border border-green-200 font-mono text-green-800 block text-left overflow-x-auto w-full">
                  {tokenAddress}
                </code>
                <a 
                  href={`https://sepolia.etherscan.io/address/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
              <p className="text-sm text-amber-700">Something went wrong while extracting the token address.</p>
            </div>
          )}
          
          <div className="flex justify-center">
            <Button 
              onClick={navigateToDetails}
              disabled={isLoading || !tokenAddress}
              className="bg-science-600 hover:bg-science-700 text-white gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>View My ScienceGent</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessScreen;
