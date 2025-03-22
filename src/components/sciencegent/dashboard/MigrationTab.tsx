
import React from 'react';
import MigrationPanel from '../MigrationPanel';

interface MigrationTabProps {
  tokenAddress: string;
  scienceGent: any;
  refreshData: () => Promise<void>;
}

const MigrationTab: React.FC<MigrationTabProps> = ({ 
  tokenAddress, 
  scienceGent, 
  refreshData 
}) => {
  return (
    <MigrationPanel 
      tokenAddress={tokenAddress}
      scienceGent={scienceGent}
      refreshData={refreshData}
    />
  );
};

export default MigrationTab;
