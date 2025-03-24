
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { checkIfWalletIsConnected } from '@/utils/walletUtils';
import { ethers } from 'ethers';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { refreshCapabilities } from '@/data/capabilities';
import { upsertCapabilityToSupabase } from '@/services/capability';

// Initial form data with social links arrays
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
  socialLinks: [] as {type: string, url: string}[],
  developerName: '',
  developerEmail: '',
  bio: '',
  developerTwitter: '',
  developerTelegram: '',
  developerGithub: '',
  developerWebsite: '',
  developerSocialLinks: [] as {type: string, url: string}[]
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
  additionalFiles: File[] | null;
  displayImage: File | null;
  profileImage: File | null;
  isSubmitting: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setDocumentation: React.Dispatch<React.SetStateAction<File | null>>;
  setIntegrationGuide: React.Dispatch<React.SetStateAction<File | null>>;
  setAdditionalFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  setDisplayImage: React.Dispatch<React.SetStateAction<File | null>>;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  nextStep: () => void;
  prevStep: () => void;
  submitCapability: () => Promise<void>;
  canProceed: boolean;
  addSocialLink: (type: 'socialLinks' | 'developerSocialLinks') => void;
  removeSocialLink: (type: 'socialLinks' | 'developerSocialLinks', index: number) => void;
  updateSocialLink: (type: 'socialLinks' | 'developerSocialLinks', index: number, field: string, value: string) => void;
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
}

const CapabilityWizardContext = createContext<CapabilityWizardContextType | undefined>(undefined);

export const CapabilityWizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[] | null>(null);
  const [displayImage, setDisplayImage] = useState<File | null>(null);
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

  const addSocialLink = (type: 'socialLinks' | 'developerSocialLinks') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { type: '', url: '' }]
    }));
  };

  const removeSocialLink = (type: 'socialLinks' | 'developerSocialLinks', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const updateSocialLink = (type: 'socialLinks' | 'developerSocialLinks', index: number, field: string, value: string) => {
    setFormData(prev => {
      const newLinks = [...prev[type]];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        [type]: newLinks
      };
    });
  };

  const addFile = (file: File) => {
    setAdditionalFiles(prev => {
      const currentFiles = prev || [];
      if (currentFiles.length >= 5) {
        toast({
          title: "Maximum files reached",
          description: "You can only upload up to 5 additional files.",
          variant: "destructive"
        });
        return currentFiles;
      }
      return [...currentFiles, file];
    });
  };

  const removeFile = (index: number) => {
    setAdditionalFiles(prev => {
      if (!prev) return null;
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles.length > 0 ? newFiles : null;
    });
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

      // Process uploaded files
      const fileUploads = [];
      if (documentation) {
        fileUploads.push(uploadFileToStorage(documentation, 'documentation', formData.id));
      }
      if (integrationGuide) {
        fileUploads.push(uploadFileToStorage(integrationGuide, 'guide', formData.id));
      }
      if (additionalFiles && additionalFiles.length > 0) {
        additionalFiles.forEach((file, index) => {
          fileUploads.push(uploadFileToStorage(file, `additional_${index}`, formData.id));
        });
      }
      if (displayImage) {
        fileUploads.push(uploadFileToStorage(displayImage, 'display_image', formData.id));
      }
      if (profileImage) {
        fileUploads.push(uploadFileToStorage(profileImage, 'profile_image', formData.id));
      }

      // Wait for all file uploads to complete
      const uploadResults = await Promise.allSettled(fileUploads);
      const fileUrls = uploadResults
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<{path: string, url: string}>).value);
      
      // Build storage links object for metadata
      const storageLinks: Record<string, string> = {};
      fileUrls.forEach(file => {
        if (file.path.includes('documentation')) storageLinks.documentation = file.url;
        if (file.path.includes('guide')) storageLinks.integrationGuide = file.url;
        if (file.path.includes('additional_')) storageLinks[`additional_${file.path.split('_').pop()}`] = file.url;
        if (file.path.includes('display_image')) storageLinks.displayImage = file.url;
        if (file.path.includes('profile_image')) storageLinks.profileImage = file.url;
      });
      
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
        features: [],
        display_image: storageLinks.displayImage,
        developer_profile_pic: storageLinks.profileImage,
        social_links: [
          ...(formData.twitter ? [{ type: 'twitter', url: formData.twitter }] : []),
          ...(formData.telegram ? [{ type: 'telegram', url: formData.telegram }] : []),
          ...(formData.github ? [{ type: 'github', url: formData.github }] : []),
          ...(formData.website ? [{ type: 'website', url: formData.website }] : []),
          ...formData.socialLinks
        ],
        developer_info: {
          name: formData.developerName,
          email: formData.developerEmail,
          bio: formData.bio,
          social_links: [
            ...(formData.developerTwitter ? [{ type: 'twitter', url: formData.developerTwitter }] : []),
            ...(formData.developerTelegram ? [{ type: 'telegram', url: formData.developerTelegram }] : []),
            ...(formData.developerGithub ? [{ type: 'github', url: formData.developerGithub }] : []),
            ...(formData.developerWebsite ? [{ type: 'website', url: formData.developerWebsite }] : []),
            ...formData.developerSocialLinks
          ]
        },
        files: {
          documentation: storageLinks.documentation,
          integrationGuide: storageLinks.integrationGuide,
          additionalFiles: Object.entries(storageLinks)
            .filter(([key]) => key.startsWith('additional_'))
            .map(([_, url]) => url)
        }
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

  // Helper function to upload files to storage
  const uploadFileToStorage = async (file: File, fileType: string, capabilityId: string): Promise<{path: string, url: string}> => {
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${capabilityId}_${fileType}_${Date.now()}.${fileExt}`;
      const filePath = `capability_files/${fileName}`;
      
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Mock upload - in a real app, would upload to storage service
      console.log(`Uploading file: ${filePath}`);
      
      // Return mock URL for now
      // In a real implementation, this would be the actual URL from your storage service
      return {
        path: filePath,
        url: `https://example.com/storage/${filePath}`
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  return (
    <CapabilityWizardContext.Provider value={{
      currentStep,
      formData,
      documentation,
      integrationGuide,
      additionalFiles,
      displayImage,
      profileImage,
      isSubmitting,
      handleInputChange,
      handleSelectChange,
      setDocumentation,
      setIntegrationGuide,
      setAdditionalFiles,
      setDisplayImage,
      setProfileImage,
      nextStep,
      prevStep,
      submitCapability,
      canProceed,
      addSocialLink,
      removeSocialLink,
      updateSocialLink,
      addFile,
      removeFile
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
