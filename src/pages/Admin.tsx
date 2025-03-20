
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessDenied from '@/components/admin/AccessDenied';
import AdminSkeleton from '@/components/admin/AdminSkeleton';
import CapabilityManagementCard from '@/components/admin/CapabilityManagementCard';
import FeatureCard from '@/components/admin/FeatureCard';
import ScienceGentSync from '@/components/admin/ScienceGentSync';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useAdminAuth from '@/hooks/useAdminAuth';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { isAdmin, isLoading } = useAdminAuth();

  if (isLoading) {
    return <AdminSkeleton />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
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
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Sync ScienceGents"
                  description="Synchronize ScienceGent tokens from the blockchain"
                  icon="RefreshCcw"
                  onClick={() => setActiveTab("sciencegents")}
                />
                <FeatureCard 
                  title="Manage Capabilities"
                  description="Add, edit, and review capabilities"
                  icon="Layers"
                  onClick={() => setActiveTab("capabilities")}
                />
                <FeatureCard 
                  title="Platform Settings"
                  description="Configure platform parameters and fees"
                  icon="Settings"
                  onClick={() => setActiveTab("settings")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="capabilities">
              <div className="grid grid-cols-1 gap-6">
                <CapabilityManagementCard />
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
