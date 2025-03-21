
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Current Price</p>
          <p className="text-xl font-semibold">{tokenPrice} ETH per {tokenSymbol}</p>
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            <Loader2 className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
          <div className="flex items-center">
            <p className="font-medium">{tokenBalance} {tokenSymbol}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">ETH Balance</p>
          <div className="flex items-center">
            <p className="font-medium">{ethBalance} ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenBalanceInfo;
