
import React, { useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Info, Plus, Trash, ExternalLink, File, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUploadField from '@/components/capability/FileUploadField';

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
  
  const [tempFile, setTempFile] = useState<File | null>(null);
  
  const handleAddFile = () => {
    if (tempFile) {
      addFile(tempFile);
      setTempFile(null);
    }
  };
  
  const maxFiles = 5;
  const canAddMoreFiles = additionalFiles.length < maxFiles;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Upload Documents</h2>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Documentation (optional)</h3>
            <div className="bg-blue-50 text-xs text-blue-700 px-3 py-1 rounded-full flex items-center">
              <Info className="w-3 h-3 mr-1" />
              only upto 5 files can be added. supported file formats, pdf, txt and .md
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            {documentation ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">{documentation.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setDocumentation(null)}
                  className="text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">No file chosen (under 2MB)</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt,.md"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setDocumentation(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <Info className="w-3 h-3 inline mr-1" />
            Detailed documentation about your capability's functionality, limitations, and use cases.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Integration Guide (optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
            {integrationGuide ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">{integrationGuide.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIntegrationGuide(null)}
                  className="text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">No file chosen (under 2MB)</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt,.md"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setIntegrationGuide(e.target.files[0]);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <Info className="w-3 h-3 inline mr-1" />
            Provide step-by-step instructions for integrating your capability.
          </p>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Others (optional)</h3>
            <div className="text-blue-600">
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>
          
          {additionalFiles.length > 0 && (
            <div className="mb-4 space-y-2">
              {additionalFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center">
                    <File className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {canAddMoreFiles && (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
              {tempFile ? (
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center mb-2">
                    <File className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">{tempFile.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddFile}
                    >
                      Add File
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setTempFile(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">No file chosen (under 2MB)</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.md,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setTempFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            <Info className="w-3 h-3 inline mr-1" />
            Any additional files that might help users understand or implement your capability.
          </p>
        </div>
        
        {additionalFiles.length > 0 && canAddMoreFiles && (
          <div className="text-center">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => document.getElementById('add-more-btn')?.click()}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" /> Add more
              <input
                id="add-more-btn"
                type="file"
                className="hidden"
                accept=".pdf,.txt,.md,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setTempFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </div>
        )}
        
        <div className="bg-blue-50 rounded-md p-4 mt-4 flex items-start">
          <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <p className="text-sm text-blue-700">
            These informations can be added and updated later also from user dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
