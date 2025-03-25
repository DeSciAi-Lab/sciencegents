
import React, { useEffect, useState } from 'react';
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useParams, useLocation } from 'react-router-dom';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { getCurrentAccount } from '@/services/walletService';

const Dashboard = () => {
  const { tab } = useParams();
  const { isConnected, connectWallet } = useUserDashboard();
  const location = useLocation();
  const [isCheckingWallet, setIsCheckingWallet] = useState(true);
  const [walletConfirmed, setWalletConfirmed] = useState(false);

  // If a tab param exists, use it as the initial tab
  const initialTab = tab || 'investments';

  // Check if wallet is actually connected by querying the provider directly
  useEffect(() => {
    const checkWalletDirectly = async () => {
      setIsCheckingWallet(true);
      try {
        const account = await getCurrentAccount();
        setWalletConfirmed(!!account);
      } catch (error) {
        console.error("Error checking wallet status:", error);
        setWalletConfirmed(false);
      } finally {
        setIsCheckingWallet(false);
      }
    };
    
    checkWalletDirectly();
  }, []);

  // Refresh the page when mounting if wallet provider might not be initialized yet
  useEffect(() => {
    // If the wallet appears to be connected but we need to refresh to initialize providers
    const needsRefresh = 
      isConnected && 
      window.ethereum && 
      location.pathname.includes('/dashboard/profile') && 
      !location.search.includes('refreshed');
    
    if (needsRefresh) {
      // Add a flag in URL to prevent infinite refresh loop
      const url = new URL(window.location.href);
      url.searchParams.set('refreshed', 'true');
      window.location.href = url.toString();
    }
  }, [isConnected, location.pathname, location.search]);

  if (isCheckingWallet) {
    return (
      <NavbarLayout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-blue-100 p-6">
                <Wallet className="h-10 w-10 text-science-600 animate-pulse" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Checking Wallet Status</h1>
            <p className="text-muted-foreground mb-8">
              Please wait while we check your wallet connection...
            </p>
          </div>
        </div>
      </NavbarLayout>
    );
  }

  if (!isConnected || !walletConfirmed) {
    return (
      <NavbarLayout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-blue-100 p-6">
                <Wallet className="h-10 w-10 text-science-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-8">
              Connect your wallet to view your ScienceGents dashboard, including your investments,
              created ScienceGents, and capabilities.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-science-600 hover:bg-science-700 text-white" 
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </NavbarLayout>
    );
  }

  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <DashboardTabs initialTab={initialTab} />
      </div>
    </NavbarLayout>
  );
};

export default Dashboard;
