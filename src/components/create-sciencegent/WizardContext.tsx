
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScienceGentFormData } from '@/types/sciencegent';
import { validateStep } from '@/components/create-sciencegent/utils';
import useScienceGentCreation, { CreationStatus } from '@/hooks/useScienceGentCreation';

// Initial form data
const initialFormData: ScienceGentFormData = {
  name: '',
  symbol: '',
  totalSupply: '',
  description: '',
  profileImage: null,
  website: '',
  twitter: '',
  github: '',
  persona: '',
  selectedCapabilities: [],
  initialLiquidity: ''
};

interface WizardContextType {
  currentStep: number;
  formData: ScienceGentFormData;
  isLaunching: boolean;
  status: CreationStatus;
  error: string | null;
  transactionHash: string | null;
  tokenAddress: string | null;
  isSyncing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCapabilityToggle: (capabilityId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleLaunch: () => void;
  canProceed: boolean;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState<ScienceGentFormData>(initialFormData);
  
  const {
    status,
    error,
    transactionHash,
    tokenAddress,
    isSyncing,
    createToken
  } = useScienceGentCreation();

  // Calculate if user can proceed to next step
  const canProceed = validateStep(currentStep, formData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    // If we've successfully created a token, move to the success step
    if (status === CreationStatus.Creating || 
        status === CreationStatus.WaitingConfirmation || 
        status === CreationStatus.Success) {
      setCurrentStep(6);
    }
    
    // Reset launching state when status changes
    if (status !== CreationStatus.Idle) {
      setIsLaunching(false);
    }
  }, [status]);

  useEffect(() => {
    // Navigate to details page when token is successfully synced
    if (status === CreationStatus.Success && tokenAddress && !isSyncing) {
      // Small delay to show success state before redirecting
      const redirectTimer = setTimeout(() => {
        navigate(`/sciencegent/${tokenAddress}`);
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [status, tokenAddress, isSyncing, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, profileImage: e.target.files?.[0] || null }));
    }
  };

  const handleCapabilityToggle = (capabilityId: string) => {
    setFormData(prev => {
      if (prev.selectedCapabilities.includes(capabilityId)) {
        return {
          ...prev,
          selectedCapabilities: prev.selectedCapabilities.filter(id => id !== capabilityId)
        };
      } else {
        return {
          ...prev,
          selectedCapabilities: [...prev.selectedCapabilities, capabilityId]
        };
      }
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleLaunch = async () => {
    // Prevent multiple launches
    if (isLaunching || status !== CreationStatus.Idle) {
      console.log("Already launching, preventing duplicate call");
      return;
    }
    
    setIsLaunching(true);
    await createToken(formData);
  };

  return (
    <WizardContext.Provider value={{
      currentStep,
      formData,
      isLaunching,
      status,
      error,
      transactionHash,
      tokenAddress,
      isSyncing,
      handleInputChange,
      handleFileChange,
      handleCapabilityToggle,
      nextStep,
      prevStep,
      handleLaunch,
      canProceed
    }}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
