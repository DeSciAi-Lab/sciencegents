
import React from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const UploadDocuments: React.FC = () => {
  const { 
    documentation, 
    setDocumentation, 
    integrationGuide, 
    setIntegrationGuide,
    additionalFiles,
    setAdditionalFiles
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

  const handleAdditionalFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAdditionalFiles(e.target.files[0]);
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
                  <span>{documentation.name}</span>
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
                    No file choosen (under 2MB)
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
                  <span>{integrationGuide.name}</span>
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
                    No file choosen (under 2MB)
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
              <label className="block text-sm font-medium">Others (optional)</label>
              <span className="text-xs text-muted-foreground">⤴ External link</span>
            </div>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center bg-gray-50">
              {additionalFiles ? (
                <div className="flex items-center justify-between w-full text-sm py-2">
                  <span>{additionalFiles.name}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setAdditionalFiles(null)}
                    className="h-auto px-2 py-1"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Plus className="h-5 w-5 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground mb-2">
                    No file choosen (under 2MB)
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("additionalFiles")?.click()}
                  >
                    Select File
                  </Button>
                  <input
                    id="additionalFiles"
                    type="file"
                    accept=".pdf,.md,.txt,.docx,.zip,.png,.jpg"
                    className="hidden"
                    onChange={handleAdditionalFilesChange}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HelpCircle className="h-3 w-3" />
              Any additional files that might help users understand or implement your capability.
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
