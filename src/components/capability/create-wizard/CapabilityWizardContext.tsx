
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CapabilitySocialLink } from '@/types/capability';
import { v4 as uuidv4 } from 'uuid';
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { useWallet } from '@/hooks/useWallet';
import { uploadFileToStorage } from '@/services/capability/supabase';

// Define wizard steps
export const wizardSteps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Detailed Description' },
  { id: 3, title: 'Upload Documents' },
  { id: 4, title: 'Review & Launch' }
];

// Define context type
export interface CapabilityWizardContextProps {
  currentStep: number;
  name: string;
  id: string;
  domain: string;
  description: string;
  detailedDescription: string;
  price: string;
  creatorAddress: string;
  displayImage: File | null;
  socialLinks: CapabilitySocialLink[];
  documentation: File | null;
  integrationGuide: File | null;
  additionalFiles: File[];
  features: string[];
  isSubmitting: boolean;
  canProceed: boolean;
  developerProfile: any;
  isLoadingProfile: boolean;
  
  // Methods
  setName: (name: string) => void;
  setId: (id: string) => void;
  setDomain: (domain: string) => void;
  setDescription: (description: string) => void;
  setDetailedDescription: (description: string) => void;
  setPrice: (price: string) => void;
  setCreatorAddress: (address: string) => void;
  setDisplayImage: (file: File | null) => void;
  addSocialLink: (type: string, url: string) => void;
  updateSocialLink: (index: number, type: string, url: string) => void;
  removeSocialLink: (index: number) => void;
  setDocumentation: (file: File | null) => void;
  setIntegrationGuide: (file: File | null) => void;
  addFile: (file: File) => void; // Fixed method name
  removeFile: (index: number) => void; // Fixed method name
  addFeature: (feature: string) => void;
  removeFeature: (index: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  
  // Navigation
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetForm: () => void;
  
  // File handling
  handleFileUploads: () => Promise<{
    displayImageUrl: string | null;
    documentationUrl: string | null;
    integrationGuideUrl: string | null;
    additionalFilesUrls: Array<{name: string, url: string}>;
  }>;
}

// Create context
const CapabilityWizardContext = createContext<CapabilityWizardContextProps | undefined>(undefined);

// Default social links
const defaultSocialLinks: CapabilitySocialLink[] = [
  { type: 'twitter', url: '' },
  { type: 'github', url: '' },
  { type: 'website', url: '' },
  { type: 'telegram', url: '' }
];

// Provider component
export const CapabilityWizardProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Basic information
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  const [socialLinks, setSocialLinks] = useState<CapabilitySocialLink[]>(defaultSocialLinks);
  
  // Detailed description
  const [detailedDescription, setDetailedDescription] = useState('');
  
  // Files
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  
  // Features
  const [features, setFeatures] = useState<string[]>([]);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get wallet address for creator
  const { address } = useWallet();
  const [creatorAddress, setCreatorAddress] = useState('');

  // Fetch developer profile
  const { profile: developerProfile, isLoading: isLoadingProfile } = useDeveloperProfile(address || '');
  
  // Set creator address when wallet connected
  useEffect(() => {
    if (address && !creatorAddress) {
      setCreatorAddress(address);
    }
  }, [address, creatorAddress]);
  
  // Navigation methods
  const goToNextStep = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Social links methods
  const addSocialLink = (type: string, url: string) => {
    setSocialLinks(prev => [...prev, { type, url }]);
  };
  
  const updateSocialLink = (index: number, type: string, url: string) => {
    setSocialLinks(prev => {
      const newLinks = [...prev];
      newLinks[index] = { type, url };
      return newLinks;
    });
  };
  
