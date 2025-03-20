
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { useToast } from '@/components/ui/use-toast';
import { refreshCapabilities } from '@/data/capabilities';
import { checkIfWalletIsConnected } from '@/utils/walletUtils';
import { CapabilityFormValues } from '@/utils/formSchemas';

export const useCapabilityCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePreview = () => {
    setPreview(!preview);
  };

  const handleSubmit = async (values: CapabilityFormValues) => {
    console.log('Form values:', values);
    console.log('Documentation:', documentation);
    console.log('Integration Guide:', integrationGuide);
    
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

      const feeInWei = ethers.utils.parseEther(values.fee);
      
      toast({
        title: "Registering Capability",
        description: "Please confirm the transaction in MetaMask...",
      });

      const tx = await factoryContract.registerGlobalCapability(
        values.id,
        values.description,
        feeInWei,
        values.creatorAddress
      );

      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation...",
      });
      
      await tx.wait();
      
      await refreshCapabilities();
      
      toast({
        title: "Capability Registered Successfully!",
        description: "Your capability has been added to the platform.",
        variant: "default",
      });

      navigate(`/capability/${values.id}`);
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

  return {
    documentation,
    setDocumentation,
    integrationGuide,
    setIntegrationGuide,
    preview,
    isSubmitting,
    togglePreview,
    handleSubmit
  };
};
