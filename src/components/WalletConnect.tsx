
import React, { useState, useEffect } from 'react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { connectWallet, disconnectWallet, formatAddress } from '@/services/walletService';

interface WalletConnectProps {
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ variant = 'default', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  // Check for wallet on mount and setup listeners
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setConnectedAccount(accounts[0] || null);

          // Set up listener for account changes
          const handleAccountsChanged = (accounts: string[]) => {
            setConnectedAccount(accounts[0] || null);
            if (accounts.length === 0) {
              // User disconnected their wallet
              setIsOpen(false);
            }
          };

          window.ethereum.on('accountsChanged', handleAccountsChanged);
          
          // Handle chain changes
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', () => {});
          };
        } catch (error) {
          console.error('Error checking wallet:', error);
        }
      }
    };

    checkWallet();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const account = await connectWallet();
      if (account) {
        setConnectedAccount(account);
        setIsOpen(false);
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setConnectedAccount(null);
  };

  return (
    <>
      {connectedAccount ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-science-200 text-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              {formatAddress(connectedAccount)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                  <div className="h-4 w-4 text-destructive shrink-0">!</div>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="grid gap-4">
                <Button
                  className="flex justify-between items-center w-full px-4 py-6"
                  onClick={handleConnect}
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
