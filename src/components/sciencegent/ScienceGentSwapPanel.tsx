
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

interface ScienceGentSwapPanelProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated: boolean;
}

const ScienceGentSwapPanel: React.FC<ScienceGentSwapPanelProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated
}) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  // Sample token price data
  const tokenPrice = 0.000004;
  const formattedPrice = tokenPrice.toFixed(7);

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Price {formattedPrice} ETH</p>
            <p className="text-sm text-gray-500">${(tokenPrice * 3000).toFixed(7)}</p>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded">
            Slippage {0.5}%
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b rounded-none">
          <TabsTrigger value="sell" className="flex-1">Sell</TabsTrigger>
          <TabsTrigger value="buy" className="flex-1">Buy</TabsTrigger>
        </TabsList>
        
        <CardContent className="p-4">
          <TabsContent value="sell" className="pt-2 space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-500">You sell</p>
                <p className="text-xs text-gray-500">Balance: 1.2345</p>
              </div>
              <div className="flex justify-between items-center">
                <Input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0.0"
                  className="text-xl font-medium border-0 p-0 h-auto bg-transparent"
                />
                <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs">{tokenSymbol.substring(0, 1)}</span>
                  </div>
                  <span className="font-medium">{tokenSymbol}</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gray-100 p-1 rounded-full">
                <ArrowDown size={16} />
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-500">You receive</p>
                <p className="text-xs text-gray-500">Balance: 0.123</p>
              </div>
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  value={sellAmount ? (parseFloat(sellAmount) * tokenPrice).toFixed(8) : ''}
                  placeholder="0.0"
                  readOnly
                  className="text-xl font-medium border-0 p-0 h-auto bg-transparent"
                />
                <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs">E</span>
                  </div>
                  <span className="font-medium">ETH</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            
            <div className="py-2 text-center text-xs text-gray-500">
              1 {tokenSymbol} = {formattedPrice} ETH (${(tokenPrice * 3000).toFixed(7)})
            </div>
            
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              Review
            </Button>
          </TabsContent>
          
          <TabsContent value="buy" className="pt-2 space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-500">You pay</p>
                <p className="text-xs text-gray-500">Balance: 0.123</p>
              </div>
              <div className="flex justify-between items-center">
                <Input
                  type="number"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  placeholder="0.0"
                  className="text-xl font-medium border-0 p-0 h-auto bg-transparent"
                />
                <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs">E</span>
                  </div>
                  <span className="font-medium">ETH</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gray-100 p-1 rounded-full">
                <ArrowDown size={16} />
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg border">
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-500">You receive</p>
                <p className="text-xs text-gray-500">Balance: 1.2345</p>
              </div>
              <div className="flex justify-between items-center">
                <Input
                  type="text"
                  value={buyAmount ? (parseFloat(buyAmount) / tokenPrice).toFixed(8) : ''}
                  placeholder="0.0"
                  readOnly
                  className="text-xl font-medium border-0 p-0 h-auto bg-transparent"
                />
                <div className="flex items-center gap-1 bg-white border rounded-lg px-2 py-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs">{tokenSymbol.substring(0, 1)}</span>
                  </div>
                  <span className="font-medium">{tokenSymbol}</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>
            
            <div className="py-2 text-center text-xs text-gray-500">
              1 ETH = {(1 / tokenPrice).toFixed(2)} {tokenSymbol} (${3000})
            </div>
            
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              Review
            </Button>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default ScienceGentSwapPanel;
