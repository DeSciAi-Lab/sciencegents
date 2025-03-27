
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw, Check, AlertTriangle, Info, Calendar, Search } from 'lucide-react';
import { syncAllScienceGents, syncAllCreationTimestamps, syncSingleScienceGent } from '@/services/scienceGentDataService';
import { syncScienceGent } from '@/services/scienceGent';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface SyncResult {
  syncCount: number;
  errorCount: number;
}

interface ScienceGentToken {
  address: string;
  name: string;
  symbol: string;
  last_synced_at?: string;
  token_price?: number;
  price_usd?: number;
  market_cap?: number;
  total_supply?: number;
}

const ScienceGentSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncingTimestamps, setIsSyncingTimestamps] = useState(false);
  const [isSyncingToken, setIsSyncingToken] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);
  const [lastTimestampSyncResult, setLastTimestampSyncResult] = useState<SyncResult | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [lastTimestampSyncTime, setLastTimestampSyncTime] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [timestampSyncMessage, setTimestampSyncMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scienceGentTokens, setScienceGentTokens] = useState<ScienceGentToken[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<ScienceGentToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<ScienceGentToken | null>(null);
  const [syncLog, setSyncLog] = useState<string[]>([]);

  // Fetch tokens on mount
  useEffect(() => {
    fetchScienceGentTokens();
  }, []);

  // Filter tokens when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredTokens(scienceGentTokens);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = scienceGentTokens.filter(token => 
      token.name.toLowerCase().includes(query) || 
      token.symbol.toLowerCase().includes(query) || 
      token.address.toLowerCase().includes(query)
    );
    
    setFilteredTokens(filtered);
  }, [searchQuery, scienceGentTokens]);

  const fetchScienceGentTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('sciencegents')
        .select('address, name, symbol, last_synced_at, token_price, price_usd, market_cap, total_supply')
        .order('name', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      setScienceGentTokens(data || []);
      setFilteredTokens(data || []);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      toast({
        title: "Error",
        description: "Failed to load ScienceGent tokens",
        variant: "destructive"
      });
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage("Starting synchronization with blockchain...");
      
      const result = await syncAllScienceGents();
      
      setLastSyncResult(result);
      setLastSyncTime(new Date().toISOString());
      setSyncMessage("Sync completed successfully!");
      
      // Refresh the token list
      await fetchScienceGentTokens();
      
      toast({
        title: "Sync Completed",
        description: `Successfully synced ${result.syncCount} ScienceGents with ${result.errorCount} errors.`
      });
    } catch (error) {
      console.error("Sync failed:", error);
      setSyncMessage("Sync failed. See console for details.");
      toast({
        title: "Sync Failed",
        description: error.message || "An error occurred during sync",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTimestampSync = async () => {
    try {
      setIsSyncingTimestamps(true);
      setTimestampSyncMessage("Syncing creation timestamps from blockchain...");
      
      const result = await syncAllCreationTimestamps();
      
      setLastTimestampSyncResult(result);
      setLastTimestampSyncTime(new Date().toISOString());
      setTimestampSyncMessage("Creation timestamp sync completed successfully!");
      
      // Refresh the token list
      await fetchScienceGentTokens();
      
      toast({
        title: "Timestamp Sync Completed",
        description: `Successfully updated creation timestamps for ${result.syncCount} ScienceGents with ${result.errorCount} errors.`
      });
    } catch (error) {
      console.error("Timestamp sync failed:", error);
      setTimestampSyncMessage("Timestamp sync failed. See console for details.");
      toast({
        title: "Timestamp Sync Failed",
        description: error.message || "An error occurred during timestamp sync",
        variant: "destructive"
      });
    } finally {
      setIsSyncingTimestamps(false);
    }
  };

  const handleTokenSync = async () => {
    if (!selectedToken) {
      toast({
        title: "No Token Selected",
        description: "Please select a token to sync",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSyncingToken(true);
      setSyncLog([]);
      addToSyncLog(`Starting sync for ${selectedToken.name} (${selectedToken.symbol})...`);
      
      toast({
        title: "Syncing Token",
        description: `Syncing ${selectedToken.name} (${selectedToken.symbol})...`,
      });
      
      // Use our enhanced syncScienceGent function
      const consoleSpy = (message: string) => {
        if (typeof message === 'object') {
          try {
            addToSyncLog(JSON.stringify(message));
          } catch {
            addToSyncLog(String(message));
          }
        } else {
          addToSyncLog(message);
        }
      };
      
      // Original console.log 
      const originalLog = console.log;
      console.log = function() {
        originalLog.apply(console, arguments);
        // Convert arguments to string and add to sync log
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        addToSyncLog(args);
      };
      
      await syncScienceGent(selectedToken.address);
      
      // Restore original console.log
      console.log = originalLog;
      
      // Refresh the token list
      await fetchScienceGentTokens();
      
      // Get updated token to show sync results
      const { data } = await supabase
        .from('sciencegents')
        .select('token_price, price_usd, market_cap, total_supply')
        .eq('address', selectedToken.address)
        .single();
        
      if (data) {
        addToSyncLog(`Sync completed. Updated values:`);
        addToSyncLog(`- Token price: ${data.token_price} ETH`);
        addToSyncLog(`- USD price: $${data.price_usd}`);
        addToSyncLog(`- Market cap: $${data.market_cap}`);
        addToSyncLog(`- Total supply: ${data.total_supply}`);
      }
      
      toast({
        title: "Token Sync Completed",
        description: `Successfully synced ${selectedToken.name} (${selectedToken.symbol})`,
      });
    } catch (error) {
      console.error("Token sync failed:", error);
      addToSyncLog(`ERROR: ${error.message || "Unknown error"}`);
      toast({
        title: "Token Sync Failed",
        description: error.message || "An error occurred during token sync. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsSyncingToken(false);
    }
  };

  const addToSyncLog = (message: string) => {
    setSyncLog(prev => [...prev, message]);
  };

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "";
    
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "N/A";
    
    // Format large numbers with commas and small numbers with proper decimals
    return typeof num === 'number' 
      ? num > 0.01 
        ? num.toLocaleString('en-US', { maximumFractionDigits: 2 })
        : num.toExponential(6)
      : "N/A";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync ScienceGents</CardTitle>
        <CardDescription>
          Synchronize ScienceGent data from the blockchain to the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <h3 className="text-md font-medium">Sync Individual Token</h3>
              <p className="text-sm text-muted-foreground">
                Select a token to fetch and update its latest data from the blockchain.
              </p>
              
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, symbol, or address..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mt-2 h-36 overflow-auto border rounded-md">
                {filteredTokens.length > 0 ? (
                  <div className="divide-y">
                    {filteredTokens.map(token => (
                      <div 
                        key={token.address}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          selectedToken?.address === token.address ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedToken(token)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{token.name}</span> 
                            <span className="text-xs text-gray-500 ml-2">{token.symbol}</span>
                          </div>
                          {token.last_synced_at && (
                            <span className="text-xs text-gray-500">
                              Last synced: {formatDateTime(token.last_synced_at)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex justify-between">
                          <span>{token.address.substring(0, 10)}...{token.address.slice(-8)}</span>
                          <span>Market Cap: ${formatNumber(token.market_cap)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No tokens found
                  </div>
                )}
              </div>
              
              {selectedToken && (
                <div className="p-3 bg-blue-50 rounded-md mt-2">
                  <div className="font-medium">Selected Token:</div>
                  <div>{selectedToken.name} ({selectedToken.symbol})</div>
                  <div className="text-sm text-gray-600">{selectedToken.address}</div>
                  <div className="text-sm mt-1 grid grid-cols-2 gap-2">
                    <div><span className="font-medium">Price (ETH):</span> {formatNumber(selectedToken.token_price)}</div>
                    <div><span className="font-medium">Price (USD):</span> ${formatNumber(selectedToken.price_usd)}</div>
                    <div><span className="font-medium">Market Cap:</span> ${formatNumber(selectedToken.market_cap)}</div>
                    <div><span className="font-medium">Total Supply:</span> {formatNumber(selectedToken.total_supply)}</div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleTokenSync}
              disabled={isSyncingToken || !selectedToken}
              className="w-full"
            >
              {isSyncingToken ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  <span>Syncing Token...</span>
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  <span>Sync Selected Token</span>
                </>
              )}
            </Button>
            
            {syncLog.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1">Sync Log:</h4>
                <div className="bg-gray-50 border rounded-md p-2 max-h-60 overflow-y-auto text-xs font-mono">
                  {syncLog.map((line, i) => (
                    <div key={i} className={line.includes('ERROR') ? 'text-red-600' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              This action will fetch all ScienceGents from the blockchain and update the database with the latest information.
              This process might take some time depending on the number of ScienceGents.
            </p>
            
            {syncMessage && (
              <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                syncMessage.includes("failed") 
                  ? "bg-red-50 dark:bg-red-950 text-red-600" 
                  : "bg-blue-50 dark:bg-blue-950 text-blue-600"
              }`}>
                <Info size={16} />
                <span>{syncMessage}</span>
              </div>
            )}
            
            {lastSyncTime && (
              <div className="text-sm">
                <p className="font-medium">Last Sync: <span className="font-normal">{formatDateTime(lastSyncTime)}</span></p>
              </div>
            )}
            
            {lastSyncResult && (
              <div className="flex items-center gap-2 text-sm">
                {lastSyncResult.errorCount === 0 ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <AlertTriangle size={16} className="text-amber-600" />
                )}
                <span>
                  Successfully synced {lastSyncResult.syncCount} ScienceGents 
                  {lastSyncResult.errorCount > 0 && ` with ${lastSyncResult.errorCount} errors`}
                </span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full"
          >
            {isSyncing ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                <span>Sync All ScienceGents</span>
              </>
            )}
          </Button>
          
          <Separator className="my-4" />
          
          <div className="flex flex-col space-y-2">
            <h3 className="text-md font-medium">Creation Timestamp Sync</h3>
            <p className="text-sm text-muted-foreground">
              This action will specifically fetch and update the creation timestamps for all ScienceGents.
              This ensures accurate age calculation for all tokens.
            </p>
            
            {timestampSyncMessage && (
              <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                timestampSyncMessage.includes("failed") 
                  ? "bg-red-50 dark:bg-red-950 text-red-600" 
                  : "bg-blue-50 dark:bg-blue-950 text-blue-600"
              }`}>
                <Info size={16} />
                <span>{timestampSyncMessage}</span>
              </div>
            )}
            
            {lastTimestampSyncTime && (
              <div className="text-sm">
                <p className="font-medium">Last Timestamp Sync: <span className="font-normal">{formatDateTime(lastTimestampSyncTime)}</span></p>
              </div>
            )}
            
            {lastTimestampSyncResult && (
              <div className="flex items-center gap-2 text-sm">
                {lastTimestampSyncResult.errorCount === 0 ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <AlertTriangle size={16} className="text-amber-600" />
                )}
                <span>
                  Successfully updated timestamps for {lastTimestampSyncResult.syncCount} ScienceGents 
                  {lastTimestampSyncResult.errorCount > 0 && ` with ${lastTimestampSyncResult.errorCount} errors`}
                </span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleTimestampSync}
            disabled={isSyncingTimestamps}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {isSyncingTimestamps ? (
              <>
                <Calendar className="mr-2 h-4 w-4 animate-spin" />
                <span>Syncing Timestamps...</span>
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Sync Creation Timestamps</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentSync;
