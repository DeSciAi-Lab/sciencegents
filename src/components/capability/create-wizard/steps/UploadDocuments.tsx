
import React from 'react';
import { Info, FileText, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCapabilityWizard } from '../CapabilityWizardContext';

const UploadDocuments: React.FC = () => {
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
      addFile(e.target.files[0]);
    }
  };

  const maxFilesReached = (additionalFiles?.length || 0) >= 5;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Documentation (optional)</h3>
          <div className="border border-dashed border-gray-300 rounded-md p-4">
            {documentation ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm">{documentation.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDocumentation(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div onClick={() => document.getElementById('documentation')?.click()} className="flex flex-col items-center justify-center py-4 cursor-pointer">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">No file chosen (under 2MB)</p>
                <Button variant="outline" size="sm">
                  Select File
                </Button>
                <input
                  id="documentation"
                  type="file"
                  accept=".pdf,.docx,.md,.txt"
                  className="hidden"
                  onChange={handleDocumentationChange}
                />
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Detailed documentation about your capability's functionality, limitations, and use cases.
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Integration Guide (optional)</h3>
          <div className="border border-dashed border-gray-300 rounded-md p-4">
            {integrationGuide ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm">{integrationGuide.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIntegrationGuide(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div onClick={() => document.getElementById('integrationGuide')?.click()} className="flex flex-col items-center justify-center py-4 cursor-pointer">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">No file chosen (under 2MB)</p>
                <Button variant="outline" size="sm">
                  Select File
                </Button>
                <input
                  id="integrationGuide"
                  type="file"
                  accept=".pdf,.docx,.md,.txt"
                  className="hidden"
                  onChange={handleIntegrationGuideChange}
                />
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Provide step-by-step instructions for integrating your capability.
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Others (optional)</h3>
          </div>
          
          {additionalFiles && additionalFiles.length > 0 ? (
            <div className="space-y-2">
              {additionalFiles.map((file, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-md p-4">
              <div onClick={() => document.getElementById('additionalFile')?.click()} className="flex flex-col items-center justify-center py-4 cursor-pointer">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">No file chosen (under 2MB)</p>
                <Button variant="outline" size="sm" disabled={maxFilesReached}>
                  Select File
                </Button>
                <input
                  id="additionalFile"
                  type="file"
                  accept=".pdf,.docx,.md,.txt"
                  className="hidden"
                  onChange={handleAdditionalFileChange}
                  disabled={maxFilesReached}
                />
              </div>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Any additional files that might help users understand or implement your capability.
          </div>
        </div>

        {!maxFilesReached && additionalFiles && additionalFiles.length > 0 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => document.getElementById('additionalFile')?.click()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add more
            </Button>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            Only upto 5 files can be added. Supported file formats: .pdf, .txt and .md
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
