
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessDenied from '@/components/admin/AccessDenied';
import AdminSkeleton from '@/components/admin/AdminSkeleton';
import CapabilityManagementCard from '@/components/admin/CapabilityManagementCard';
import FeatureCard from '@/components/admin/FeatureCard';
import ScienceGentSync from '@/components/admin/ScienceGentSync';
import FetchTokenStats from '@/components/admin/FetchTokenStats';
import NavbarLayout from '@/components/layout/NavbarLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { RefreshCcw, Layers, Settings, BarChart } from 'lucide-react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAdmin, isLoading, adminWalletAddress } = useAdminAuth();

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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Manage platform settings, capabilities, and statistics
          </p>
          
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
              <TabsTrigger value="tokenStats">Token Stats</TabsTrigger>
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
                  title="Fetch Token Stats"
                  description="Get detailed statistics for ScienceGent tokens"
                  icon={BarChart}
                  comingSoon={false}
                  onAction={() => setActiveTab("tokenStats")}
                  actionLabel="Go to Token Stats"
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
            
            <TabsContent value="tokenStats">
              <div className="grid grid-cols-1 gap-6">
                <FetchTokenStats />
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
