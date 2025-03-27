
// Consolidated wallet utilities
import { contractConfig } from '@/utils/contractConfig';
import { toast } from '@/hooks/use-toast';
import { injected } from 'wagmi/connectors';
import { 
  useAccount, 
  useConnect, 
  useDisconnect 
} from 'wagmi';
import { useState, useEffect } from 'react';

// Admin wallet addresses 
const ADMIN_WALLET_ADDRESSES = [
  '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83',
  '0x2c4354bc7a2e57Ae7331749ae7b68219476A9775'
].map(addr => addr.toLowerCase());

// Format an address for display
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

// Custom hook for wallet functionality
export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check if the connected wallet is an admin wallet
  useEffect(() => {
    if (address) {
      setIsAdmin(ADMIN_WALLET_ADDRESSES.includes(address.toLowerCase()));
    } else {
      setIsAdmin(false);
    }
  }, [address]);

  // Check if the wallet is on the correct network
  const isCorrectNetwork = chainId === parseInt(contractConfig.network.chainId, 16);

  const handleConnect = async () => {
    try {
      // Pass connector parameter to connect function
      await connect({ connector: injected() });
      
      if (!isCorrectNetwork) {
        toast({
          title: "Wrong Network",
          description: "Please switch to the Sepolia Test Network.",
          variant: "destructive"
        });
        
        try {
          if (window.ethereum) {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: contractConfig.network.chainId }],
            });
          }
        } catch (error) {
          console.error('Failed to switch network:', error);
        }
      } else {
        toast({
          title: "Wallet Connected",
          description: address ? `Connected to ${formatAddress(address)}` : "Wallet connected successfully",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected from the application.",
      variant: "default"
    });
  };

  return {
    address,
    isConnected,
    isCorrectNetwork,
    isAdmin,
    connect: handleConnect,
    disconnect: handleDisconnect,
    formatAddress
  };
}
