
import React from 'react';
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
