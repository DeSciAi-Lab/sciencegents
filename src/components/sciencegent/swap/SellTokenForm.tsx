import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Loader2, Settings2 } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

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
  const formattedTokenBalance = parseFloat(tokenBalance) > 1e18 
    ? parseFloat(tokenBalance).toExponential(6) 
    : parseFloat(tokenBalance).toFixed(6);

  const handleMaxClick = () => {
    if (parseFloat(tokenBalance) > 0) {
      if (parseFloat(tokenBalance) > 1e15) {
        const safeAmount = Math.floor(parseFloat(tokenBalance) * 0.999).toString();
        onInputChange(safeAmount);
      } else {
        onInputChange(tokenBalance);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value.replace(/\D/g, '').length > 18) {
      return;
    }
    
    const decimalParts = value.split('.');
    if (decimalParts.length > 1 && decimalParts[1].length > 8) {
      return;
    }
    
    onInputChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{tokenSymbol} Amount</p>
          <button 
            type="button" 
            onClick={handleMaxClick}
            className="text-xs text-science-600 hover:text-science-700"
          >
            Max
          </button>
        </div>
        
        <Input
          type="number"
          placeholder="0.0"
          value={inputValue}
          onChange={handleInputChange}
          min="0"
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground text-right">Balance: {formattedTokenBalance} {tokenSymbol}</p>
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
