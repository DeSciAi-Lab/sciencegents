
import { Capability } from "@/types/sciencegent";

// Mock capabilities data
export const mockCapabilities: Capability[] = [
  { id: 'mol-viz', name: 'Molecule Visualization', domain: 'Chemistry', fee: 0.05 },
  { id: 'spec-analysis', name: 'Spectroscopy Analysis', domain: 'Chemistry', fee: 0.08 },
  { id: 'react-sim', name: 'Reaction Simulation', domain: 'Chemistry', fee: 0.07 },
  { id: 'dna-seq', name: 'DNA Sequencing', domain: 'Genomics', fee: 0.09 },
  { id: 'prot-fold', name: 'Protein Folding', domain: 'Protein Analysis', fee: 0.1 },
  { id: 'drug-dock', name: 'Drug Docking', domain: 'Drug Discovery', fee: 0.15 }
];

// Launch fee (1000 DSI tokens)
export const LAUNCH_FEE = 1000;

// Calculate total capability fees
export const calculateTotalCapabilityFees = (selectedCapabilities: string[]): number => {
  return selectedCapabilities.reduce((total, id) => {
    const capability = mockCapabilities.find(cap => cap.id === id);
    return total + (capability ? capability.fee : 0);
  }, 0);
};

export const stepInfo = [
  { title: 'Basic Information', description: 'Set name, symbol, and description' },
  { title: 'Persona Customization', description: 'Define AI behavior and personality' },
  { title: 'Capability Selection', description: 'Choose specialized capabilities' },
  { title: 'Liquidity Settings', description: 'Set initial token economics' },
  { title: 'Review & Launch', description: 'Verify details and launch' },
];

export const validateStep = (step: number, formData: any): boolean => {
  switch (step) {
    case 1: // Basic Information
      return Boolean(formData.name && formData.symbol && formData.totalSupply);
    case 2: // Persona Customization
      return formData.persona.length >= 10;
    case 3: // Capability Selection
      return formData.selectedCapabilities.length > 0;
    case 4: // Liquidity Settings
      return formData.initialLiquidity && !isNaN(parseFloat(formData.initialLiquidity));
    case 5: // Review & Launch
      return true;
    default:
      return false;
  }
};
