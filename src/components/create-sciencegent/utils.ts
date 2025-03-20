
import { Capability } from "@/types/capability";
import { getAllCapabilities } from "@/data/capabilities";

// Launch fee (1000 DSI tokens)
export const LAUNCH_FEE = 1000;

// Calculate total capability fees
export const calculateTotalCapabilityFees = async (selectedCapabilities: string[]): Promise<number> => {
  try {
    const capabilities = await getAllCapabilities();
    return selectedCapabilities.reduce((total, id) => {
      const capability = capabilities.find(cap => cap.id === id);
      return total + (capability ? capability.price : 0);
    }, 0);
  } catch (error) {
    console.error("Error calculating total capability fees:", error);
    return 0;
  }
};

// Synchronous version for components that can't use async directly
export const calculateTotalCapabilityFeesSynchronous = (selectedCapabilities: string[], availableCapabilities: Capability[]): number => {
  return selectedCapabilities.reduce((total, id) => {
    const capability = availableCapabilities.find(cap => cap.id === id);
    return total + (capability ? capability.price : 0);
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
