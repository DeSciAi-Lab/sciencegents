
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, CheckCircle, AlertCircle, Database, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { syncCapabilitiesWithBlockchain } from '@/services/capabilityService';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPage = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ added: number; updated: number; total: number } | null>(null);
  const navigate = useNavigate();

  // Function to handle capability sync
  const handleSyncCapabilities = async () => {
    setSyncing(true);
    setSyncResult(null);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        toast({
          title: "Wallet Required",
          description: "Please install MetaMask to sync capabilities from the blockchain.",
          variant: "destructive"
        });
        setSyncing(false);
        return;
      }
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Sync capabilities
      const result = await syncCapabilitiesWithBlockchain();
      
      // Update state and show success toast
      setSyncResult(result);
      toast({
        title: "Sync Completed",
        description: `Added ${result.added} new capabilities, updated ${result.updated} existing ones. Total: ${result.total}`,
        variant: "default"
      });
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your ScienceGents platform settings and data
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-science-600" />
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
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-science-600" />
                  <span>Platform Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure platform settings and parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground">
                  Manage global platform settings, fees, and configuration parameters.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  <span>Coming Soon</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-science-600" />
                  <span>Access Control</span>
                </CardTitle>
                <CardDescription>
                  Manage admin access and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground">
                  Add or remove admin privileges, manage role-based access control.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  <span>Coming Soon</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-muted-foreground">
              Admin activity logs will appear here.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
