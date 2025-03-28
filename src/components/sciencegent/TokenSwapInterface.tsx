
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowDown } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated: boolean;
  uniswapPair?: string;
  scienceGent?: any;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated,
  uniswapPair,
  scienceGent
}) => {
  const { formatEthToUsd } = useEthPriceContext();
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('sell');
  const tokenPrice = scienceGent?.token_price || 0.0000004;
  const priceUSD = formatEthToUsd(tokenPrice);
  const maturityProgress = scienceGent?.maturity_progress || 75;
  const virtualETH = scienceGent?.virtual_eth || 1.5;
  
  // Example values for UI
  const [sellAmount, setSellAmount] = useState("0.0001");
  const [buyAmount, setBuyAmount] = useState("0.19807");
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 border-b pb-3">
        <div className="flex items-baseline">
          <div className="text-lg font-medium">Price {tokenPrice.toFixed(7)} ETH</div>
          <div className="ml-2 text-sm text-gray-500">{priceUSD}</div>
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <div className="flex gap-1 mb-3">
          <Button 
            variant={activeTab === 'sell' ? 'default' : 'outline'} 
            size="sm"
            className="w-1/2"
            onClick={() => setActiveTab('sell')}
          >
            Sell
          </Button>
          <Button 
            variant={activeTab === 'buy' ? 'default' : 'outline'} 
            size="sm"
            className="w-1/2"
            onClick={() => setActiveTab('buy')}
          >
            Buy
          </Button>
        </div>

        {activeTab === 'sell' ? (
          <div>
            <div className="bg-gray-50 p-4 rounded-md mb-3">
              <div className="text-sm text-gray-500 mb-1">You Sell</div>
              <div className="flex items-center gap-2">
                <Input
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="border-none bg-transparent p-0 text-xl font-medium h-auto"
                />
                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  ETH
                </Badge>
              </div>
              <div className="text-xs text-gray-500">$0.20</div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-white border rounded-full p-1">
                <ArrowDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mt-1">
              <div className="text-sm text-gray-500 mb-1">You Receive</div>
              <div className="flex items-center gap-2">
                <Input
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="border-none bg-transparent p-0 text-xl font-medium h-auto"
                  readOnly
                />
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  USDT
                </Badge>
              </div>
              <div className="text-xs text-gray-500">$0.20</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 p-4 rounded-md mb-3">
              <div className="text-sm text-gray-500 mb-1">You Pay</div>
              <div className="flex items-center gap-2">
                <Input
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="border-none bg-transparent p-0 text-xl font-medium h-auto"
                />
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  USDT
                </Badge>
              </div>
              <div className="text-xs text-gray-500">$0.20</div>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-white border rounded-full p-1">
                <ArrowDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mt-1">
              <div className="text-sm text-gray-500 mb-1">You Receive</div>
              <div className="flex items-center gap-2">
                <Input
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="border-none bg-transparent p-0 text-xl font-medium h-auto"
                  readOnly
                />
                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  ETH
                </Badge>
              </div>
              <div className="text-xs text-gray-500">$0.20</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm text-gray-700">1 USDT ≈ 0.00050484 ETH ($1.00)</div>
          <div className="text-xs text-gray-500">$0.39 ↓</div>
        </div>
      </div>
      
      <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">
        Review
      </Button>
      
      {/* Maturity Status Section */}
      <div className="mt-6 bg-gray-50 rounded-md p-4 border">
        <div className="text-center mb-2">
          <div className="text-lg font-medium">Maturity Status</div>
          <div className="text-xl font-bold">{maturityProgress}%</div>
        </div>
        
        <div className="mb-3">
          <Progress 
            value={maturityProgress} 
            className="h-2" 
          />
        </div>
        
        <div className="text-sm text-gray-600">
          The ScienceGent will become eligible to migrate to Uniswap on generating ___ ETH in trading fee ( 2× virtualETH = {(virtualETH * 2).toFixed(2)} + capability fees = ___)
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white border rounded p-2 text-center">
            <p className="text-xs text-gray-500">Users</p>
            <p className="font-medium">1273</p>
          </div>
          <div className="bg-white border rounded p-2 text-center">
            <p className="text-xs text-gray-500">Interactions</p>
            <p className="font-medium">1273</p>
          </div>
          <div className="bg-white border rounded p-2 text-center">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="font-medium">1273</p>
          </div>
        </div>
      </div>
      
      {/* Capabilities Section */}
      <div className="mt-4 bg-gray-50 rounded-md p-4 border">
        <div className="mb-2">
          <span className="font-medium">5 Capabilities:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white border">Chat</Badge>
          <Badge className="bg-white border">Molecular Vision</Badge>
          <Badge className="bg-white border">LLAMPS</Badge>
          <Badge className="bg-white border">Bose-Einstein Simulation</Badge>
          <Badge className="bg-white border">more</Badge>
        </div>
      </div>
    </div>
  );
};

export default TokenSwapInterface;
