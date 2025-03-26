
import React from 'react';
import NavHeader from './NavHeader';
import Footer from './Footer';

interface NavbarLayoutProps {
  children: React.ReactNode;
}

export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <NavHeader />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default NavbarLayout;
