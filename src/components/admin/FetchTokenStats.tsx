
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ethers } from 'ethers';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { formatEther } from 'ethers/lib/utils';
import contractConfig from '@/utils/contractConfig';
import { supabase } from '@/integrations/supabase/client';
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';

// ABIs
import ScienceGentsSwapABI from '@/abi/ScienceGentsSwap.json';
import ScienceGentsFactoryABI from '@/abi/ScienceGentsFactory.json';
import ERC20ABI from '@/abi/ERC20.json';

// Define types for token stats
interface TokenStats {
  address: string;
  tokenReserve: number;
  ethReserve: number;
  virtualETH: number;
  collectedFees: number;
  tradingEnabled: boolean;
  tokenCreator: string;
  creationTimestamp: number;
  maturityDeadline: number;
  isMigrated: boolean;
  lpUnlockTime: number;
  lockedLPAmount: number;
  currentPrice: number;
  migrationEligible: boolean;
  totalSupply: number;
  name: string;
  symbol: string;
}

const FetchTokenStats: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    if (!tokenAddress) {
      toast({
        title: 'Error',
        description: 'Please enter a token address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Connect to ScienceGentsSwap contract
      const swapContract = new ethers.Contract(
        contractConfig.ScienceGentsSwap,
        ScienceGentsSwapABI,
        provider
      );
      
      // Connect to ScienceGentsFactory contract
      const factoryContract = new ethers.Contract(
        contractConfig.ScienceGentsFactory,
        ScienceGentsFactoryABI,
        provider
      );
      
      // Connect to Token contract
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20ABI,
        provider
      );

      // Get token stats from swap contract
      const stats = await swapContract.getTokenStats(tokenAddress);
      
      // Get token details from the token contract
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const totalSupply = formatEther(await tokenContract.totalSupply());
      
      // Get capability fee from factory contract
      const capabilityFees = parseFloat(formatEther(
        await factoryContract.calculateTotalCapabilityFeeOfToken(tokenAddress)
      ));
      
      // Parse the stats into a more readable format
      const parsedStats: TokenStats = {
        address: tokenAddress,
        tokenReserve: parseFloat(formatEther(stats.tokenReserve)),
        ethReserve: parseFloat(formatEther(stats.ethReserve)),
        virtualETH: parseFloat(formatEther(stats.virtualETH)),
        collectedFees: parseFloat(formatEther(stats.collectedFees)),
        tradingEnabled: stats.tradingEnabled,
        tokenCreator: stats.creator,
        creationTimestamp: stats.creationTimestamp.toNumber(),
        maturityDeadline: stats.maturityDeadline.toNumber(),
        isMigrated: stats.migrated,
        lpUnlockTime: stats.lpUnlockTime.toNumber(),
        lockedLPAmount: parseFloat(formatEther(stats.lockedLPAmount)),
        currentPrice: parseFloat(formatEther(stats.currentPrice)),
        migrationEligible: stats.migrationEligible,
        totalSupply: parseFloat(totalSupply),
        name,
        symbol
      };

      setTokenStats(parsedStats);
      
      // Save to Supabase
      await saveToSupabase(parsedStats, capabilityFees);
      
      toast({
        title: 'Success',
        description: 'Token stats fetched and saved to database',
      });
    } catch (error) {
      console.error('Error fetching token stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch token stats',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveToSupabase = async (stats: TokenStats, capabilityFees: number) => {
    try {
      // Calculate maturity progress percentage
      const maturityProgress = calculateMaturityProgress(
        stats.virtualETH,
        stats.collectedFees,
        capabilityFees
      );
      
      // Calculate migration condition (2 * virtualETH + capabilityFees)
      const migrationCondition = (2 * stats.virtualETH) + capabilityFees;
      
      // Calculate market cap (price * total supply)
      const marketCap = stats.currentPrice * stats.totalSupply;
      
      // Calculate token price in USD (assuming ETH is $3000)
      const tokenPriceUsd = stats.currentPrice * 3000;
      
      // Format timestamp to ISO string
      const createdOnChainAt = new Date(stats.creationTimestamp * 1000).toISOString();
      const maturityDeadline = new Date(stats.maturityDeadline * 1000).toISOString();
      const lpUnlockTime = stats.lpUnlockTime ? new Date(stats.lpUnlockTime * 1000).toISOString() : null;
      
      // Calculate remaining maturity time
      const now = Math.floor(Date.now() / 1000);
      const remainingMaturityTime = Math.max(0, stats.maturityDeadline - now);
      
      // Check if record exists
      const { data: existingRecord } = await supabase
        .from('sciencegents')
        .select('address')
        .eq('address', stats.address)
        .single();
      
      // Prepare data to upsert
      const dataToUpsert = {
        address: stats.address,
        name: stats.name,
        symbol: stats.symbol,
        token_price: stats.currentPrice,
        token_price_usd: tokenPriceUsd,
        total_supply: stats.totalSupply,
        collected_fees: stats.collectedFees,
        virtual_eth: stats.virtualETH,
        migration_condition: migrationCondition,
        capability_fees: capabilityFees,
        maturity_progress: maturityProgress,
        market_cap: marketCap,
        is_migrated: stats.isMigrated,
        migration_eligible: stats.migrationEligible,
        creator_address: stats.tokenCreator,
        created_on_chain_at: createdOnChainAt,
        maturity_deadline: maturityDeadline,
        remaining_maturity_time: remainingMaturityTime,
        lp_unlock_time: lpUnlockTime,
        locked_lp_amount: stats.lockedLPAmount,
        trading_enabled: stats.tradingEnabled,
        token_reserve: stats.tokenReserve,
        eth_reserve: stats.ethReserve,
        last_synced_at: new Date().toISOString()
      };
      
      // Upsert the data
      const { error } = await supabase
        .from('sciencegents')
        .upsert(dataToUpsert);
      
      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in saveToSupabase:', error);
      throw error;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fetch Token Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter token address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
            <Button onClick={fetchStats} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                'Fetch Stats'
              )}
            </Button>
          </div>
          
          {tokenStats && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Token Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Name:</p>
                  <p>{tokenStats.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Symbol:</p>
                  <p>{tokenStats.symbol}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Supply:</p>
                  <p>{tokenStats.totalSupply.toLocaleString()} tokens</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Current Price:</p>
                  <p>{tokenStats.currentPrice.toFixed(6)} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Market Cap:</p>
                  <p>{(tokenStats.currentPrice * tokenStats.totalSupply).toFixed(4)} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Liquidity:</p>
                  <p>{tokenStats.ethReserve.toFixed(4)} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Creator:</p>
                  <p className="truncate">{tokenStats.tokenCreator}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Trading Enabled:</p>
                  <p>{tokenStats.tradingEnabled ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Creation Date:</p>
                  <p>{new Date(tokenStats.creationTimestamp * 1000).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Maturity Deadline:</p>
                  <p>{new Date(tokenStats.maturityDeadline * 1000).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Virtual ETH:</p>
                  <p>{tokenStats.virtualETH.toFixed(6)} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Collected Fees:</p>
                  <p>{tokenStats.collectedFees.toFixed(6)} ETH</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Migrated:</p>
                  <p>{tokenStats.isMigrated ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Migration Eligible:</p>
                  <p>{tokenStats.migrationEligible ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FetchTokenStats;
