
import React, { useState } from 'react';
import { RefreshCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { syncCapabilitiesWithBlockchain } from '@/services/capabilityService';
import { toast } from '@/components/ui/use-toast';
import { refreshCapabilities } from '@/data/capabilities';

interface CapabilityManagementCardProps {
  adminWalletAddress: string;
}

const CapabilityManagementCard: React.FC<CapabilityManagementCardProps> = ({ adminWalletAddress }) => {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ added: number; updated: number; total: number } | null>(null);

  // Function to handle capability sync
  const handleSyncCapabilities = async () => {
    setSyncing(true);
    setSyncResult(null);
    
    try {
      // Strict check if connected wallet is admin
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (!accounts || accounts.length === 0 || accounts[0].toLowerCase() !== adminWalletAddress.toLowerCase()) {
        toast({
          title: "Access Denied",
          description: "Only the admin wallet can perform this operation.",
          variant: "destructive"
        });
        setSyncing(false);
        return;
      }
      
      // Sync capabilities
      const result = await syncCapabilitiesWithBlockchain();
      
      // Update state and show success toast
      setSyncResult(result);
      
      // Force refresh capabilities data
      await refreshCapabilities();
      
      if (result.added === 0 && result.updated === 0) {
        toast({
          title: "No Changes Detected",
          description: `All ${result.total} capabilities are already up to date.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Sync Completed",
          description: `Added ${result.added} new capabilities, updated ${result.updated} existing ones. Total: ${result.total}`,
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error syncing capabilities:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <RefreshCcw className="h-5 w-5 text-science-600" />
          <span>Capability Management</span>
        </CardTitle>
        <CardDescription>
          Sync capabilities between blockchain and database
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to scan the blockchain for newly registered capabilities and update the database.
        </p>
        {syncResult && (
          <div className="bg-science-50 p-3 rounded-md mb-4">
            <div className="flex items-center gap-2 text-science-700 font-medium mb-1">
              <CheckCircle className="h-4 w-4" />
              <span>Sync Completed</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Added {syncResult.added} new capabilities, updated {syncResult.updated} existing ones. Total: {syncResult.total}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full gap-2 bg-science-600 hover:bg-science-700" 
          onClick={handleSyncCapabilities}
          disabled={syncing}
        >
          {syncing ? (
            <>
              <RefreshCcw className="h-4 w-4 animate-spin" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh Capabilities</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CapabilityManagementCard;
