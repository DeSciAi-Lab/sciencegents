import { Capability } from "@/types/capability";

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

// Updated wizard steps with Detailed Description instead of Personal Info
export const wizardSteps = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Detailed Description' },
  { id: 3, title: 'Persona Customization' },
  { id: 4, title: 'Capability' },
  { id: 5, title: 'Liquidity' },
  { id: 6, title: 'Review' }
];

// Validate if the current step is filled correctly
export const validateStep = (currentStep: number, formData: any): boolean => {
  switch (currentStep) {
    case 1: // Basic Info
      return (
        formData.name.trim() !== '' &&
        formData.symbol.trim() !== '' &&
        formData.totalSupply.trim() !== '' &&
        parseFloat(formData.totalSupply) > 0 &&
        formData.description.trim() !== ''
      );
      
    case 2: // Detailed Description - Always valid
      return true;
      
    case 3: // Persona Customization - Always valid since it's optional
      return true;
      
    case 4: // Capability - Always valid since it's optional
      return true;
      
    case 5: // Liquidity
      return (
        formData.initialLiquidity.trim() !== '' &&
        parseFloat(formData.initialLiquidity) > 0
      );
      
    case 6: // Review - Always valid
      return true;
      
    default:
      return false;
  }
};

// Import function from the right location - make sure this exists
import { getAllCapabilities } from '@/data/capabilities';
