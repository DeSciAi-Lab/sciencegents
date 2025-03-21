
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowDown, AlertCircle, Loader2 } from "lucide-react";
import { useTokenSwap } from '@/hooks/useTokenSwap';

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  
  const {
    direction,
    ethAmount,
    tokenAmount,
    isCalculating,
    isProcessing,
    walletConnected,
    ethBalance,
    tokenBalance,
    tokenPrice,
    toggleDirection,
    connectWallet,
    handleEthAmountChange,
    handleTokenAmountChange,
    executeSwap
  } = useTokenSwap(tokenAddress);

  const handleSetAmount = (value: string, isEth: boolean) => {
    setLocalError(null);
    
    if (isEth) {
      handleEthAmountChange(value);
      if (direction === 'sell') {
        toggleDirection();
      }
    } else {
      handleTokenAmountChange(value);
      if (direction === 'buy') {
        toggleDirection();
      }
    }
  };

  const handleSwap = async () => {
    setLocalError(null);
    try {
      await executeSwap();
    } catch (error) {
      console.error("Swap error:", error);
      setLocalError(error.message || "Failed to execute swap");
    }
  };

  const isInputDisabled = isProcessing || isCalculating;
  const isSubmitDisabled = isProcessing || isCalculating || !ethAmount || !tokenAmount || !!localError;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="liquidity" disabled>Liquidity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="swap" className="space-y-4">
          {!walletConnected ? (
            <div className="flex flex-col items-center py-6">
              <h3 className="text-lg font-medium mb-4">Connect your wallet to trade</h3>
              <Button onClick={connectWallet}>Connect Wallet</Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {/* ETH Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="ethAmount">ETH</Label>
                    <span className="text-xs text-muted-foreground">
                      Balance: {parseFloat(ethBalance).toFixed(4)} ETH
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="ethAmount"
                      type="number"
                      placeholder="0.0"
                      value={ethAmount}
                      onChange={(e) => handleSetAmount(e.target.value, true)}
                      disabled={isInputDisabled}
                      className="pr-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetAmount(ethBalance, true)}
                      className="absolute right-1 top-1 h-8"
                      disabled={isInputDisabled || parseFloat(ethBalance) <= 0}
                    >
                      MAX
                    </Button>
                  </div>
                </div>
                
                {/* Direction indicator */}
                <div className="flex justify-center">
                  <div className="bg-secondary w-8 h-8 rounded-full flex items-center justify-center">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                </div>
                
                {/* Token Input */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="tokenAmount">{tokenSymbol}</Label>
                    <span className="text-xs text-muted-foreground">
                      Balance: {parseFloat(tokenBalance).toFixed(4)} {tokenSymbol}
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      id="tokenAmount"
                      type="number"
                      placeholder="0.0"
                      value={tokenAmount}
                      onChange={(e) => handleSetAmount(e.target.value, false)}
                      disabled={isInputDisabled}
                      className="pr-16"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetAmount(tokenBalance, false)}
                      className="absolute right-1 top-1 h-8"
                      disabled={isInputDisabled || parseFloat(tokenBalance) <= 0}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                {tokenPrice > 0 && (
                  <div className="text-sm text-center text-muted-foreground">
                    1 {tokenSymbol} = {tokenPrice.toFixed(6)} ETH
                  </div>
                )}
                
                {/* Error Display */}
                {localError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{localError}</AlertDescription>
                  </Alert>
                )}
                
                {/* Submit Button */}
                <Button 
                  className="w-full bg-science-600 hover:bg-science-700 text-white" 
                  onClick={handleSwap}
                  disabled={isSubmitDisabled}
                >
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isProcessing ? 'Processing...' : 'Swap'}
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenSwapInterface;
