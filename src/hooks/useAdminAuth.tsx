
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Hardcoded admin wallet address - in a real app, this would come from an environment variable
const ADMIN_WALLET_ADDRESS = '0x86A683C6B0e8d7A962B7A040Ed0e6d993F1d9F83';

const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      setIsLoading(true);
      
      try {
        // Check if wallet is connected
        if (!window.ethereum) {
          console.error('No Ethereum wallet detected');
          setAccessDenied(true);
          setIsAdmin(false);
          setIsLoading(false);
          toast({
            title: "Wallet Connection Required",
            description: "Please install and connect MetaMask to access the admin page.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        // Get current wallet address
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if (!accounts || accounts.length === 0) {
          console.error('No wallet connected');
          setAccessDenied(true);
          setIsAdmin(false);
          setIsLoading(false);
          toast({
            title: "Wallet Not Connected",
            description: "Please connect your wallet to access the admin page.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        const currentWallet = accounts[0].toLowerCase();
        console.log('Connected wallet:', currentWallet);
        console.log('Admin wallet:', ADMIN_WALLET_ADDRESS.toLowerCase());
        
        // Strict equality check against admin wallet address
        if (currentWallet !== ADMIN_WALLET_ADDRESS.toLowerCase()) {
          console.error('Connected wallet is not admin wallet');
          setAccessDenied(true);
          setIsAdmin(false);
          setIsLoading(false);
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin page.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
        setAccessDenied(false);
      } catch (error) {
        console.error('Error checking admin access:', error);
        setAccessDenied(true);
        setIsAdmin(false);
        toast({
          title: "Authentication Error",
          description: "An error occurred while checking admin access.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAccess();
    
    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (!accounts || accounts.length === 0) {
          setIsAdmin(false);
          setAccessDenied(true);
          toast({
            title: "Wallet Disconnected",
            description: "Admin access has been revoked.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }
        
        const currentWallet = accounts[0].toLowerCase();
        
        // Check if new account is admin
        if (currentWallet !== ADMIN_WALLET_ADDRESS.toLowerCase()) {
          setIsAdmin(false);
          setAccessDenied(true);
          toast({
            title: "Access Revoked",
            description: "Admin access has been revoked due to wallet change.",
            variant: "destructive"
          });
          navigate('/');
        } else {
          setIsAdmin(true);
          setAccessDenied(false);
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        // Clean up event listeners
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [navigate]);

  return { isAdmin, isLoading, accessDenied, adminWalletAddress: ADMIN_WALLET_ADDRESS };
};

export { useAdminAuth };
export default useAdminAuth;
