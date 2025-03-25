
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Code, UserCircle } from 'lucide-react';
import MyCreatedScienceGents from './MyCreatedScienceGents';
import MyCreatedCapabilities from './MyCreatedCapabilities';
import MyInvestmentsTab from './MyInvestmentsTab';
import SettingsTab from './SettingsTab';
import DeveloperProfileTab from './DeveloperProfileTab';
import { useNavigate } from 'react-router-dom';

interface DashboardTabsProps {
  initialTab?: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ initialTab = 'investments' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Initialize tab from URL parameter or initial prop
  useEffect(() => {
    if (initialTab && ['investments', 'sciencegents', 'capabilities', 'profile', 'settings'].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/${value}`, { replace: true });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="border-b w-full justify-start rounded-none p-0 h-auto">
        <TabsTrigger 
          value="investments" 
          className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          My Investment
        </TabsTrigger>
        <TabsTrigger 
          value="sciencegents" 
          className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          My Sciencegents
        </TabsTrigger>
        <TabsTrigger 
          value="capabilities" 
          className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          My Capabilities
        </TabsTrigger>
        <TabsTrigger 
          value="profile" 
          className="rounded-none px-6 py-3 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-white"
        >
          Developer profile
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="investments" className="mt-0 pt-4 px-4 pb-4">
        <MyInvestmentsTab />
      </TabsContent>
      
      <TabsContent value="sciencegents" className="mt-0 pt-4 px-4 pb-4">
        <MyCreatedScienceGents />
      </TabsContent>
      
      <TabsContent value="capabilities" className="mt-0 pt-4 px-4 pb-4">
        <MyCreatedCapabilities />
      </TabsContent>
      
      <TabsContent value="profile" className="mt-0 pt-4 px-4 pb-4">
        <DeveloperProfileTab />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-0 pt-4 px-4 pb-4">
        <SettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
