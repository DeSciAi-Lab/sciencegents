import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Beaker, FileText, DollarSign, Info, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { ethers } from 'ethers';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { useToast } from '@/components/ui/use-toast';
import { refreshCapabilities } from '@/data/capabilities';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.').max(50, 'Name must be less than 50 characters.'),
  id: z.string().min(3, 'ID must be at least 3 characters.').max(30, 'ID must be less than 30 characters.').regex(/^[a-z0-9-]+$/, 'ID must contain only lowercase letters, numbers, and hyphens.'),
  domain: z.string().min(1, 'Domain is required.'),
  description: z.string().min(20, 'Description must be at least 20 characters.').max(500, 'Description must be less than 500 characters.'),
  fee: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Fee must be a positive number.',
  }),
  creatorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address.'),
});

const CreateCapability = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documentation, setDocumentation] = useState<File | null>(null);
  const [integrationGuide, setIntegrationGuide] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      id: '',
      domain: '',
      description: '',
      fee: '',
      creatorAddress: '',
    },
  });

  const domains = [
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Biochemistry', label: 'Biochemistry' },
    { value: 'Materials Science', label: 'Materials Science' },
    { value: 'Protein Analysis', label: 'Protein Analysis' },
    { value: 'Drug Discovery', label: 'Drug Discovery' },
    { value: 'Genomics', label: 'Genomics' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Installed",
        description: "Please install MetaMask to register a capability.",
        variant: "destructive"
      });
      return false;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length === 0) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your wallet to register a capability.",
          variant: "destructive"
        });
        return false;
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== contractConfig.network.chainId) {
        toast({
          title: "Wrong Network",
          description: "Please switch to the Sepolia Test Network.",
          variant: "destructive"
        });
        
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: contractConfig.network.chainId }],
          });
        } catch (error) {
          console.error('Failed to switch network:', error);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-8">
              <button 
                onClick={() => navigate('/capabilities')}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Capabilities
              </button>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Create New Capability</h1>
              <p className="text-muted-foreground">
                Define a new scientific capability that ScienceGents can integrate
              </p>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Reveal delay={100}>
                <div className="glass-card p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capability Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Molecule Visualization" {...field} />
                            </FormControl>
                            <FormDescription>
                              A descriptive name for your capability.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capability ID</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., mol-viz-3d" {...field} />
                            </FormControl>
                            <FormDescription>
                              A unique identifier used in smart contracts. Use lowercase letters, numbers, and hyphens.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Scientific Domain</FormLabel>
                            <FormControl>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="" disabled>Select a domain</option>
                                {domains.map(domain => (
                                  <option key={domain.value} value={domain.value}>
                                    {domain.label}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormDescription>
                              The scientific field that this capability belongs to.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe what your capability does and how it can help ScienceGents..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              A detailed description of what your capability does and how it benefits ScienceGents.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capability Fee (ETH)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="e.g., 0.25" {...field} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  ETH
                                </span>
                              </div>
                            </FormControl>
                            <FormDescription>
                              The fee in ETH that ScienceGent creators will pay when including this capability.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="creatorAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Creator Ethereum Address</FormLabel>
                            <FormControl>
                              <Input placeholder="0x..." {...field} />
                            </FormControl>
                            <FormDescription>
                              The Ethereum address that will receive the fee when ScienceGents include this capability.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Documentation (Optional)</h3>
                          <div className="border border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center bg-secondary/50">
                            {documentation ? (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText size={16} className="text-science-600" />
                                <span>{documentation.name}</span>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setDocumentation(null)}
                                  className="h-auto p-1"
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Drag and drop or click to upload
                                </p>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => document.getElementById('documentation-upload')?.click()}
                                >
                                  Select File
                                </Button>
                                <input
                                  id="documentation-upload"
                                  type="file"
                                  accept=".pdf,.docx,.md"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, setDocumentation)}
                                />
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload detailed documentation about your capability (PDF, DOCX, or Markdown).
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Integration Guide (Optional)</h3>
                          <div className="border border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center bg-secondary/50">
                            {integrationGuide ? (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText size={16} className="text-science-600" />
                                <span>{integrationGuide.name}</span>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setIntegrationGuide(null)}
                                  className="h-auto p-1"
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Drag and drop or click to upload
                                </p>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => document.getElementById('guide-upload')?.click()}
                                >
                                  Select File
                                </Button>
                                <input
                                  id="guide-upload"
                                  type="file"
                                  accept=".pdf,.docx,.md"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, setIntegrationGuide)}
                                />
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload a guide explaining how to integrate your capability (PDF, DOCX, or Markdown).
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={togglePreview}
                        >
                          {preview ? 'Edit Form' : 'Preview'}
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-science-600 hover:bg-science-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Creating...' : 'Create Capability'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </Reveal>
            </div>
            
            <div>
              <Reveal delay={150}>
                <div className="glass-card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Info size={18} className="text-science-600" />
                    <span>About Capabilities</span>
                  </h2>
                  
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      Capabilities are specialized functions that enhance ScienceGents with domain-specific features. 
                      As a capability creator, you define what your capability does and set a fee.
                    </p>
                    
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <p>Capability fees are paid when a ScienceGent migrates to an external DEX.</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <p>Well-documented capabilities with clear integration guides attract more users.</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <p>All capability data is stored on-chain for transparency and security.</p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      <p>After ScienceGent migration, creators can continue to earn fees from new integrations.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Beaker size={18} className="text-science-600" />
                    <span>Creating Great Capabilities</span>
                  </h2>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <h3 className="font-medium">Be Specific</h3>
                      <p className="text-muted-foreground">Focus on a single, well-defined scientific function.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Explain Clearly</h3>
                      <p className="text-muted-foreground">Describe exactly what your capability does and its limitations.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Price Appropriately</h3>
                      <p className="text-muted-foreground">Set fees based on the value and complexity of your capability.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Document Well</h3>
                      <p className="text-muted-foreground">Provide comprehensive documentation and integration guides.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateCapability;
