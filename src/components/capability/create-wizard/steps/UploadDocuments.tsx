
import React, { useRef } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { formatFileSize } from '../utils';
import { Upload, FileText, X, Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDocumentationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentation(file);
    }
  };
  
  const handleIntegrationGuideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIntegrationGuide(file);
    }
  };
  
  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addFile(file);
      // Reset the input to allow selecting the same file again
      if (additionalFileInputRef.current) {
        additionalFileInputRef.current.value = '';
      }
    }
  };
  
  const hasSupportedFileTypes = (fileName: string): boolean => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['pdf', 'txt', 'md'].includes(extension || '');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Upload Documents</h3>
        <p className="text-sm text-gray-500 mt-1">
          Upload documentation and guides to help users understand your capability.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Documentation</Label>
          <div className="flex items-center space-x-4">
            {documentation ? (
              <div className="flex items-center border rounded-md p-2 bg-gray-50 text-sm w-full">
                <FileText size={20} className="text-blue-500 mr-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{documentation.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(documentation.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDocumentation(null)}
                  className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('documentation-upload')?.click()}
                className="w-full justify-start"
              >
                <Upload size={16} className="mr-2" />
                Upload Documentation
              </Button>
            )}
            <Input
              type="file"
              id="documentation-upload"
              className="hidden"
              accept=".pdf,.txt,.md"
              onChange={handleDocumentationChange}
            />
          </div>
          <p className="text-xs text-gray-500">Upload a PDF, TXT or MD file with detailed documentation.</p>
        </div>
        
        <div className="space-y-2">
          <Label>Integration Guide</Label>
          <div className="flex items-center space-x-4">
            {integrationGuide ? (
              <div className="flex items-center border rounded-md p-2 bg-gray-50 text-sm w-full">
                <FileText size={20} className="text-blue-500 mr-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{integrationGuide.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(integrationGuide.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIntegrationGuide(null)}
                  className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('guide-upload')?.click()}
                className="w-full justify-start"
              >
                <Upload size={16} className="mr-2" />
                Upload Integration Guide
              </Button>
            )}
            <Input
              type="file"
              id="guide-upload"
              className="hidden"
              accept=".pdf,.txt,.md"
              onChange={handleIntegrationGuideChange}
            />
          </div>
          <p className="text-xs text-gray-500">Upload a guide to help users integrate your capability.</p>
        </div>
        
        <div className="space-y-2">
          <Label>Additional Files</Label>
          <div className="space-y-2">
            {additionalFiles && additionalFiles.length > 0 ? (
              <div className="space-y-2">
                {additionalFiles.map((file, index) => (
                  <div key={index} className="flex items-center border rounded-md p-2 bg-gray-50 text-sm">
                    <FileText size={20} className="text-blue-500 mr-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-md p-8 flex flex-col items-center justify-center">
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Upload additional files</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => additionalFileInputRef.current?.click()}
                >
                  <Upload size={16} className="mr-2" />
                  Choose Files
                </Button>
              </div>
            )}
            <Input
              type="file"
              ref={additionalFileInputRef}
              className="hidden"
              accept=".pdf,.txt,.md"
              onChange={handleAdditionalFileChange}
            />
          </div>
          
          {additionalFiles && additionalFiles.length > 0 && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => additionalFileInputRef.current?.click()}
              disabled={additionalFiles.length >= 5}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add More
            </Button>
          )}
          
          {additionalFiles && additionalFiles.length >= 5 && (
            <Alert variant="default" className="mt-2 bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Maximum of 5 additional files reached.</AlertDescription>
            </Alert>
          )}
          
          <div className="text-xs text-gray-500 mt-2 border-t pt-2">
            <p className="font-medium">Disclaimer:</p>
            <p>Only up to 5 files can be added. Supported file formats: .pdf, .txt and .md</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
