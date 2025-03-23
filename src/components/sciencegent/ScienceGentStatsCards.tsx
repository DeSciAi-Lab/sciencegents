
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

  // Format dollar values as shown in the image
  const formatDollars = (ethValue: number) => {
    return `$${(ethValue * 3000).toFixed(2)}k`;
  };

  const CardWithRoundedCorner = ({ title, ethValue, dollarValue, value }: { title: string, ethValue?: number, dollarValue?: string, value?: number }) => (
    <div className="bg-white rounded-md p-3 border relative">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      {ethValue !== undefined ? (
        <>
          <p className="font-medium">{ethValue.toFixed(2)} ETH</p>
          <p className="text-xs text-gray-500">{dollarValue}</p>
        </>
      ) : (
        <p className="font-medium">{value}</p>
      )}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-100 rounded-tl-lg"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <CardWithRoundedCorner 
        title="Market Cap" 
        ethValue={marketCap} 
        dollarValue={formatDollars(marketCap)} 
      />
      
      <CardWithRoundedCorner 
        title="Liquidity" 
        ethValue={liquidity} 
        dollarValue={formatDollars(liquidity)} 
      />
      
      <CardWithRoundedCorner 
        title="24h volume" 
        ethValue={volume24h} 
        dollarValue={formatDollars(volume24h)} 
      />
      
      <CardWithRoundedCorner 
        title="Holders" 
        value={holders} 
      />
    </div>
  );
};

export default ScienceGentStatsCards;
