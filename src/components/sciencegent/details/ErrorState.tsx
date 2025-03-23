
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface ErrorStateProps {
  address: string | undefined;
}

const ErrorState: React.FC<ErrorStateProps> = ({ address }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pt-6 pb-10">
        <div className="p-6 bg-destructive/10 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading ScienceGent</h2>
          <p>Unable to load details for this ScienceGent. Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Address: {address}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorState;
