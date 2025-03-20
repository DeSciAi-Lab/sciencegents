
import React, { useState } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface WalletConnectProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ variant = 'default', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Check if on Sepolia testnet
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Sepolia chainId is 0xaa36a7 (in hex) or 11155111 (in decimal)
      if (chainId !== '0xaa36a7') {
        try {
          // Try to switch to Sepolia
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
          });
        } catch (switchError: any) {
          // This error code means the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xaa36a7',
                  chainName: 'Sepolia Testnet',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'SEP',
                    decimals: 18,
                  },
                  rpcUrls: ['https://sepolia.infura.io/v3/'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io'],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      setConnectedAccount(accounts[0]);
      setIsOpen(false);
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setConnectedAccount(null);
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {connectedAccount ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-science-200 text-sm"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            {formatAddress(connectedAccount)}
          </Button>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant={variant} 
              className={`gap-1.5 ${className} ${variant === 'default' ? 'bg-science-600 hover:bg-science-700 text-white' : ''}`}
            >
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Connect your wallet to interact with ScienceGents Protocol
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-destructive/10 text-destructive text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="grid gap-4">
                <Button
                  className="flex justify-between items-center w-full px-4 py-6"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="w-8 h-8" 
                    />
                    <div className="text-left">
                      <div className="font-medium">MetaMask</div>
                      <div className="text-xs text-muted-foreground">Connect using browser wallet</div>
                    </div>
                  </div>
                  {isConnecting ? (
                    <div className="w-5 h-5 border-2 border-science-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.25 9.1L7.85 6.5L5.25 3.9L6 3.15L9.35 6.5L6 9.85L5.25 9.1Z" fill="currentColor"/>
                    </svg>
                  )}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Coming Soon</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="flex justify-between items-center w-full px-4 py-6"
                  disabled
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Icon/Gradient/Icon.png" 
                      alt="WalletConnect" 
                      className="w-8 h-8" 
                    />
                    <div className="text-left">
                      <div className="font-medium">WalletConnect</div>
                      <div className="text-xs text-muted-foreground">Connect using mobile wallet</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              By connecting your wallet, you agree to the ScienceGents Protocol Terms of Service
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WalletConnect;
