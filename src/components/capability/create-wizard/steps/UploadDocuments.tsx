
import React from 'react';
import { Plus, HelpCircle, FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { useToast } from '@/components/ui/use-toast';

const UploadDocuments: React.FC = () => {
  const { toast } = useToast();
  const { 
    documentation, 
    setDocumentation, 
    integrationGuide, 
    setIntegrationGuide,
    additionalFiles,
    addFile,
    removeFile
  } = useCapabilityWizard();

  const handleDocumentationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentation(e.target.files[0]);
    }
  };

  const handleIntegrationGuideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIntegrationGuide(e.target.files[0]);
    }
  };

  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      // Check file type
      if (!['pdf', 'txt', 'md'].includes(fileExtension || '')) {
        toast({
          title: "Invalid file format",
          description: "Only PDF, TXT, and MD files are supported.",
          variant: "destructive"
        });
        return;
      }
      
      // Check if we already have 5 files
      if (additionalFiles && additionalFiles.length >= 5) {
        toast({
          title: "Maximum files reached",
          description: "You can only upload up to 5 additional files.",
          variant: "destructive"
        });
        return;
      }
      
      addFile(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Documentation (optional)</label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
              {documentation ? (
                <div className="flex items-center justify-between w-full text-sm py-2">
                  <div className="flex items-center">
                    <FileIcon className="h-4 w-4 mr-2" />
                    <span>{documentation.name}</span>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setDocumentation(null)}
                    className="h-auto px-2 py-1"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground mb-2">
                    No file chosen (under 2MB)
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("documentation")?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="documentation"
                    type="file"
                    accept=".pdf,.md,.txt,.docx"
                    className="hidden"
                    onChange={handleDocumentationChange}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Detailed documentation about your capability's functionality, limitations, and use cases.
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Integration Guide (optional)</label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
              {integrationGuide ? (
                <div className="flex items-center justify-between w-full text-sm py-2">
                  <div className="flex items-center">
                    <FileIcon className="h-4 w-4 mr-2" />
                    <span>{integrationGuide.name}</span>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIntegrationGuide(null)}
                    className="h-auto px-2 py-1"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground mb-2">
                    No file chosen (under 2MB)
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("integrationGuide")?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="integrationGuide"
                    type="file"
                    accept=".pdf,.md,.txt,.docx"
                    className="hidden"
                    onChange={handleIntegrationGuideChange}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Provide step-by-step instructions for integrating your capability.
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Additional Files (optional)</label>
              <span className="text-xs text-muted-foreground">⤴ External link</span>
            </div>
            <div className="border border-dashed border-gray-300 rounded-md p-4 bg-gray-50">
              {additionalFiles && additionalFiles.length > 0 ? (
                <div className="space-y-2">
                  {additionalFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <FileIcon className="h-4 w-4 mr-2" />
                        <span>{file.name}</span>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-auto px-2 py-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {additionalFiles.length < 5 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => document.getElementById("additionalFiles")?.click()}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add more files
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground mb-2">
                    No file chosen (under 2MB)
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("additionalFiles")?.click()}
                  >
                    Select File
                  </Button>
                </div>
              )}
              <input
                id="additionalFiles"
                type="file"
                accept=".pdf,.md,.txt"
                className="hidden"
                onChange={handleAdditionalFileChange}
              />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Any additional files that might help users understand or implement your capability.
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-6">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-amber-500 mt-0.5" />
            <p className="text-xs text-amber-700">
              Only up to 5 additional files can be added. Supported file formats: .pdf, .txt and .md
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
