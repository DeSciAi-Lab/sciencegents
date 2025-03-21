
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MaturityTracker from './MaturityTracker';

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
  if (!scienceGent) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const {
    tokenPrice = 0,
    marketCap = 0,
    totalSupply = 0,
    totalLiquidity = 0,
    priceChange24h = 0,
    maturityProgress = 0,
    isMigrated = false,
    transactions = 0,
    volume24h = 0,
    holders = 0,
    virtualETH = 0,
    collectedFees = 0,
    capabilityFees = 0
  } = scienceGent;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{tokenPrice} ETH</h2>
            <div className="flex items-center">
              <Badge className={priceChange24h >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {priceChange24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(priceChange24h).toFixed(2)}% (24h)
              </Badge>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
            <p className="text-xl font-medium">{marketCap.toFixed(2)} ETH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
            <p className="text-xl font-medium">{Number(totalSupply).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
            <p className="text-xl font-medium">{totalLiquidity.toFixed(2)} ETH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Trading Status</p>
            <Badge className={isMigrated ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
              {isMigrated ? "External DEX" : "Internal DEX"}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transactions</p>
            <p className="text-xl font-medium">{transactions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
            <p className="text-xl font-medium">{volume24h.toFixed(2)} ETH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Holders</p>
            <p className="text-xl font-medium">{holders}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Virtual ETH</p>
            <p className="text-xl font-medium">{virtualETH.toFixed(2)} ETH</p>
          </div>
        </div>
        
        <div className="mt-8 space-y-6">
          <MaturityTracker 
            maturityProgress={maturityProgress}
            isMigrated={isMigrated}
            virtualETH={virtualETH}
            collectedFees={collectedFees || 0}
            capabilityFees={capabilityFees || 0}
          />
          
          {scienceGent.address && isMigrated && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Uniswap Pair</h3>
                <a
                  href={`https://sepolia.etherscan.io/address/${scienceGent.uniswapPair || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-science-600 hover:text-science-700"
                >
                  View on Etherscan <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenStatistics;
