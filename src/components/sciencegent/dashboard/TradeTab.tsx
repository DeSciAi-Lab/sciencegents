
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TokenSwapInterface from '../TokenSwapInterface';
import TradingViewChart from '../trading/TradingViewChart';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
}

const TradeTab: React.FC<TradeTabProps> = ({ address, scienceGentData }) => {
  const isMigrated = scienceGentData?.is_migrated || false;

  return (
    <div className="space-y-6">
      {/* Trading Chart */}
      <TradingViewChart 
        tokenAddress={address}
        tokenSymbol={scienceGentData?.symbol || "TOKEN"}
        isMigrated={isMigrated}
      />
      
      {/* Swap Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Trade {scienceGentData?.symbol || "Tokens"}</CardTitle>
          {isMigrated && (
            <CardDescription>
              This token has been migrated to Uniswap and trading is now available on the external DEX.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <TokenSwapInterface 
            tokenAddress={address}
            tokenSymbol={scienceGentData?.symbol || "Token"}
            isMigrated={isMigrated}
            uniswapPair={scienceGentData?.uniswap_pair}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TradeTab;
