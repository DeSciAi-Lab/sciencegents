
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from "@/components/ui/use-toast";
import { contractConfig } from '@/utils/contractConfig';

// Define the swap direction type
export type SwapDirection = 'buy' | 'sell';

// Define ABI for token contract (minimal ERC20 interface)
const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)"
];

// Define ABI for swap contract (minimal interface)
const swapABI = [
  "function buyTokens(address token, uint256 minTokensOut) payable",
  "function sellTokens(address token, uint256 tokenAmount, uint256 minEthOut)",
  "function calculateTokensFromETH(address token, uint256 ethInput) view returns (uint256)",
  "function calculateETHFromTokens(address token, uint256 tokenInput) view returns (uint256)",
  "function calculateETHRequiredForTokens(address token, uint256 tokenAmount) view returns (uint256)",
  "function calculateTokensRequiredForETH(address token, uint256 desiredEthAmount) view returns (uint256)"
];

// Main hook implementation
export const useTokenSwap = (tokenAddress: string) => {
  // State variables
  const [direction, setDirection] = useState<SwapDirection>('buy');
  const [ethAmount, setEthAmount] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  
  // Check wallet connection
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          setWalletConnected(accounts.length > 0);
          
          if (accounts.length > 0) {
            // Get ETH balance
            const balance = await provider.getBalance(accounts[0]);
            setEthBalance(ethers.utils.formatEther(balance));
            
            // Get token balance
            if (tokenAddress) {
              const tokenContract = new ethers.Contract(
                tokenAddress,
                tokenABI,
                provider
              );
              const tokenBalance = await tokenContract.balanceOf(accounts[0]);
              setTokenBalance(ethers.utils.formatUnits(tokenBalance, 18));
              
              // Get token price
              try {
                const swapContract = new ethers.Contract(
                  contractConfig.addresses.ScienceGentsSwap,
                  swapABI,
                  provider
                );
                const oneToken = ethers.utils.parseUnits("1", 18);
                const ethAmount = await swapContract.calculateETHFromTokens(tokenAddress, oneToken);
                setTokenPrice(parseFloat(ethers.utils.formatEther(ethAmount)));
              } catch (error) {
                console.error("Error fetching token price:", error);
              }
            }
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkConnection();
    
    // Setup event listeners for account and chain changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        checkConnection();
        // Reset state when account changes
        setEthAmount('');
        setTokenAmount('');
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      // Remove event listeners
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkConnection);
      }
    };
  }, [tokenAddress]);

  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Wallet Found",
        description: "Please install MetaMask or another Ethereum wallet provider.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      // Check if on the right network (Sepolia)
      const network = await provider.getNetwork();
      if (network.chainId !== parseInt(contractConfig.network.chainId, 16)) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: contractConfig.network.chainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: contractConfig.network.chainId,
                    chainName: contractConfig.network.chainName,
                    nativeCurrency: contractConfig.network.nativeCurrency,
                    rpcUrls: contractConfig.network.rpcUrls,
                    blockExplorerUrls: contractConfig.network.blockExplorerUrls,
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding Ethereum chain:", addError);
            }
          }
        }
      }
      
      const accounts = await provider.listAccounts();
      setWalletConnected(accounts.length > 0);
      
      toast({
        title: "Wallet Connected",
        description: `Connected with ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
      });
      
      // Update balances
      if (accounts.length > 0) {
        const balance = await provider.getBalance(accounts[0]);
        setEthBalance(ethers.utils.formatEther(balance));
        
        if (tokenAddress) {
          const tokenContract = new ethers.Contract(
            tokenAddress,
            tokenABI,
            provider
          );
          const tokenBalance = await tokenContract.balanceOf(accounts[0]);
          setTokenBalance(ethers.utils.formatUnits(tokenBalance, 18));
        }
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    }
  };

  // Toggle swap direction
  const toggleDirection = useCallback(() => {
    setDirection(prev => prev === 'buy' ? 'sell' : 'buy');
  }, []);

  // Calculate output amount based on input
  const calculateOutput = useCallback(async (amount: string, isEthInput: boolean) => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return;
    }
    
    setIsCalculating(true);
    
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found");
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        provider
      );
      
      if (isEthInput) {
        // ETH to Token (Buy)
        const ethInput = ethers.utils.parseEther(amount);
        const tokensOut = await swapContract.calculateTokensFromETH(tokenAddress, ethInput);
        setTokenAmount(ethers.utils.formatUnits(tokensOut, 18));
      } else {
        // Token to ETH (Sell)
        const tokenInput = ethers.utils.parseUnits(amount, 18);
        const ethOut = await swapContract.calculateETHFromTokens(tokenAddress, tokenInput);
        setEthAmount(ethers.utils.formatEther(ethOut));
      }
    } catch (error) {
      console.error("Error calculating output:", error);
    } finally {
      setIsCalculating(false);
    }
  }, [tokenAddress]);

  // Handle ETH amount change
  const handleEthAmountChange = useCallback((value: string) => {
    setEthAmount(value);
    
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      if (parseFloat(value) > parseFloat(ethBalance)) {
        // Not enough ETH
        return;
      }
      
      // Calculate token amount
      calculateOutput(value, true);
    } else {
      setTokenAmount('');
    }
  }, [ethBalance, calculateOutput]);

  // Handle token amount change
  const handleTokenAmountChange = useCallback((value: string) => {
    setTokenAmount(value);
    
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      if (parseFloat(value) > parseFloat(tokenBalance)) {
        // Not enough tokens
        return;
      }
      
      // Calculate ETH amount
      calculateOutput(value, false);
    } else {
      setEthAmount('');
    }
  }, [tokenBalance, calculateOutput]);

  // Execute swap function
  const executeSwap = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Wallet Found",
        description: "Please install MetaMask or another Ethereum wallet provider.",
        variant: "destructive"
      });
      return;
    }
    
    if (!ethAmount || !tokenAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length === 0) {
        throw new Error("No connected account found");
      }
      
      const signer = provider.getSigner();
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapABI,
        signer
      );
      
      let tx;
      
      if (direction === 'buy') {
        // Buying tokens with ETH
        const ethInput = ethers.utils.parseEther(ethAmount);
        const minTokensOut = ethers.utils.parseUnits(
          (parseFloat(tokenAmount) * 0.95).toFixed(18), // 5% slippage tolerance
          18
        );
        
        tx = await swapContract.buyTokens(tokenAddress, minTokensOut, {
          value: ethInput
        });
      } else {
        // Selling tokens for ETH
        const tokenAmountBN = ethers.utils.parseUnits(tokenAmount, 18);
        const minEthOut = ethers.utils.parseEther(
          (parseFloat(ethAmount) * 0.95).toFixed(18) // 5% slippage tolerance
        );
        
        // First need to approve the swap contract to spend tokens
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenABI,
          signer
        );
        
        // Check allowance
        const allowance = await tokenContract.allowance(accounts[0], contractConfig.addresses.ScienceGentsSwap);
        
        if (allowance.lt(tokenAmountBN)) {
          const approveTx = await tokenContract.approve(
            contractConfig.addresses.ScienceGentsSwap,
            ethers.constants.MaxUint256 // Approve maximum amount
          );
          
          toast({
            title: "Approval Pending",
            description: "Please confirm the token approval transaction",
          });
          
          await approveTx.wait();
          
          toast({
            title: "Approval Successful",
            description: "Token spending approved. Proceeding with swap...",
          });
        }
        
        tx = await swapContract.sellTokens(tokenAddress, tokenAmountBN, minEthOut);
      }
      
      toast({
        title: "Transaction Submitted",
        description: "Your swap transaction has been submitted. Please wait for confirmation...",
      });
      
      await tx.wait();
      
      toast({
        title: "Swap Successful",
        description: `Successfully ${direction === 'buy' ? 'bought' : 'sold'} tokens!`,
      });
      
      // Update balances after swap
      const newEthBalance = await provider.getBalance(accounts[0]);
      setEthBalance(ethers.utils.formatEther(newEthBalance));
      
      const tokenContract = new ethers.Contract(
        tokenAddress,
        tokenABI,
        provider
      );
      const newTokenBalance = await tokenContract.balanceOf(accounts[0]);
      setTokenBalance(ethers.utils.formatUnits(newTokenBalance, 18));
      
      // Reset input fields
      setEthAmount('');
      setTokenAmount('');
    } catch (error: any) {
      console.error("Error executing swap:", error);
      toast({
        title: "Swap Failed",
        description: error.message || "Failed to execute swap",
        variant: "destructive"
      });
      throw error; // Rethrow to be handled by the component
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Return hook values and functions
  return {
    direction,
    ethAmount,
    tokenAmount,
    isCalculating,
    isProcessing,
    walletConnected,
    ethBalance,
    tokenBalance,
    tokenPrice,
    toggleDirection,
    connectWallet,
    handleEthAmountChange,
    handleTokenAmountChange,
    executeSwap
  };
};
