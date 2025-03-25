
import React, { useEffect } from 'react';
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useParams } from 'react-router-dom';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Dashboard = () => {
  const { tab } = useParams();
  const { isConnected, connectWallet } = useUserDashboard();

  // If a tab param exists, use it as the initial tab
  const initialTab = tab || 'investments';

  // Refresh the page when mounting if wallet provider might not be initialized yet
  useEffect(() => {
    // If the wallet appears to be connected but Wagmi provider might not be initialized
    // This handles cases where a user navigates directly to a dashboard tab
    // that requires the Wagmi provider, like the profile tab
    if (isConnected && window.ethereum && 
        window.location.pathname.includes('/dashboard/profile') && 
        !window.location.search.includes('refreshed')) {
      
      // Add a flag in URL to prevent infinite refresh loop
      const url = new URL(window.location.href);
      url.searchParams.set('refreshed', 'true');
      window.location.href = url.toString();
    }
  }, [isConnected]);

  if (!isConnected) {
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
