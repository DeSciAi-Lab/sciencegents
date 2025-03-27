
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Providers } from './providers';
import { initBackgroundPriceSync } from './services/scienceGent/backgroundSync';

export default function App() {
  // Initialize background price syncing
  useEffect(() => {
    // Update 5 tokens every 5 minutes
    const cleanup = initBackgroundPriceSync(5, 5);
    
    // Clean up on unmount
    return cleanup;
  }, []);
  
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}
