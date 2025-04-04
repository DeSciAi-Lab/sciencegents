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

interface StatisticItemProps {
  label: string;
  value: string | number | React.ReactNode;
  change?: number;
  isLoading?: boolean;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ label, value, change, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 bg-card rounded-lg border">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-32" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-lg border">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-medium">{value}</p>
        {change !== undefined && (
          <Badge className={change >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(change).toFixed(2)}%
          </Badge>
        )}
      </div>
    </div>
  );
};

const TokenStatistics: React.FC<TokenStatisticsProps> = ({
  scienceGent,
  isRefreshing,
  refreshData
}) => {
  const { ethPrice, formatEthToUsd } = useEthPriceContext();
  
  if (!scienceGent) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  // Format values from raw data
  const formatTokenValue = (rawValue: string | null, decimals: number = 18) => {
    if (!rawValue) return 0;
    try {
      return parseFloat(ethers.utils.formatUnits(rawValue, decimals));
    } catch (error) {
      console.error('Error formatting token value:', error);
      return 0;
    }
  };

  const {
    // Basic token information
    name = scienceGent.name || "Unknown Token",
    symbol = scienceGent.symbol || "UNKNOWN",
    
    // Use raw values and format them
    tokenPrice = formatTokenValue(scienceGent.token_price_raw) || 0,
    totalSupply = formatTokenValue(scienceGent.total_supply_raw, scienceGent.token_decimals) || 0,
    virtualETH = formatTokenValue(scienceGent.virtual_eth_raw) || 0,
    collectedFees = formatTokenValue(scienceGent.collected_fees_raw) || 0,
    
    // Use pre-calculated values from Supabase
    marketCap = scienceGent.market_cap || 0,
    marketCapUsd = scienceGent.market_cap_usd || 0,
    tokenPriceUsd = scienceGent.token_price_usd || 0,
    totalLiquidity = scienceGent.total_liquidity || 0,
    priceChange24h = scienceGent.price_change_24h || 0,
    maturityProgress = scienceGent.maturity_progress || 0,
    isMigrated = scienceGent.is_migrated || false,
    transactions = scienceGent.transactions || 0,
    volume24h = scienceGent.volume_24h || 0,
    holders = scienceGent.holders || 0,
    capabilityFees = scienceGent.capability_fees || 0,
    age = scienceGent.age || 0,
    createdOnChainAt = scienceGent.created_on_chain_at
  } = scienceGent;

  // Use stored age value
  const ageDisplay = age ? `${age} days` : 'Unknown';
  
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
  
  // Get Uniswap link for the token
  const getUniswapLink = () => {
    if (!scienceGent.address) return "#";
    return `https://app.uniswap.org/explore/tokens/ethereum_sepolia/${scienceGent.address.toLowerCase()}`;
  };

  // Format numbers for display
  const formatNumber = (value: number, decimals: number = 2) => {
    if (value === 0) return '0';
    if (value < 0.000001) return value.toExponential(decimals);
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const formatPercentage = (value: number) => {
    return `${formatNumber(value, 2)}%`;
  };

  const formatUSD = (value: number) => {
    if (value < 0.01) return `$${value.toExponential(2)}`;
    return `$${formatNumber(value, 2)}`;
  };

  // Render price change indicator with arrow
  const renderPriceChangeIndicator = () => {
    if (!priceChange24h) return null;
    
    const isPositive = priceChange24h >= 0;
    const color = isPositive ? 'text-green-500' : 'text-red-500';
    const Icon = isPositive ? TrendingUp : TrendingDown;
    
    return (
      <div className={`flex items-center gap-1 text-xs ${color}`}>
        <Icon className="h-3 w-3" />
        <span>{isPositive ? '+' : ''}{priceChange24h.toFixed(2)}%</span>
      </div>
    );
  };

  // Token price display with 24h change indicator
  const tokenPriceDisplay = () => {
    const priceFormatted = `${tokenPrice.toFixed(8)} ETH`;
    const usdFormatted = tokenPriceUsd ? 
      `$${tokenPriceUsd.toFixed(4)}` : 
      formatEthToUsd(tokenPrice);
    
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span>{priceFormatted}</span>
          {renderPriceChangeIndicator()}
        </div>
        <div className="text-xs text-muted-foreground">{usdFormatted}</div>
      </div>
    );
  };

  // Market Cap display in ETH and USD
  const marketCapDisplay = () => {
    const ethFormatted = `${marketCap.toFixed(2)} ETH`;
    const usdFormatted = marketCapUsd ? 
      `$${marketCapUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : 
      formatEthToUsd(marketCap);
    
    return (
      <div className="flex flex-col">
        <span>{ethFormatted}</span>
        <span className="text-xs text-muted-foreground">{usdFormatted}</span>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{name} <span className="text-lg font-medium text-muted-foreground">({symbol})</span></h2>
            <p className="text-sm text-muted-foreground">{scienceGent.address}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshData} 
              disabled={isRefreshing}
            >
              <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open(getUniswapLink(), '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Uniswap
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatisticItem
            label="Token Price"
            value={tokenPriceDisplay()}
            change={priceChange24h}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Market Cap"
            value={marketCapDisplay()}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Total Supply"
            value={formatNumber(totalSupply)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Total Liquidity"
            value={formatUSD(totalLiquidity * ethPrice)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="24h Volume"
            value={formatUSD(volume24h * ethPrice)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Holders"
            value={formatNumber(holders, 0)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Virtual ETH"
            value={`${formatNumber(virtualETH)} ETH`}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Collected Fees"
            value={`${formatNumber(collectedFees)} ETH`}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Capability Fees"
            value={formatPercentage(capabilityFees)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Maturity Progress"
            value={formatPercentage(maturityProgress)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Migration Status"
            value={
              <Badge className={migrationStatus.color}>
                {migrationStatus.icon}
                {migrationStatus.text}
              </Badge>
            }
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Transactions"
            value={formatNumber(transactions, 0)}
            isLoading={isRefreshing}
          />
          <StatisticItem
            label="Age"
            value={ageDisplay}
            isLoading={isRefreshing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenStatistics;
