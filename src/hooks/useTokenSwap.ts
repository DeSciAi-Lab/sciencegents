
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { getProvider } from '@/services/walletService';
import { contractConfig } from '@/utils/contractConfig';

// ABI for the swap functions we need
const swapABI = [
  "function buyTokens(address token, uint256 minTokensOut) external payable",
  "function sellTokens(address token, uint256 tokenAmount, uint256 minEthOut) external",
  "function calculateTokensFromETH(address token, uint256 ethInput) public view returns (uint256)",
  "function calculateETHFromTokens(address token, uint256 tokenInput) public view returns (uint256)",
  "function calculateETHRequiredForTokens(address token, uint256 tokenAmount) public view returns (uint256)",
  "function calculateTokensRequiredForETH(address token, uint256 desiredEthAmount) public view returns (uint256)"
];

// Token ABI for approval
const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)"
];

export type SwapDirection = 'buy' | 'sell';

export const useTokenSwap = (tokenAddress: string) => {
  const [direction, setDirection] = useState<SwapDirection>('buy');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  
  // Check wallet connection
  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) {
        setWalletConnected(false);
        return;
      }
      
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setWalletConnected(accounts.length > 0);
        
        if (accounts.length > 0) {
          // Get ETH balance
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(accounts[0]);
          setEthBalance(ethers.utils.formatEther(balance));
          
          // Get token balance if token address is available
          if (tokenAddress && ethers.utils.isAddress(tokenAddress)) {
            const tokenContract = new ethers.Contract(
              tokenAddress,
              ["function balanceOf(address owner) view returns (uint256)"],
              provider
            );
            const tokenBalance = await tokenContract.balanceOf(accounts[0]);
            setTokenBalance(ethers.utils.formatUnits(tokenBalance, 18));
          }
        }
      } catch (error) {
        console.error("Error checking wallet:", error);
        setWalletConnected(false);
      }
    };
    
    checkWallet();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setWalletConnected(accounts.length > 0);
        checkWallet();
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, [tokenAddress]);
  
  // Toggle swap direction
  const toggleDirection = useCallback(() => {
    setDirection(prev => prev === 'buy' ? 'sell' : 'buy');
    // Clear input fields on direction change
    setEthAmount('');
    setTokenAmount('');
  }, []);
  
  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Wallet Found",
        description: "Please install MetaMask or another Ethereum wallet",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletConnected(true);
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Wallet Connection Failed",
        description: "Could not connect to your wallet",
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Calculate token amount from ETH input (Buy mode)
  const calculateTokenFromEth = async (ethInput: string) => {
    if (!ethInput || parseFloat(ethInput) <= 0 || !tokenAddress) return;
    
    try {
      setIsCalculating(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum || ethers.getDefaultProvider());
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        provider
      );
      
      const weiAmount = ethers.utils.parseEther(ethInput);
      const tokensOut = await swapContract.calculateTokensFromETH(tokenAddress, weiAmount);
      setTokenAmount(ethers.utils.formatUnits(tokensOut, 18));
    } catch (error) {
      console.error("Error calculating tokens:", error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate token amount",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Calculate ETH amount from token input (Sell mode)
  const calculateEthFromToken = async (tokenInput: string) => {
    if (!tokenInput || parseFloat(tokenInput) <= 0 || !tokenAddress) return;
    
    try {
      setIsCalculating(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum || ethers.getDefaultProvider());
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        provider
      );
      
      const tokenAmount = ethers.utils.parseUnits(tokenInput, 18);
      const ethOut = await swapContract.calculateETHFromTokens(tokenAddress, tokenAmount);
      setEthAmount(ethers.utils.formatEther(ethOut));
    } catch (error) {
      console.error("Error calculating ETH:", error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate ETH amount",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Calculate ETH required for specific token amount (Buy mode, reverse calculation)
  const calculateEthRequired = async (tokenInput: string) => {
    if (!tokenInput || parseFloat(tokenInput) <= 0 || !tokenAddress) return;
    
    try {
      setIsCalculating(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum || ethers.getDefaultProvider());
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        provider
      );
      
      const tokenAmount = ethers.utils.parseUnits(tokenInput, 18);
      const ethRequired = await swapContract.calculateETHRequiredForTokens(tokenAddress, tokenAmount);
      setEthAmount(ethers.utils.formatEther(ethRequired));
    } catch (error) {
      console.error("Error calculating required ETH:", error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate required ETH",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Calculate tokens required for specific ETH amount (Sell mode, reverse calculation)
  const calculateTokensRequired = async (ethInput: string) => {
    if (!ethInput || parseFloat(ethInput) <= 0 || !tokenAddress) return;
    
    try {
      setIsCalculating(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum || ethers.getDefaultProvider());
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        provider
      );
      
      const weiAmount = ethers.utils.parseEther(ethInput);
      const tokensRequired = await swapContract.calculateTokensRequiredForETH(tokenAddress, weiAmount);
      setTokenAmount(ethers.utils.formatUnits(tokensRequired, 18));
    } catch (error) {
      console.error("Error calculating required tokens:", error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate required tokens",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Handle ETH input change
  const handleEthAmountChange = async (value: string) => {
    setEthAmount(value);
    if (!value || parseFloat(value) <= 0) {
      setTokenAmount('');
      return;
    }
    
    if (direction === 'buy') {
      await calculateTokenFromEth(value);
    } else {
      await calculateTokensRequired(value);
    }
  };
  
  // Handle token input change
  const handleTokenAmountChange = async (value: string) => {
    setTokenAmount(value);
    if (!value || parseFloat(value) <= 0) {
      setEthAmount('');
      return;
    }
    
    if (direction === 'buy') {
      await calculateEthRequired(value);
    } else {
      await calculateEthFromToken(value);
    }
  };
  
  // Execute swap transaction
  const executeSwap = async () => {
    if (!tokenAddress || !walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }
    
    if (
      (direction === 'buy' && (!ethAmount || parseFloat(ethAmount) <= 0)) ||
      (direction === 'sell' && (!tokenAmount || parseFloat(tokenAmount) <= 0))
    ) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        signer
      );
      
      let tx;
      
      if (direction === 'buy') {
        // Calculate minimum tokens out (with 1% slippage tolerance)
        const tokensOutWei = ethers.utils.parseUnits(tokenAmount, 18);
        const minTokensOut = tokensOutWei.mul(99).div(100); // 1% slippage
        
        // Execute buy transaction
        tx = await swapContract.buyTokens(
          tokenAddress,
          minTokensOut,
          { value: ethers.utils.parseEther(ethAmount) }
        );
      } else {
        // For sell, we need to approve the token first
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenABI,
          signer
        );
        
        // Approve tokens
        const tokenAmountWei = ethers.utils.parseUnits(tokenAmount, 18);
        const approvalTx = await tokenContract.approve(contractConfig.addresses.ScienceGentsSwap, tokenAmountWei);
        await approvalTx.wait();
        
        // Calculate minimum ETH out (with 1% slippage tolerance)
        const ethOutWei = ethers.utils.parseEther(ethAmount);
        const minEthOut = ethOutWei.mul(99).div(100); // 1% slippage
        
        // Execute sell transaction
        tx = await swapContract.sellTokens(
          tokenAddress,
          tokenAmountWei,
          minEthOut
        );
      }
      
      await tx.wait();
      
      toast({
        title: "Transaction Successful",
        description: `Successfully ${direction === 'buy' ? 'bought' : 'sold'} tokens`,
        variant: "default"
      });
      
      // Reset input fields
      setEthAmount('');
      setTokenAmount('');
      
      // Refresh balances
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const balance = await provider.getBalance(accounts[0]);
        setEthBalance(ethers.utils.formatEther(balance));
        
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ["function balanceOf(address owner) view returns (uint256)"],
          provider
        );
        const tokenBalance = await tokenContract.balanceOf(accounts[0]);
        setTokenBalance(ethers.utils.formatUnits(tokenBalance, 18));
      }
    } catch (error) {
      console.error("Swap error:", error);
      toast({
        title: "Swap Failed",
        description: error.message || "Transaction failed",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    direction,
    ethAmount,
    tokenAmount,
    isCalculating,
    isProcessing,
    walletConnected,
    ethBalance,
    tokenBalance,
    toggleDirection,
    connectWallet,
    handleEthAmountChange,
    handleTokenAmountChange,
    executeSwap
  };
};
