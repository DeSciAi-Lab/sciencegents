import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Loader2, Settings2, Info } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SellTokenFormProps {
  tokenSymbol: string;
  inputValue: string;
  outputValue: string;
  tokenBalance: string;
  isPending: boolean;
  slippageTolerance: number;
  onInputChange: (value: string) => void;
  onSlippageChange: (value: number) => void;
  onSwap: () => void;
}

const SellTokenForm: React.FC<SellTokenFormProps> = ({
  tokenSymbol,
  inputValue,
  outputValue,
  tokenBalance,
  isPending,
  slippageTolerance,
  onInputChange,
  onSlippageChange,
  onSwap
}) => {
  const [isAmountSimplified, setIsAmountSimplified] = useState(false);
  
  const formattedTokenBalance = (() => {
    const numericBalance = parseFloat(tokenBalance);
    if (isNaN(numericBalance)) return "0";
    
    if (numericBalance > 1e9) {
      return `${(numericBalance / 1e9).toFixed(2)}B`;
    } else if (numericBalance > 1e6) {
      return `${(numericBalance / 1e6).toFixed(2)}M`;
    } else if (numericBalance > 1e3) {
      return `${(numericBalance / 1e3).toFixed(2)}K`;
    } else {
      return numericBalance.toFixed(6);
    }
  })();

  const handleMaxClick = () => {
    if (parseFloat(tokenBalance) <= 0) return;
    
    if (parseFloat(tokenBalance) > 1e9) {
      const safeAmount = Math.floor(parseFloat(tokenBalance)).toString();
      onInputChange(safeAmount);
      setIsAmountSimplified(true);
    } else if (parseFloat(tokenBalance) > 1e6) {
      const safeAmount = Math.floor(parseFloat(tokenBalance) * 0.999).toString();
      onInputChange(safeAmount);
      setIsAmountSimplified(true);
    } else {
      onInputChange(tokenBalance);
      setIsAmountSimplified(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow any positive number
    if (value === '' || value === '0' || value === '0.') {
      onInputChange(value);
      setIsAmountSimplified(false);
      return;
    }

    // Convert to number and validate
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    // For large numbers, automatically simplify
    if (numValue > 1e9) {
      const roundedValue = Math.floor(numValue).toString();
      onInputChange(roundedValue);
      setIsAmountSimplified(true);
    } else {
      onInputChange(value);
      setIsAmountSimplified(false);
    }
  };

  const handleRoundClick = () => {
    if (!inputValue || parseFloat(inputValue) <= 0) return;
    
    try {
      const roundedValue = Math.floor(parseFloat(inputValue)).toString();
      onInputChange(roundedValue);
      setIsAmountSimplified(true);
    } catch (error) {
      console.error("Error rounding value:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{tokenSymbol} Amount</p>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    type="button" 
                    onClick={handleRoundClick}
                    className="text-xs text-science-600 hover:text-science-700"
                    disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
                  >
                    Round
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Round to a whole number to avoid precision errors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <button 
              type="button" 
              onClick={handleMaxClick}
              className="text-xs text-science-600 hover:text-science-700"
            >
              Max
            </button>
          </div>
        </div>
        
        <Input
          type="number"
          placeholder="0.0"
          value={inputValue}
          onChange={handleInputChange}
          min="0"
          disabled={isPending}
          className={isAmountSimplified ? "bg-blue-50" : ""}
        />
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Balance: {formattedTokenBalance} {tokenSymbol}</p>
          
          {isAmountSimplified && (
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <Info className="h-3 w-3" />
              <span>Amount simplified to avoid errors</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center my-2">
        <div className="bg-muted rounded-full p-2">
          <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">ETH Amount</p>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-muted-foreground">
              {isPending ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <>Est. Price Impact: {parseFloat(outputValue) > 0 ? "~1%" : "0%"}</>
              )}
            </p>
            <SlippageSettings 
              slippageTolerance={slippageTolerance} 
              onSlippageChange={onSlippageChange} 
            />
          </div>
        </div>
        
        <Input
          type="text"
          placeholder="0.0"
          value={outputValue}
          readOnly
          className="bg-muted"
        />
        
        {parseFloat(outputValue) > 0 && (
          <p className="text-xs text-muted-foreground text-right">
            Min. received: {(parseFloat(outputValue) * (1 - slippageTolerance / 100)).toFixed(6)} ETH
          </p>
        )}
      </div>
      
      <Button
        onClick={onSwap}
        className="w-full bg-science-600 hover:bg-science-700 text-white"
        disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isPending ? "Processing..." : `Sell ${tokenSymbol}`}
      </Button>
      
      {parseFloat(tokenBalance) > 1e9 && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-xs text-amber-700 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>You have a very large token balance. To prevent errors, try selling smaller amounts (below 1 billion) or use the "Round" button.</span>
          </p>
        </div>
      )}
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
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Settings2 className="h-4 w-4" />
        </Button>
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

export default SellTokenForm;
