
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowDownUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTokenSwap } from "@/hooks/useTokenSwap";

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
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Current Price</p>
          <p className="text-xl font-semibold">{tokenPrice} ETH per {tokenSymbol}</p>
        </div>
        <div>
          <Button variant="ghost" size="sm" onClick={refreshBalances}>
            <Loader2 className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
          <div className="flex items-center">
            <p className="font-medium">{tokenBalance} {tokenSymbol}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">ETH Balance</p>
          <div className="flex items-center">
            <p className="font-medium">{ethBalance} ETH</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="buy" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="buy">Buy {tokenSymbol}</TabsTrigger>
          <TabsTrigger value="sell">Sell {tokenSymbol}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buy" className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">ETH Amount</p>
            <Input
              type="number"
              placeholder="0.0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="0"
              step="0.001"
            />
            <p className="text-xs text-muted-foreground text-right">Max: {ethBalance} ETH</p>
          </div>
          
          <div className="flex justify-center my-2">
            <ArrowDownUp className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">{tokenSymbol} Amount</p>
            <Input
              type="text"
              placeholder="0.0"
              value={outputValue}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <Button
            onClick={handleSwap}
            className="w-full bg-science-600 hover:bg-science-700 text-white"
            disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Buy {tokenSymbol}
          </Button>
        </TabsContent>
        
        <TabsContent value="sell" className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">{tokenSymbol} Amount</p>
            <Input
              type="number"
              placeholder="0.0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="0"
            />
            <p className="text-xs text-muted-foreground text-right">Max: {tokenBalance} {tokenSymbol}</p>
          </div>
          
          <div className="flex justify-center my-2">
            <ArrowDownUp className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">ETH Amount</p>
            <Input
              type="text"
              placeholder="0.0"
              value={outputValue}
              readOnly
              className="bg-muted"
            />
          </div>
          
          <Button
            onClick={handleSwap}
            className="w-full bg-science-600 hover:bg-science-700 text-white"
            disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sell {tokenSymbol}
          </Button>
        </TabsContent>
      </Tabs>
      
      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default TokenSwapInterface;
