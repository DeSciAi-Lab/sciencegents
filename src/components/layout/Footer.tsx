
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container flex flex-col items-center justify-center py-8 md:flex-row md:justify-between">
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ScienceGents. All rights reserved.
          </span>
        </div>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
