import React from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import DashboardTabs from './dashboard/DashboardTabs';
import LoadingDashboard from './dashboard/LoadingDashboard';
import ErrorDashboard from './dashboard/ErrorDashboard';

interface ScienceGentDetailsDashboardProps {
  address: string;
  scienceGentData: any;
  status: LoadingStatus;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const ScienceGentDetailsDashboard: React.FC<ScienceGentDetailsDashboardProps> = ({
  address,
  scienceGentData,
  status,
  isRefreshing,
  refreshData
}) => {
  const isLoading = status === LoadingStatus.Loading;
  const isError = status === LoadingStatus.Error || status === LoadingStatus.NotFound;
  
  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (isError) {
    return <ErrorDashboard address={address} />;
  }

  // Make sure scienceGentData exists and is not null or undefined
  if (!scienceGentData) {
    return <ErrorDashboard address={address} />;
  }

  // Check for capabilities array to prevent rendering errors
  if (scienceGentData.capabilities && !Array.isArray(scienceGentData.capabilities)) {
    console.error('Capabilities is not an array:', scienceGentData.capabilities);
    // Convert to array if it's an object or null/undefined
    scienceGentData.capabilities = Array.isArray(scienceGentData.capabilities) 
      ? scienceGentData.capabilities 
      : [];
  }

  return (
    <DashboardTabs 
      address={address}
      scienceGentData={scienceGentData}
      status={status}
      isRefreshing={isRefreshing}
      refreshData={refreshData}
    />
  );
};

export default ScienceGentDetailsDashboard;
