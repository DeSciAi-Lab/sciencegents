
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
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
  
  // Mock data for the tradebook
  const tradeData = [
    { date: 'Mar 23 21:27:59', type: 'buy', price: '$0.0243', total: '$19.91', priceETH: '0.0121', amountSAR: '8,187,711', amountETH: '0.0099', maker: '0x7f7...c05f' },
    { date: 'Mar 23 21:27:59', type: 'sell', price: '$0.0241', total: '$0.5939', priceETH: '0.0120', amountSAR: '246,598.00', amountETH: '0.0003', maker: '0x000...0000' },
    { date: 'Mar 23 21:27:59', type: 'sell', price: '$0.0241', total: '$0.5943', priceETH: '0.0120', amountSAR: '246,598.00', amountETH: '0.0003', maker: '0x000...0000' },
    { date: 'Mar 23 21:27:35', type: 'buy', price: '$0.0241', total: '$0.5943', priceETH: '0.0120', amountSAR: '246,598.00', amountETH: '0.0003', maker: '0x000...0000' },
  ];
  
  return (
    <div className="space-y-4">
      {/* Tradebook Table */}
      <div className="rounded-md border overflow-hidden">
        <div className="bg-gray-950 text-white p-2">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left font-normal px-2 py-1">Date ▼</th>
                <th className="text-left font-normal px-2 py-1">Price</th>
                <th className="text-left font-normal px-2 py-1">Total</th>
                <th className="text-left font-normal px-2 py-1">Price ETH</th>
                <th className="text-left font-normal px-2 py-1">Amount SAR</th>
                <th className="text-left font-normal px-2 py-1">Amount ETH</th>
                <th className="text-left font-normal px-2 py-1">Maker</th>
              </tr>
            </thead>
            <tbody>
              {tradeData.map((trade, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-2 py-1">{trade.date}</td>
                  <td className="px-2 py-1">
                    <span className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                      {trade.type}
                    </span> {trade.price}
                  </td>
                  <td className="px-2 py-1">{trade.total}</td>
                  <td className="px-2 py-1">{trade.priceETH}</td>
                  <td className="px-2 py-1">{trade.amountSAR}</td>
                  <td className="px-2 py-1">{trade.amountETH}</td>
                  <td className="px-2 py-1">
                    <span className="text-blue-400">{trade.maker}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeTab;
