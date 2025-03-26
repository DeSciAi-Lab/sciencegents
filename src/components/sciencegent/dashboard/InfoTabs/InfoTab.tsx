
import React from 'react';
import CapabilitiesInfo from './CapabilitiesInfo';
import GeneralInfo from './GeneralInfo';
import DeveloperInfo from './DeveloperInfo';

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
