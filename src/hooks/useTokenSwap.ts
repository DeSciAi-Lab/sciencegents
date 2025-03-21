
import { useState, useEffect } from 'react';
import { useTokenBalances } from './swap/useTokenBalances';
import { useSwapCalculations } from './swap/useSwapCalculations';
import { useSwapTransactions } from './swap/useSwapTransactions';

// Define the type for swap direction
export type SwapDirection = 'buy' | 'sell';

// Main hook that combines all token swap functionality
export const useTokenSwap = (tokenAddress: string) => {
  // Use the smaller, focused hooks
  const { 
    tokenBalance, 
    ethBalance, 
    tokenPrice, 
    refreshBalances,
    isPending: isBalanceLoading 
  } = useTokenBalances(tokenAddress);
  
  const { 
    estimateTokensFromETH, 
    estimateETHFromTokens 
  } = useSwapCalculations(tokenAddress);
  
  const { 
    buyTokens, 
    sellTokens, 
    isPending: isTransactionPending, 
    error 
  } = useSwapTransactions(tokenAddress, refreshBalances);

  // Combine isPending states
  const isPending = isBalanceLoading || isTransactionPending;

  return {
    // Balances
    tokenBalance,
    ethBalance,
    tokenPrice,
    refreshBalances,
    
    // Calculations
    estimateTokensFromETH,
    estimateETHFromTokens,
    
    // Transactions
    buyTokens,
    sellTokens,
    
    // Status
    isPending,
    error
  };
};
