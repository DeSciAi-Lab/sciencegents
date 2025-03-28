
import React from 'react';
import ScienceGentChat from '../ScienceGentChat';

interface ChatTabProps {
  address: string;
  scienceGent: any;
}

const ChatTab: React.FC<ChatTabProps> = ({ address, scienceGent }) => {
  return (
    <div className="w-full">
      <ScienceGentChat 
        address={address} 
        scienceGent={scienceGent} 
      />
    </div>
  );
};

export default ChatTab;
