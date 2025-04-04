import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from '@/components/ui/use-toast';
import { contractConfig } from '@/utils/contractConfig';
import { recordTokenSwap } from '@/services/priceHistoryService';
import { supabase } from '@/integrations/supabase/client';
import { fetchTokenStats } from '@/services/scienceGent';

// Function to log trade to Supabase
const logTradeToSupabase = async (
  tokenId: string,
  priceInUsd: number,
  volume: number, // Negative for sell, positive for buy
  tradeType: 'buy' | 'sell',
  ethAmount: number,
  valueInUsd: number,
  maker: string
) => {
  try {
    const { data, error } = await supabase
      .from('trades')
      .insert({
        token_id: tokenId,
        price_in_usd: priceInUsd,
        volume: volume,
        time: new Date().toISOString(),
        trade_type: tradeType,
        eth_amount: ethAmount,
        value_in_usd: valueInUsd,
        maker: maker
      });
    
    if (error) {
      console.error('Error logging trade to Supabase:', error);
    }
  } catch (e) {
    console.error('Exception while logging trade to Supabase:', e);
  }
};

export const useSwapTransactions = (tokenAddress: string, onSuccess: () => Promise<void>) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to safely parse token amounts
  const safeParseTokenAmount = (amount: string): ethers.BigNumber => {
    try {
      // Always floor the amount to remove decimals entirely
      const numericValue = parseFloat(amount);
      if (isNaN(numericValue)) {
        console.error("Invalid input amount for parseFloat:", amount);
        throw new Error("Invalid token amount");
      }
      const wholeNumberString = Math.floor(numericValue).toString();
      
      // Convert the whole number string to a BigNumber
      const bn = ethers.BigNumber.from(wholeNumberString);
      
      // Multiply by 10^18 to scale to Wei (assuming 18 decimals)
      const weiMultiplier = ethers.BigNumber.from(10).pow(18);
      return bn.mul(weiMultiplier);

    } catch (error) {
      console.error('Error parsing final floored amount with explicit multiplication:', error);
      toast({
        title: "Amount Error",
        description: "Could not process the token amount. Please enter a valid number.",
        variant: "destructive",
      });
      // Return 0 as a safe fallback
      return ethers.BigNumber.from(0);
    }
  };

  // Function to buy tokens with ETH
  const buyTokens = useCallback(async (ethAmount: string, minTokensOut: string): Promise<boolean> => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setError(null);
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function buyTokens(address,uint256) payable'],
        signer
      );
      
      const ethAmountWei = ethers.utils.parseEther(ethAmount);
      const minTokensOutWei = safeParseTokenAmount(minTokensOut);
      
      const toastId = toast({
        title: "Preparing Transaction",
        description: "Confirm the transaction in your wallet...",
      });
      
      const tx = await swapContract.buyTokens(
        tokenAddress,
        minTokensOutWei,
        { value: ethAmountWei }
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Your purchase is being processed...",
      });
      
      const receipt = await tx.wait();

      // Get current ETH price in USD
      const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethPriceData = await ethPriceResponse.json();
      const ethPriceUSD = ethPriceData.ethereum.usd;

      // Calculate price in USD
      const priceInUsd = parseFloat(ethAmount) * ethPriceUSD / parseFloat(minTokensOut);
      const usdValue = parseFloat(ethAmount) * ethPriceUSD;
      
      // Log trade to Supabase
      await logTradeToSupabase(
        tokenAddress,
        priceInUsd,
        parseFloat(minTokensOut), // Volume (positive for buy)
        'buy',                     // Trade Type
        parseFloat(ethAmount),     // ETH Amount
        usdValue,                  // Value in USD
        userAddress                // Maker
      );
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased approximately ${minTokensOut} tokens for ${ethAmount} ETH.`,
      });
      
      // Record the trade for price history
      await recordTokenSwap(
        tokenAddress,
        true, // isBuy = true for buy
        minTokensOut, // approximate token amount
        ethAmount,
        tx.hash,
        userAddress
      );
      
      // Update token stats in the background
      fetchTokenStats(tokenAddress, ethPriceUSD, false).catch(err => {
        console.error('Error updating token stats after purchase:', err);
      });
      
      await onSuccess();
      return true;
    } catch (e: any) {
      console.error('Error buying tokens:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to buy tokens. Please try again.';
      
      // Check for common errors and simplify them
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('insufficient funds')) {
        errorMsg = 'Insufficient ETH balance for this transaction.';
      } else if (errorMsg.includes('slippage')) {
        errorMsg = 'Transaction would result in too much slippage. Try a smaller amount or increase slippage tolerance.';
      }
      
      setError(errorMsg);
      
      toast({
        title: "Purchase Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsPending(false);
    }
  }, [tokenAddress, onSuccess]);

  // Function to sell tokens for ETH
  const sellTokens = useCallback(async (tokenAmount: string, minEthOut: string): Promise<boolean> => {
    if (!window.ethereum || !tokenAddress) return false;
    
    setError(null);
    setIsPending(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      
      // First approve the swap contract to spend tokens
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function approve(address,uint256) returns (bool)'],
        signer
      );
      
      // Parse token amount using our safe parser
      const tokenAmountWei = safeParseTokenAmount(tokenAmount);
      
      // Safely parse minEthOut, truncating decimals to 18 places
      let minEthOutWei: ethers.BigNumber;
      try {
        const ethParts = minEthOut.split('.');
        const ethIntegerPart = ethParts[0];
        const ethDecimalPart = ethParts[1] || '';
        const truncatedEthDecimal = ethDecimalPart.slice(0, 18);
        const truncatedEthAmount = ethDecimalPart ? `${ethIntegerPart}.${truncatedEthDecimal}` : ethIntegerPart;
        minEthOutWei = ethers.utils.parseEther(truncatedEthAmount);
      } catch (parseError) {
        console.error("Error parsing minEthOut:", parseError);
        toast({
          title: "Amount Error",
          description: "Could not process the minimum ETH amount. Please ensure it is valid.",
          variant: "destructive",
        });
        // Use 0 as fallback if parsing fails, though this might cause reverts if slippage is high
        minEthOutWei = ethers.BigNumber.from(0);
      }

      toast({
        title: "Preparing Transaction",
        description: "Approve token spending in your wallet...",
      });
      
      // Execute approve transaction
      const approveTx = await tokenContract.approve(
        contractConfig.addresses.ScienceGentsSwap,
        tokenAmountWei
      );
      
      toast({
        title: "Approval Submitted",
        description: "Approval is being processed...",
      });
      
      await approveTx.wait();
      
      // Now sell the tokens
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        ['function sellTokens(address,uint256,uint256)'],
        signer
      );
      
      toast({
        title: "Confirm Sale",
        description: "Confirm the sale transaction in your wallet...",
      });
      
      const tx = await swapContract.sellTokens(
        tokenAddress,
        tokenAmountWei,
        minEthOutWei
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Your sale is being processed...",
      });
      
      const receipt = await tx.wait();

      // Get current ETH price in USD
      const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethPriceData = await ethPriceResponse.json();
      const ethPriceUSD = ethPriceData.ethereum.usd;

      // Calculate price in USD
      const priceInUsd = parseFloat(minEthOut) * ethPriceUSD / parseFloat(tokenAmount);
      const usdValue = parseFloat(minEthOut) * ethPriceUSD;
      
      // Log trade to Supabase
      await logTradeToSupabase(
        tokenAddress,
        priceInUsd,
        -parseFloat(tokenAmount), // Volume (negative for sell)
        'sell',                    // Trade Type
        parseFloat(minEthOut),   // ETH Amount
        usdValue,                 // Value in USD
        userAddress               // Maker
      );
      
      toast({
        title: "Sale Successful",
        description: `You have successfully sold ${tokenAmount} tokens for approximately ${parseFloat(minEthOut).toFixed(6)} ETH.`,
      });
      
      // Record the trade for price history
      await recordTokenSwap(
        tokenAddress,
        false, // isBuy = false for sell
        tokenAmount,
        minEthOut, // approximate ETH amount
        tx.hash,
        userAddress
      );
      
      // Update token stats in the background
      fetchTokenStats(tokenAddress, ethPriceUSD, false).catch(err => {
        console.error('Error updating token stats after sale:', err);
      });
      
      await onSuccess();
      return true;
    } catch (e: any) {
      console.error('Error selling tokens:', e);
      
      // Extract readable error message
      let errorMsg = e.message || 'Failed to sell tokens. Please try again.';
      
      // Check for common errors and simplify them
      if (errorMsg.includes('user rejected')) {
        errorMsg = 'Transaction was rejected in your wallet.';
      } else if (errorMsg.includes('insufficient balance')) {
        errorMsg = 'Insufficient token balance for this transaction.';
      } else if (errorMsg.includes('slippage')) {
        errorMsg = 'Transaction would result in too much slippage. Try a smaller amount or increase slippage tolerance.';
      } else if (errorMsg.includes('NUMERIC_FAULT') || errorMsg.includes('fractional component')) {
        // Generic message as we now auto-floor the input
        errorMsg = 'Could not process the token amount. Please ensure it is a valid number.';
      }
      
      setError(errorMsg);
      
      toast({
        title: "Sale Failed",
        description: errorMsg,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsPending(false);
    }
  }, [tokenAddress, onSuccess]);

  return {
    buyTokens,
    sellTokens,
    isPending,
    error
  };
};
