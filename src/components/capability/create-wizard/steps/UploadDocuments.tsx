
import React from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info, Plus, Upload, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    if (e.target.files && e.target.files[0]) {
      setDocumentation(e.target.files[0]);
    }
  };
  
  const handleIntegrationGuideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIntegrationGuide(e.target.files[0]);
    }
  };
  
  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Upload Documents</h2>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="documentation" className="font-medium">Documentation (optional)</label>
          </div>
          <div 
            className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('documentation')?.click()}
          >
            {documentation ? (
              <div className="flex items-center justify-center space-x-2">
                <ExternalLink className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{documentation.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">No file choosen (under 2MB)</span>
              </div>
            )}
          </div>
          <input
            id="documentation"
            type="file"
            accept=".pdf,.txt,.md,.docx"
            onChange={handleDocumentationChange}
            className="hidden"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Detailed documentation about your capability's functionality, limitations, and use cases.</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="integration-guide" className="font-medium">Integration Guide (optional)</label>
          </div>
          <div 
            className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('integration-guide')?.click()}
          >
            {integrationGuide ? (
              <div className="flex items-center justify-center space-x-2">
                <ExternalLink className="h-5 w-5 text-blue-500" />
                <span className="text-sm">{integrationGuide.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">No file choosen (under 2MB)</span>
              </div>
            )}
          </div>
          <input
            id="integration-guide"
            type="file"
            accept=".pdf,.txt,.md,.docx"
            onChange={handleIntegrationGuideChange}
            className="hidden"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Provide step-by-step instructions for integrating your capability.</p>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="additional-files" className="font-medium">Others (optional)</label>
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </div>
          <div 
            className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('additional-files')?.click()}
          >
            {additionalFiles.length > 0 ? (
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                  {additionalFiles.map((file, index) => (
                    <div key={index} className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-700">
                      {file.name}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Click to add more files</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">No file choosen (under 2MB)</span>
              </div>
            )}
          </div>
          <input
            id="additional-files"
            type="file"
            accept=".pdf,.txt,.md,.docx,.jpg,.jpeg,.png,.gif"
            onChange={handleAdditionalFileChange}
            className="hidden"
          />
          <div className="mt-1 flex items-start">
            <Info className="h-4 w-4 text-gray-500 mr-1 mt-0.5" />
            <p className="text-xs text-gray-500">Any additional files that might help users understand or implement your capability.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-700 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 font-medium">Only upto 5 files can be added. supported file formats, pdf, txt and .md"</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-700 mr-2 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 font-medium">These informations can be added and updated later also from user dashboard</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button
          type="button"
          variant="outline"
          className="flex items-center"
          onClick={() => document.getElementById('additional-files')?.click()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add more
        </Button>
      </div>
    </div>
  );
};

export default UploadDocuments;
