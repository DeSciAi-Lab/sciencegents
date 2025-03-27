
import { ScienceGentData, TokenStats, FormattedScienceGent } from './types';
import { formatDistance } from 'date-fns';
import { formatEthValue, convertEthToUsd } from '@/utils/scienceGentCalculations';
import { supabase } from '@/integrations/supabase/client';
import { ethers } from 'ethers';

// Add implementation for the calculation functions
const calculateTokenPrice = (priceInWei: string | undefined): number => {
  if (!priceInWei) return 0;
  try {
    return parseFloat(ethers.utils.formatEther(priceInWei));
  } catch (error) {
    console.error("Error calculating token price:", error);
    return 0;
  }
};

const calculateMarketCap = (tokenPrice: number, totalSupplyInWei: string): number => {
  if (!tokenPrice || !totalSupplyInWei) return 0;
  try {
    const totalSupply = parseFloat(ethers.utils.formatEther(totalSupplyInWei));
    return tokenPrice * totalSupply;
  } catch (error) {
    console.error("Error calculating market cap:", error);
    return 0;
  }
};

export const transformBlockchainToSupabaseFormat = (
  scienceGentData: ScienceGentData, 
  tokenStats: TokenStats
): any => {
  const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
  const marketCap = calculateMarketCap(tokenPrice, scienceGentData.totalSupply);
  
  return {
    address: scienceGentData.address,
    name: scienceGentData.name,
    symbol: scienceGentData.symbol,
    description: scienceGentData.description || '',
    creator_address: scienceGentData.creator,
    total_supply: scienceGentData.totalSupply,
    virtual_eth: tokenStats.virtualETH,
    collected_fees: tokenStats.collectedFees,
    capability_fees: tokenStats.capabilityFees || 0,
    current_price: tokenStats.currentPrice,
    market_cap: marketCap,
    total_liquidity: tokenStats.totalLiquidity || 0,
    holders: tokenStats.holdersCount || 0,
    transactions: tokenStats.transactions || 0,
    is_migrated: scienceGentData.isMigrated,
    trading_enabled: scienceGentData.tradingEnabled,
    uniswap_pair: tokenStats.uniswapPair || null,
    capabilities: Array.isArray(scienceGentData.capabilities) ? 
      scienceGentData.capabilities.map((cap: any) => {
        if (typeof cap === 'string') {
          return {
            capability_id: cap,
            capability_name: cap,
            capability_fee: 0,
            capability_creator: ''
          };
        } else {
          return {
            capability_id: cap.id || '',
            capability_name: cap.name || '',
            capability_fee: cap.fee || 0,
            capability_creator: cap.creator || ''
          };
        }
      }) : []
  };
};

export const transformSupabaseToFormattedScienceGent = (data: any): FormattedScienceGent => {
  // Calculate maturity progress
  const virtualEth = parseFloat(ethers.utils.formatEther(data.virtual_eth || '0'));
  const collectedFees = parseFloat(ethers.utils.formatEther(data.collected_fees || '0'));
  const capabilityFees = parseFloat(ethers.utils.formatEther(data.capability_fees || '0'));
  
  // Calculate maturity progress (0-100%)
  const targetFees = (2 * virtualEth) + capabilityFees;
  const maturityProgress = targetFees > 0 
    ? Math.min(Math.round((collectedFees / targetFees) * 100), 100) 
    : 0;
  
  // Format token price
  const tokenPrice = parseFloat(ethers.utils.formatEther(data.current_price || '0'));
  const formattedPrice = formatEthValue(tokenPrice);
  const formattedPriceUsd = convertEthToUsd(tokenPrice);
  
  // Format market cap
  const marketCap = parseFloat(String(data.market_cap || '0'));
  const formattedMarketCap = formatEthValue(marketCap);
  const formattedMarketCapUsd = convertEthToUsd(marketCap);
  
  // Format liquidity
  const liquidity = parseFloat(String(data.total_liquidity || '0'));
  const formattedLiquidity = formatEthValue(liquidity);
  const formattedLiquidityUsd = convertEthToUsd(liquidity);
  
  // Format capabilities
  const capabilities = data.capabilities?.map((cap: any) => ({
    id: cap.capability_id,
    name: cap.capability_name,
    fee: cap.capability_fee,
    creator: cap.capability_creator
  })) || [];
  
  // Calculate age
  const createdAt = data.created_at ? new Date(data.created_at) : new Date();
  const age = formatAge(createdAt);
  
  return {
    address: data.address,
    name: data.name,
    symbol: data.symbol,
    description: data.description || '',
    creator: data.creator_address,
    totalSupply: data.total_supply,
    virtualEth,
    collectedFees,
    capabilityFees,
    tokenPrice,
    formattedPrice,
    formattedPriceUsd,
    marketCap,
    formattedMarketCap,
    formattedMarketCapUsd,
    liquidity,
    formattedLiquidity,
    formattedLiquidityUsd,
    holdersCount: data.holders || 0,
    transactions: data.transactions || 0,
    isMigrated: data.is_migrated || false,
    tradingEnabled: data.trading_enabled || false,
    uniswapPair: data.uniswap_pair || null,
    capabilities,
    maturityProgress,
    created_at: data.created_at,
    age
  };
};

export const formatAge = (timestamp: string | number | Date): string => {
  try {
    const date = typeof timestamp === 'string' || typeof timestamp === 'number' 
      ? new Date(timestamp) 
      : timestamp;
    
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error("Error formatting age:", error);
    return "Unknown";
  }
};
