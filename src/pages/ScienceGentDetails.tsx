
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingStatus } from '@/hooks/useScienceGentDetails';
import useScienceGentDetails from '@/hooks/useScienceGentDetails';
import DetailsLayout from '@/components/sciencegent/details/DetailsLayout';
import LoadingState from '@/components/sciencegent/details/LoadingState';
import ErrorState from '@/components/sciencegent/details/ErrorState';

const ScienceGentDetails: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);

  if (status === LoadingStatus.Loading) {
    return <LoadingState />;
  }

  if (status === LoadingStatus.Error || status === LoadingStatus.NotFound) {
    return <ErrorState address={address} />;
  }

  return (
    <DetailsLayout
      scienceGent={scienceGent}
      address={address || ''}
      status={status}
      isRefreshing={isRefreshing}
      refreshData={refreshData}
    />
  );
};

export default ScienceGentDetails;
