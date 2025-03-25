
// Re-export wallet utilities
import { useWallet } from '@/hooks/useWallet';

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export { useWallet };
