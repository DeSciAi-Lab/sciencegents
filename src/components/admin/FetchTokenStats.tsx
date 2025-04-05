import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TokenStats, ScienceGentData } from '@/services/scienceGent';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { fetchTokenStats, fetchTokenDataFromSupabase, syncAllTokenStats } from '@/services/scienceGent';
import { toast } from '@/components/ui/use-toast';

const FetchTokenStats: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [supabaseData, setSupabaseData] = useState<ScienceGentData | null>(null);
  const [success, setSuccess] = useState(false);
  const { ethPrice } = useEthPriceContext();
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0 });
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Function to fetch data from Supabase
  const fetchSupabaseData = async (address: string) => {
    setIsLoading(true);
    try {
      const data = await fetchTokenDataFromSupabase(address);
      if (!data) {
        throw new Error('No data found for this token');
      }
      return data;
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
      throw error;
    }
  };

  // Fetch all token addresses and sync them
  const syncAllTokens = async () => {
    setSyncingAll(true);
    setSyncProgress({ current: 0, total: 0 });
    setSyncStatus('Starting sync...');
    
    try {
      // Use the reusable function and handle progress updates
      const result = await syncAllTokenStats((current, total, status) => {
        setSyncProgress({ current, total });
        setSyncStatus(status);
      });
      
      toast({
        title: 'Sync Completed',
        description: `Successfully synced ${result.syncCount} tokens, ${result.errorCount} errors`,
      });
    } catch (error) {
      console.error('Error syncing all tokens:', error);
      toast({
        title: 'Sync Failed',
        description: error.message || 'Failed to sync tokens',
        variant: 'destructive'
      });
    } finally {
      setSyncingAll(false);
    }
  };

  // Modified fetchTokenStats to use the reusable service
  const handleFetchTokenStats = async (address: string = tokenAddress) => {
    setError(null);
    setTokenStats(null);
    setSupabaseData(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      if (!ethers.utils.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }

      // Use the reusable service to fetch and save token stats
      const result = await fetchTokenStats(address, ethPrice);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch token data');
      }
      
      // Set the token stats and Supabase data
      setTokenStats(result.tokenStats || null);
      setSupabaseData(result.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching token stats:', error);
      setError(error.message || 'Failed to fetch token statistics');
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Format ETH value with 6 decimal places
  const formatEthValue = (value: string) => {
    return parseFloat(ethers.utils.formatEther(value)).toFixed(6);
  };

  // Format current price for display
  const formatCurrentPrice = (value: string) => {
    return parseFloat(ethers.utils.formatEther(value)).toFixed(18);
  };

  // Calculate USD value for display
  const calculateUsdValue = (ethValue: string) => {
    const valueInEth = parseFloat(ethers.utils.formatEther(ethValue));
    return (valueInEth * ethPrice).toFixed(2);
  };

  // Calculate token price in USD
  const calculateTokenPriceUsd = (ethValue: string) => {
    const priceInEth = parseFloat(ethers.utils.formatEther(ethValue));
    const priceInUsd = priceInEth * ethPrice;
    return priceInUsd < 0.01 ? priceInUsd.toExponential(4) : priceInUsd.toFixed(4);
  };

  // Calculate total liquidity - Remove this function as it references ethReserve
  const calculateTotalLiquidity = () => {
    // We'll use supabaseData instead
    if (!supabaseData || !supabaseData.eth_reserves) return '0';
    return (supabaseData.eth_reserves * ethPrice).toFixed(2);
  };

  // Calculate market cap - Update to use only supabaseData
  const calculateMarketCap = () => {
    if (!supabaseData || !supabaseData.token_price || !supabaseData.total_supply) return '0';
    return (supabaseData.total_supply * supabaseData.token_price * ethPrice).toFixed(2);
  };

  // Format ETH display value
  const formatEthDisplay = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '0.000000';
    return value.toFixed(6);
  };

  // Format USD display value
  const formatUsdDisplay = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '$0.00';
    return `$${value.toFixed(2)}`;
  };

  // Format token price USD with more precision for very small values
  const formatTokenPriceUsd = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '$0.00000000';
    
    // Use scientific notation for very small numbers
    if (value < 0.00000001) {
      return `$${value.toExponential(8)}`;
    }
    
    // For small but displayable numbers, show more decimals
    return `$${value.toFixed(18)}`;
  };

  // Format token amount with 4 decimal places
  const formatTokenAmount = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '0.0000';
    return value.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fetch Token Statistics</CardTitle>
        <CardDescription>
          Get detailed statistics for a ScienceGent token from our database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input 
              placeholder="Token Address (0x...)" 
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleFetchTokenStats()} 
              disabled={isLoading || !tokenAddress || syncingAll}
              className="whitespace-nowrap"
            >
              {isLoading && !syncingAll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Fetch Stats'}
            </Button>
            <Button 
              onClick={syncAllTokens} 
              disabled={isLoading || syncingAll}
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
              variant="secondary"
            >
              {syncingAll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Sync All ScienceGents'}
            </Button>
          </div>
          
          {/* Sync progress indicator */}
          {syncingAll && (
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-indigo-800">
                  {syncStatus}
                </span>
                <span className="text-sm text-indigo-800">
                  {syncProgress.current}/{syncProgress.total}
                </span>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ 
                    width: syncProgress.total > 0 
                      ? `${(syncProgress.current / syncProgress.total) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && supabaseData && (
            <div className="mt-4 space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully fetched token statistics!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Total Supply</h3>
                  <p className="text-gray-900 font-medium">{formatTokenAmount(supabaseData.total_supply)} tokens</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Token Reserves</h3>
                  <p className="text-gray-900 font-medium">{formatTokenAmount(supabaseData.token_reserves)} tokens</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">ETH Reserves</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.eth_reserves)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.eth_reserves * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Virtual ETH</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.virtual_eth)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.virtual_eth * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Collected Fees</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.collected_fees)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.collected_fees * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Capability Fee</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.capability_fees)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.capability_fees * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Trading Enabled</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.trading_enabled ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Creator</h3>
                  <p className="text-gray-900 font-medium truncate">{supabaseData.creator_address}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Creation Date</h3>
                  <p className="text-gray-900 font-medium">{new Date(supabaseData.created_on_chain_at).toLocaleString()}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Maturity Deadline</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.maturity_deadline ? new Date(supabaseData.maturity_deadline * 1000).toLocaleString() : 'Not set'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migrated to Uniswap</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.is_migrated ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migration Eligible</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.migration_eligible ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Current Price</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.token_price)} ETH</p>
                  <p className="text-xs text-gray-500">${supabaseData.token_price_usd}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Current Price (USD)</h3>
                  <p className="text-gray-900 font-medium">{formatTokenPriceUsd(supabaseData.token_price_usd)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Market Cap</h3>
                  <p className="text-gray-900 font-medium">${supabaseData.market_cap.toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Total Liquidity</h3>
                  <p className="text-gray-900 font-medium">${supabaseData.total_liquidity_usd.toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Maturity Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${supabaseData.maturity_progress || 0}%` }}></div>
                  </div>
                  <p className="text-gray-900 font-medium">{supabaseData.maturity_progress?.toFixed(4)}%</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Remaining Maturity Time</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.remaining_maturity_time ? `${supabaseData.remaining_maturity_time} days` : 'N/A'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migration Condition</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.migration_condition)} ETH</p>
                  <p className="text-xs text-gray-500">2 × virtualETH + capabilityFee</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Token Age</h3>
                  <p className="text-gray-900 font-medium">
                    {supabaseData.age !== undefined ? 
                      `${supabaseData.age} days` : 
                      supabaseData.created_on_chain_at ? 
                        `${Math.floor((Date.now() - new Date(supabaseData.created_on_chain_at).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                        'Unknown'
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Data fetched directly from ScienceGentsSwap contract and token contract
                <br />
                Current ETH price: ${ethPrice.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex flex-col items-start">
        <p>Data fetched from Supabase database after blockchain sync</p>
        <p className="mt-1">Current ETH price: ${ethPrice.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default FetchTokenStats;

