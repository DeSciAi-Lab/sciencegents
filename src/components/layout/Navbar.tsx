
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import WalletConnect from '@/components/WalletConnect';

interface NavLink {
  href: string;
  label: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsOpen(false);
  }, [location]);

  // Check for connected wallet
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setConnectedWallet(accounts[0] || null);

          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setConnectedWallet(accounts[0] || null);
          });
        } catch (error) {
          console.error('Error checking wallet:', error);
        }
      }
    };

    checkWallet();

    return () => {
      // Clean up listener
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'ScienceGents' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  // Admin wallet address from config
  const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83'.toLowerCase();
  
  // Check if current wallet is admin
  const isAdmin = connectedWallet && connectedWallet.toLowerCase() === ADMIN_WALLET_ADDRESS;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-science-400 to-science-600 flex items-center justify-center text-white font-bold">
              SG
            </div>
            <span className="font-semibold">ScienceGents</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'text-science-700 bg-science-50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Link - Only show if connected wallet is admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === '/admin'
                    ? 'text-science-700 bg-science-50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <WalletConnect />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="container mx-auto px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2.5 rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'text-science-700 bg-science-50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Link for Mobile - Only show if connected wallet is admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2.5 rounded-md transition-colors ${
                  location.pathname === '/admin'
                    ? 'text-science-700 bg-science-50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
