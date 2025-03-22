
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
};

export default LoadingDashboard;
