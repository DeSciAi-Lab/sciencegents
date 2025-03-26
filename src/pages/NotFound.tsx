
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import NavbarLayout from '@/components/layout/NavbarLayout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <NavbarLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <Link to="/" className="text-purple-500 hover:text-purple-700 underline">
            Return to Home
          </Link>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default NotFound;
