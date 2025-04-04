import React from 'react';
import { TokenTradeChart } from '@/components/TokenTradeChart';

interface PriceOverviewProps {
  tokenId: string;
}

const PriceOverview: React.FC<PriceOverviewProps> = ({ tokenId }) => {
  return (
    <div className="bg-white">
      <TokenTradeChart 
        tokenId={tokenId} 
        width={800} 
        height={400} 
      />
    </div>
  );
};

export default PriceOverview;
