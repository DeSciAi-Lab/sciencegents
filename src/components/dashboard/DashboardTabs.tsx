
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Code, UserCircle } from 'lucide-react';
import MyCreatedScienceGents from './MyCreatedScienceGents';
import MyCreatedCapabilities from './MyCreatedCapabilities';
import MyInvestmentsTab from './MyInvestmentsTab';
import SettingsTab from './SettingsTab';
import DeveloperProfileTab from './DeveloperProfileTab';
import { useSearchParams, useNavigate } from 'react-router-dom';

const DashboardTabs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('investments');

  // Initialize tab from URL parameter or default to 'investments'
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['investments', 'sciencegents', 'capabilities', 'profile', 'settings'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`, { replace: true });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="investments" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">My Investments</span>
          <span className="sm:hidden">Investments</span>
        </TabsTrigger>
        <TabsTrigger value="sciencegents" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline">My ScienceGents</span>
          <span className="sm:hidden">ScienceGents</span>
        </TabsTrigger>
        <TabsTrigger value="capabilities" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline">My Capabilities</span>
          <span className="sm:hidden">Capabilities</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Developer Profile</span>
          <span className="sm:hidden">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
          <span className="sm:hidden">Settings</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="investments">
        <MyInvestmentsTab />
      </TabsContent>
      
      <TabsContent value="sciencegents">
        <MyCreatedScienceGents />
      </TabsContent>
      
      <TabsContent value="capabilities">
        <MyCreatedCapabilities />
      </TabsContent>
      
      <TabsContent value="profile">
        <DeveloperProfileTab />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
