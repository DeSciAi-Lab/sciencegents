
import React from 'react';
import { Settings, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CapabilityManagementCard from '@/components/admin/CapabilityManagementCard';
import FeatureCard from '@/components/admin/FeatureCard';
import AccessDenied from '@/components/admin/AccessDenied';
import AdminSkeleton from '@/components/admin/AdminSkeleton';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminPage = () => {
  // Admin wallet address
  const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83'.toLowerCase();
  
  const { isAdmin, isLoading, accessDenied } = useAdminAuth(ADMIN_WALLET_ADDRESS);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <AdminSkeleton />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (accessDenied || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <AccessDenied />
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
            <CapabilityManagementCard adminWalletAddress={ADMIN_WALLET_ADDRESS} />
            
            <FeatureCard 
              title="Platform Settings"
              description="Manage global platform settings, fees, and configuration parameters."
              icon={Settings}
              comingSoon={true}
            />
            
            <FeatureCard 
              title="Access Control"
              description="Add or remove admin privileges, manage role-based access control."
              icon={Shield}
              comingSoon={true}
            />
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
