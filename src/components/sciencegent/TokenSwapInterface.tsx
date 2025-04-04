import React, { useState, useEffect } from 'react';
import { SwapDirection, useTokenSwap } from "@/hooks/useTokenSwap";
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from '@/components/ui/use-toast';
import SwapInterface from './swap/SwapInterface';
import MaturityStatusCard from './MaturityStatusCard';
import ScienceGentCapabilities from './ScienceGentCapabilities';
import { useEnableTrading } from '@/hooks/useEnableTrading';
import { useAccount } from 'wagmi';

interface TokenSwapInterfaceProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated?: boolean;
  uniswapPair?: string;
  scienceGent?: any;
}

const TokenSwapInterface: React.FC<TokenSwapInterfaceProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated = false,
  uniswapPair,
  scienceGent
}) => {
  const [isEthInput, setIsEthInput] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('0.0001');
  const [outputValue, setOutputValue] = useState<string>('0');
  const [slippageTolerance, setSlippageTolerance] = useState<number>(1); // 1% default slippage
  
  const { address: connectedWalletAddress } = useAccount();
  const { enableTrading, isPending: isEnablingTrading } = useEnableTrading(tokenAddress);
  
  const {
    buyTokens,
    sellTokens,
    estimateTokensFromETH,
    estimateETHFromTokens,
    isPending,
    error,
    tokenBalance,
    ethBalance,
    tokenPrice,
    ethReserve,
    tokenReserve,
    refreshBalances
  } = useTokenSwap(tokenAddress);

  useEffect(() => {
    setInputValue('0.0001');
    setOutputValue('0');
  }, [isEthInput]);

  useEffect(() => {
    const updateEstimate = async () => {
      if (!inputValue || parseFloat(inputValue) <= 0) {
        setOutputValue('0');
        return;
      }

      try {
        if (isEthInput) {
          const tokensOut = await estimateTokensFromETH(inputValue);
          setOutputValue(tokensOut);
        } else {
          const ethOut = await estimateETHFromTokens(inputValue);
          setOutputValue(ethOut);
        }
      } catch (err) {
        console.error('Estimation error:', err);
        setOutputValue('0');
      }
    };

    const debounceTimer = setTimeout(updateEstimate, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, isEthInput, estimateTokensFromETH, estimateETHFromTokens]);

  const handleMaxClick = () => {
    if (isEthInput) {
      const maxAmount = parseFloat(ethBalance) * 0.95;
      if (!isNaN(maxAmount) && maxAmount > 0) {
        setInputValue(maxAmount.toFixed(6));
      }
    } else {
      const maxAmount = parseFloat(tokenBalance);
      if (!isNaN(maxAmount) && maxAmount > 0) {
        setInputValue(maxAmount.toFixed(6));
      }
    }
  };

  const handleSwap = async () => {
    if (!inputValue || parseFloat(inputValue) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (isEthInput) {
        const minTokensOut = parseFloat(outputValue) * (1 - slippageTolerance/100);
        await buyTokens(inputValue, minTokensOut.toString());
      } else {
        const minEthOut = parseFloat(outputValue) * (1 - slippageTolerance/100);
        await sellTokens(inputValue, minEthOut.toString());
      }
    } catch (err) {
      console.error('Swap error:', err);
      toast({
        title: "Swap Failed",
        description: "There was an error executing the swap. Please try again.",
        variant: "destructive"
      });
    }
  };

  const toggleDirection = () => {
    setIsEthInput(!isEthInput);
  };

  const isTradingEnabled = scienceGent?.trading_enabled !== false;
  const isCreator = connectedWalletAddress && 
    scienceGent?.creator_address && 
    connectedWalletAddress.toLowerCase() === scienceGent.creator_address.toLowerCase();

  const handleEnableTrading = async () => {
    if (isCreator) {
      await enableTrading();
      await refreshBalances(); // Refresh data after enabling trading
    }
  };

  if (isMigrated) {
    return (
      <div className="p-4 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            This token has been migrated to Uniswap and is now tradable on the Uniswap exchange.
          </AlertDescription>
        </Alert>
        
        <Button variant="outline" className="w-full flex items-center gap-2" asChild>
          <a 
            href={`https://app.uniswap.org/explore/tokens/ethereum_sepolia/${tokenAddress.toLowerCase()}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Trade on Uniswap
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  const tokenName = scienceGent?.name || "ScienceGent";
  const tokenLogo = scienceGent?.profile_pic || null;

  return (
    <div className="space-y-4">
      {!isTradingEnabled && (
        <Alert variant="default" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <div className="flex flex-col space-y-2 w-full">
            <AlertDescription className="text-amber-800">
              {isCreator 
                ? "You haven't enabled trading yet. Only you can trade at this time."
                : "Creator hasn't enabled trading yet. Only the creator can trade at this time."}
            </AlertDescription>
            
            {isCreator && (
              <Button 
                variant="default" 
                size="sm" 
                className="bg-amber-600 hover:bg-amber-700 text-white w-fit self-end"
                onClick={handleEnableTrading}
                disabled={isEnablingTrading}
              >
                {isEnablingTrading ? 'Enabling...' : 'Enable Trading'}
              </Button>
            )}
          </div>
        </Alert>
      )}
      
      <SwapInterface 
        isEthInput={isEthInput}
        toggleDirection={toggleDirection}
        tokenSymbol={tokenSymbol}
        tokenName={tokenName}
        tokenLogo={tokenLogo}
        ethBalance={ethBalance}
        tokenBalance={tokenBalance}
        ethReserve={ethReserve}
        tokenReserve={tokenReserve}
        inputValue={inputValue}
        outputValue={outputValue}
        onInputChange={setInputValue}
        isPending={isPending}
        slippageTolerance={slippageTolerance}
        onSlippageChange={setSlippageTolerance}
        onMaxClick={handleMaxClick}
        onSwap={handleSwap}
      />
      
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
      
      {/* Maturity Status */}
      <MaturityStatusCard 
        progress={scienceGent?.maturity_progress}
        virtualEth={scienceGent?.virtual_eth || 0}
        capabilityFees={scienceGent?.capability_fees || 0.004}
        collectedFees={scienceGent?.collected_fees || 0}
        migrationCondition={scienceGent?.migration_condition}
        compact={true}
      />
      
      {/* Capabilities */}
      <ScienceGentCapabilities scienceGent={scienceGent} />
    </div>
  );
};

export default TokenSwapInterface;
