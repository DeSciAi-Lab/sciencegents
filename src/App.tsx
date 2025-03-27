
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Providers } from './providers';
import { initBackgroundPriceSync } from './services/scienceGent/backgroundSync';

export default function App() {
  // Initialize background price syncing
  useEffect(() => {
    try {
      // Update 5 tokens every 5 minutes
      const cleanup = initBackgroundPriceSync(5, 5);
      
      // Clean up on unmount
      return cleanup;
    } catch (error) {
      console.error("Error initializing background price sync:", error);
      // Return empty cleanup function to avoid errors
      return () => {};
    }
  }, []);
  
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}
