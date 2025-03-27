
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ExternalLink, TrendingUp, TrendingDown, GitMerge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MaturityTracker from './MaturityTracker';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';
import { ethers } from 'ethers';

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
  const { ethPrice, formatEthToUsd } = useEthPriceContext();
  
  if (!scienceGent) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const {
    tokenPrice = scienceGent.token_price || 0,
    marketCap = scienceGent.market_cap || 0,
    totalSupply = scienceGent.total_supply || 0,
    totalLiquidity = scienceGent.total_liquidity || 0,
    priceChange24h = scienceGent.price_change_24h || 0,
    maturityProgress = scienceGent.maturity_progress || 0,
    isMigrated = scienceGent.is_migrated || false,
    transactions = scienceGent.transactions || 0,
    volume24h = scienceGent.volume_24h || 0,
    holders = scienceGent.holders || 0,
    virtualETH = scienceGent.virtual_eth || 0,
    collectedFees = scienceGent.collected_fees || 0,
    capabilityFees = scienceGent.capability_fees || 0
  } = scienceGent;

  // Calculate migration status
  const getMigrationStatus = () => {
    if (isMigrated) {
      return {
        text: "Migrated to Uniswap",
        color: "bg-green-100 text-green-800",
        icon: <GitMerge className="h-3 w-3 mr-1" />
      };
    }
    
    // Use the utility function to calculate maturity progress
    const calculatedProgress = calculateMaturityProgress(virtualETH, collectedFees, capabilityFees);
    
    if (calculatedProgress >= 100) {
      return {
        text: "Ready for Migration",
        color: "bg-blue-100 text-blue-800",
        icon: <GitMerge className="h-3 w-3 mr-1" />
      };
    }
    
    return {
      text: "Internal DEX",
      color: "bg-amber-100 text-amber-800",
      icon: null
    };
  };

  const migrationStatus = getMigrationStatus();
  
  // Calculate market cap from total supply and token price
  const calculateMarketCap = () => {
    if (!totalSupply || !tokenPrice) return 0;
    
    try {
      // Convert supply to a number if it's not already
      const formattedSupply = typeof totalSupply === 'string' 
        ? parseFloat(ethers.utils.formatUnits(totalSupply, 18))
        : totalSupply;
        
      return formattedSupply * tokenPrice;
    } catch (error) {
      console.error("Error calculating market cap:", error);
      return marketCap; // Fall back to stored value
    }
  };
  
  const calculatedMarketCap = calculateMarketCap();
  
  // Get Uniswap link for the token
  const getUniswapLink = () => {
    if (!scienceGent.address) return "#";
    return `https://app.uniswap.org/explore/tokens/ethereum_sepolia/${scienceGent.address.toLowerCase()}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{tokenPrice.toFixed(4)} ETH</h2>
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
            <p className="text-xl font-medium">{calculatedMarketCap.toFixed(4)} ETH</p>
            <p className="text-xs text-muted-foreground">{formatEthToUsd(calculatedMarketCap)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Supply</p>
            <p className="text-xl font-medium">{Number(totalSupply).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
            <p className="text-xl font-medium">{totalLiquidity.toFixed(4)} ETH</p>
            <p className="text-xs text-muted-foreground">{formatEthToUsd(totalLiquidity)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Trading Status</p>
            <div className="flex items-center gap-2">
              <Badge className={migrationStatus.color}>
                {migrationStatus.icon}
                {migrationStatus.text}
              </Badge>
              {isMigrated && (
                <a 
                  href={getUniswapLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-science-600 hover:text-science-700 flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Trade
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transactions</p>
            <p className="text-xl font-medium">{transactions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
            <p className="text-xl font-medium">{volume24h.toFixed(4)} ETH</p>
            <p className="text-xs text-muted-foreground">{formatEthToUsd(volume24h)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Holders</p>
            <p className="text-xl font-medium">{holders}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Virtual ETH</p>
            <p className="text-xl font-medium">{virtualETH.toFixed(4)} ETH</p>
            <p className="text-xs text-muted-foreground">{formatEthToUsd(virtualETH)}</p>
          </div>
        </div>
        
        <div className="mt-8 space-y-6">
          <MaturityTracker 
            maturityProgress={maturityProgress}
            isMigrated={isMigrated}
            virtualETH={virtualETH}
            collectedFees={collectedFees || 0}
            capabilityFees={capabilityFees || 0}
            remainingMaturityTime={scienceGent.remaining_maturity_time}
          />
          
          {scienceGent.address && (isMigrated || scienceGent.is_migrated) && (
            <div className="pt-4 border-t">
              <div className="flex flex-col space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-blue-800 mb-3">
                    This ScienceGent has been migrated to Uniswap and is now tradable on the external DEX.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {scienceGent.uniswap_pair && (
                      <a
                        href={`https://sepolia.etherscan.io/address/${scienceGent.uniswap_pair}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-science-600 hover:text-science-700 text-sm"
                      >
                        View LP on Etherscan <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                    <a
                      href={getUniswapLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-science-600 hover:text-science-700 text-sm"
                    >
                      Trade on Uniswap <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
                
                {scienceGent.uniswap_pair && (
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Uniswap LP Details</h3>
                    <div>
                      <p className="text-sm text-muted-foreground">LP Token Address: 
                        <a
                          href={`https://sepolia.etherscan.io/address/${scienceGent.uniswap_pair}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-science-600 hover:underline"
                        >
                          {scienceGent.uniswap_pair.substring(0, 8)}...{scienceGent.uniswap_pair.substring(36)}
                        </a>
                      </p>
                      {scienceGent.lp_unlock_time && (
                        <p className="text-sm text-muted-foreground">LP Unlock Time: {new Date(scienceGent.lp_unlock_time).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenStatistics;
