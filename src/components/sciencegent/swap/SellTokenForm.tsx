
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Loader2 } from "lucide-react";

interface SellTokenFormProps {
  tokenSymbol: string;
  inputValue: string;
  outputValue: string;
  tokenBalance: string;
  isPending: boolean;
  onInputChange: (value: string) => void;
  onSwap: () => void;
}

const SellTokenForm: React.FC<SellTokenFormProps> = ({
  tokenSymbol,
  inputValue,
  outputValue,
  tokenBalance,
  isPending,
  onInputChange,
  onSwap
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">{tokenSymbol} Amount</p>
        <Input
          type="number"
          placeholder="0.0"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          min="0"
        />
        <p className="text-xs text-muted-foreground text-right">Max: {tokenBalance} {tokenSymbol}</p>
      </div>
      
      <div className="flex justify-center my-2">
        <ArrowDownUp className="h-6 w-6 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">ETH Amount</p>
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
        Sell {tokenSymbol}
      </Button>
    </div>
  );
};

export default SellTokenForm;
