
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from 'lucide-react';

const NavItem = ({ 
  label, 
  href, 
  isActive = false,
  onClick 
}: { 
  label: string; 
  href: string; 
  isActive?: boolean;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(href);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
        isActive 
          ? 'text-science-800' 
          : 'text-muted-foreground hover:text-science-700'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-science-500 rounded-full" />
      )}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'ScienceGents', href: '/explore' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-soft bg-white/80 backdrop-blur-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-medium"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-science-400 to-science-600 text-white">
            <span className="text-lg font-bold">SG</span>
          </div>
          <span className="text-lg font-semibold text-foreground">ScienceGents</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))}
            />
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-science-700 hover:bg-science-50"
          >
            Docs
          </Button>
          <Button 
            variant="outline"
            className="border-science-300 text-science-700 hover:bg-science-50"
          >
            Connect Wallet
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-secondary"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in-up">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
                onClick={closeMobileMenu}
              />
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start">
                Docs
              </Button>
              <Button variant="outline" className="justify-start">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
