import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, CheckCircle, AlertCircle, Database, Settings, Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { syncCapabilitiesWithBlockchain, isAdminWallet } from '@/services/capabilityService';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPage = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ added: number; updated: number; total: number } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Admin wallet address
  const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83'.toLowerCase();

  useEffect(() => {
    const checkAdminAccess = async () => {
      setIsLoading(true);
      
      try {
        const hasAdminAccess = await isAdminWallet();
        
        if (!hasAdminAccess) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin page.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin access:', error);
        toast({
          title: "Authentication Error",
          description: "An error occurred while checking admin access.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAccess();
    
    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        const hasAdminAccess = await isAdminWallet();
        if (!hasAdminAccess) {
          toast({
            title: "Access Revoked",
            description: "Admin access has been revoked due to wallet change.",
            variant: "destructive"
          });
          navigate('/');
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        // Clean up event listeners
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [navigate]);

  // Function to handle capability sync
  const handleSyncCapabilities = async () => {
    setSyncing(true);
    setSyncResult(null);
    
    try {
      // Check if admin wallet is connected
      const hasAdminAccess = await isAdminWallet();
      if (!hasAdminAccess) {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center h-64">
              <Skeleton className="h-12 w-64 mb-4" />
              <Skeleton className="h-4 w-48 mb-8" />
              <Skeleton className="h-32 w-full max-w-md" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center h-64">
              <Lock className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">
                You don't have permission to access this page.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
