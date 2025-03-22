
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import ScienceGentChat from '../ScienceGentChat';

interface ChatTabProps {
  scienceGentData: any;
  address: string;
}

const ChatTab: React.FC<ChatTabProps> = ({ scienceGentData, address }) => {
  const hasPersona = Boolean(scienceGentData?.persona);
  const capabilitiesCount = scienceGentData?.capabilities?.length || 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-science-600" />
              Chat with {scienceGentData?.name || "ScienceGent"}
            </CardTitle>
            <CardDescription>
              {hasPersona 
                ? 'This AI agent has a custom scientific persona' 
                : 'This AI agent uses a default scientific assistant persona'}
              {capabilitiesCount > 0 
                ? ` and ${capabilitiesCount} specialized scientific capabilities` 
                : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScienceGentChat 
          scienceGent={scienceGentData}
          address={address}
        />
      </CardContent>
    </Card>
  );
};

export default ChatTab;
