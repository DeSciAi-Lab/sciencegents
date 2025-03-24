
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Code, MessageSquare, Bell } from 'lucide-react';
import GeneralInfo from './InfoTabs/GeneralInfo';
import CapabilitiesInfo from './InfoTabs/CapabilitiesInfo';
import ChatTab from './InfoTabs/ChatTab';
import DeveloperInfo from '../details/DeveloperInfo';

interface InfoTabProps {
  scienceGent: any;
  address: string;
}

const InfoTab: React.FC<InfoTabProps> = ({ scienceGent, address }) => {
  if (!scienceGent) return null;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="capabilities" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Capabilities</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <GeneralInfo scienceGent={scienceGent} />
            </div>
            <div>
              <DeveloperInfo 
                creatorAddress={scienceGent.creator_address || scienceGent.creator}
                developerName={scienceGent.developer_name}
                developerEmail={scienceGent.developer_email}
                bio={scienceGent.bio}
                developerTwitter={scienceGent.developer_twitter}
                developerGithub={scienceGent.developer_github}
                developerWebsite={scienceGent.developer_website}
                profilePic={scienceGent.profile_pic}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="capabilities">
          <CapabilitiesInfo scienceGent={scienceGent} />
        </TabsContent>
        
        <TabsContent value="chat">
          <ChatTab scienceGent={scienceGent} address={address} />
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="text-lg font-medium mb-1">No notifications yet</h3>
            <p>You'll be notified of important events related to this ScienceGent</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoTab;
