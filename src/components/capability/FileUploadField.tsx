
import React from 'react';
import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadFieldProps {
  label: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  accept: string;
  description: string;
  inputId: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  file,
  setFile,
  accept,
  description,
  inputId
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">{label}</h3>
      <div className="border border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center bg-secondary/50">
        {file ? (
          <div className="flex items-center gap-2 text-sm">
            <FileText size={16} className="text-science-600" />
            <span>{file.name}</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => setFile(null)}
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
              onClick={() => document.getElementById(inputId)?.click()}
            >
              Select File
            </Button>
            <input
              id={inputId}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};

export default FileUploadField;
