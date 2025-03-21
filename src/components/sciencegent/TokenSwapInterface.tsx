
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
  const [swapDirection, setSwapDirection] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>('');
  
  // Use the token swap hook
  const { 
    estimateSwapOutput, 
    performSwap, 
    isLoading, 
    error 
  } = useTokenSwap(tokenAddress);
  
  // Calculate estimated output
  const estimatedOutput = amount ? 
    (swapDirection === 'buy' 
      ? parseFloat(amount) / tokenPrice 
      : parseFloat(amount) * tokenPrice) 
    : 0;
    
  const flipSwapDirection = () => {
    setSwapDirection(swapDirection === 'buy' ? 'sell' : 'buy');
    setAmount('');
  };
  
  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    await performSwap({
      type: swapDirection,
      amount: parseFloat(amount),
      minReceived: estimatedOutput * 0.95, // 5% slippage tolerance
    });
    
    // Clear input after swap
    setAmount('');
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
                {swapDirection === 'buy' ? 'You pay' : 'You sell'}
              </span>
              <span className="text-sm text-muted-foreground">
                Balance: {swapDirection === 'buy' ? 'ETH Balance' : tokenBalance.toFixed(4)}
              </span>
            </div>
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-none text-xl font-medium bg-transparent p-0 h-auto"
              />
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  {swapDirection === 'buy' ? 'Ξ' : tokenSymbol.charAt(0)}
                </div>
                <span className="font-medium">
                  {swapDirection === 'buy' ? 'ETH' : tokenSymbol}
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
              onClick={flipSwapDirection}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Output token */}
          <div className="p-4 bg-secondary rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {swapDirection === 'buy' ? 'You receive' : 'You receive'}
              </span>
              <span className="text-sm text-muted-foreground">
                Balance: {swapDirection === 'buy' ? tokenBalance.toFixed(4) : 'ETH Balance'}
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-1 text-xl font-medium">
                {amount && !isNaN(parseFloat(amount))
                  ? estimatedOutput.toFixed(6)
                  : '0.0'}
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  {swapDirection === 'buy' ? tokenSymbol.charAt(0) : 'Ξ'}
                </div>
                <span className="font-medium">
                  {swapDirection === 'buy' ? tokenSymbol : 'ETH'}
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
              1 {swapDirection === 'buy' ? 'ETH' : tokenSymbol} = {' '}
              {swapDirection === 'buy' 
                ? (1 / tokenPrice).toFixed(4) 
                : tokenPrice.toFixed(6)}{' '}
              {swapDirection === 'buy' ? tokenSymbol : 'ETH'}
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
            disabled={!amount || parseFloat(amount) <= 0 || isLoading}
            onClick={handleSwap}
          >
            {isLoading 
              ? 'Swapping...' 
              : `Swap ${swapDirection === 'buy' ? 'ETH for' : ''} ${tokenSymbol} ${swapDirection === 'sell' ? 'for ETH' : ''}`}
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
