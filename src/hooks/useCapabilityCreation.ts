
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { useToast } from '@/components/ui/use-toast';
import { refreshCapabilities } from '@/data/capabilities';
import { checkIfWalletIsConnected } from '@/utils/walletUtils';
import { CapabilityFormValues } from '@/utils/formSchemas';
import { upsertCapabilityToSupabase } from '@/services/capability';
import { useWallet } from '@/hooks/useWallet';

export const useCapabilityCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { connect, isConnected } = useWallet();
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
        await connect();
        if (!isConnected) {
          setIsSubmitting(false);
          return;
        }
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
      
      // Create a capability object to add to Supabase
      const capabilityObj = {
        id: values.id,
        name: values.name || values.id,
        domain: values.domain,
        description: values.description,
        price: parseFloat(values.fee),
        creator: values.creatorAddress,
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
