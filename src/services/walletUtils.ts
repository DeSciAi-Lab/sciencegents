
// Consolidate wallet utilities into a single export from walletService
export { 
  checkIfWalletIsConnected, 
  connectWallet, 
  disconnectWallet,
  getCurrentAccount,
  formatAddress,
  isAdminWallet
} from '@/services/walletService';
