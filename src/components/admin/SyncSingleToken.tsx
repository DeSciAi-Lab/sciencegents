
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Check, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { syncScienceGent } from '@/services/scienceGentDataService';

interface SyncResult {
  success: boolean;
  message: string;
  data?: any;
}

const SyncSingleToken: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);

  const handleSync = async () => {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSyncing(true);
      setSyncResult(null);
      
      const result = await syncScienceGent(tokenAddress);
      
      if (result?.address) {
        setSyncResult({
          success: true,
          message: `Successfully synced token: ${result.name || result.address}`,
          data: result
        });
        
        toast({
          title: "Sync Successful",
          description: `Token ${result.name || result.address} has been updated`,
        });
      } else {
        setSyncResult({
          success: false,
          message: "Sync failed, token not found or error occurred"
        });
        
        toast({
          title: "Sync Failed",
          description: "Could not sync token data, check console for details",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error syncing token:", error);
      setSyncResult({
        success: false,
        message: error?.message || "An unknown error occurred"
      });
      
      toast({
        title: "Sync Error",
        description: error?.message || "Failed to sync token data",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync Single Token</CardTitle>
        <CardDescription>
          Sync a specific ScienceGent token from the blockchain to update price and other dynamic data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-address">Token Address</Label>
          <div className="flex gap-2">
            <Input
              id="token-address"
              placeholder="0x..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSync}
              disabled={isSyncing || !tokenAddress}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Sync Token</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        {syncResult && (
          <div className={`p-3 rounded border ${
            syncResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {syncResult.success ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <span className={syncResult.success ? 'text-green-700' : 'text-red-700'}>
                {syncResult.message}
              </span>
            </div>
            
            {syncResult.success && syncResult.data && (
              <div className="mt-2 text-sm">
                <p><strong>Name:</strong> {syncResult.data.name}</p>
                <p><strong>Symbol:</strong> {syncResult.data.symbol}</p>
                <p><strong>Price (ETH):</strong> {syncResult.data.token_price}</p>
                <p><strong>Price (USD):</strong> ${syncResult.data.price_usd}</p>
                <p><strong>Market Cap:</strong> ${syncResult.data.market_cap}</p>
                <p><strong>Last Updated:</strong> {new Date(syncResult.data.last_synced_at).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SyncSingleToken;
