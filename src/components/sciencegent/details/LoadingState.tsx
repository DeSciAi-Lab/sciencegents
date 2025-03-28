
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import NavbarLayout from '@/components/layout/NavbarLayout';

const LoadingState: React.FC = () => {
  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Top section: Header + Stats */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 p-5">
                {/* Header with profile */}
                <div className="flex gap-4">
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-6 w-96" />
                  </div>
                </div>
                
                {/* Stats */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
                
                {/* Price chart */}
                <div className="mt-6">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-[300px] w-full" />
                </div>
              </div>
              
              {/* Right side swap panel */}
              <div className="border-l">
                <div className="p-4">
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-10 w-full mb-4" />
                  <Skeleton className="h-40 w-full mb-4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Main dashboard with tabs */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-4">
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LoadingState;
