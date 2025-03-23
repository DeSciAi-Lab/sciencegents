
import React from 'react';

interface ScienceGentStatsCardsProps {
  scienceGent: any;
}

const ScienceGentStatsCards: React.FC<ScienceGentStatsCardsProps> = ({ scienceGent }) => {
  // Use the values from the image
  const marketCap = scienceGent?.marketCap || 4.32;
  const liquidity = scienceGent?.liquidity || 2.14;
  const volume24h = scienceGent?.volume24h || 4.32;
  const holders = scienceGent?.holders || 877;

  // Format dollar values 
  const formatDollars = (ethValue: number) => {
    return `$${(ethValue * 3000).toFixed(2)}k`;
  };

  const CardWithBorder = ({ title, value, ethValue, dollarValue }: { title: string, value?: number, ethValue?: number, dollarValue?: string }) => (
    <div className="bg-white rounded-md p-3 border">
      <div className="text-gray-800">
        <div className="text-sm">{title}</div>
        {ethValue !== undefined ? (
          <>
            <div className="font-medium">{ethValue.toFixed(2)} ETH</div>
            <div className="text-xs text-gray-500">{dollarValue}</div>
          </>
        ) : (
          <div className="font-medium">{value}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <CardWithBorder 
        title="Market Cap" 
        ethValue={marketCap} 
        dollarValue={formatDollars(marketCap)} 
      />
      
      <CardWithBorder 
        title="Liquidity" 
        ethValue={liquidity} 
        dollarValue={formatDollars(liquidity)} 
      />
      
      <CardWithBorder 
        title="24h volume" 
        ethValue={volume24h} 
        dollarValue={formatDollars(volume24h)} 
      />
      
      <CardWithBorder 
        title="Holders" 
        value={holders} 
      />
    </div>
  );
};

export default ScienceGentStatsCards;
