
import React from 'react';
import { useEthPriceContext } from '@/context/EthPriceContext';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
  activeTab?: string;
}

const TradeTab: React.FC<TradeTabProps> = ({ 
  address, 
  scienceGentData,
  activeTab = 'tradebook'
}) => {
  const { formatEthToUsd } = useEthPriceContext();
  
  // Mock trade history data for now
  const tradeHistory = [
    { type: 'Buy', amount: '0.05', price: '0.000004', total: '0.0000002', time: '2023-09-23 13:45' },
    { type: 'Sell', amount: '0.1', price: '0.000004', total: '0.0000004', time: '2023-09-23 12:30' },
    { type: 'Buy', amount: '0.2', price: '0.000003', total: '0.0000006', time: '2023-09-23 10:15' },
    { type: 'Sell', amount: '0.15', price: '0.000003', total: '0.00000045', time: '2023-09-22 18:20' },
    { type: 'Buy', amount: '0.3', price: '0.000002', total: '0.0000006', time: '2023-09-22 16:45' },
  ];
  
  // Mock holders data
  const holders = [
    { address: '0x1234...5678', balance: '1000000', percentage: '10%' },
    { address: '0x8765...4321', balance: '750000', percentage: '7.5%' },
    { address: '0x5678...1234', balance: '500000', percentage: '5%' },
    { address: '0x4321...8765', balance: '250000', percentage: '2.5%' },
    { address: '0x9876...5432', balance: '100000', percentage: '1%' },
  ];
  
  // Mock transactions data
  const transactions = [
    { hash: '0x123...abc', type: 'Transfer', from: '0x1234...5678', to: '0x8765...4321', amount: '100000', time: '2023-09-23 13:45' },
    { hash: '0x456...def', type: 'Swap', from: '0x8765...4321', to: '0x5678...1234', amount: '50000', time: '2023-09-23 12:30' },
    { hash: '0x789...ghi', type: 'Transfer', from: '0x5678...1234', to: '0x4321...8765', amount: '25000', time: '2023-09-23 10:15' },
    { hash: '0xabc...123', type: 'Swap', from: '0x4321...8765', to: '0x9876...5432', amount: '10000', time: '2023-09-22 18:20' },
    { hash: '0xdef...456', type: 'Transfer', from: '0x9876...5432', to: '0x1234...5678', amount: '5000', time: '2023-09-22 16:45' },
  ];
  
  return (
    <div>
      {activeTab === 'tradebook' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Trade History</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (ETH)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (ETH)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tradeHistory.map((trade, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        trade.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{trade.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{trade.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{trade.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'holders' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Top Holders</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holders.map((holder, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{holder.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{holder.balance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{holder.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'transactions' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.hash}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tx.type === 'Transfer' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.to}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeTab;
