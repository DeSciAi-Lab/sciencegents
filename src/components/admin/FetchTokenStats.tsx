
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contractConfig } from '@/utils/contractConfig';
import { TokenStats } from '@/services/scienceGent/types';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { calculateMaturityProgress, calculateTokenPrice } from '@/utils/scienceGentCalculations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const FetchTokenStats: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [success, setSuccess] = useState(false);
  const [totalSupply, setTotalSupply] = useState<string | null>(null);
  const [formattedTokenReserve, setFormattedTokenReserve] = useState<string | null>(null);
  const [decimals, setDecimals] = useState<number>(18);
  const [capabilityFee, setCapabilityFee] = useState<number>(0);
  const { ethPrice } = useEthPriceContext();

  const fetchCapabilityFee = async (provider: ethers.providers.Web3Provider, tokenAddress: string) => {
    try {
      const factoryAbi = [
        "function calculateTotalCapabilityFeeOfToken(address token) view returns (uint256)"
      ];
      
      const factoryContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsFactory,
        factoryAbi,
        provider
      );
      
      const fee = await factoryContract.calculateTotalCapabilityFeeOfToken(tokenAddress);
      return parseFloat(ethers.utils.formatEther(fee));
    } catch (error) {
      console.error('Error fetching capability fee:', error);
      return 0;
    }
  };

  const fetchTokenStats = async () => {
    setError(null);
    setTokenStats(null);
    setSuccess(false);
    setIsLoading(true);
    setTotalSupply(null);
    setFormattedTokenReserve(null);
    setDecimals(18);
    setCapabilityFee(0);

    try {
      if (!ethers.utils.isAddress(tokenAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      if (!window.ethereum) {
        throw new Error('No Ethereum provider detected. Please install MetaMask.');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const swapAbi = [
        "function getTokenStats(address token) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)"
      ];
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapAbi,
        provider
      );
      
      const stats = await swapContract.getTokenStats(tokenAddress);
      
      const formattedStats: TokenStats = {
        tokenReserve: stats[0].toString(),
        ethReserve: stats[1].toString(),
        virtualETH: stats[2].toString(),
        collectedFees: stats[3].toString(),
        tradingEnabled: stats[4],
        creator: stats[5],
        creationTimestamp: stats[6].toNumber(),
        maturityDeadline: stats[7].toNumber(),
        migrated: stats[8],
        lpUnlockTime: stats[9].toNumber(),
        lockedLPAmount: stats[10].toString(),
        currentPrice: stats[11].toString(),
        migrationEligible: stats[12]
      };
      
      const fee = await fetchCapabilityFee(provider, tokenAddress);
      setCapabilityFee(fee);
      
      const virtualEthAmount = parseFloat(ethers.utils.formatEther(formattedStats.virtualETH));
      const collectedFeesAmount = parseFloat(ethers.utils.formatEther(formattedStats.collectedFees));
      
      const migrationCondition = 2 * virtualEthAmount + fee;
      
      formattedStats.maturityProgress = Math.min(
        100,
        (collectedFeesAmount / (migrationCondition || 1)) * 100
      );
      
      const now = Math.floor(Date.now() / 1000);
      formattedStats.tokenAge = now - formattedStats.creationTimestamp;
      
      if (now < formattedStats.maturityDeadline) {
        formattedStats.remainingMaturityTime = formattedStats.maturityDeadline - now;
      } else {
        formattedStats.remainingMaturityTime = 0;
      }
      
      setTokenStats(formattedStats);
      
      try {
        const tokenAbi = [
          "function totalSupply() view returns (uint256)",
          "function decimals() view returns (uint8)",
          "function name() view returns (string)",
          "function symbol() view returns (string)"
        ];
        
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          provider
        );
        
        const supply = await tokenContract.totalSupply();
        let tokenDecimals = 18;
        
        try {
          tokenDecimals = await tokenContract.decimals();
          setDecimals(tokenDecimals);
        } catch (error) {
          console.warn('Could not fetch decimals, using default of 18:', error);
        }
        
        const formattedSupply = ethers.utils.formatUnits(supply, tokenDecimals);
        setTotalSupply(formattedSupply);
        
        const formattedReserve = ethers.utils.formatUnits(formattedStats.tokenReserve, tokenDecimals);
        setFormattedTokenReserve(formattedReserve);

        // Also fetch name and symbol if possible
        let tokenName = "Unknown Token";
        let tokenSymbol = "UNKNOWN";
        
        try {
          tokenName = await tokenContract.name();
          tokenSymbol = await tokenContract.symbol();
        } catch (error) {
          console.warn('Could not fetch token name/symbol:', error);
        }
        
        // Add name and symbol to the formattedStats for saving to Supabase
        formattedStats.name = tokenName;
        formattedStats.symbol = tokenSymbol;
      } catch (error) {
        console.error('Error fetching token details:', error);
        setTotalSupply('Error fetching total supply');
        setFormattedTokenReserve('Error formatting token reserve');
      }
      
      setSuccess(true);
      console.log('Token stats:', formattedStats);
      
      await saveTokenStatsToSupabase(
        tokenAddress, 
        formattedStats, 
        totalSupply, 
        capabilityFee,
        formattedTokenReserve
      );
    } catch (error) {
      console.error('Error fetching token stats:', error);
      setError(error.message || 'Failed to fetch token statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const saveTokenStatsToSupabase = async (
    tokenAddress: string, 
    tokenStats: TokenStats, 
    totalSupply: string | null, 
    capabilityFee: number,
    formattedTokenReserve: string | null
  ) => {
    try {
      console.log('Starting to save token data to Supabase for:', tokenAddress);
      
      // Convert big number values to regular numbers
      const virtualEthAmount = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
      const collectedFeesAmount = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
      const ethReserveAmount = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
      const tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
      const tokenPriceUsd = tokenPriceEth * ethPrice;
      const migrationCondition = 2 * virtualEthAmount + capabilityFee;
      
      console.log('Computed values:', { 
        virtualEthAmount, 
        collectedFeesAmount, 
        ethReserveAmount, 
        tokenPriceEth, 
        tokenPriceUsd, 
        migrationCondition
      });
      
      // Calculate maturity progress
      const maturityProgress = Math.min(
        100,
        (collectedFeesAmount / (migrationCondition || 1)) * 100
      );

      console.log('Maturity progress:', maturityProgress);

      // Calculate market cap
      let totalSupplyNumber = 0;
      if (totalSupply) {
        totalSupplyNumber = parseFloat(totalSupply);
      }
      const marketCap = totalSupplyNumber ? tokenPriceEth * totalSupplyNumber : 0;
      const marketCapUsd = marketCap * ethPrice;
      const totalLiquidityUsd = ethReserveAmount * ethPrice;
      
      console.log('Market data:', { 
        totalSupplyNumber, 
        marketCap, 
        marketCapUsd, 
        totalLiquidityUsd 
      });
      
      // Calculate remaining maturity days
      const now = Math.floor(Date.now() / 1000);
      const remainingMaturityDays = tokenStats.maturityDeadline > now 
        ? Math.floor((tokenStats.maturityDeadline - now) / 86400) 
        : 0;

      console.log('Token age data:', { 
        now, 
        maturityDeadline: tokenStats.maturityDeadline, 
        remainingMaturityDays 
      });

      // Parse token reserves
      let tokenReservesNumber = 0;
      if (formattedTokenReserve) {
        tokenReservesNumber = parseFloat(formattedTokenReserve);
      }

      console.log('Token reserves:', tokenReservesNumber);

      // Prepare data for upsert with explicit type conversions
      const updateData = {
        name: tokenStats.name || 'Unknown Token',
        symbol: tokenStats.symbol || 'UNKNOWN',
        token_price: Number(tokenPriceEth) || 0,
        token_price_usd: Number(tokenPriceUsd) || 0,
        collected_fees: Number(collectedFeesAmount) || 0,
        virtual_eth: Number(virtualEthAmount) || 0,
        migration_condition: Number(migrationCondition) || 0,
        capability_fees: Number(capabilityFee) || 0,
        maturity_progress: Number(maturityProgress) || 0,
        market_cap: Number(marketCap) || 0,
        market_cap_usd: Number(marketCapUsd) || 0,
        token_reserves: Number(tokenReservesNumber) || 0,
        eth_reserves: Number(ethReserveAmount) || 0,
        total_liquidity_usd: Number(totalLiquidityUsd) || 0,
        trading_enabled: Boolean(tokenStats.tradingEnabled),
        is_migrated: Boolean(tokenStats.migrated),
        migration_eligible: Boolean(tokenStats.migrationEligible),
        remaining_maturity_time: Number(tokenStats.remainingMaturityTime) || 0,
        remaining_maturity_days: Number(remainingMaturityDays) || 0,
        maturity_deadline: Number(tokenStats.maturityDeadline) || 0,
        total_supply: totalSupplyNumber > 0 ? totalSupplyNumber : null,
        creator_address: tokenStats.creator || null,
        created_on_chain_at: new Date(tokenStats.creationTimestamp * 1000).toISOString(),
        last_synced_at: new Date().toISOString()
      };

      console.log('Prepared data for upsert:', updateData);

      // First check if the token exists in the database
      const { data, error: checkError } = await supabase
        .from('sciencegents')
        .select('address')
        .eq('address', tokenAddress)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking if token exists:', checkError);
        toast({
          title: 'Check Failed',
          description: 'Could not verify if token exists in database',
          variant: 'destructive'
        });
        return;
      }

      console.log('Token check result:', data ? 'Token exists' : 'Token does not exist');
      
      let result;
      
      // If token doesn't exist, insert it with basic information
      if (!data) {
        console.log('Creating new token record...');
        const { data: insertData, error: insertError } = await supabase
          .from('sciencegents')
          .insert({
            address: tokenAddress,
            ...updateData
          })
          .select();

        if (insertError) {
          console.error('Error inserting token:', insertError);
          toast({
            title: 'Insert Failed',
            description: 'Could not create new token record',
            variant: 'destructive'
          });
          return;
        }
        
        console.log('Token created successfully:', insertData);
        
        // Also create a stats record
        const { error: statsError } = await supabase
          .from('sciencegent_stats')
          .insert({
            sciencegent_address: tokenAddress,
            volume_24h: 0,
            transactions: 0,
            holders: 0,
            updated_at: new Date().toISOString()
          });
          
        if (statsError) {
          console.error('Error creating stats record:', statsError);
        } else {
          console.log('Stats record created successfully');
        }
        
        result = { status: 'created' };
      } else {
        // If token exists, update it
        console.log('Updating existing token record...');
        const { data: updateResult, error: updateError } = await supabase
          .from('sciencegents')
          .update(updateData)
          .eq('address', tokenAddress)
          .select();

        if (updateError) {
          console.error('Error updating token stats:', updateError);
          toast({
            title: 'Update Failed',
            description: 'Could not update token statistics',
            variant: 'destructive'
          });
          return;
        }
        
        console.log('Token updated successfully:', updateResult);
        result = { status: 'updated' };
      }

      // Record the latest price point in the token's price history
      if (tokenPriceEth > 0) {
        try {
          console.log('Recording price point:', tokenPriceEth);
          const { data: priceData, error: priceRecordError } = await supabase.rpc('add_price_point', {
            token_address: tokenAddress,
            price: tokenPriceEth
          });
          
          if (priceRecordError) {
            console.error('Error recording price point:', priceRecordError);
          } else {
            console.log('Price point recorded successfully:', priceData);
          }
        } catch (priceError) {
          console.error('Error calling add_price_point RPC:', priceError);
        }
      }

      toast({
        title: result.status === 'created' ? 'Token Created' : 'Stats Updated',
        description: 'Token statistics successfully saved to database'
      });
      
      console.log('Token data save completed successfully');
    } catch (error) {
      console.error('Error in saveTokenStatsToSupabase:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred when saving data',
        variant: 'destructive'
      });
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatEthValue = (value: string) => {
    try {
      return `${parseFloat(ethers.utils.formatEther(value)).toFixed(8)} ETH`;
    } catch (e) {
      return `${value} wei`;
    }
  };

  const formatCurrentPrice = (value: string) => {
    try {
      return `${ethers.utils.formatEther(value)} ETH`;
    } catch (e) {
      return `${value} wei`;
    }
  };

  const calculateUsdValue = (ethValue: string) => {
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(ethValue));
      return `$${(ethAmount * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateTokenPriceUsd = (ethValue: string) => {
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(ethValue));
      const usdPrice = ethAmount * ethPrice;
      return `$${usdPrice.toFixed(8)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateTotalLiquidity = () => {
    if (!tokenStats) return 'N/A';
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
      return `$${(ethAmount * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateMarketCap = () => {
    if (!tokenStats || !totalSupply) return 'N/A';
    try {
      const tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
      const totalSupplyNum = parseFloat(totalSupply);
      return `$${(tokenPriceEth * totalSupplyNum * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fetch Token Statistics</CardTitle>
        <CardDescription>
          Get detailed statistics for a ScienceGent token directly from the blockchain
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
              onClick={fetchTokenStats} 
              disabled={isLoading || !tokenAddress}
              className="whitespace-nowrap"
            >
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Fetch Stats'}
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && tokenStats && (
            <div className="mt-4 space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully fetched token statistics!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {totalSupply !== null && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h3 className="font-medium text-gray-800">Total Supply</h3>
                    <p className="text-gray-600">{totalSupply} tokens</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Token Reserves</h3>
                  <p className="text-gray-600">
                    {formattedTokenReserve !== null ? `${formattedTokenReserve} tokens` : `${tokenStats.tokenReserve} wei`}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">ETH Reserves</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.ethReserve)}</p>
                  <p className="text-xs text-gray-500">{calculateUsdValue(tokenStats.ethReserve)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Virtual ETH</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.virtualETH)}</p>
                  <p className="text-xs text-gray-500">{calculateUsdValue(tokenStats.virtualETH)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Collected Fees</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.collectedFees)}</p>
                  <p className="text-xs text-gray-500">{calculateUsdValue(tokenStats.collectedFees)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Capability Fee</h3>
                  <p className="text-gray-600">{capabilityFee.toFixed(8)} ETH</p>
                  <p className="text-xs text-gray-500">${(capabilityFee * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Trading Enabled</h3>
                  <p className="text-gray-600">{tokenStats.tradingEnabled ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Creator</h3>
                  <p className="text-gray-600 truncate">{tokenStats.creator}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Creation Date</h3>
                  <p className="text-gray-600">{formatTimestamp(tokenStats.creationTimestamp)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Maturity Deadline</h3>
                  <p className="text-gray-600">{formatTimestamp(tokenStats.maturityDeadline)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Migrated to Uniswap</h3>
                  <p className="text-gray-600">{tokenStats.migrated ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Migration Eligible</h3>
                  <p className="text-gray-600">{tokenStats.migrationEligible ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Current Price</h3>
                  <p className="text-gray-600">{formatCurrentPrice(tokenStats.currentPrice)}</p>
                  <p className="text-xs text-gray-500">{calculateUsdValue(tokenStats.currentPrice)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Current Price (USD)</h3>
                  <p className="text-gray-600">{calculateTokenPriceUsd(tokenStats.currentPrice)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Market Cap</h3>
                  <p className="text-gray-600">{calculateMarketCap()}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Total Liquidity</h3>
                  <p className="text-gray-600">{calculateTotalLiquidity()}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Maturity Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${tokenStats.maturityProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 mt-1">{tokenStats.maturityProgress?.toFixed(2)}%</p>
                </div>
                
                {!tokenStats.migrated ? (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h3 className="font-medium text-gray-800">Remaining Maturity Time</h3>
                    <p className="text-gray-600">
                      {tokenStats.remainingMaturityTime 
                        ? `${Math.floor(tokenStats.remainingMaturityTime / 86400)} days` 
                        : 'Matured'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-gray-800">LP Token Unlock Time</h3>
                      <p className="text-gray-600">{formatTimestamp(tokenStats.lpUnlockTime)}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <h3 className="font-medium text-gray-800">Locked LP Amount</h3>
                      <p className="text-gray-600">{tokenStats.lockedLPAmount}</p>
                    </div>
                  </>
                )}
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Migration Condition</h3>
                  <p className="text-gray-600">{(2 * parseFloat(ethers.utils.formatEther(tokenStats.virtualETH)) + capabilityFee).toFixed(8)} ETH</p>
                  <p className="text-xs text-gray-500">2 × virtualETH + capabilityFee</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex flex-col items-start">
        <p>Data fetched directly from ScienceGentsSwap contract and token contract</p>
        <p className="mt-1">Current ETH price: ${ethPrice.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default FetchTokenStats;
