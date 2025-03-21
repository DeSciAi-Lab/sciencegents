
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, GitMerge, ExternalLink, Check, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import useMigration from '@/hooks/useMigration';

interface MigrationPanelProps {
  tokenAddress: string;
  scienceGent: any;
  refreshData: () => Promise<void>;
}

const MigrationPanel: React.FC<MigrationPanelProps> = ({
  tokenAddress,
  scienceGent,
  refreshData
}) => {
  const {
    isEligible,
    isMigrated,
    isCheckingEligibility,
    isMigrating,
    error,
    lpUnlockTimeRemaining,
    checkMigrationEligibility,
    migrateToUniswap
  } = useMigration(tokenAddress, refreshData);

  // Check eligibility on mount and when scienceGent data changes
  useEffect(() => {
    if (tokenAddress) {
      checkMigrationEligibility();
    }
  }, [tokenAddress, checkMigrationEligibility, scienceGent?.is_migrated]);

  // Format time remaining for LP tokens
  const formatLPUnlockTime = () => {
    if (!lpUnlockTimeRemaining) return 'Unknown';
    
    const seconds = lpUnlockTimeRemaining;
    const days = Math.floor(seconds / (60 * 60 * 24));
    const years = Math.floor(days / 365);
    
    if (years > 0) {
      return `${years} years and ${days % 365} days`;
    }
    return `${days} days`;
  };

  // Early return if data is not loaded
  if (!scienceGent) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitMerge className="h-5 w-5" />
          Token Migration
        </CardTitle>
        <CardDescription>
          ScienceGent tokens can be migrated to Uniswap when they collect enough trading fees
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {isMigrated || scienceGent.is_migrated ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check className="h-5 w-5" />
              <span>This token has been migrated to Uniswap</span>
            </div>
            
            {scienceGent.uniswap_pair && (
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-2">Uniswap Pair</p>
                <div className="flex justify-between items-center">
                  <p className="font-mono text-sm">{scienceGent.uniswap_pair}</p>
                  <a
                    href={`https://sepolia.etherscan.io/address/${scienceGent.uniswap_pair}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-science-600 hover:text-science-700"
                  >
                    View on Etherscan
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
            
            {lpUnlockTimeRemaining && lpUnlockTimeRemaining > 0 && (
              <div className="pt-2 border-t border-border mt-4">
                <div className="flex items-center gap-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">LP tokens will unlock in {formatLPUnlockTime()}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Migration Status</p>
                {isCheckingEligibility ? (
                  <div className="flex items-center gap-2 mt-1">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Checking...</span>
                  </div>
                ) : (
                  <p className="font-medium">
                    {isEligible ? (
                      <span className="text-green-600">Ready for Migration</span>
                    ) : (
                      <span className="text-amber-600">Not Yet Eligible</span>
                    )}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Required Fees</p>
                <p className="font-medium">
                  {((scienceGent.virtual_eth || 0) * 2 + (scienceGent.capabilityFees || 0)).toFixed(2)} ETH
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Collected Fees</p>
                <p className="font-medium">{scienceGent.collected_fees?.toFixed(2) || 0} ETH</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Fee Progress</p>
                <p className="font-medium">
                  {Math.min(Math.round(scienceGent.maturity_progress || 0), 100)}%
                </p>
              </div>
            </div>
            
            {isEligible && (
              <Button 
                className="w-full mt-4" 
                onClick={migrateToUniswap}
                disabled={isMigrating || !isEligible}
              >
                {isMigrating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <GitMerge className="mr-2 h-4 w-4" />
                    Migrate to Uniswap
                  </>
                )}
              </Button>
            )}
            
            {!isEligible && !isCheckingEligibility && (
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="text-sm text-muted-foreground">
                  This token needs to collect more trading fees before it can be migrated to Uniswap.
                  The required amount is 2x the virtual ETH plus any capability fees.
                </p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => checkMigrationEligibility()}
              disabled={isCheckingEligibility}
            >
              {isCheckingEligibility ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Checking...
                </>
              ) : (
                <>Refresh Migration Status</>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MigrationPanel;
