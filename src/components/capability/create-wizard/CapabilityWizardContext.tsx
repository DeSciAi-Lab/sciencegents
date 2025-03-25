
import React, { createContext, useContext, useState, useEffect } from 'react';
import { uploadFileToStorage } from '@/services/capability/supabase';
import { fetchDeveloperProfile } from '@/services/developerProfileService';
import { useWallet } from '@/hooks/useWallet';
import { DeveloperProfile } from '@/types/profile';

// Define the wizard steps (removed Personal Details step)
export const wizardSteps = [
  { id: 1, title: "Basic Information", description: "Enter basic details about your capability" },
  { id: 2, title: "Detailed Description", description: "Provide comprehensive description and features" },
  { id: 3, title: "Upload Documents", description: "Upload documentation and resources" },
  { id: 4, title: "Review", description: "Review and submit your capability" }
];

// Define the extended context props interface with all required properties
interface CapabilityWizardContextProps {
  // Basic information
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  domain: string;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  detailedDescription: string;
  setDetailedDescription: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  addFeature: (feature: string) => void;
  removeFeature: (index: number) => void;
  creatorAddress: string;
  setCreatorAddress: React.Dispatch<React.SetStateAction<string>>;
  
  // Social links
  socialLinks: Array<{ type: string; url: string }>;
  setSocialLinks: React.Dispatch<React.SetStateAction<Array<{ type: string; url: string }>>>;
  
  // Files
  documentation: File | null;
  setDocumentation: React.Dispatch<React.SetStateAction<File | null>>;
  integrationGuide: File | null;
  setIntegrationGuide: React.Dispatch<React.SetStateAction<File | null>>;
  additionalFiles: File[];
  setAdditionalFiles: React.Dispatch<React.SetStateAction<File[]>>;
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
  displayImage: File | null;
  setDisplayImage: React.Dispatch<React.SetStateAction<File | null>>;
  
  // Wizard state
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetForm: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileUploads: () => Promise<{
    documentationUrl?: string;
    integrationGuideUrl?: string;
    additionalFilesUrls: Array<{ name: string; url: string }>;
    displayImageUrl?: string;
  }>;
  
  // Developer profile from Supabase
  developerProfile: DeveloperProfile | null;
  isLoadingProfile: boolean;
  
  // Form compatibility props (to fix the component errors)
  formData: {
    name: string;
    id: string;
    domain: string;
    description: string;
    detailedDescription: string;
    fee: string;
    creatorAddress: string;
    displayImage?: File | null;
    features: string[];
    twitter: string;
    github: string;
    website: string;
    telegram: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  
  // Social link handlers
  updateSocialLink: (index: number, key: string, value: string) => void;
  addSocialLink: () => void;
  removeSocialLink: (index: number) => void;
  
  // Navigation and form submission
  nextStep: () => void;
  prevStep: () => void;
  canProceed: boolean;
  submitCapability: () => void;
}

const CapabilityWizardContext = createContext<CapabilityWizardContextProps | undefined>(undefined);

export const CapabilityWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useWallet();
  
  // Basic Information
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [price, setPrice] = useState('0.1');
  const [features, setFeatures] = useState<string[]>([]);
  const [creatorAddress, setCreatorAddress] = useState('');
  
  // Social Links (for capability)
  const [socialLinks, setSocialLinks] = useState<Array<{ type: string; url: string }>>([]);
  
