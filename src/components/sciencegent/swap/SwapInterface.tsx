
import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowDown, Settings2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEthPrice } from '@/hooks/useEthPrice';

interface SwapInterfaceProps {
  // Swap direction
  isEthInput: boolean;
  toggleDirection: () => void;
  
  // Token and balance info
  tokenSymbol: string;
  tokenName: string;
  ethBalance: string;
  tokenBalance: string;
  
  // Input/output values
  inputValue: string;
  outputValue: string;
  onInputChange: (value: string) => void;
  
  // Transaction state
  isPending: boolean;
  slippageTolerance: number;
  onSlippageChange: (value: number) => void;
  
  // Actions
  onMaxClick: () => void;
  onSwap: () => void;
}

const SwapInterface: React.FC<SwapInterfaceProps> = ({
  isEthInput,
  toggleDirection,
  tokenSymbol,
  tokenName,
  ethBalance,
  tokenBalance,
  inputValue,
  outputValue,
  onInputChange,
  isPending,
  slippageTolerance,
  onSlippageChange,
  onMaxClick,
  onSwap
}) => {
  const { ethPrice } = useEthPrice();
  
  // Calculate USD values
  const calculateUsdValue = (ethAmount: string): string => {
    if (!ethAmount || isNaN(parseFloat(ethAmount)) || !ethPrice) return "$0.00";
    return `$${(parseFloat(ethAmount) * ethPrice).toFixed(2)}`;
  };
  
  // Formats for display
  const formatBalance = (balance: string): string => {
    const num = parseFloat(balance);
    if (isNaN(num)) return "0";
    return num < 0.001 ? `<0.001` : num.toFixed(num < 1 ? 4 : 2);
  };
  
  // The top token is either ETH (when buying) or the token (when selling)
  const TopToken = () => (
    <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
        {isEthInput ? (
          <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-5 h-5" />
        ) : (
          <div className="w-full h-full bg-teal-500 text-white flex items-center justify-center">
            <span className="text-lg">{tokenSymbol.charAt(0)}</span>
          </div>
        )}
      </div>
      <span className="font-medium">{isEthInput ? "ETH" : tokenSymbol}</span>
      <ChevronDown className="h-4 w-4 ml-1" />
    </div>
  );
  
  // The bottom token is either the token (when buying) or ETH (when selling)
  const BottomToken = () => (
    <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
        {!isEthInput ? (
          <img src="https://ethereum.org/favicon-32x32.png" alt="ETH" className="w-5 h-5" />
        ) : (
          <div className="w-full h-full bg-teal-500 text-white flex items-center justify-center">
            <span className="text-lg">{tokenSymbol.charAt(0)}</span>
          </div>
        )}
      </div>
      <span className="font-medium">{!isEthInput ? "ETH" : tokenSymbol}</span>
      <ChevronDown className="h-4 w-4 ml-1" />
    </div>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-medium">
          {isEthInput ? "Buy" : "Sell"}
        </div>
        <div className="flex items-center gap-1">
          <SlippageSettings 
            slippageTolerance={slippageTolerance} 
            onSlippageChange={onSlippageChange} 
          />
        </div>
      </div>
      
      {/* Top Input */}
      <div className="bg-white rounded-none p-0">
        <div className="flex justify-between items-center">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="0.0"
            className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <TopToken />
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {isEthInput ? calculateUsdValue(inputValue) : calculateUsdValue(outputValue)}
        </div>
        <div className="flex justify-between mt-1">
          <div></div>
          <div className="flex items-center text-sm text-gray-500">
            <span>
              {isEthInput ? 
                formatBalance(ethBalance) : 
                formatBalance(tokenBalance)
              } {isEthInput ? "ETH" : tokenSymbol}
            </span>
            <Button 
              variant="ghost" 
              className="h-6 px-2 py-0 text-sm ml-1"
              onClick={onMaxClick}
              disabled={isPending}
            >
              Max
            </Button>
          </div>
        </div>
      </div>
      
      {/* Swap Direction Arrow */}
      <div className="flex justify-center my-6">
        <div 
          className="bg-gray-100 p-3 rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={toggleDirection}
        >
          <ArrowDown size={24} />
        </div>
      </div>
      
      {/* Bottom Output */}
      <div className="bg-gray-50 rounded-none p-0">
        <div className="flex justify-between items-center">
          <Input
            type="text"
            value={outputValue}
            readOnly
            placeholder="0.0"
            className="text-5xl font-medium border-0 p-0 h-auto bg-transparent w-3/5 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <BottomToken />
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {!isEthInput ? calculateUsdValue(outputValue) : calculateUsdValue(inputValue)}
        </div>
      </div>
      
      {/* Swap Button */}
      <Button 
        className="w-full h-14 bg-[#f471ff] hover:bg-[#d44ae9] text-white font-medium rounded-full text-lg" 
        onClick={onSwap}
        disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
      >
        {isPending ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            {isEthInput ? 'Buying...' : 'Selling...'}
          </>
        ) : (
          'Review'
        )}
      </Button>
      
      {/* Token Conversion Rate */}
      <div className="text-xs text-center text-gray-500 mt-2">
        {isEthInput ? 
          `1 ETH = ${parseFloat(outputValue) > 0 && parseFloat(inputValue) > 0 ? 
            (parseFloat(outputValue) / parseFloat(inputValue)).toFixed(6) : '0'} ${tokenSymbol}` : 
          `1 ${tokenSymbol} = ${parseFloat(outputValue) > 0 && parseFloat(inputValue) > 0 ? 
            (parseFloat(outputValue) / parseFloat(inputValue)).toFixed(6) : '0'} ETH`
        } ({calculateUsdValue('1')})
      </div>
    </div>
  );
};

const SlippageSettings = ({ 
  slippageTolerance, 
  onSlippageChange 
}: { 
  slippageTolerance: number, 
  onSlippageChange: (value: number) => void 
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 px-3 py-2 border rounded-full cursor-pointer">
          <Settings2 className="h-5 w-5 mr-1" />
          <span>Slippage</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Slippage Tolerance</h4>
          <p className="text-xs text-muted-foreground">
            Your transaction will revert if the price changes unfavorably by more than this percentage.
          </p>
          <RadioGroup 
            value={slippageTolerance.toString()} 
            onValueChange={(value) => onSlippageChange(parseFloat(value))}
            className="grid grid-cols-3 gap-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0.5" id="r1" />
              <Label htmlFor="r1">0.5%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="r2" />
              <Label htmlFor="r2">1%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="r3" />
              <Label htmlFor="r3">2%</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SwapInterface;
