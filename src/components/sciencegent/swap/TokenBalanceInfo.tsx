
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEthPriceContext } from '@/context/EthPriceContext';

interface TokenBalanceInfoProps {
  tokenSymbol: string;
  tokenPrice: string;
  tokenBalance: string;
  ethBalance: string;
  isPending: boolean;
  onRefresh: () => void;
}

const TokenBalanceInfo: React.FC<TokenBalanceInfoProps> = ({
  tokenSymbol,
  tokenPrice,
  tokenBalance,
  ethBalance,
  isPending,
  onRefresh
}) => {
  const isMobile = useIsMobile();
  const { ethPrice, formatEthToUsd } = useEthPriceContext();
  
  const formattedPrice = parseFloat(tokenPrice) > 0 
    ? parseFloat(tokenPrice).toFixed(8) 
    : "0.00000000";
    
  const tokenPriceUsd = parseFloat(tokenPrice) > 0
    ? formatEthToUsd(parseFloat(tokenPrice))
    : "$0.00";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Current Price</p>
          {isPending ? (
            <Skeleton className="h-7 w-48 mt-1" />
          ) : (
            <div>
              <p className="text-xl font-semibold">{formattedPrice} ETH per {tokenSymbol}</p>
              <p className="text-xs text-muted-foreground">{tokenPriceUsd}</p>
            </div>
          )}
        </div>
        <div>
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"} 
            onClick={onRefresh}
            disabled={isPending}
            aria-label="Refresh balances"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {!isMobile && <span className="ml-2">Refresh</span>}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg border bg-muted/30">
          <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
          {isPending ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <div>
              <p className="font-medium truncate">
                {parseFloat(tokenBalance).toFixed(6)} {tokenSymbol}
              </p>
              {parseFloat(tokenBalance) > 0 && (
                <p className="text-xs text-muted-foreground">
                  {formatEthToUsd(parseFloat(tokenBalance) * parseFloat(tokenPrice))}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg border bg-muted/30">
          <p className="text-sm text-muted-foreground mb-1">ETH Balance</p>
          {isPending ? (
            <Skeleton className="h-6 w-24" />
          ) : (
            <div>
              <p className="font-medium truncate">
                {parseFloat(ethBalance).toFixed(6)} ETH
              </p>
              {parseFloat(ethBalance) > 0 && (
                <p className="text-xs text-muted-foreground">
                  {formatEthToUsd(parseFloat(ethBalance))}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenBalanceInfo;
