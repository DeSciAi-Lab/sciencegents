import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import FileUploadField from './FileUploadField';
import { capabilityFormSchema, CapabilityFormValues } from '@/utils/formSchemas';
import { getAllDomains, createDomain, Domain } from '@/services/domains';
import { Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CapabilityFormProps {
  onSubmit: (values: CapabilityFormValues) => Promise<void>;
  togglePreview: () => void;
  preview: boolean;
  isSubmitting: boolean;
  documentation: File | null;
  setDocumentation: React.Dispatch<React.SetStateAction<File | null>>;
  integrationGuide: File | null;
  setIntegrationGuide: React.Dispatch<React.SetStateAction<File | null>>;
}

const CapabilityForm: React.FC<CapabilityFormProps> = ({
  onSubmit,
  togglePreview,
  preview,
  isSubmitting,
  documentation,
  setDocumentation,
  integrationGuide,
  setIntegrationGuide
}) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDomain, setNewDomain] = useState('');
  const [isCreatingDomain, setIsCreatingDomain] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const form = useForm<CapabilityFormValues>({
    resolver: zodResolver(capabilityFormSchema),
    defaultValues: {
      name: '',
      id: '',
      domain: '',
      description: '',
      fee: '',
      creatorAddress: '',
    },
  });

  // Fetch domains on component mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const domainsData = await getAllDomains();
        setDomains(domainsData);
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  // Handle creating a new domain
  const handleCreateDomain = async () => {
    if (!newDomain.trim()) return;
    
    try {
      setIsCreatingDomain(true);
      const createdDomain = await createDomain(newDomain);
      
      if (createdDomain) {
        // Add to domains list
        setDomains(prev => [...prev, createdDomain]);
        
        // Select the new domain
        form.setValue('domain', createdDomain.name);
        
        // Clear input and close popover
        setNewDomain('');
        setPopoverOpen(false);
      }
    } catch (error) {
      console.error('Error creating domain:', error);
    } finally {
      setIsCreatingDomain(false);
    }
  };

  return (
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
              <div className="flex gap-2">
                <FormControl className="flex-1">
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                    disabled={loading}
                  >
                    <option value="" disabled>Select a domain</option>
                    {domains.map(domain => (
                      <option key={domain.id} value={domain.name}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="icon" 
                      className="flex-shrink-0"
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Add Custom Domain</h4>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g. Quantum Physics"
                          value={newDomain}
                          onChange={e => setNewDomain(e.target.value)}
                        />
                        <Button 
                          type="button"
                          onClick={handleCreateDomain} 
                          disabled={isCreatingDomain || !newDomain.trim()}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
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
          <FileUploadField
            label="Documentation (Optional)"
            file={documentation}
            setFile={setDocumentation}
            accept=".pdf,.docx,.md"
            description="Upload detailed documentation about your capability (PDF, DOCX, or Markdown)."
            inputId="documentation-upload"
          />
          
          <FileUploadField
            label="Integration Guide (Optional)"
            file={integrationGuide}
            setFile={setIntegrationGuide}
            accept=".pdf,.docx,.md"
            description="Upload a guide explaining how to integrate your capability (PDF, DOCX, or Markdown)."
            inputId="guide-upload"
          />
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
  );
};

export default CapabilityForm;
