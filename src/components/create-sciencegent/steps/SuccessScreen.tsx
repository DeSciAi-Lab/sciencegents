
import React from 'react';
import { ArrowRight, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessScreenProps {
  navigateToDetails: () => void;
  tokenAddress: string | null;
  onRefresh?: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ 
  navigateToDetails, 
  tokenAddress,
  onRefresh 
}) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
            <Check className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">ScienceGent Created!</h2>
          <p className="text-muted-foreground mb-4 max-w-md">
            Congratulations! Your ScienceGent has been successfully created.
          </p>
          
          {tokenAddress && (
            <div className="w-full max-w-md bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
              <p className="text-sm font-medium text-slate-600 mb-2">Token Address:</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-white px-3 py-2 rounded border border-slate-200 font-mono text-slate-800 block text-left overflow-x-auto w-full">
                  {tokenAddress}
                </code>
                <a 
                  href={`https://sepolia.etherscan.io/address/${tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-slate-500 hover:text-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {onRefresh && (
                <Button 
                  onClick={onRefresh}
                  size="sm" 
                  variant="outline" 
                  className="mt-4 w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh My ScienceGent
                </Button>
              )}
            </div>
          )}
          
          <div className="flex justify-center">
            <Button 
              onClick={navigateToDetails}
              className="bg-science-600 hover:bg-science-700 text-white gap-2"
            >
              <span>View My ScienceGent</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessScreen;
