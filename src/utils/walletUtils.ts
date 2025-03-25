
// Re-export wallet service functions for backward compatibility
export { 
  checkIfWalletIsConnected, 
  connectWallet, 
  disconnectWallet,
  getCurrentAccount,
  formatAddress
} from '@/services/walletService';
