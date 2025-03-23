
import React from 'react';
import ScienceGentChat from '../ScienceGentChat';

interface ChatTabProps {
  address: string;
  scienceGent: any;
}

const ChatTab: React.FC<ChatTabProps> = ({ address, scienceGent }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <ScienceGentChat 
        address={address} 
        scienceGent={scienceGent} 
      />
    </div>
  );
};

export default ChatTab;
