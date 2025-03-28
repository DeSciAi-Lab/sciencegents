
import React from 'react';
import FetchTokenStats from '@/components/admin/FetchTokenStats';
import TokenStatsDebugger from '@/components/admin/TokenStatsDebugger';

const AdminPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <FetchTokenStats />
        <TokenStatsDebugger />
      </div>
    </div>
  );
};

export default AdminPage;
