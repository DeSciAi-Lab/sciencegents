import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScienceGentFormData } from '@/types/sciencegent';
import { validateStep, wizardSteps } from '@/components/create-sciencegent/utils';
import useScienceGentCreation, { CreationStatus } from '@/hooks/useScienceGentCreation';
import { checkDSIAllowance } from '@/services/scienceGentService';

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
  telegram: '',
  domain: 'General Science',
  agentFee: '2',
  persona: '',
  selectedCapabilities: [],
  initialLiquidity: '',
  // New developer information fields
  developerName: '',
  developerEmail: '',
  bio: '',
  developerTwitter: '',
  developerTelegram: '',
  developerGithub: '',
  developerWebsite: ''
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
  isDSIApproved: boolean;
  isCheckingAllowance: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCapabilityToggle: (capabilityId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleApproveAndLaunch: () => Promise<void>;
  canProceed: boolean;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState<ScienceGentFormData>(initialFormData);
  const [isDSIApproved, setIsDSIApproved] = useState(false);
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  
  const {
    status,
    error,
    transactionHash,
    tokenAddress,
    isSyncing,
    createToken,
    launchFee,
    approveDSI
  } = useScienceGentCreation();

  // Calculate if user can proceed to next step
  const canProceed = validateStep(currentStep, formData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Check DSI allowance when reaching review step
  useEffect(() => {
    const checkAllowance = async () => {
      if (currentStep === wizardSteps.length) {
        setIsCheckingAllowance(true);
        try {
          const hasAllowance = await checkDSIAllowance(launchFee);
          setIsDSIApproved(hasAllowance);
        } catch (error) {
          console.error("Error checking DSI allowance:", error);
          setIsDSIApproved(false);
        } finally {
          setIsCheckingAllowance(false);
        }
      }
    };
    
    checkAllowance();
  }, [currentStep, launchFee]);

  // Move to success screen when creation starts
  useEffect(() => {
    if (status === CreationStatus.Creating || 
        status === CreationStatus.WaitingConfirmation || 
        status === CreationStatus.Success) {
      setCurrentStep(wizardSteps.length);
    }
    
    // Reset launching state when status changes
    if (status !== CreationStatus.Idle) {
      setIsLaunching(false);
    }
    
    // If DSI is approved, update state
    if (status === CreationStatus.ApprovingDSI) {
      setIsDSIApproved(false);
    } else if (status === CreationStatus.CheckingAllowance) {
      // Keep current state
    } else if (status === CreationStatus.Creating || 
               status === CreationStatus.WaitingConfirmation || 
               status === CreationStatus.Success) {
      setIsDSIApproved(true);
    }
  }, [status]);

  // Navigate to details page when token is successfully synced
  useEffect(() => {
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (currentStep < wizardSteps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleApproveAndLaunch = async () => {
    // Prevent multiple calls
    if (isLaunching || status !== CreationStatus.Idle) {
      console.log("Already processing, preventing duplicate call");
      return;
    }
    
    setIsLaunching(true);
    
    // First check if DSI is approved
    if (!isDSIApproved) {
      try {
        await approveDSI();
        setIsDSIApproved(true);
        setIsLaunching(false); // Done with approval, now user can launch
      } catch (error) {
        setIsLaunching(false);
        console.error("Failed to approve DSI:", error);
      }
    } else {
      // DSI is already approved, proceed with token creation
      await createToken(formData);
    }
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
      isDSIApproved,
      isCheckingAllowance,
      handleInputChange,
      handleFileChange,
      handleSelectChange,
      handleCapabilityToggle,
      nextStep,
      prevStep,
      handleApproveAndLaunch,
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
