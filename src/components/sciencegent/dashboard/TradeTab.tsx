
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import TokenSwapInterface from '../TokenSwapInterface';
import TradingViewChart from '../trading/TradingViewChart';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
}

const TradeTab: React.FC<TradeTabProps> = ({ address, scienceGentData }) => {
  const isMigrated = scienceGentData?.is_migrated || false;
  const symbol = scienceGentData?.symbol || "STICKER";
  const tokenPrice = scienceGentData?.tokenPrice || 0.000004;
  const priceUSD = scienceGentData?.tokenPriceUSD || 0.0003;
  
  // Stats from image
  const stats = {
    change: "-942.38",
    high: "47,444.1",
    low: "45,555.1"
  };
  
  return (
    <div className="space-y-0">
      {/* Header with price and stats */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-gray-700 font-medium">Price</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-teal-500">{tokenPrice.toFixed(7)}</span>
            <span className="ml-1 text-gray-500">ETH</span>
          </div>
          <span className="text-gray-400">${priceUSD.toFixed(4)}</span>
        </div>
        
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-sm text-gray-500">24h change</p>
            <p className="font-medium text-red-500">{stats.change}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">24h high</p>
            <p className="font-medium">{stats.high}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">24h low</p>
            <p className="font-medium">{stats.low}</p>
          </div>
        </div>
      </div>
      
      {/* TICKER/ETH filter */}
      <div className="p-4 pb-0 flex items-center">
        <div className="flex items-center font-medium text-gray-800">
          <span>TICKER/ETH</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Trading Chart */}
      <div className="p-4">
        <TradingViewChart 
          tokenAddress={address}
          tokenSymbol={symbol}
          isMigrated={isMigrated}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-4 pt-0">
        <div className="col-span-1">
          <TokenSwapInterface 
            tokenAddress={address}
            tokenSymbol={symbol}
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
