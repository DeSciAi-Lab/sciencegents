
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WalletConnect from '@/components/WalletConnect';
import { isAdminWallet } from '@/services/walletService';
import { useEffect, useState } from 'react';

const NavHeader: React.FC = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current wallet is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdminWallet();
      setIsAdmin(admin);
    };

    checkAdmin();
    
    // Listen for account changes to update admin status
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkAdmin);
      return () => {
        window.ethereum.removeListener('accountsChanged', checkAdmin);
      };
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/08a9f99c-b973-4c5a-89b7-73d6021d9460.png" 
              alt="ScienceGents Logo" 
              className="h-14"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/explore"
              className={`text-gray-800 font-medium ${
                location.pathname === '/explore' || location.pathname === '/sciencegents'
                  ? 'text-purple-700'
                  : 'hover:text-purple-700'
              }`}
            >
              ScienceGents
            </Link>
            <Link
              to="/capabilities"
              className={`text-gray-800 font-medium ${
                location.pathname === '/capabilities'
                  ? 'text-purple-700'
                  : 'hover:text-purple-700'
              }`}
            >
              Capabilities
            </Link>
            
            {/* Admin Link - Only show if connected wallet is admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-gray-800 font-medium ${
                  location.pathname === '/admin'
                    ? 'text-purple-700'
                    : 'hover:text-purple-700'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              asChild
              className="bg-white border-purple-500 border text-purple-500 hover:bg-purple-50"
              variant="outline"
            >
              <Link to="/create-sciencegent">
                Create ScienceGent
              </Link>
            </Button>
            
            <Button 
              asChild
              className="bg-white border-purple-500 border text-purple-500 hover:bg-purple-50"
              variant="outline"
            >
              <Link to="/create-capability">
                Create Capability
              </Link>
            </Button>

            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
