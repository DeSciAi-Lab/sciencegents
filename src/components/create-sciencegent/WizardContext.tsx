import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScienceGentFormData } from '@/types/sciencegent';
import { validateStep, wizardSteps } from '@/components/create-sciencegent/utils';
import useScienceGentCreation, { CreationStatus } from '@/hooks/useScienceGentCreation';
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { fetchTokenStats } from '@/services/scienceGent';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { toast } from '@/components/ui/use-toast';
import { useWallet } from '@/hooks/useWallet';

// Keys for localStorage
const FORM_DATA_KEY = 'sciencegent_wizard_form_data';
const CURRENT_STEP_KEY = 'sciencegent_wizard_current_step';

// Initial form data
const initialFormData: ScienceGentFormData = {
  name: '',
  symbol: '',
  totalSupply: '',
  description: '',
  detailedDescription: '',
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
  applyForCuration: false
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
  developerProfile: any;
  isLoadingProfile: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCapabilityToggle: (capabilityId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleApproveAndLaunch: () => Promise<void>;
  resetWizard: () => void;
  canProceed: boolean;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const { ethPrice } = useEthPriceContext();
  const [isUpdatingTokenStats, setIsUpdatingTokenStats] = useState(false);
  const { isConnected } = useWallet(); // Get wallet connection status
  
  // Get saved form data and current step from localStorage
  const getSavedFormData = (): ScienceGentFormData => {
    const savedFormData = localStorage.getItem(FORM_DATA_KEY);
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        // File objects can't be stored in localStorage, so profileImage will be null
        return { ...parsedData, profileImage: null };
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    return initialFormData;
  };

  const getSavedCurrentStep = (): number => {
    const savedStep = localStorage.getItem(CURRENT_STEP_KEY);
    if (savedStep) {
      try {
        return parseInt(savedStep, 10);
      } catch (error) {
        console.error('Error parsing saved step:', error);
      }
    }
    return 1;
  };
  
  const [currentStep, setCurrentStep] = useState(1); // Default to 1, will be updated in useEffect
  const [isLaunching, setIsLaunching] = useState(false);
  const [formData, setFormData] = useState<ScienceGentFormData>(initialFormData);
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  
  // Get developer profile for review step
  const { profile: developerProfile, isLoading: isLoadingProfile } = useDeveloperProfile();
  
  const {
    status,
    error,
    transactionHash,
    tokenAddress,
    isSyncing,
    createToken,
    launchFee,
    approveDSI,
    isDSIApproved,
    resetCreation
  } = useScienceGentCreation();

  // Load saved data on component mount
  useEffect(() => {
    if (!isInitialized) {
      const savedFormData = getSavedFormData();
      const savedStep = getSavedCurrentStep();
      
      setFormData(savedFormData);
      setCurrentStep(savedStep);
      setIsInitialized(true);
    }
  }, [isInitialized]);
  
  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      const dataToSave = { ...formData };
      // Remove file object before saving to localStorage
      delete dataToSave.profileImage;
      
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(dataToSave));
    }
  }, [formData, isInitialized]);
  
  // Save current step to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CURRENT_STEP_KEY, currentStep.toString());
    }
  }, [currentStep, isInitialized]);

  // Calculate if user can proceed to next step
  const canProceed = validateStep(currentStep, formData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Move to success screen when creation is successful
  useEffect(() => {
    if (status === CreationStatus.Success) {
      setCurrentStep(wizardSteps.length + 1); // Move to success screen
      
      // If successful, clear the saved data
      if (tokenAddress && !isSyncing) {
        localStorage.removeItem(FORM_DATA_KEY);
        localStorage.removeItem(CURRENT_STEP_KEY);
      }
    }
    
    // Reset launching state when not in progress
    if (status !== CreationStatus.Creating && 
        status !== CreationStatus.ApprovingDSI && 
        status !== CreationStatus.WaitingConfirmation) {
      setIsLaunching(false);
    }
  }, [status, tokenAddress, isSyncing]);

  // Navigate to details page when token is successfully synced
  useEffect(() => {
    if (status === CreationStatus.Success && tokenAddress && !isSyncing) {
      // Update token statistics before redirecting
      setIsUpdatingTokenStats(true);
      
      const updateTokenStats = async () => {
        try {
          // Use our reusable token stats service to update token data
          console.log("Updating token statistics using reusable service:", tokenAddress);
          const result = await fetchTokenStats(tokenAddress, ethPrice);
          
          if (result.success) {
            toast({
              title: "Token Statistics Updated",
              description: `Updated ${result.data.name} (${result.data.symbol}) statistics from blockchain`
            });
          } else {
            console.error("Failed to update token statistics:", result.error);
          }
        } catch (error) {
          console.error("Error updating token statistics:", error);
        } finally {
          setIsUpdatingTokenStats(false);
          
          // Now redirect to details page
          navigate(`/sciencegent/${tokenAddress}`);
        }
      };
      
      updateTokenStats();
    }
  }, [status, tokenAddress, isSyncing, navigate, ethPrice]);

  // Reset wizard state when wallet disconnects
  useEffect(() => {
    if (!isConnected && (
      status === CreationStatus.WaitingConfirmation || 
      status === CreationStatus.Creating ||
      status === CreationStatus.ApprovingDSI
    )) {
      console.log("Wallet disconnected while in creation process, resetting wizard...");
      resetWizard();
      toast({
        title: "Process Interrupted",
        description: "Your wallet has been disconnected. Please reconnect to continue.",
        variant: "destructive"
      });
    }
  }, [isConnected, status]);

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
  
  const resetWizard = () => {
    // Reset form data
    setFormData(initialFormData);
    // Reset to first step
    setCurrentStep(1);
    // Clear localStorage
    localStorage.removeItem(FORM_DATA_KEY);
    localStorage.removeItem(CURRENT_STEP_KEY);
    // Reset creation state
    resetCreation();
    setIsLaunching(false);
    setIsUpdatingTokenStats(false);
  };

  const handleApproveAndLaunch = async () => {
    // Prevent multiple calls
    if (isLaunching) {
      console.log("Already processing, preventing duplicate call");
      return;
    }
    
    setIsLaunching(true);
    
    // First check if DSI is approved
    if (!isDSIApproved) {
      try {
        const approved = await approveDSI();
        if (!approved) {
          setIsLaunching(false);
        }
      } catch (error) {
        setIsLaunching(false);
        console.error("Failed to approve DSI:", error);
      }
    } else {
      // DSI is already approved, proceed with token creation
      try {
        // Merge developer profile data with form data if available
        const tokenData = {
          ...formData,
          // These fields are not included in the form anymore, but populated from developer profile
          developerName: developerProfile?.developer_name || '',
          developerEmail: '',
          bio: developerProfile?.bio || '',
          developerTwitter: developerProfile?.developer_twitter || '',
          developerTelegram: developerProfile?.developer_telegram || '',
          developerGithub: developerProfile?.developer_github || '',
          developerWebsite: developerProfile?.developer_website || ''
        };

        await createToken(tokenData);
      } catch (error) {
        setIsLaunching(false);
        console.error("Failed to create token:", error);
      }
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
      isSyncing: isSyncing || isUpdatingTokenStats, // Include token stats updating in loading state
      isDSIApproved,
      isCheckingAllowance,
      developerProfile,
      isLoadingProfile,
      handleInputChange,
      handleFileChange,
      handleSelectChange,
      handleCapabilityToggle,
      nextStep,
      prevStep,
      handleApproveAndLaunch,
      resetWizard,
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
