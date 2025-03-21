
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Loader2 } from "lucide-react";

interface BuyTokenFormProps {
  tokenSymbol: string;
  inputValue: string;
  outputValue: string;
  ethBalance: string;
  isPending: boolean;
  onInputChange: (value: string) => void;
  onSwap: () => void;
}

const BuyTokenForm: React.FC<BuyTokenFormProps> = ({
  tokenSymbol,
  inputValue,
  outputValue,
  ethBalance,
  isPending,
  onInputChange,
  onSwap
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">ETH Amount</p>
        <Input
          type="number"
          placeholder="0.0"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
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
        onClick={onSwap}
        className="w-full bg-science-600 hover:bg-science-700 text-white"
        disabled={isPending || !inputValue || parseFloat(inputValue) <= 0}
      >
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Buy {tokenSymbol}
      </Button>
    </div>
  );
};

export default BuyTokenForm;
