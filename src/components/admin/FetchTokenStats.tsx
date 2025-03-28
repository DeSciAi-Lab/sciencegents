
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contractConfig } from '@/utils/contractConfig';
import { TokenStats } from '@/services/scienceGent/types';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

const FetchTokenStats: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [success, setSuccess] = useState(false);
  const [totalSupply, setTotalSupply] = useState<string | null>(null);

  // Function to fetch token stats from the blockchain
  const fetchTokenStats = async () => {
    // Reset states
    setError(null);
    setTokenStats(null);
    setSuccess(false);
    setIsLoading(true);
    setTotalSupply(null);

    try {
      // Validate token address
      if (!ethers.utils.isAddress(tokenAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      // Connect to provider
      if (!window.ethereum) {
        throw new Error('No Ethereum provider detected. Please install MetaMask.');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // ABI for the getTokenStats function
      const swapAbi = [
        "function getTokenStats(address token) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)"
      ];
      
      // Initialize swap contract interface
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapAbi,
        provider
      );
      
      // Call the getTokenStats function
      const stats = await swapContract.getTokenStats(tokenAddress);
      
      // Process the returned data into our TokenStats type
      const formattedStats: TokenStats = {
        tokenReserve: stats[0].toString(),
        ethReserve: stats[1].toString(),
        virtualETH: stats[2].toString(),
        collectedFees: stats[3].toString(),
        tradingEnabled: stats[4],
        creator: stats[5],
        creationTimestamp: stats[6].toNumber(),
        maturityDeadline: stats[7].toNumber(),
        migrated: stats[8], // matches the contract's response
        lpUnlockTime: stats[9].toNumber(),
        lockedLPAmount: stats[10].toString(),
        currentPrice: stats[11].toString(),
        migrationEligible: stats[12]
      };
      
      // Add derived properties
      const now = Math.floor(Date.now() / 1000);
      formattedStats.tokenAge = now - formattedStats.creationTimestamp;
      
      if (now < formattedStats.maturityDeadline) {
        formattedStats.remainingMaturityTime = formattedStats.maturityDeadline - now;
        // Calculate progress as a percentage
        const totalMaturityTime = 730 * 24 * 60 * 60; // 730 days in seconds
        formattedStats.maturityProgress = Math.min(
          100,
          Math.round(((now - formattedStats.creationTimestamp) / totalMaturityTime) * 100)
        );
      } else {
        formattedStats.remainingMaturityTime = 0;
        formattedStats.maturityProgress = 100;
      }
      
      setTokenStats(formattedStats);
      
      // Fetch total supply from token contract
      try {
        // ERC20 token ABI for totalSupply function
        const tokenAbi = [
          "function totalSupply() view returns (uint256)",
          "function decimals() view returns (uint8)"
        ];
        
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          provider
        );
        
        // Get total supply and decimals
        const supply = await tokenContract.totalSupply();
        let decimals = 18; // default to 18 decimals
        
        try {
          decimals = await tokenContract.decimals();
        } catch (error) {
          console.warn('Could not fetch decimals, using default of 18:', error);
        }
        
        // Format total supply with appropriate decimals
        const formattedSupply = ethers.utils.formatUnits(supply, decimals);
        setTotalSupply(formattedSupply);
      } catch (error) {
        console.error('Error fetching total supply:', error);
        setTotalSupply('Error fetching total supply');
      }
      
      setSuccess(true);
      console.log('Token stats:', formattedStats);
    } catch (error) {
      console.error('Error fetching token stats:', error);
      setError(error.message || 'Failed to fetch token statistics');
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp to human-readable date
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  
  // Format ETH values
  const formatEthValue = (value: string) => {
    try {
      return `${parseFloat(ethers.utils.formatEther(value)).toFixed(6)} ETH`;
    } catch (e) {
      return `${value} wei`;
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
                  <p className="text-gray-600">{tokenStats.tokenReserve} tokens</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">ETH Reserves</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.ethReserve)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Virtual ETH</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.virtualETH)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Collected Fees</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.collectedFees)}</p>
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
                  <h3 className="font-medium text-gray-800">Maturity Progress</h3>
                  <p className="text-gray-600">{tokenStats.maturityProgress}%</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="font-medium text-gray-800">Current Price</h3>
                  <p className="text-gray-600">{formatEthValue(tokenStats.currentPrice)}</p>
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
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Data fetched directly from ScienceGentsSwap contract and token contract
      </CardFooter>
    </Card>
  );
};

export default FetchTokenStats;
