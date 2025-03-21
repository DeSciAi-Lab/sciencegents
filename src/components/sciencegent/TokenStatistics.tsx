
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, ArrowUpRight, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface TokenStatisticsProps {
  scienceGent: any;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const TokenStatistics: React.FC<TokenStatisticsProps> = ({
  scienceGent,
  isRefreshing,
  refreshData
}) => {
  // Format market cap
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  };

  // Format token price
  const formatTokenPrice = (value: number) => {
    if (value < 0.01) return `$${value.toFixed(6)}`;
    return `$${value.toFixed(4)}`;
  };

  // Format token age
  const formatTokenAge = (createdAt: string) => {
    if (!createdAt) return 'Unknown';
    try {
      return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const virtualEth = scienceGent?.virtual_eth || 0;
  const maturityProgress = scienceGent?.maturity_progress || 0;
  const isMigrated = scienceGent?.is_migrated || false;
  const migrationEligible = scienceGent?.migrationEligible || false;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Token Overview</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMarketCap(scienceGent?.market_cap || 0)}
            </div>
            <CardDescription>
              Price: {formatTokenPrice(scienceGent?.token_price || 0)}
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Token Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTokenAge(scienceGent?.created_on_chain_at)}
            </div>
            <CardDescription>
              Created: {new Date(scienceGent?.created_on_chain_at || Date.now()).toLocaleDateString()}
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMarketCap(scienceGent?.total_liquidity || 0)}
            </div>
            <CardDescription>
              Virtual ETH: {virtualEth} ETH
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Migration Status</CardTitle>
            <div>
              {isMigrated ? (
                <Badge variant="default" className="bg-green-600">Migrated</Badge>
              ) : migrationEligible ? (
                <Badge variant="default" className="bg-blue-600">Eligible for Migration</Badge>
              ) : (
                <Badge variant="outline">Collecting Fees</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Maturity Progress</span>
              <span>{maturityProgress}%</span>
            </div>
            <Progress value={maturityProgress} className="h-2" />
            
            {!isMigrated && (
              <div className="text-sm text-muted-foreground mt-2 flex items-start">
                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                <span>
                  ScienceGent tokens need to collect trading fees equal to {virtualEth * 2} ETH before
                  migrating to Uniswap. Currently at {maturityProgress}% of required fees.
                </span>
              </div>
            )}
            
            {isMigrated && (
              <div className="mt-2">
                <Button variant="outline" size="sm" className="mt-2">
                  View on Uniswap
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMarketCap(scienceGent?.volume_24h || 0)}
            </div>
            <CardDescription>
              Price Change: 
              <span className={scienceGent?.price_change_24h >= 0 ? "text-green-600" : "text-red-600"}>
                {' '}{(scienceGent?.price_change_24h || 0).toFixed(2)}%
              </span>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Creator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium truncate">
              {scienceGent?.creator_address || 'Unknown'}
            </div>
            <CardDescription>
              <a 
                href={`https://sepolia.etherscan.io/address/${scienceGent?.creator_address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline text-xs"
              >
                View on Etherscan
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenStatistics;
