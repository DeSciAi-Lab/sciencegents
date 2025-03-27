
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessDenied from '@/components/admin/AccessDenied';
import AdminSkeleton from '@/components/admin/AdminSkeleton';
import CapabilityManagementCard from '@/components/admin/CapabilityManagementCard';
import FeatureCard from '@/components/admin/FeatureCard';
import ScienceGentSync from '@/components/admin/ScienceGentSync';
import NavbarLayout from '@/components/layout/NavbarLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { RefreshCcw, Layers, Settings, DollarSign } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Card, CardContent } from '@/components/ui/card';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAdmin, isLoading, adminWalletAddress } = useAdminAuth();
  const { ethPrice, isLoading: ethPriceLoading, error: ethPriceError, refreshEthPrice } = useEthPriceContext();

  if (isLoading) {
    return <AdminSkeleton />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <NavbarLayout>
      <div className="py-6">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage platform settings, capabilities, and statistics
              </p>
            </div>
            <Card className="bg-white border shadow-sm">
              <CardContent className="p-4 flex items-center gap-2">
                <DollarSign className="text-green-600 h-5 w-5" />
                <div>
                  <div className="text-sm text-muted-foreground">ETH Price</div>
                  <div className="font-medium">
                    {ethPriceLoading ? (
                      "Loading..."
                    ) : ethPriceError ? (
                      "Error loading price"
                    ) : (
                      `$${ethPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </div>
                </div>
                <button 
                  onClick={refreshEthPrice} 
                  className="p-1 ml-2 rounded-full hover:bg-gray-100"
                  title="Refresh ETH price"
                >
                  <RefreshCcw className="h-3.5 w-3.5 text-gray-500" />
                </button>
              </CardContent>
            </Card>
          </div>
          
          <Tabs 
            defaultValue="dashboard" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="sciencegents">ScienceGents</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Sync ScienceGents"
                  description="Synchronize ScienceGent tokens from the blockchain"
                  icon={RefreshCcw}
                  comingSoon={false}
                  onAction={() => setActiveTab("sciencegents")}
                  actionLabel="Go to Sync"
                />
                <FeatureCard 
                  title="Manage Capabilities"
                  description="Add, edit, and review capabilities"
                  icon={Layers}
                  comingSoon={false}
                  onAction={() => setActiveTab("capabilities")}
                  actionLabel="Go to Capabilities"
                />
                <FeatureCard 
                  title="Platform Settings"
                  description="Configure platform parameters and fees"
                  icon={Settings}
                  comingSoon={true}
                  actionLabel="Coming Soon"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="capabilities">
              <div className="grid grid-cols-1 gap-6">
                <CapabilityManagementCard adminWalletAddress={adminWalletAddress} />
              </div>
            </TabsContent>
            
            <TabsContent value="sciencegents">
              <div className="grid grid-cols-1 gap-6">
                <ScienceGentSync />
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Settings coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Admin;
