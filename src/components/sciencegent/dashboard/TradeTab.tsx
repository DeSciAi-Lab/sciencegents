
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import TokenSwapInterface from '../TokenSwapInterface';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
}

const TradeTab: React.FC<TradeTabProps> = ({ address, scienceGentData }) => {
  const isMigrated = scienceGentData?.is_migrated || false;

  return (
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
  );
};

export default TradeTab;
