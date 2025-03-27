
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw, Check, AlertTriangle, Info, Calendar } from 'lucide-react';
import { syncAllScienceGents, syncAllCreationTimestamps } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import SyncSingleToken from './SyncSingleToken';

interface SyncResult {
  syncCount: number;
  errorCount: number;
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sync ScienceGents</CardTitle>
          <CardDescription>
            Synchronize ScienceGent data from the blockchain to the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
      
      {/* Add the new Single Token Sync component */}
      <SyncSingleToken />
    </div>
  );
};

export default ScienceGentSync;
