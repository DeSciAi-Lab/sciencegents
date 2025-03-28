import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTokenSwap, SwapDirection } from "@/hooks/useTokenSwap";
import { ArrowDown, ChevronDown, Loader2, ExternalLink, Settings2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ScienceGentCapabilities from "./ScienceGentCapabilities";
import MaturityTracker from "./MaturityTracker";

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
  const [activeTab, setActiveTab] = useState<SwapDirection>('sell');
  const [inputValue, setInputValue] = useState<string>('0.0001');
  const [outputValue, setOutputValue] = useState<string>('0.19807');
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

  useEffect(() => {
    if (activeTab === 'buy') {
      setInputValue('0.0001');
      setOutputValue('0.19807');
    } else {
      setInputValue('0.0001');
      setOutputValue('0.001');
    }
  }, [activeTab]);

  useEffect(() => {
    const updateEstimate = async () => {
      if (!inputValue || parseFloat(inputValue) <= 0) {
        setOutputValue('0');
        return;
      }

      try {
        if (activeTab === 'buy') {
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
  }, [inputValue, activeTab, estimateTokensFromETH, estimateETHFromTokens]);

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

  const PriceHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-gray-50">
        <span className="font-medium">Price 0.000004 ETH</span>
        <span className="text-gray-500">$0.0003</span>
      </div>
      <div className="flex items-center gap-1 px-3 py-2 border rounded-full">
        <Settings2 className="h-5 w-5 mr-1" />
        <span>Slippage</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <PriceHeader />
      
      <Tabs defaultValue="sell" value={activeTab} onValueChange={(val) => setActiveTab(val as SwapDirection)} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-2 bg-transparent p-0">
          <TabsTrigger 
            value="sell" 
            className={`rounded-none border-b-2 ${activeTab === 'sell' ? 'border-primary' : 'border-transparent'} px-0`}
          >
            Sell
          </TabsTrigger>
          <TabsTrigger 
            value="buy" 
            className={`rounded-none border-b-2 ${activeTab === 'buy' ? 'border-primary' : 'border-transparent'} px-0`}
          >
            Buy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sell" className="space-y-4 px-0 pt-4">
          <div className="bg-white rounded-none p-0">
            <div className="flex justify-between items-center">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0.0001"
                className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-5 h-5" />
                </div>
                <span className="font-medium">ETH</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">$0.20</div>
            <div className="flex justify-between mt-1">
              <div></div>
              <div className="flex items-center text-sm text-gray-500">
                <span>&lt;0.001 ETH</span>
                <Button variant="ghost" className="h-6 px-2 py-0 text-sm ml-1">
                  Max
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center my-6">
            <div className="bg-gray-100 p-2 rounded-full">
              <ArrowDown size={24} />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-none p-0">
            <div className="flex justify-between items-center">
              <Input
                type="text"
                value={outputValue}
                readOnly
                placeholder="0.19807"
                className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <span className="text-lg">$</span>
                </div>
                <span className="font-medium">USDT</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">$0.20</div>
          </div>
        </TabsContent>
        
        <TabsContent value="buy" className="space-y-4 px-0 pt-4">
          <div className="bg-white rounded-none p-0">
            <div className="flex justify-between items-center">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0.0"
                className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
                  <span className="text-lg">$</span>
                </div>
                <span className="font-medium">USDT</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">$0.20</div>
          </div>
          
          <div className="flex justify-center my-6">
            <div className="bg-gray-100 p-2 rounded-full">
              <ArrowDown size={24} />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-none p-0">
            <div className="flex justify-between items-center">
              <Input
                type="text"
                value={outputValue}
                readOnly
                placeholder="0.19807"
                className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-5 h-5" />
                </div>
                <span className="font-medium">ETH</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-1">$0.20</div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full h-14 bg-[#f471ff] hover:bg-[#d44ae9] text-white font-medium rounded-full text-lg" 
        onClick={() => activeTab === 'buy' ? buyTokens(inputValue, outputValue) : sellTokens(inputValue, outputValue)}
        disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
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

      <div className="border rounded-xl p-4 mt-6">
        <div className="text-center mb-2">
          <div className="text-xl font-medium">Maturity Status</div>
          <div className="text-2xl font-bold">75%</div>
        </div>
        <Progress value={75} className="h-2 bg-gray-200" />
        <p className="mt-3 text-sm">
          The ScienceGent will become eligible to migrate to Uniswap on generating _____ ETH in trading fee (
          2x virtualETH =___ + capability fees =___)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="border rounded-xl p-3 text-center">
          <div className="text-xl font-bold">1273</div>
          <div className="text-sm text-gray-500">Users</div>
        </div>
        <div className="border rounded-xl p-3 text-center">
          <div className="text-xl font-bold">1273</div>
          <div className="text-sm text-gray-500">Interactions</div>
        </div>
        <div className="border rounded-xl p-3 text-center">
          <div className="text-xl font-bold">1273</div>
          <div className="text-sm text-gray-500">Revenue</div>
        </div>
      </div>

      <div className="border rounded-xl p-4">
        <div className="text-xl font-medium mb-2">5 Capabilities:</div>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white border rounded-full px-3 py-1">Chat</Badge>
          <Badge className="bg-white border rounded-full px-3 py-1">Molecular Vision</Badge>
          <Badge className="bg-white border rounded-full px-3 py-1">LLAMPS</Badge>
          <Badge className="bg-white border rounded-full px-3 py-1">Bose-Einstein Simulation</Badge>
          <Badge className="bg-white border rounded-full px-3 py-1">more</Badge>
        </div>
      </div>
    </div>
  );
};

export default TokenSwapInterface;
