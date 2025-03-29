
import React, { useState, useEffect } from 'react';
import { SwapDirection, useTokenSwap } from "@/hooks/useTokenSwap";
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from '@/components/ui/use-toast';
import SwapInterface from './swap/SwapInterface';

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated?: boolean;
  uniswapPair?: string;
  scienceGent?: any;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated = false,
  uniswapPair,
  scienceGent
}) => {
  const [isEthInput, setIsEthInput] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('0.0001');
  const [outputValue, setOutputValue] = useState<string>('0');
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1); // 1% default slippage
  
  const {
    buyTokens,
    sellTokens,
    estimateTokensFromETH,
    estimateETHFromTokens,
    isPending,
    error,
    tokenBalance,
    ethBalance,
    tokenPrice,
    refreshBalances
  } = useTokenSwap(tokenAddress);

  // Reset values when swap direction changes
  useEffect(() => {
    setInputValue('0.0001');
    setOutputValue('0');
  }, [isEthInput]);

  // Update estimates when input changes
  useEffect(() => {
    const updateEstimate = async () => {
      if (!inputValue || parseFloat(inputValue) <= 0) {
        setOutputValue('0');
        return;
      }

      try {
        if (isEthInput) {
          const tokensOut = await estimateTokensFromETH(inputValue);
          setOutputValue(tokensOut);
        } else {
          const ethOut = await estimateETHFromTokens(inputValue);
          setOutputValue(ethOut);
        }
      } catch (err) {
        console.error('Estimation error:', err);
        setOutputValue('0');
      }
    };

    const debounceTimer = setTimeout(updateEstimate, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, isEthInput, estimateTokensFromETH, estimateETHFromTokens]);

  // Handles max button click
  const handleMaxClick = () => {
    if (isEthInput) {
      // Use 95% of ETH balance to leave room for gas
      const maxAmount = parseFloat(ethBalance) * 0.95;
      if (!isNaN(maxAmount) && maxAmount > 0) {
        setInputValue(maxAmount.toFixed(6));
      }
    } else {
      // For tokens, can use 100% since gas is paid in ETH
      const maxAmount = parseFloat(tokenBalance);
      if (!isNaN(maxAmount) && maxAmount > 0) {
        setInputValue(maxAmount.toFixed(6));
      }
    }
  };

  // Handle swap execution
  const handleSwap = async () => {
    if (!inputValue || parseFloat(inputValue) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (isEthInput) {
        // Buying tokens with ETH
        const minTokensOut = parseFloat(outputValue) * (1 - slippageTolerance/100);
        await buyTokens(inputValue, minTokensOut.toString());
      } else {
        // Selling tokens for ETH
        const minEthOut = parseFloat(outputValue) * (1 - slippageTolerance/100);
        await sellTokens(inputValue, minEthOut.toString());
      }
    } catch (err) {
      console.error('Swap error:', err);
      toast({
        title: "Swap Failed",
        description: "There was an error executing the swap. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Toggle between buy and sell modes
  const toggleDirection = () => {
    setIsEthInput(!isEthInput);
  };

  // If the token is migrated to Uniswap, show a different UI
  if (isMigrated) {
    return (
      <div className="p-4 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            This token has been migrated to Uniswap and is now tradable on the Uniswap exchange.
          </AlertDescription>
        </Alert>
        
        <Button variant="outline" className="w-full flex items-center gap-2" asChild>
          <a 
            href={`https://app.uniswap.org/explore/tokens/ethereum_sepolia/${tokenAddress.toLowerCase()}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Trade on Uniswap
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  // Determine token name to display
  const tokenName = scienceGent?.name || "ScienceGent";

  return (
    <div className="space-y-4">
      <SwapInterface 
        isEthInput={isEthInput}
        toggleDirection={toggleDirection}
        tokenSymbol={tokenSymbol}
        tokenName={tokenName}
        ethBalance={ethBalance}
        tokenBalance={tokenBalance}
        inputValue={inputValue}
        outputValue={outputValue}
        onInputChange={setInputValue}
        isPending={isPending}
        slippageTolerance={slippageTolerance}
        onSlippageChange={setSlippageTolerance}
        onMaxClick={handleMaxClick}
        onSwap={handleSwap}
      />
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default TokenSwapInterface;
