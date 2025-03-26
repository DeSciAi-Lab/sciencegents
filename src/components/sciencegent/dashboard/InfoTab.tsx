
import React from 'react';
import CapabilitiesInfo from './InfoTabs/CapabilitiesInfo';
import GeneralInfo from './InfoTabs/GeneralInfo';
import DeveloperInfo from './InfoTabs/DeveloperInfo';

interface InfoTabProps {
  activeTab: string;
  scienceGent: any;
}

const InfoTab: React.FC<InfoTabProps> = ({ activeTab, scienceGent }) => {
  if (activeTab === 'capabilities') {
    return <CapabilitiesInfo scienceGent={scienceGent} />;
  }
  
  if (activeTab === 'developer') {
    return <DeveloperInfo scienceGent={scienceGent} />;
  }
  
  // Default to detailed description
  return <GeneralInfo scienceGent={scienceGent} />;
};

export default InfoTab;
