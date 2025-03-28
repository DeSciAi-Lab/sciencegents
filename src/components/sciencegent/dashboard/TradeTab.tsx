
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
  activeTab: string;
}

const TradeTab: React.FC<TradeTabProps> = ({ address, scienceGentData, activeTab }) => {
  // Sample trade data
  const trades = [
    {
      timestamp: '2025-03-25 05:39:55',
      type: 'sell',
      price: 0.023,
      token: '6,765,343',
      value: '$589',
      eth: '0.023',
      maker: '0x1C4C...F463a3'
    },
    {
      timestamp: '2025-03-25 05:23:58',
      type: 'buy',
      price: 'Content',
      token: '8,765,765',
      value: '$550',
      eth: '0.0212',
      maker: '0x1C4C...F463a3'
    }
  ];
  
  // Sample holders data
  const holders = [
    {
      position: 1,
      wallet: '0x76yu...dhn4yj',
      special: 'dex',
      tokens: '238,998,334',
      percentage: '81.688834%'
    },
    {
      position: 2,
      wallet: '0x7u89...78jh98',
      special: 'creator',
      tokens: '6,765,343',
      percentage: '14.78743%'
    },
    {
      position: 3,
      wallet: '0x7u89...78jh98',
      special: '',
      tokens: '8,765,765',
      percentage: '1.76734%'
    },
    {
      position: 4,
      wallet: '0x7u89...78jh98',
      special: '',
      tokens: '765,343',
      percentage: '0.56743%'
    }
  ];
  
  const renderTradeTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3 font-normal text-gray-500">timestamp UTC</th>
            <th className="py-3 font-normal text-gray-500">type</th>
            <th className="py-3 font-normal text-gray-500">Price</th>
            <th className="py-3 font-normal text-gray-500">Token</th>
            <th className="py-3 font-normal text-gray-500">value</th>
            <th className="py-3 font-normal text-gray-500">ETH</th>
            <th className="py-3 font-normal text-gray-500">Maker</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 text-sm">{trade.timestamp}</td>
              <td className={`py-3 text-sm ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                {trade.type}
              </td>
              <td className="py-3 text-sm">{typeof trade.price === 'number' ? trade.price : trade.price}</td>
              <td className="py-3 text-sm">{trade.token}</td>
              <td className="py-3 text-sm">{trade.value}</td>
              <td className="py-3 text-sm">{trade.eth}</td>
              <td className="py-3 text-sm">
                <div className="flex items-center">
                  <span>{trade.maker}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                    <Copy className="h-3 w-3 text-gray-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderHoldersTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3 font-normal text-gray-500">wallet</th>
            <th className="py-3 font-normal text-gray-500">special add</th>
            <th className="py-3 font-normal text-gray-500">tokens</th>
            <th className="py-3 font-normal text-gray-500">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 text-sm">
                <div className="flex items-center">
                  <span>{holder.position}.</span>
                  <span className="ml-4">{holder.wallet}</span>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-1">
                    <Copy className="h-3 w-3 text-gray-500" />
                  </Button>
                </div>
              </td>
              <td className="py-3 text-sm">{holder.special}</td>
              <td className="py-3 text-sm">{holder.tokens}</td>
              <td className="py-3 text-sm">{holder.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  // Transactions tab can be similar to tradebook but with different columns
  const renderTransactionsTable = () => (
    <div className="flex items-center justify-center h-60">
      <p className="text-gray-500">Transaction history will appear here</p>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-0">
        {activeTab === 'tradebook' && renderTradeTable()}
        {activeTab === 'holders' && renderHoldersTable()}
        {activeTab === 'transactions' && renderTransactionsTable()}
      </CardContent>
    </Card>
  );
};

export default TradeTab;
