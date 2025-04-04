import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTokenHolderDetailsList } from '@/hooks/useTokenHolderDetailsList';
import { formatNumber } from '@/utils/formatters';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface TradeTabProps {
  address: string;
  scienceGentData: any;
  activeTab: string;
}

interface Trade {
  id: string;
  token_id: string;
  price_in_usd: number;
  volume: number;
  time: string;
  trade_type?: string;
  eth_amount?: number;
  value_in_usd?: number;
  maker_address?: string;
}

const TradeTab: React.FC<TradeTabProps> = ({ address, scienceGentData, activeTab }) => {
  
  // Use standard properties available in scienceGentData
  const tokenDecimals = scienceGentData?.token_decimals || 18; // Default to 18 as most ERC20 tokens use this
  const totalSupply = scienceGentData?.total_supply || null;
  // Create a formatted total supply string that useTokenHolderDetailsList expects
  const totalSupplyRaw = totalSupply ? ethers.utils.parseUnits(totalSupply.toString(), tokenDecimals).toString() : null;
  
  const { 
    holders, 
    isLoading: isLoadingHolders, 
    error: holdersError, 
    refetch: refetchHolders 
  } = useTokenHolderDetailsList(address, tokenDecimals, totalSupplyRaw);

  // State for trade data
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoadingTrades, setIsLoadingTrades] = useState(false);
  const [tradeError, setTradeError] = useState<string | null>(null);

  // Fetch trades from Supabase
  useEffect(() => {
    if (activeTab === 'tradebook' && address) {
      fetchTrades();
    }
  }, [activeTab, address]);

  // Function to fetch trades from Supabase
  const fetchTrades = async () => {
    try {
      setIsLoadingTrades(true);
      setTradeError(null);
      
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('token_id', address)
        .order('time', { ascending: false })
        .limit(50);
      
      if (error) {
        throw error;
      }
      
      setTrades(data as Trade[] || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
      setTradeError(error instanceof Error ? error.message : 'Failed to fetch trades');
    } finally {
      setIsLoadingTrades(false);
    }
  };

  // Function to format the trade maker address
  const formatAddress = (address: string) => {
    if (!address) return '';
    return address.slice(0, 6) + '...' + address.slice(-6);
  };

  const renderTradeTable = () => {
    if (isLoadingTrades) {
      return (
        <div className="p-4 space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      );
    }
    
    if (tradeError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertDescription className="flex items-center justify-between">
            {tradeError}
            <Button variant="secondary" size="sm" onClick={fetchTrades}>Retry</Button>
          </AlertDescription>
        </Alert>
      );
    }
    
    if (trades.length === 0) {
      return <div className="p-4 text-center text-gray-500">No trades found for this token.</div>;
    }

    return (
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
            {trades.map((trade) => {
              const formattedDate = trade.time 
                ? format(new Date(trade.time), 'yyyy-MM-dd HH:mm:ss')
                : 'N/A';
              const tradeType = trade.trade_type || (trade.volume > 0 ? 'buy' : 'sell');
              
              // Calculate token amount based on volume
              const tokenAmount = Math.abs(trade.volume);
              
              return (
                <tr key={trade.id} className="border-b">
                  <td className="py-3 text-sm">{formattedDate}</td>
                  <td className={`py-3 text-sm ${tradeType === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {tradeType}
                  </td>
                  <td className="py-3 text-sm">{trade.price_in_usd?.toFixed(6) || 'N/A'}</td>
                  <td className="py-3 text-sm">{formatNumber(tokenAmount)}</td>
                  <td className="py-3 text-sm">${trade.value_in_usd?.toFixed(2) || 'N/A'}</td>
                  <td className="py-3 text-sm">{trade.eth_amount?.toFixed(6) || 'N/A'}</td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center">
                      <a 
                        href={`https://sepolia.etherscan.io/address/${trade.maker_address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600"
                      >
                        {formatAddress(trade.maker_address || '')}
                      </a>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => navigator.clipboard.writeText(trade.maker_address || '')}
                      >
                        <Copy className="h-3 w-3 text-gray-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  const renderHoldersTable = () => {
    if (isLoadingHolders) {
      return (
        <div className="p-4 space-y-2">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      );
    }
    
    if (holdersError) {
      return (
        <Alert variant="destructive" className="m-4">
          <AlertDescription className="flex items-center justify-between">
            {holdersError}
            <Button variant="secondary" size="sm" onClick={refetchHolders}>Retry</Button>
          </AlertDescription>
        </Alert>
      );
    }
    
    if (holders.length === 0) {
      return <div className="p-4 text-center text-gray-500">No holders found or data unavailable.</div>;
    }

    // Determine if address is creator or DEX
    const creatorAddress = scienceGentData?.creator_address?.toLowerCase();
    const platformFeeAddress = '0x6cef989316a8924141c71fb262fcfeab449b8d74'.toLowerCase();
    const dexAddress = '0xeb4b7382bad358c401d57194e5b0d5494c3f0309'.toLowerCase();

    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 font-normal text-gray-500">#</th>
              <th className="py-3 font-normal text-gray-500">Address</th>
              <th className="py-3 font-normal text-gray-500">Tag</th>
              <th className="py-3 font-normal text-gray-500">Quantity</th>
              <th className="py-3 font-normal text-gray-500">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder) => {
              const addressLower = holder.address.toLowerCase();
              let tag = '';
              if (addressLower === creatorAddress) tag = 'Creator';
              else if (addressLower === dexAddress) tag = 'DEX';
              else if (addressLower === platformFeeAddress) tag = 'Platform Fee';
              
              return (
                <tr key={holder.rank} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-500 pl-4 pr-2">{holder.rank}</td>
                  <td className="py-3 text-sm">
                    <div className="flex items-center">
                      <a 
                        href={`https://sepolia.etherscan.io/address/${holder.address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600"
                      >
                        {holder.address}
                      </a>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 ml-1"
                        onClick={() => navigator.clipboard.writeText(holder.address)}
                      >
                        <Copy className="h-3 w-3 text-gray-500" />
                      </Button>
                      <a 
                        href={`https://sepolia.etherscan.io/token/${address}?a=${holder.address}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1"
                      >
                        <ExternalLink className="h-3 w-3 text-gray-400 hover:text-blue-600" />
                      </a>
                    </div>
                  </td>
                  <td className="py-3 text-sm">
                    {tag && <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{tag}</span>}
                  </td>
                  <td className="py-3 text-sm">{formatNumber(parseFloat(holder.formattedQuantity))}</td>
                  <td className="py-3 text-sm">{holder.percentage.toFixed(4)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        {activeTab === 'tradebook' && renderTradeTable()}
        {activeTab === 'holders' && renderHoldersTable()}
      </CardContent>
    </Card>
  );
};

export default TradeTab;
