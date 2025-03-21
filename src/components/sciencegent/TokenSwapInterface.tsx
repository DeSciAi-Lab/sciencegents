
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTokenSwap } from '@/hooks/useTokenSwap';

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
  tokenPrice: number;
  tokenBalance?: number;
}

const TokenSwapInterface = ({
  tokenAddress,
  tokenSymbol,
  tokenPrice,
  tokenBalance = 0,
}: TokenSwapInterfaceProps) => {
  const [amount, setAmount] = useState<string>('');
  
  // Use the token swap hook
  const { 
    direction, 
    isCalculating, 
    isProcessing, 
    walletConnected,
    executeSwap,
    handleEthAmountChange,
    handleTokenAmountChange,
    toggleDirection,
    ethAmount,
    tokenAmount
  } = useTokenSwap(tokenAddress);
  
  // Error state for displaying validation errors
  const [error, setError] = useState<string | null>(null);
  
  // Calculate estimated output based on current input and direction
  const estimatedOutput = direction === 'buy' 
    ? tokenAmount 
    : ethAmount;
    
  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    
    setError(null);
    
    try {
      await executeSwap();
      // Clear input after swap
      setAmount('');
    } catch (err: any) {
      setError(err.message || "Swap failed");
    }
  };
  
  // Update the appropriate amount based on direction
  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    if (direction === 'buy') {
      handleEthAmountChange(newAmount);
    } else {
      handleTokenAmountChange(newAmount);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Input token */}
          <div className="p-4 bg-secondary rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {direction === 'buy' ? 'You pay' : 'You sell'}
              </span>
              <span className="text-sm text-muted-foreground">
                Balance: {direction === 'buy' ? 'ETH Balance' : tokenBalance.toFixed(4)}
              </span>
            </div>
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="border-none text-xl font-medium bg-transparent p-0 h-auto"
              />
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  {direction === 'buy' ? 'Ξ' : tokenSymbol.charAt(0)}
                </div>
                <span className="font-medium">
                  {direction === 'buy' ? 'ETH' : tokenSymbol}
                </span>
              </div>
            </div>
          </div>
          
          {/* Swap direction button */}
          <div className="flex justify-center -my-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-muted bg-card shadow-sm"
              onClick={toggleDirection}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Output token */}
          <div className="p-4 bg-secondary rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {direction === 'buy' ? 'You receive' : 'You receive'}
              </span>
              <span className="text-sm text-muted-foreground">
                Balance: {direction === 'buy' ? tokenBalance.toFixed(4) : 'ETH Balance'}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-1 text-xl font-medium">
                {estimatedOutput && !isNaN(parseFloat(estimatedOutput))
                  ? parseFloat(estimatedOutput).toFixed(6)
                  : '0.0'}
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  {direction === 'buy' ? tokenSymbol.charAt(0) : 'Ξ'}
                </div>
                <span className="font-medium">
                  {direction === 'buy' ? tokenSymbol : 'ETH'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Price information */}
          <div className="px-1 flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              Rate
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exchange rate including fees</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              1 {direction === 'buy' ? 'ETH' : tokenSymbol} = {' '}
              {direction === 'buy' 
                ? (1 / tokenPrice).toFixed(4) 
                : tokenPrice.toFixed(6)}{' '}
              {direction === 'buy' ? tokenSymbol : 'ETH'}
            </div>
          </div>
          
          {/* Slippage information */}
          <div className="px-1 flex justify-between text-sm text-muted-foreground">
            <div>Slippage Tolerance</div>
            <div>5%</div>
          </div>
          
          {/* Swap button */}
          <Button 
            className="w-full" 
            size="lg"
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing || isCalculating}
            onClick={handleSwap}
          >
            {isProcessing 
              ? 'Swapping...' 
              : `Swap ${direction === 'buy' ? 'ETH for' : ''} ${tokenSymbol} ${direction === 'sell' ? 'for ETH' : ''}`}
          </Button>
          
          {/* Error message */}
          {error && (
            <div className="text-sm text-red-500 mt-2">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSwapInterface;
