
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import TokenStatistics from '../TokenStatistics';
import MaturityTracker from '../MaturityTracker';

interface OverviewTabProps {
  scienceGentData: any;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  scienceGentData,
  isRefreshing,
  refreshData
}) => {
  if (!scienceGentData) return null;

  // Get Uniswap link for the token
  const getUniswapLink = () => {
    if (!scienceGentData?.address) return "#";
    return `https://app.uniswap.org/explore/tokens/ethereum_sepolia/${scienceGentData.address.toLowerCase()}`;
  };

  return (
    <div className="space-y-6">
      <TokenStatistics
        scienceGent={scienceGentData}
        isRefreshing={isRefreshing}
        refreshData={refreshData}
      />

      {/* Display migration info if not migrated */}
      {!scienceGentData.is_migrated && (
        <Card>
          <CardHeader>
            <CardTitle>Migration Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This ScienceGent token is currently trading on the internal DEX. Once it has collected
              enough trading fees, it can be migrated to Uniswap for external trading.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Virtual ETH</p>
                  <p className="font-medium">{scienceGentData.virtual_eth?.toFixed(4) || "0.0000"} ETH</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Required Fees</p>
                  <p className="font-medium">
                    {((scienceGentData.virtual_eth || 0) * 2 + (scienceGentData.capabilityFees || 0)).toFixed(4)} ETH
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Collected Fees</p>
                  <p className="font-medium">{scienceGentData.collected_fees?.toFixed(4) || "0.0000"} ETH</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capability Fees</p>
                  <p className="font-medium">{scienceGentData.capabilityFees?.toFixed(4) || "0.0000"} ETH</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <MaturityTracker
                  maturityProgress={scienceGentData.maturity_progress || 0}
                  isMigrated={scienceGentData.is_migrated || false}
                  virtualETH={scienceGentData.virtual_eth || 0}
                  collectedFees={scienceGentData.collected_fees || 0}
                  capabilityFees={scienceGentData.capabilityFees || 0}
                  remainingMaturityTime={scienceGentData.remaining_maturity_time}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* If migrated, display Uniswap info */}
      {scienceGentData.is_migrated && (
        <Card>
          <CardHeader>
            <CardTitle>Uniswap Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
              <p className="text-blue-800 mb-3">
                This ScienceGent has been migrated to Uniswap and is now tradable on the external DEX.
              </p>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <a 
                  href={getUniswapLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Trade on Uniswap
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            {scienceGentData.uniswap_pair && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Uniswap Pair</h3>
                  <p className="text-sm">
                    LP Token Address: 
                    <a
                      href={`https://sepolia.etherscan.io/address/${scienceGentData.uniswap_pair}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-science-600 hover:underline"
                    >
                      {scienceGentData.uniswap_pair}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">LP Token Lock</h3>
                  <p className="text-sm">LP tokens are locked for 10 years after migration.</p>
                  {scienceGentData.lp_unlock_time && (
                    <p className="text-sm mt-1">
                      Unlock date: {new Date(scienceGentData.lp_unlock_time).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OverviewTab;
