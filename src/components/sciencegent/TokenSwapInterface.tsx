
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap, SwapDirection } from "@/hooks/useTokenSwap";
import { ArrowDown, ChevronDown, Settings, Loader2, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [activeTab, setActiveTab] = useState<SwapDirection>('sell');
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
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
      <div className="p-4 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            This token has been migrated to Uniswap and is now tradable on the Uniswap exchange.
          </AlertDescription>
        </Alert>
        
        <Button variant="outline" className="w-full flex items-center gap-2" asChild>
          <a href={getUniswapLink()} target="_blank" rel="noopener noreferrer">
            Trade on Uniswap
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  // Price header section
  const PriceHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
        <span>Price 0.0000004 ETH</span>
        <span className="text-gray-500">$0.0003</span>
      </div>
      <div className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full">
        <Settings size={12} />
        <span>Slippage {slippageTolerance}%</span>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <PriceHeader />
      
      <Tabs defaultValue="sell" value={activeTab} onValueChange={(val) => setActiveTab(val as SwapDirection)} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="buy">Buy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sell" className="space-y-4">
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
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
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
                  readOnly
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
        </TabsContent>
        
        <TabsContent value="buy" className="space-y-4">
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
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <span className="text-xs">{tokenSymbol.substring(0, 1)}</span>
                  </div>
                  <span className="font-medium">{tokenSymbol}</span>
                  <ChevronDown size={14} />
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">$0.20</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full h-12 bg-[#f471ff] hover:bg-[#d44ae9] text-white font-medium rounded-full" 
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
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default TokenSwapInterface;
