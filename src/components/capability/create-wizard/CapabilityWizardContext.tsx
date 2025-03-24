
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { CapabilityFormValues } from '@/utils/formSchemas';
import { checkIfWalletIsConnected } from '@/utils/walletUtils';
import { ethers } from 'ethers';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { refreshCapabilities } from '@/data/capabilities';
import { upsertCapabilityToSupabase } from '@/services/capability';

// Initial form data
const initialFormData = {
  name: '',
  id: '',
  domain: 'Chemistry',
  description: '',
  fee: '',
  creatorAddress: '',
  twitter: '',
  telegram: '',
  github: '',
  website: '',
  developerName: '',
  developerEmail: '',
  bio: '',
  developerTwitter: '',
  developerTelegram: '',
  developerGithub: '',
  developerWebsite: ''
};

export const wizardSteps = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Upload Documents' },
  { id: 3, title: 'Personal Details (optional)' },
  { id: 4, title: 'Review' }
];

interface CapabilityWizardContextType {
  currentStep: number;
  formData: typeof initialFormData;
  documentation: File | null;
  integrationGuide: File | null;
  additionalFiles: File | null;
  profileImage: File | null;
  isSubmitting: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setDocumentation: React.Dispatch<React.SetStateAction<File | null>>;
  setIntegrationGuide: React.Dispatch<React.SetStateAction<File | null>>;
  setAdditionalFiles: React.Dispatch<React.SetStateAction<File | null>>;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  nextStep: () => void;
  prevStep: () => void;
  submitCapability: () => Promise<void>;
  canProceed: boolean;
}

const CapabilityWizardContext = createContext<CapabilityWizardContextType | undefined>(undefined);

export const CapabilityWizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill in creator address when wallet connects
  useEffect(() => {
    const setWalletAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setFormData(prev => ({ ...prev, creatorAddress: accounts[0] }));
          }
        } catch (error) {
          console.error('Error getting wallet address:', error);
        }
      }
    };

    setWalletAddress();
  }, []);

  // Calculate if user can proceed to next step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Basic Information
        return Boolean(
          formData.name && 
          formData.id && 
          formData.domain && 
          formData.description && 
          formData.fee && 
          !isNaN(parseFloat(formData.fee)) && 
          parseFloat(formData.fee) > 0 &&
          formData.creatorAddress
        );
      case 2: // Upload Documents
        return true; // Documents are optional
      case 3: // Personal Details
        return true; // Personal details are optional
      case 4: // Review 
        return true;
      default:
        return false;
    }
  };

  const canProceed = validateStep(currentStep);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const submitCapability = async () => {
    try {
      setIsSubmitting(true);
      
      const walletConnected = await checkIfWalletIsConnected();
      if (!walletConnected) {
        setIsSubmitting(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const factoryContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsFactory,
        factoryABI,
        signer
      );

      const feeInWei = ethers.utils.parseEther(formData.fee);
      
      toast({
        title: "Registering Capability",
        description: "Please confirm the transaction in MetaMask...",
      });

      const tx = await factoryContract.registerGlobalCapability(
        formData.id,
        formData.description,
        feeInWei,
        formData.creatorAddress
      );

      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation...",
      });
      
      await tx.wait();
      
      // Create a capability object to add to Supabase
      const capabilityObj = {
        id: formData.id,
        name: formData.name,
        domain: formData.domain,
        description: formData.description,
        price: parseFloat(formData.fee),
        creator: formData.creatorAddress,
        createdAt: new Date().toISOString(),
        stats: {
          usageCount: 0,
          rating: 0,
          revenue: 0
        },
        features: []
      };
      
      // Add to Supabase directly to avoid waiting for sync
      try {
        await upsertCapabilityToSupabase(capabilityObj, true);
        console.log("Capability added to Supabase");
      } catch (error) {
        console.error("Error adding capability to Supabase:", error);
      }
      
      // Refresh capabilities data
      await refreshCapabilities();
      
      toast({
        title: "Capability Registered Successfully!",
        description: "Your capability has been added to the platform.",
        variant: "default",
      });

      navigate(`/capability/${formData.id}`);
    } catch (error) {
      console.error('Error registering capability:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register capability. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CapabilityWizardContext.Provider value={{
      currentStep,
      formData,
      documentation,
      integrationGuide,
      additionalFiles,
      profileImage,
      isSubmitting,
      handleInputChange,
      handleSelectChange,
      setDocumentation,
      setIntegrationGuide,
      setAdditionalFiles,
      setProfileImage,
      nextStep,
      prevStep,
      submitCapability,
      canProceed
    }}>
      {children}
    </CapabilityWizardContext.Provider>
  );
};

export const useCapabilityWizard = () => {
  const context = useContext(CapabilityWizardContext);
  if (context === undefined) {
    throw new Error('useCapabilityWizard must be used within a CapabilityWizardProvider');
  }
  return context;
};