  const removeSocialLink = (index: number) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index));
  };
  
  // Additional files methods - renamed for consistency
  const addFile = (file: File) => {
    setAdditionalFiles(prev => [...prev, file]);
  };
  
  const removeFile = (index: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Features methods
  const addFeature = (feature: string) => {
    setFeatures(prev => [...prev, feature]);
  };
  
  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };
  
  // Reset form
  const resetForm = () => {
    setCurrentStep(1);
    setName('');
    setId('');
    setDomain('');
    setDescription('');
    setDetailedDescription('');
    setPrice('');
    setDisplayImage(null);
    setSocialLinks(defaultSocialLinks);
    setDocumentation(null);
    setIntegrationGuide(null);
    setAdditionalFiles([]);
    setFeatures([]);
    setIsSubmitting(false);
  };
  
  // Handle file uploads
  const handleFileUploads = async () => {
    const capabilityFolder = `capability_${id}_${uuidv4().substring(0, 8)}`;
    
    // Upload display image
    let displayImageUrl = null;
    if (displayImage) {
      try {
        const result = await uploadFileToStorage(displayImage, capabilityFolder);
        displayImageUrl = result.url;
      } catch (error) {
        console.error('Error uploading display image:', error);
      }
    }
    
    // Upload documentation
    let documentationUrl = null;
    if (documentation) {
      try {
        const result = await uploadFileToStorage(documentation, capabilityFolder);
        documentationUrl = result.url;
      } catch (error) {
        console.error('Error uploading documentation:', error);
      }
    }
    
    // Upload integration guide
    let integrationGuideUrl = null;
    if (integrationGuide) {
      try {
        const result = await uploadFileToStorage(integrationGuide, capabilityFolder);
        integrationGuideUrl = result.url;
      } catch (error) {
        console.error('Error uploading integration guide:', error);
      }
    }
    
    // Upload additional files
    const additionalFilesUrls: Array<{name: string, url: string}> = [];
    for (const file of additionalFiles) {
      try {
        const result = await uploadFileToStorage(file, capabilityFolder);
        additionalFilesUrls.push({ name: file.name, url: result.url });
      } catch (error) {
        console.error(`Error uploading additional file ${file.name}:`, error);
      }
    }
    
    return {
      displayImageUrl,
      documentationUrl,
      integrationGuideUrl,
      additionalFilesUrls
    };
  };
  
  // Calculate if can proceed to next step
  const calculateCanProceed = () => {
    if (currentStep === 1) {
      // Basic Info validation
      return (
        name.trim() !== '' && 
        id.trim() !== '' && 
        domain !== '' && 
        description.trim() !== '' &&
        price.trim() !== '' && 
        parseFloat(price) > 0 &&
        creatorAddress.trim() !== ''
      );
    } else if (currentStep === 2) {
      // Detailed Description - always can proceed
      return true;
    } else if (currentStep === 3) {
      // Upload Documents - always can proceed
      return true;
    } else if (currentStep === 4) {
      // Review - always can proceed
      return true;
    }
    
    return false;
  };
  
  const canProceed = calculateCanProceed();
  
  // Context value
  const value: CapabilityWizardContextProps = {
    currentStep,
    name,
    id,
    domain,
    description,
    detailedDescription,
    price,
    creatorAddress,
    displayImage,
    socialLinks,
    documentation,
    integrationGuide,
    additionalFiles,
    features,
    isSubmitting,
    canProceed,
    developerProfile,
    isLoadingProfile,
    
    setName,
    setId,
    setDomain,
    setDescription,
    setDetailedDescription,
    setPrice,
    setCreatorAddress,
    setDisplayImage,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    setDocumentation,
    setIntegrationGuide,
    addFile, // Updated method name
    removeFile, // Updated method name
    addFeature,
    removeFeature,
    setIsSubmitting,
    
    goToNextStep,
    goToPreviousStep,
    resetForm,
    
    handleFileUploads
  };
  
  return (
    <CapabilityWizardContext.Provider value={value}>
      {children}
    </CapabilityWizardContext.Provider>
  );
};

// Hook for using the context
export const useCapabilityWizard = () => {
  const context = useContext(CapabilityWizardContext);
  if (context === undefined) {
    throw new Error('useCapabilityWizard must be used within a CapabilityWizardProvider');
  }
  return context;
};
