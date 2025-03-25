
import React, { useRef, useState } from 'react';
import { useCapabilityWizard } from '../CapabilityWizardContext';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Plus, AlertCircle, FileText } from 'lucide-react';
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
  
  const docInputRef = useRef<HTMLInputElement>(null);
  const guideInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  
  const [error, setError] = useState<string | null>(null);

  const handleDocumentationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (1MB max)
      if (file.size > 1 * 1024 * 1024) {
        setError("Documentation file size should be less than 1MB");
        return;
      }
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedTypes = ['pdf', 'txt', 'md'];
      
      if (!fileExt || !allowedTypes.includes(fileExt)) {
        setError("File type not allowed. Only PDF, TXT, and MD files are permitted.");
        return;
      }
      
      setDocumentation(file);
      setError(null);
    }
  };

  const handleIntegrationGuideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (1MB max)
      if (file.size > 1 * 1024 * 1024) {
        setError("Integration guide file size should be less than 1MB");
        return;
      }
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedTypes = ['pdf', 'txt', 'md'];
      
      if (!fileExt || !allowedTypes.includes(fileExt)) {
        setError("File type not allowed. Only PDF, TXT, and MD files are permitted.");
        return;
      }
      
      setIntegrationGuide(file);
      setError(null);
    }
  };

  const handleAdditionalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (additionalFiles && additionalFiles.length >= 5) {
        setError("You can only upload up to 5 additional files");
        return;
      }
      
      // Validate file size (1MB max)
      if (file.size > 1 * 1024 * 1024) {
        setError("Additional file size should be less than 1MB");
        return;
      }
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedTypes = ['pdf', 'txt', 'md'];
      
      if (!fileExt || !allowedTypes.includes(fileExt)) {
        setError("File type not allowed. Only PDF, TXT, and MD files are permitted.");
        return;
      }
      
      addFile(file);
      setError(null);
      
      // Clear the input so the same file can be selected again
      if (additionalFileInputRef.current) {
        additionalFileInputRef.current.value = '';
      }
    }
  };

  const removeDocumentation = () => {
    setDocumentation(null);
    if (docInputRef.current) {
      docInputRef.current.value = '';
    }
  };

  const removeIntegrationGuide = () => {
    setIntegrationGuide(null);
    if (guideInputRef.current) {
      guideInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <div className="bg-red-100 p-2 rounded text-red-600"><FileText size={24} /></div>;
      case 'md':
        return <div className="bg-blue-100 p-2 rounded text-blue-600"><FileText size={24} /></div>;
      case 'txt':
        return <div className="bg-gray-100 p-2 rounded text-gray-600"><FileText size={24} /></div>;
      default:
        return <div className="bg-purple-100 p-2 rounded text-purple-600"><FileText size={24} /></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mt-1">
          Upload documentation and integration guides for your capability. These will help others understand how to use and integrate your capability.
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Documentation</h3>
          <p className="text-sm text-gray-500">
            Upload a PDF, TXT, or MD file that explains how your capability works in detail.
          </p>
          
          {documentation ? (
            <div className="p-4 border rounded-md bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon(documentation.name)}
                <div>
                  <p className="font-medium truncate max-w-[200px]">{documentation.name}</p>
                  <p className="text-xs text-gray-500">{(documentation.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeDocumentation} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 size={16} />
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
              onClick={() => docInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload documentation</p>
              <p className="text-xs text-gray-500 mt-1">PDF, TXT, or MD (1MB max)</p>
              <input 
                type="file" 
                ref={docInputRef} 
                className="hidden" 
                accept=".pdf,.md,.txt" 
                onChange={handleDocumentationChange} 
              />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Integration Guide</h3>
          <p className="text-sm text-gray-500">
            Upload a guide that helps developers integrate your capability into their ScienceGents.
          </p>
          
          {integrationGuide ? (
            <div className="p-4 border rounded-md bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon(integrationGuide.name)}
                <div>
                  <p className="font-medium truncate max-w-[200px]">{integrationGuide.name}</p>
                  <p className="text-xs text-gray-500">{(integrationGuide.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeIntegrationGuide} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                <Trash2 size={16} />
              </Button>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-300 transition-colors"
              onClick={() => guideInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload integration guide</p>
              <p className="text-xs text-gray-500 mt-1">PDF, TXT, or MD (1MB max)</p>
              <input 
                type="file" 
                ref={guideInputRef} 
                className="hidden" 
                accept=".pdf,.md,.txt" 
                onChange={handleIntegrationGuideChange} 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Additional Files</h3>
          <Button 
            type="button"
            variant="outline"
            size="sm"
            onClick={() => additionalFileInputRef.current?.click()}
            disabled={additionalFiles && additionalFiles.length >= 5}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            Add File
          </Button>
          <input 
            type="file" 
            ref={additionalFileInputRef} 
            className="hidden" 
            accept=".pdf,.md,.txt" 
            onChange={handleAdditionalFileChange} 
          />
        </div>
        
        <p className="text-sm text-gray-500">
          Upload any additional files that may help users understand your capability.
        </p>
        
        <div className="space-y-3">
          {additionalFiles && additionalFiles.length > 0 ? (
            additionalFiles.map((file, index) => (
              <div key={index} className="p-3 border rounded-md bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)} 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))
          ) : (
            <div className="p-4 border border-dashed rounded-md bg-gray-50 text-center">
              <p className="text-sm text-gray-500">No additional files uploaded yet</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Only up to 5 additional files can be added. Supported file formats: PDF, TXT, and MD. Maximum file size: 1MB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
