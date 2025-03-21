
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap } from "@/hooks/useTokenSwap";
import TokenBalanceInfo from "./swap/TokenBalanceInfo";
import BuyTokenForm from "./swap/BuyTokenForm";
import SellTokenForm from "./swap/SellTokenForm";
import SwapError from "./swap/SwapError";

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  
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

    updateEstimate();
  }, [inputValue, activeTab, estimateTokensFromETH, estimateETHFromTokens]);

  // Switch between buy and sell tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'buy' | 'sell');
    setInputValue('');
    setOutputValue('0');
  };

  // Execute swap
  const handleSwap = async () => {
    if (!inputValue || parseFloat(inputValue) <= 0) return;

    try {
      if (activeTab === 'buy') {
        await buyTokens(inputValue, outputValue);
      } else {
        await sellTokens(inputValue, outputValue);
      }
      
      // Reset form after successful swap
      setInputValue('');
      setOutputValue('0');
      
      // Refresh balances
      refreshBalances();
    } catch (err) {
      console.error('Swap error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <TokenBalanceInfo
        tokenSymbol={tokenSymbol}
        tokenPrice={tokenPrice}
        tokenBalance={tokenBalance}
        ethBalance={ethBalance}
        isPending={isPending}
        onRefresh={refreshBalances}
      />
      
      <Tabs defaultValue="buy" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 mb-4">
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
            onInputChange={setInputValue}
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
            onInputChange={setInputValue}
            onSwap={handleSwap}
          />
        </TabsContent>
      </Tabs>
      
      <SwapError error={error} />
    </div>
  );
};

export default TokenSwapInterface;
