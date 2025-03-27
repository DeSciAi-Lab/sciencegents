
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { EthPriceProvider } from '@/context/EthPriceContext';

// Create a new QueryClient instance
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <EthPriceProvider>
        {children}
        <Toaster />
      </EthPriceProvider>
    </QueryClientProvider>
  );
}
