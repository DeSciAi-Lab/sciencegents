
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Skeleton className="h-12 w-64 mb-4" />
      <Skeleton className="h-4 w-48 mb-8" />
      <Skeleton className="h-32 w-full max-w-md" />
    </div>
  );
};

export default AdminSkeleton;
