
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ethers } from 'ethers';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Separator } from '@/components/ui/separator';

const TokenStatsDebugger: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('0x9F25D367eB822a2D5A214A964f95FAD49532805B');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);
  const { ethPrice } = useEthPriceContext();
  
  const fetchTokenFromSupabase = async () => {
    setIsLoading(true);
    setError(null);
    setTokenData(null);
    
    try {
      if (!ethers.utils.isAddress(tokenAddress)) {
        throw new Error('Invalid Ethereum address');
      }
      
      // Fetch from Supabase
      const { data, error } = await supabase
        .from('sciencegents')
        .select(`
          *,
          sciencegent_stats:sciencegent_stats(*)
        `)
        .eq('address', tokenAddress)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (!data) {
        throw new Error('Token not found in database');
      }
      
      setTokenData(data);
      console.log('Token data from Supabase:', data);
    } catch (error) {
      console.error('Error fetching token stats:', error);
      setError(error.message || 'Failed to fetch token statistics');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Run the fetch on component mount
  useEffect(() => {
    if (tokenAddress) {
      fetchTokenFromSupabase();
    }
  }, []);
  
  const formatField = (key: string, value: any): string => {
    if (value === null || value === undefined) return 'NULL';
    
    // Format timestamps
    if (key.includes('_at') && typeof value === 'string') {
      return new Date(value).toLocaleString();
    }
    
    // Format ETH values
    if (key.includes('eth') || key.includes('fee') || key.includes('price') || 
        key.includes('market_cap') || key.includes('liquidity')) {
      if (typeof value === 'number') {
        return `${value.toFixed(8)} ETH`;
      }
    }
    
    // Format boolean
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    // Format arrays or objects
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Token Stats Debugger</CardTitle>
        <CardDescription>
          Check what data is actually being stored in Supabase for a token
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
              onClick={fetchTokenFromSupabase} 
              disabled={isLoading || !tokenAddress}
              className="whitespace-nowrap"
            >
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Fetch from DB'}
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {tokenData && (
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Core Token Data</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(tokenData)
                    .filter(([key]) => key !== 'sciencegent_stats')
                    .map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-gray-700">{key}</p>
                        <p className="text-sm text-gray-600 break-all">
                          {formatField(key, value)}
                        </p>
                      </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {tokenData.sciencegent_stats && tokenData.sciencegent_stats[0] && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Token Stats</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(tokenData.sciencegent_stats[0])
                      .filter(([key]) => key !== 'price_history')
                      .map(([key, value]) => (
                        <div key={key} className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-gray-700">{key}</p>
                          <p className="text-sm text-gray-600 break-all">
                            {formatField(key, value)}
                          </p>
                        </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Price History</h4>
                    {tokenData.sciencegent_stats[0].price_history && 
                     Array.isArray(tokenData.sciencegent_stats[0].price_history) && 
                     tokenData.sciencegent_stats[0].price_history.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-2 text-left">Time</th>
                              <th className="p-2 text-left">Price</th>
                              <th className="p-2 text-left">Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tokenData.sciencegent_stats[0].price_history.map((entry: any, idx: number) => (
                              <tr key={idx} className="border-b">
                                <td className="p-2">
                                  {entry.timestamp ? new Date(entry.timestamp * 1000).toLocaleString() : 'N/A'}
                                </td>
                                <td className="p-2">{entry.price || 'N/A'}</td>
                                <td className="p-2">{entry.volume || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No price history available</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500 flex flex-col items-start">
        <p>Current ETH price: ${ethPrice.toFixed(2)}</p>
        <p className="mt-1">Last checked: {new Date().toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
};

export default TokenStatsDebugger;
