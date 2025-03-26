
import React from 'react';

export const QuantumIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="8" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <path d="M12 12 a3 3 0 0 0 3 3" />
    <path d="M12 12 a3 3 0 0 1 -3 -3" />
  </svg>
);

export const ChemistryIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 3h6v2H9z" />
    <path d="M9 5v3c0 4.5-1.5 7.5-3 9.5 0 0 7 1 11-3 2-2 3-5.5 3-6.5V5H9Z" />
    <path d="M3 14c3 2 5 2.5 9 2.5" />
    <path d="M9 11.5c1.5 1 3.5 1 5 0" />
  </svg>
);

export const GenomicsIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
    <path d="M16 12a6 6 0 0 0-12 0" />
    <path d="M12 22c4 0 8-4 8-10S16 2 12 2 4 6 4 12s4 10 8 10Z" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export const AIAgentIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M8 14a6 6 0 0 0-6 6 1 1 0 0 0 1 1h18a1 1 0 0 0 1-1 6 6 0 0 0-6-6" />
    <path d="M18 12a5 5 0 0 0-5-5" />
    <path d="M18 14a6 6 0 0 1 4 2.5" />
  </svg>
);
