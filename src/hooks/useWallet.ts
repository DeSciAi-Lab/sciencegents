
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { contractConfig } from '@/utils/contractConfig';
import { toast } from '@/components/ui/use-toast';

// Admin wallet address 
const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83'.toLowerCase();

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check if the connected wallet is the admin wallet
  useEffect(() => {
    if (address) {
      setIsAdmin(address.toLowerCase() === ADMIN_WALLET_ADDRESS);
    } else {
      setIsAdmin(false);
    }
  }, [address]);

  // Check if the wallet is on the correct network
  const isCorrectNetwork = chainId === parseInt(contractConfig.network.chainId, 16);

  const handleConnect = async () => {
    try {
      await connect();
      
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

  // Format an address for display
  const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
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
