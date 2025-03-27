
import { ethers } from "ethers";
import { toast } from "@/components/ui/use-toast";
import { contractConfig } from "@/utils/contractConfig";

// Admin wallet addresses 
const ADMIN_WALLET_ADDRESSES = [
  '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83',
  '0x2c4354bc7a2e57Ae7331749ae7b68219476A9775'
].map(addr => addr.toLowerCase());

// Function to get ethers provider
export const getProvider = async (): Promise<ethers.providers.Web3Provider> => {
  if (!window.ethereum) {
    throw new Error("No wallet detected. Please install MetaMask or another Web3 provider.");
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  // Ensure the user is connected
  await provider.listAccounts();
  
  return provider;
};

// Function to check if the wallet is connected and on the right network
export const checkIfWalletIsConnected = async (): Promise<boolean> => {
  if (!window.ethereum) {
    toast({
      title: "MetaMask Not Installed",
      description: "Please install MetaMask to register a capability.",
      variant: "destructive"
    });
    return false;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
    if (accounts.length === 0) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to register a capability.",
        variant: "destructive"
      });
      return false;
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== contractConfig.network.chainId) {
      toast({
        title: "Wrong Network",
        description: "Please switch to the Sepolia Test Network.",
        variant: "destructive"
      });
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: contractConfig.network.chainId }],
        });
      } catch (error) {
        console.error('Failed to switch network:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
};

// Function to check if the connected wallet is an admin wallet
export const isAdminWallet = async (): Promise<boolean> => {
  if (!window.ethereum) {
    console.log("No Ethereum provider found");
    return false;
  }
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    
    if (!accounts || accounts.length === 0) {
      console.log("No connected accounts found");
      return false;
    }
    
    const connectedAccount = accounts[0].toLowerCase();
    const isAdmin = ADMIN_WALLET_ADDRESSES.includes(connectedAccount);
    console.log(`Connected account: ${connectedAccount}, Is admin: ${isAdmin}`);
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin wallet:', error);
    return false;
  }
};

// Function to connect wallet
export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    toast({
      title: "MetaMask Not Installed",
      description: "Please install MetaMask to use this feature.",
      variant: "destructive"
    });
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet.",
        variant: "destructive"
      });
      return null;
    }

    // Check if on the right network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== contractConfig.network.chainId) {
      toast({
        title: "Wrong Network",
        description: "Switching to Sepolia Test Network...",
        variant: "default"
      });
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: contractConfig.network.chainId }],
        });
      } catch (error) {
        console.error('Failed to switch network:', error);
        toast({
          title: "Network Switch Failed",
          description: "Please manually switch to Sepolia Test Network.",
          variant: "destructive"
        });
        return null;
      }
    }

    toast({
      title: "Wallet Connected",
      description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      variant: "default"
    });

    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    
    toast({
      title: "Connection Failed",
      description: error instanceof Error ? error.message : "An unknown error occurred",
      variant: "destructive"
    });
    
    return null;
  }
};

// Function to disconnect wallet
export const disconnectWallet = (): void => {
  // For MetaMask, there's no direct way to disconnect via the provider
  // We'll just notify the user that they need to disconnect via MetaMask
  toast({
    title: "Wallet Disconnected",
    description: "Your wallet has been disconnected from the application.",
    variant: "default"
  });
  
  // Refresh the page to clear any cached wallet state
  window.location.reload();
};

// Function to get the current connected account
export const getCurrentAccount = async (): Promise<string | null> => {
  if (!window.ethereum) {
    return null;
  }
  
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error getting current account:', error);
    return null;
  }
};

// Format an address for display
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
