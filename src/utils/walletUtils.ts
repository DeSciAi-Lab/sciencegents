
// Consolidated wallet utilities
import { useWallet } from '@/hooks/useWallet';

export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Check if wallet is connected
export const checkIfWalletIsConnected = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
};

// Connect wallet function
export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
};

// Export the hook
export { useWallet };
