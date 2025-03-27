
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw, Check, AlertTriangle, Info, Calendar, DatabaseBackup } from 'lucide-react';
import { syncAllScienceGents, syncAllCreationTimestamps } from '@/services/scienceGentDataService';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { syncSingleScienceGent } from '@/services/scienceGentDataService';
import { formatAddress } from '@/utils/walletUtils';

interface SyncResult {
  syncCount: number;
  errorCount: number;
}

interface ScienceGentRow {
  address: string;
  name: string;
  symbol: string;
  token_price?: number;
  collected_fees?: number;
  is_migrated?: boolean;
  last_synced_at?: string;
}

const ScienceGentSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncingTimestamps, setIsSyncingTimestamps] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);
  const [lastTimestampSyncResult, setLastTimestampSyncResult] = useState<SyncResult | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [lastTimestampSyncTime, setLastTimestampSyncTime] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [timestampSyncMessage, setTimestampSyncMessage] = useState<string | null>(null);
  const [scienceGents, setScienceGents] = useState<ScienceGentRow[]>([]);
  const [isLoadingScienceGents, setIsLoadingScienceGents] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');
  const [syncingToken, setSyncingToken] = useState<string | null>(null);

  // Fetch ScienceGents from Supabase
  useEffect(() => {
    const fetchScienceGents = async () => {
      setIsLoadingScienceGents(true);
      try {
        const { data, error } = await supabase
          .from('sciencegents')
          .select('address, name, symbol, token_price, collected_fees, is_migrated, last_synced_at')
          .order('name');
          
        if (error) {
          console.error('Error fetching ScienceGents:', error);
          toast({
            title: 'Error',
            description: 'Failed to load ScienceGents',
            variant: 'destructive'
          });
        } else {
          setScienceGents(data || []);
        }
      } catch (error) {
        console.error('Error fetching ScienceGents:', error);
      } finally {
        setIsLoadingScienceGents(false);
      }
    };

    fetchScienceGents();
  }, []);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage("Starting synchronization with blockchain...");
      
      const result = await syncAllScienceGents();
      
      setLastSyncResult(result);
      setLastSyncTime(new Date().toISOString());
      setSyncMessage("Sync completed successfully!");
      
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

  const handleSyncScienceGent = async (address: string) => {
    try {
      setSyncingToken(address);
      
      const success = await syncSingleScienceGent(address);
      
      if (success) {
        toast({
          title: "Sync Successful",
          description: `Token ${formatAddress(address)} has been synced from the blockchain.`
        });
        
        // Refresh the data for this token
        const { data, error } = await supabase
          .from('sciencegents')
          .select('address, name, symbol, token_price, collected_fees, is_migrated, last_synced_at')
          .eq('address', address)
          .single();
          
        if (data && !error) {
          setScienceGents(prev => 
            prev.map(sg => sg.address === address ? data : sg)
          );
        }
      } else {
        toast({
          title: "Sync Failed",
          description: `Failed to sync token ${formatAddress(address)}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`Error syncing token ${address}:`, error);
      toast({
        title: "Sync Failed",
        description: `Error syncing token: ${error.message || "Unknown error"}`,
        variant: "destructive"
      });
    } finally {
      setSyncingToken(null);
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

  // Filter tokens based on search term
  const filteredTokens = scienceGents.filter(token => 
    token.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(filterTerm.toLowerCase()) ||
    token.address.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
            <h3 className="text-md font-medium">Bulk Synchronization</h3>
            <p className="text-sm text-muted-foreground">
              Fetch all ScienceGents from the blockchain and update the database with the latest information.
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
            
            <div className="flex gap-4">
              <Button 
                onClick={handleSync}
                disabled={isSyncing}
                className="flex-grow"
              >
                {isSyncing ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    <span>Syncing All...</span>
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    <span>Sync All ScienceGents</span>
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleTimestampSync}
                disabled={isSyncingTimestamps}
                variant="outline"
              >
                {isSyncingTimestamps ? (
                  <>
                    <Calendar className="mr-2 h-4 w-4 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Sync Timestamps</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-md font-medium">Individual Token Sync</h3>
            <p className="text-sm text-muted-foreground">
              Synchronize individual ScienceGent tokens from the blockchain.
              This will update token price, fees, migration status and other dynamic data.
            </p>
            
            <div className="my-4">
              <Input
                placeholder="Search tokens by name, symbol, or address..."
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
                className="max-w-lg"
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Collected Fees</TableHead>
                    <TableHead>Migrated</TableHead>
                    <TableHead>Last Synced</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingScienceGents ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        Loading tokens...
                      </TableCell>
                    </TableRow>
                  ) : filteredTokens.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No tokens found{filterTerm && ` matching "${filterTerm}"`}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTokens.map((token) => (
                      <TableRow key={token.address}>
                        <TableCell>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-xs text-muted-foreground">{token.symbol}</div>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">{formatAddress(token.address)}</span>
                        </TableCell>
                        <TableCell>{token.token_price?.toFixed(6) || 'N/A'}</TableCell>
                        <TableCell>{token.collected_fees?.toFixed(4) || 'N/A'}</TableCell>
                        <TableCell>
                          {token.is_migrated ? 
                            <span className="text-green-600">Yes</span> : 
                            <span className="text-gray-600">No</span>
                          }
                        </TableCell>
                        <TableCell>
                          {token.last_synced_at ? formatDateTime(token.last_synced_at) : 'Never'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={syncingToken === token.address}
                            onClick={() => handleSyncScienceGent(token.address)}
                          >
                            {syncingToken === token.address ? (
                              <>
                                <DatabaseBackup className="mr-1 h-3 w-3 animate-spin" />
                                <span>Syncing...</span>
                              </>
                            ) : (
                              <>
                                <DatabaseBackup className="mr-1 h-3 w-3" />
                                <span>Sync</span>
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentSync;
