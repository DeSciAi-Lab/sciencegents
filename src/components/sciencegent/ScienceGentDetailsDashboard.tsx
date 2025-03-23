
import React from 'react';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import DashboardTabs from './dashboard/DashboardTabs';
import LoadingDashboard from './dashboard/LoadingDashboard';
import ErrorDashboard from './dashboard/ErrorDashboard';

interface ScienceGentDetailsDashboardProps {
  address: string;
  scienceGentData: any; // This should be renamed to match ScienceGentDetails
  status: LoadingStatus;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
}

const ScienceGentDetailsDashboard: React.FC<ScienceGentDetailsDashboardProps> = ({
  address,
  scienceGentData, // We'll keep this consistent with DashboardTabs
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

  return (
    <div className="space-y-6">
      <DashboardTabs 
        address={address}
        scienceGentData={scienceGentData}
        status={status}
        isRefreshing={isRefreshing}
        refreshData={refreshData}
      />
    </div>
  );
};

export default ScienceGentDetailsDashboard;
