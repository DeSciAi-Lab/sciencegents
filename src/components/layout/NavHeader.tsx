
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
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
        <div className="flex items-center justify-between h-16">
          {/* Logo with DeSciAi + Heart + ScienceGents */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/0bc5a9bb-08f4-4c6a-9e4a-008edc993782.png" 
                alt="DeSciAi Logo" 
                className="h-8 mr-1" 
              />
              <Heart className="h-4 w-4 mx-1 text-[#ea384c] fill-[#ea384c]" />
              <span className="text-purple-600 font-bold text-lg">SCIENCEGENTS</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/sciencegents"
              className={`text-gray-700 font-medium ${
                location.pathname === '/sciencegents'
                  ? 'text-purple-700'
                  : 'hover:text-purple-700'
              }`}
            >
              ScienceGents
            </Link>
            <Link
              to="/capabilities"
              className={`text-gray-700 font-medium ${
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
                className={`text-gray-700 font-medium ${
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
          <div className="flex items-center space-x-3">
            <Button 
              asChild
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
              size="sm"
            >
              <Link to="/create-sciencegent">
                Create ScienceGent
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
              size="sm"
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
