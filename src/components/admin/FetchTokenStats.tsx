
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
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';
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
      const ethReserveAmount = parseFloat(ethers.utils.formatEther(formattedStats.ethReserve));
      
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
          "function decimals() view returns (uint8)"
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
        setTotalSupply(parseFloat(formattedSupply).toFixed(4));
        
        const formattedReserve = ethers.utils.formatUnits(formattedStats.tokenReserve, tokenDecimals);
        setFormattedTokenReserve(parseFloat(formattedReserve).toFixed(4));
      } catch (error) {
        console.error('Error fetching total supply:', error);
        setTotalSupply('Error fetching total supply');
        setFormattedTokenReserve('Error formatting token reserve');
      }
      
      setSuccess(true);
      console.log('Token stats:', formattedStats);
      
      await saveTokenStatsToSupabase(
        tokenAddress, 
        formattedStats, 
        totalSupply, 
        fee,
        formattedTokenReserve,
        ethReserveAmount
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
    formattedTokenReserve: string | null,
    ethReserveAmount: number
  ) => {
    try {
      const virtualEthAmount = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
      const collectedFeesAmount = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
      const tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
      const tokenPriceUsd = tokenPriceEth * ethPrice;
      const migrationCondition = 2 * virtualEthAmount + capabilityFee;
      
      const maturityProgress = (collectedFeesAmount / (migrationCondition || 1)) * 100;
      const remainingTime = tokenStats.remainingMaturityTime || 0;

      // Calculate market cap
      let marketCap = 0;
      if (totalSupply) {
        marketCap = tokenPriceEth * parseFloat(totalSupply);
      }

      // Get the total liquidity (ETH reserves)
      const totalLiquidity = ethReserveAmount;

      const updateData = {
        token_price_usd: tokenPriceUsd,
        token_price: tokenPriceEth,
        collected_fees: collectedFeesAmount,
        virtual_eth: virtualEthAmount,
        migration_condition: migrationCondition,
        capability_fees: capabilityFee,
        maturity_progress: maturityProgress,
        market_cap: marketCap,
        total_supply: totalSupply ? parseFloat(totalSupply) : null,
        total_liquidity: totalLiquidity,
        is_migrated: tokenStats.migrated,
        migration_eligible: tokenStats.migrationEligible,
        remaining_maturity_time: remainingTime,
        creator_address: tokenStats.creator,
        created_on_chain_at: tokenStats.creationTimestamp ? new Date(tokenStats.creationTimestamp * 1000).toISOString() : null,
        maturity_deadline: tokenStats.maturityDeadline ? tokenStats.maturityDeadline : null,
        last_synced_at: new Date().toISOString()
      };

      // If the token is migrated, add LP token details
      if (tokenStats.migrated) {
        try {
          // Get the Uniswap pair address (if possible)
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const factoryAbi = ["function getPair(address, address) view returns (address)"];
          const factoryContract = new ethers.Contract(
            contractConfig.addresses.UniswapV2Factory,
            factoryAbi,
            provider
          );
          const wethAddress = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"; // Sepolia WETH
          
          const pairAddress = await factoryContract.getPair(tokenAddress, wethAddress);
          
          if (pairAddress && pairAddress !== ethers.constants.AddressZero) {
            updateData['uniswap_pair'] = pairAddress;
            
            // Add LP unlock time if available
            if (tokenStats.lpUnlockTime) {
              updateData['lp_unlock_time'] = new Date(tokenStats.lpUnlockTime * 1000).toISOString();
            }
          }
        } catch (error) {
          console.warn('Error fetching Uniswap pair details:', error);
        }
      }

      // Check if the token exists in the database
      const { data: existingToken } = await supabase
        .from('sciencegents')
        .select('address')
        .eq('address', tokenAddress)
        .single();

      let result;
      if (existingToken) {
        // Update existing token
        result = await supabase
          .from('sciencegents')
          .update(updateData)
          .eq('address', tokenAddress);
      } else {
        // Insert new token if it doesn't exist
        updateData['address'] = tokenAddress;
        updateData['name'] = 'Unknown Token';
        updateData['symbol'] = 'UNKNOWN';
        
        result = await supabase
          .from('sciencegents')
          .insert(updateData);
      }

      if (result.error) {
        console.error('Error updating token stats:', result.error);
        toast({
          title: 'Update Failed',
          description: 'Could not save token statistics to database',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Stats Updated',
          description: 'Token statistics successfully saved to database'
        });
      }
    } catch (error) {
      console.error('Error in saveTokenStatsToSupabase:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while saving to database',
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
      return `$${usdPrice.toFixed(18)}`;
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
                  <p className="text-gray-600 mt-1">{tokenStats.maturityProgress?.toFixed(4)}%</p>
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
