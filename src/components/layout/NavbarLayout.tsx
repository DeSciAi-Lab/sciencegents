
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface NavbarLayoutProps {
  children: React.ReactNode;
}

export const NavbarLayout: React.FC<NavbarLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
