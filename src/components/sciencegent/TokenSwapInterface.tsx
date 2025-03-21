
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap, SwapDirection } from "@/hooks/useTokenSwap";
import TokenBalanceInfo from "./swap/TokenBalanceInfo";
import BuyTokenForm from "./swap/BuyTokenForm";
import SellTokenForm from "./swap/SellTokenForm";
import SwapError from "./swap/SwapError";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol
}) => {
  const [activeTab, setActiveTab] = useState<SwapDirection>('buy');
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1); // 1% default slippage
  const isMobile = useIsMobile();
  
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

  // Reset form when tab changes
  useEffect(() => {
    setInputValue('');
    setOutputValue('0');
  }, [activeTab]);

  // Update output estimate when input changes
  useEffect(() => {
    const updateEstimate = async () => {
      if (!inputValue || parseFloat(inputValue) <= 0) {
        setOutputValue('0');
        return;
      }

      try {
        if (activeTab === 'buy') {
          // ETH to Token
          const tokensOut = await estimateTokensFromETH(inputValue);
          setOutputValue(tokensOut);
        } else {
          // Token to ETH
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
  }, [inputValue, activeTab, estimateTokensFromETH, estimateETHFromTokens]);

  // Switch between buy and sell tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value as SwapDirection);
  };

  // Execute swap
  const handleSwap = async () => {
    if (!inputValue || parseFloat(inputValue) <= 0) return;

    try {
      // Apply slippage tolerance to minimum output
      const minOutput = parseFloat(outputValue) * (1 - slippageTolerance / 100);
      const minOutputStr = minOutput.toString();

      if (activeTab === 'buy') {
        await buyTokens(inputValue, minOutputStr);
      } else {
        await sellTokens(inputValue, minOutputStr);
      }
      
      // Reset form after successful swap
      setInputValue('');
      setOutputValue('0');
    } catch (err) {
      console.error('Swap error:', err);
    }
  };

  const handleSlippageChange = (value: number) => {
    setSlippageTolerance(value);
  };

  return (
    <Card className={`${isMobile ? 'p-2' : 'p-4'}`}>
      <CardContent className="space-y-6 pt-4">
        <TokenBalanceInfo
          tokenSymbol={tokenSymbol}
          tokenPrice={tokenPrice}
          tokenBalance={tokenBalance}
          ethBalance={ethBalance}
          isPending={isPending}
          onRefresh={refreshBalances}
        />
        
        {/* Show notification if token price is zero */}
        {parseFloat(tokenPrice) === 0 && (
          <Alert variant="destructive" className="my-2">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              This token doesn't have liquidity yet or trading is disabled.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="buy" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="buy">Buy {tokenSymbol}</TabsTrigger>
            <TabsTrigger value="sell">Sell {tokenSymbol}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy">
            <BuyTokenForm
              tokenSymbol={tokenSymbol}
              inputValue={inputValue}
              outputValue={outputValue}
              ethBalance={ethBalance}
              isPending={isPending}
              slippageTolerance={slippageTolerance}
              onInputChange={setInputValue}
              onSlippageChange={handleSlippageChange}
              onSwap={handleSwap}
            />
          </TabsContent>
          
          <TabsContent value="sell">
            <SellTokenForm
              tokenSymbol={tokenSymbol}
              inputValue={inputValue}
              outputValue={outputValue}
              tokenBalance={tokenBalance}
              isPending={isPending}
              slippageTolerance={slippageTolerance}
              onInputChange={setInputValue}
              onSlippageChange={handleSlippageChange}
              onSwap={handleSwap}
            />
          </TabsContent>
        </Tabs>
        
        <SwapError error={error} />
      </CardContent>
    </Card>
  );
};

export default TokenSwapInterface;
