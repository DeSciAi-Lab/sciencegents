
import { ethers } from "ethers";
import { toast } from "@/components/ui/use-toast";
import { contractConfig } from "@/utils/contractConfig";

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
