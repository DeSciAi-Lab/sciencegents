
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
    <div className="space-y-0">
      {/* Trading Chart */}
      <div className="p-4">
        <TradingViewChart 
          tokenAddress={address}
          tokenSymbol={scienceGentData?.symbol || "TOKEN"}
          isMigrated={isMigrated}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-4 pt-0">
        <div className="col-span-1">
          <TokenSwapInterface 
            tokenAddress={address}
            tokenSymbol={scienceGentData?.symbol || "TOKEN"}
            isMigrated={isMigrated}
            uniswapPair={scienceGentData?.uniswapPair}
          />
        </div>
        
        <div className="col-span-1">
          {/* Tradebook table would go here */}
          <div className="h-full border rounded-lg flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Trade history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeTab;