  // UI Form compatibility
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  
  // Files
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Developer profile from Supabase
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  // Fetch developer profile when wallet address changes
  useEffect(() => {
    const loadDeveloperProfile = async () => {
      if (!address) return;
      
      setIsLoadingProfile(true);
      try {
        // Set creator address to connected wallet by default
        setCreatorAddress(address);
        
        const profile = await fetchDeveloperProfile(address);
        setDeveloperProfile(profile);
      } catch (error) {
        console.error("Error loading developer profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    
    loadDeveloperProfile();
  }, [address]);
  
  // Form data object (to fix component errors)
  const formData = {
    name,
    id,
    domain,
    description,
    detailedDescription,
    fee: price,
    creatorAddress,
    displayImage,
    features,
    twitter: '',
    github: '',
    website: '',
    telegram: ''
  };
  
  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update the appropriate state based on the input name
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'id':
        setId(value);
        break;
      case 'domain':
        setDomain(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'detailedDescription':
        setDetailedDescription(value);
        break;
      case 'fee':
        setPrice(value);
        break;
      case 'creatorAddress':
        setCreatorAddress(value);
        break;
      // Add more cases as needed
    }
  };
  
  const handleSelectChange = (field: string, value: string) => {
    // Update the appropriate state based on the field name
    switch (field) {
      case 'domain':
        setDomain(value);
        break;
      // Add more cases as needed
    }
  };
  
  // Helper for updating social link objects
  const updateSocialLink = (index: number, key: string, value: string) => {
    setSocialLinks(prev => {
      const newLinks = [...prev];
      newLinks[index] = { ...newLinks[index], [key]: value };
      return newLinks;
    });
  };
  
  const addFeature = (feature: string) => {
    setFeatures([...features, feature]);
  };
  
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { type: '', url: '' }]);
  };
  
  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };
  
  const addFile = (file: File) => {
    setAdditionalFiles([...additionalFiles, file]);
  };
  
  const removeFile = (index: number) => {
    setAdditionalFiles(additionalFiles.filter((_, i) => i !== index));
  };
  
  const goToNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };
  
  // Alias functions for component compatibility
  const nextStep = goToNextStep;
  const prevStep = goToPreviousStep;
  
  // Check if current step is valid to proceed
  const canProceed = true; // This would be implemented with validation logic
  
  // Form submission
  const submitCapability = () => {
    console.log('Submitting capability...');
    // Implement submission logic
  };
  
  const resetForm = () => {
    setName('');
    setId('');
    setDomain('');
    setDescription('');
    setDetailedDescription('');
    setPrice('0.1');
    setFeatures([]);
    setCreatorAddress('');
    setSocialLinks([]);
    setDocumentation(null);
    setIntegrationGuide(null);
    setAdditionalFiles([]);
    setCurrentStep(1);
    setIsSubmitting(false);
    setDisplayImage(null);
  };
  
  const handleFileUploads = async () => {
    const result: {
      documentationUrl?: string;
      integrationGuideUrl?: string;
      additionalFilesUrls: Array<{ name: string; url: string }>;
      displayImageUrl?: string;
    } = {
      additionalFilesUrls: []
    };
    
    try {
      // Create folder name using ID to group related files
      const folderName = `capability_${id}`;
      
      // Upload documentation if available
      if (documentation) {
        const docResult = await uploadFileToStorage(documentation, folderName);
        result.documentationUrl = docResult.url;
      }
      
      // Upload integration guide if available
      if (integrationGuide) {
        const guideResult = await uploadFileToStorage(integrationGuide, folderName);
        result.integrationGuideUrl = guideResult.url;
      }
      
      // Upload additional files if available
      if (additionalFiles.length > 0) {
        for (const file of additionalFiles) {
          const fileResult = await uploadFileToStorage(file, folderName);
          result.additionalFilesUrls.push({
            name: file.name,
            url: fileResult.url
          });
        }
      }
      
      // Upload display image if available
      if (displayImage) {
        const imageResult = await uploadFileToStorage(displayImage, folderName);
        result.displayImageUrl = imageResult.url;
      }
      
      return result;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };

  return (
    <CapabilityWizardContext.Provider
      value={{
        name,
        setName,
        id,
        setId,
        domain,
        setDomain,
        description,
        setDescription,
        detailedDescription,
        setDetailedDescription,
        price,
        setPrice,
        features,
        setFeatures,
        addFeature,
        removeFeature,
        creatorAddress,
        setCreatorAddress,
        socialLinks,
        setSocialLinks,
        documentation,
        setDocumentation,
        integrationGuide,
        setIntegrationGuide,
        additionalFiles,
        setAdditionalFiles,
        addFile,
        removeFile,
        displayImage,
        setDisplayImage,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        resetForm,
        isSubmitting,
        setIsSubmitting,
        handleFileUploads,
        // Developer profile from Supabase
        developerProfile,
        isLoadingProfile,
        // Additional properties for component compatibility
        formData,
        handleInputChange,
        handleSelectChange,
        updateSocialLink,
        addSocialLink,
        removeSocialLink,
        nextStep,
        prevStep,
        canProceed,
        submitCapability
      }}
    >
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
