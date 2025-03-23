
import React from 'react';
import { Upload, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';  // Added missing import
import { useCapabilityWizard } from '../CapabilityWizardContext';

const UploadDocuments: React.FC = () => {
  const { 
    documentation, 
    setDocumentation, 
    integrationGuide, 
    setIntegrationGuide 
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

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="pb-2 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Upload Documents</h3>
        <p className="text-sm text-gray-500 mt-1">
          Documentation and integration guides help ScienceGent creators use your capability effectively.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Integration Guide (optional)</label>
          <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
            {integrationGuide ? (
              <div className="flex items-center gap-2 text-sm">
                <FileText size={16} className="text-primary" />
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
                  No file chosen (under 1MB)
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
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Provide step-by-step instructions for integrating your capability.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Documentation (optional)</label>
          <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
            {documentation ? (
              <div className="flex items-center gap-2 text-sm">
                <FileText size={16} className="text-primary" />
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
                  No file chosen (under 1MB)
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
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Detailed documentation about your capability's functionality, limitations, and use cases.
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Additional Files (optional)</label>
          <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              No file chosen (under 1MB)
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
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Any additional files that might help users understand or implement your capability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
