
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCcw, Check, AlertTriangle, Info } from 'lucide-react';
import { syncAllScienceGents } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';

const ScienceGentSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<{ syncCount: number; errorCount: number } | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setSyncMessage("Starting synchronization...");
      
      const result = await syncAllScienceGents();
      
      setLastSyncResult(result);
      setLastSyncTime(new Date().toISOString());
      setSyncMessage(null);
      
      toast({
        title: "Sync Completed",
        description: `Successfully synced ${result.syncCount} ScienceGents with ${result.errorCount} errors.`
      });
    } catch (error) {
      console.error("Sync failed:", error);
      setSyncMessage(null);
      toast({
        title: "Sync Failed",
        description: error.message || "An error occurred during sync",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
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
              <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950 p-2 rounded">
                <Info size={16} className="text-blue-600" />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentSync;
