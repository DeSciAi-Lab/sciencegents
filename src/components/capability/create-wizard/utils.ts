
import { CapabilityFormValues } from '@/utils/formSchemas';

export const domains = [
  "Chemistry",
  "Physics",
  "Biochemistry",
  "Materials Science",
  "Protein Analysis",
  "Drug Discovery",
  "Genomics"
];

export const validateCapabilityForm = (formData: Partial<CapabilityFormValues>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  }

  if (!formData.id || !/^[a-z0-9-]+$/.test(formData.id)) {
    errors.id = 'ID must contain only lowercase letters, numbers, and hyphens.';
  }

  if (!formData.domain) {
    errors.domain = 'Domain is required.';
  }

  if (!formData.description || formData.description.length < 20) {
    errors.description = 'Description must be at least 20 characters.';
  }

  if (!formData.fee || isNaN(parseFloat(formData.fee)) || parseFloat(formData.fee) <= 0) {
    errors.fee = 'Fee must be a positive number.';
  }

  if (!formData.creatorAddress || !/^0x[a-fA-F0-9]{40}$/.test(formData.creatorAddress)) {
    errors.creatorAddress = 'Invalid Ethereum address.';
  }

  return errors;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
