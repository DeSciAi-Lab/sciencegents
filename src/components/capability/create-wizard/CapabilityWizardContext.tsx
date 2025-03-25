
import React, { createContext, useContext, useState } from 'react';
import { uploadFileToStorage } from '@/services/capability/supabase';

interface CapabilityWizardContextProps {
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
  developerName: string;
  setDeveloperName: React.Dispatch<React.SetStateAction<string>>;
  developerEmail: string;
  setDeveloperEmail: React.Dispatch<React.SetStateAction<string>>;
  developerBio: string;
  setDeveloperBio: React.Dispatch<React.SetStateAction<string>>;
  socialLinks: Array<{ type: string; url: string }>;
  setSocialLinks: React.Dispatch<React.SetStateAction<Array<{ type: string; url: string }>>>;
  addSocialLink: (type: string, url: string) => void;
  removeSocialLink: (index: number) => void;
  documentation: File | null;
  setDocumentation: React.Dispatch<React.SetStateAction<File | null>>;
  integrationGuide: File | null;
  setIntegrationGuide: React.Dispatch<React.SetStateAction<File | null>>;
  additionalFiles: File[];
  setAdditionalFiles: React.Dispatch<React.SetStateAction<File[]>>;
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
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
  }>;
}

const CapabilityWizardContext = createContext<CapabilityWizardContextProps | undefined>(undefined);

export const CapabilityWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Basic Information
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [price, setPrice] = useState('0.1');
  const [features, setFeatures] = useState<string[]>([]);
  const [creatorAddress, setCreatorAddress] = useState('');
  
  // Developer Information
  const [developerName, setDeveloperName] = useState('');
  const [developerEmail, setDeveloperEmail] = useState('');
  const [developerBio, setDeveloperBio] = useState('');
  const [socialLinks, setSocialLinks] = useState<Array<{ type: string; url: string }>>([]);
  
  // Files
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const addFeature = (feature: string) => {
    setFeatures([...features, feature]);
  };
  
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  const addSocialLink = (type: string, url: string) => {
    setSocialLinks([...socialLinks, { type, url }]);
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
  
  const resetForm = () => {
    setName('');
    setId('');
    setDomain('');
    setDescription('');
    setDetailedDescription('');
    setPrice('0.1');
    setFeatures([]);
    setCreatorAddress('');
    setDeveloperName('');
    setDeveloperEmail('');
    setDeveloperBio('');
    setSocialLinks([]);
    setDocumentation(null);
    setIntegrationGuide(null);
    setAdditionalFiles([]);
    setCurrentStep(0);
    setIsSubmitting(false);
  };
  
  const handleFileUploads = async () => {
    const result: {
      documentationUrl?: string;
      integrationGuideUrl?: string;
      additionalFilesUrls: Array<{ name: string; url: string }>;
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
        developerName,
        setDeveloperName,
        developerEmail,
        setDeveloperEmail,
        developerBio,
        setDeveloperBio,
        socialLinks,
        setSocialLinks,
        addSocialLink,
        removeSocialLink,
        documentation,
        setDocumentation,
        integrationGuide,
        setIntegrationGuide,
        additionalFiles,
        setAdditionalFiles,
        addFile,
        removeFile,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        resetForm,
        isSubmitting,
        setIsSubmitting,
        handleFileUploads
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
