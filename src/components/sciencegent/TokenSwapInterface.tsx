
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap, SwapDirection } from "@/hooks/useTokenSwap";
import TokenBalanceInfo from "./swap/TokenBalanceInfo";
import BuyTokenForm from "./swap/BuyTokenForm";
import SellTokenForm from "./swap/SellTokenForm";
import SwapError from "./swap/SwapError";
import { ArrowDown, ChevronDown, Settings, Loader2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        </CardContent>
      </Card>
    );
  }

  // Price header section
  const PriceHeader = () => (
    <div className="flex items-center justify-between border rounded-lg py-2 px-3 mb-4 bg-gray-50">
      <div>
        <span className="text-sm">Price 0.000004 ETH</span>
        <span className="block text-sm text-gray-500">$0.0003</span>
      </div>
      <div className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
        <Settings size={12} />
        <span>Slippage {slippageTolerance}%</span>
      </div>
    </div>
  );

  // Sell tab content
  const SellTabContent = () => (
    <div className="space-y-4">
      <div>
        <p className="text-gray-500 mb-1">Sell</p>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="flex justify-between mb-1">
            <p className="text-xs text-gray-400">You sell</p>
            <p className="text-xs text-gray-400">Balance: {parseFloat(tokenBalance).toFixed(4)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0.0001"
              className="text-2xl font-medium border-0 p-0 h-auto bg-transparent w-3/5"
            />
            <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-[#6159dc] flex items-center justify-center text-white">
                <span className="text-xs">{tokenSymbol.substring(0, 1)}</span>
              </div>
              <span className="font-medium">{tokenSymbol}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">$0.20</div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-full">
          <ArrowDown size={16} />
        </div>
      </div>
      
      <div>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="flex justify-between mb-1">
            <p className="text-xs text-gray-400">You receive</p>
            <p className="text-xs text-gray-400">Balance: {parseFloat(ethBalance).toFixed(4)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Input
              type="text"
              value={outputValue}
              placeholder="0.0"
              readOnly
              className="text-2xl font-medium border-0 p-0 h-auto bg-transparent w-3/5"
            />
            <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-3 h-3" />
              </div>
              <span className="font-medium">ETH</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">$0.20</div>
        </div>
      </div>
    </div>
  );

  // Buy tab content
  const BuyTabContent = () => (
    <div className="space-y-4">
      <div>
        <p className="text-gray-500 mb-1">Buy</p>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="flex justify-between mb-1">
            <p className="text-xs text-gray-400">You pay</p>
            <p className="text-xs text-gray-400">Balance: {parseFloat(ethBalance).toFixed(4)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0.0"
              className="text-2xl font-medium border-0 p-0 h-auto bg-transparent w-3/5"
            />
            <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-3 h-3" />
              </div>
              <span className="font-medium">ETH</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">$0.20</div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-full">
          <ArrowDown size={16} />
        </div>
      </div>
      
      <div>
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="flex justify-between mb-1">
            <p className="text-xs text-gray-400">You receive</p>
            <p className="text-xs text-gray-400">Balance: {parseFloat(tokenBalance).toFixed(4)}</p>
          </div>
          <div className="flex justify-between items-center">
            <Input
              type="text"
              value={outputValue}
              readOnly
              placeholder="0.19807"
              className="text-2xl font-medium border-0 p-0 h-auto bg-transparent w-3/5"
            />
            <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
              <div className="w-5 h-5 rounded-full bg-[#6159dc] flex items-center justify-center text-white">
                <span className="text-xs">{tokenSymbol.substring(0, 1)}</span>
              </div>
              <span className="font-medium">{tokenSymbol}</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1">$0.20</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <PriceHeader />
      
      <Tabs defaultValue="sell" onValueChange={(val) => setActiveTab(val as SwapDirection)} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="buy">Buy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sell">
          <SellTabContent />
        </TabsContent>
        
        <TabsContent value="buy">
          <BuyTabContent />
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full h-12 bg-[#e963fc] hover:bg-[#d44ae9] text-white font-medium rounded-full" 
        onClick={() => activeTab === 'buy' ? buyTokens(inputValue, outputValue) : sellTokens(inputValue, outputValue)}
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
      
      <div className="text-xs text-center text-gray-500 mt-2">
        1 USDT = 0.00050464 ETH ($1.00)
      </div>
      
      <SwapError error={error} />
    </div>
  );
};

export default TokenSwapInterface;
