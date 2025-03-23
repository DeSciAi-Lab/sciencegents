
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap, SwapDirection } from "@/hooks/useTokenSwap";
import TokenBalanceInfo from "./swap/TokenBalanceInfo";
import BuyTokenForm from "./swap/BuyTokenForm";
import SellTokenForm from "./swap/SellTokenForm";
import SwapError from "./swap/SwapError";
import { AlertCircle, Loader2, ExternalLink, Settings } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated?: boolean;
  uniswapPair?: string;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated = false,
  uniswapPair
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

      let success = false;
      if (activeTab === 'buy') {
        success = await buyTokens(inputValue, minOutputStr);
      } else {
        success = await sellTokens(inputValue, minOutputStr);
      }
      
      // Reset form after successful swap
      if (success) {
        setInputValue('');
        setOutputValue('0');
      }
    } catch (err) {
      console.error('Swap error:', err);
    }
  };

  // Get Uniswap link for the token
  const getUniswapLink = () => {
    if (!tokenAddress) return "#";
    return `https://app.uniswap.org/explore/tokens/ethereum_sepolia/${tokenAddress.toLowerCase()}`;
  };

  if (isMigrated) {
    return (
      <Card className="rounded-md">
        <CardContent className="p-4 space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <div className="flex flex-col space-y-4">
              <AlertDescription className="text-blue-800">
                This token has been migrated to Uniswap and is now tradable on the Uniswap exchange.
              </AlertDescription>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <a 
                  href={getUniswapLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Trade on Uniswap
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Alert>
          
          <TokenBalanceInfo
            tokenSymbol={tokenSymbol}
            tokenPrice={tokenPrice}
            tokenBalance={tokenBalance}
            ethBalance={ethBalance}
            isPending={isPending}
            onRefresh={refreshBalances}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-md">
      {/* Price header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-bold">Price {tokenPrice}</span>
              <span className="text-sm text-gray-500">ETH</span>
              <span className="text-sm text-gray-500">$0.0003</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1 px-2">
          <Settings size={16} />
          <span>Slippage</span>
        </Button>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div className="grid">
          <div className="mb-2">
            <span className="text-gray-500">{activeTab === 'sell' ? 'Sell' : 'Buy'}</span>
          </div>
          
          <Tabs defaultValue="buy" onValueChange={handleTabChange} className="w-full">
            <div className="hidden">
              <TabsList>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="buy" className="mt-0">
              <BuyTokenForm
                tokenSymbol={tokenSymbol}
                inputValue={inputValue}
                outputValue={outputValue}
                ethBalance={ethBalance}
                isPending={isPending}
                slippageTolerance={slippageTolerance}
                onInputChange={setInputValue}
                onSlippageChange={setSlippageTolerance}
                onSwap={handleSwap}
              />
            </TabsContent>
            
            <TabsContent value="sell" className="mt-0">
              <SellTokenForm
                tokenSymbol={tokenSymbol}
                inputValue={inputValue}
                outputValue={outputValue}
                tokenBalance={tokenBalance}
                isPending={isPending}
                slippageTolerance={slippageTolerance}
                onInputChange={setInputValue}
                onSlippageChange={setSlippageTolerance}
                onSwap={handleSwap}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <Button 
          className="w-full h-12 mt-4 bg-purple-500 hover:bg-purple-600" 
          onClick={handleSwap}
          disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {activeTab === 'buy' ? 'Buying...' : 'Selling...'}
            </>
          ) : (
            'Review'
          )}
        </Button>
        
        <div className="text-xs text-gray-500 text-center">
          1 USDT = 0.00050464 ETH ($1.00)
        </div>
        
        <SwapError error={error} />
      </CardContent>
    </Card>
  );
};

export default TokenSwapInterface;
