
import { ethers } from 'ethers';
import { ScienceGentData, TokenStats, FormattedScienceGent } from './types';

/**
 * Transforms blockchain data to a format suitable for Supabase storage
 * @param scienceGentData ScienceGent data from blockchain
 * @param tokenStats Token statistics from blockchain
 * @returns Formatted data for Supabase
 */
export const transformBlockchainToSupabaseFormat = (
  scienceGentData: ScienceGentData,
  tokenStats: TokenStats
): {
  scienceGent: any;
  scienceGentStats: any;
} => {
  // Calculate maturity progress based on collected fees and virtualETH
  const collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
  const virtualETH = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
  const maturityProgress = virtualETH > 0 
    ? Math.min(Math.round((collectedFees / (2 * virtualETH)) * 100), 100) 
    : 0;
  
  // Convert price to a number
  const tokenPrice = tokenStats.currentPrice 
    ? parseFloat(ethers.utils.formatEther(tokenStats.currentPrice))
    : 0;
  
  // Calculate market cap (total supply * price)
  const totalSupply = parseFloat(ethers.utils.formatEther(scienceGentData.totalSupply));
  const marketCap = tokenPrice * totalSupply;
  
  // Calculate total liquidity (ethReserve * 2) as an approximation
  const ethReserve = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
  const totalLiquidity = ethReserve * 2;
  
  // Calculate remaining maturity time
  const maturityDeadline = parseInt(tokenStats.maturityDeadline);
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingMaturityTime = maturityDeadline > currentTime ? maturityDeadline - currentTime : 0;
  
  // Prepare ScienceGent data for Supabase
  const scienceGent = {
    address: scienceGentData.address,
    name: scienceGentData.name,
    symbol: scienceGentData.symbol,
    description: "", // Can be updated later through UI
    domain: "General", // Default domain
    total_supply: totalSupply,
    market_cap: marketCap,
    token_price: tokenPrice,
    price_change_24h: 0, // This would require historical data
    total_liquidity: totalLiquidity,
    maturity_progress: maturityProgress,
    virtual_eth: virtualETH,
    collected_fees: collectedFees,
    creator_address: scienceGentData.creator,
    created_on_chain_at: new Date(parseInt(tokenStats.creationTimestamp) * 1000).toISOString(),
    is_migrated: tokenStats.migrated,
    migration_eligible: tokenStats.migrationEligible || false,
    maturity_deadline: maturityDeadline,
    remaining_maturity_time: remainingMaturityTime,
    token_age: Math.floor(Date.now() / 1000) - parseInt(tokenStats.creationTimestamp),
    last_synced_at: new Date().toISOString()
  };
  
  // Prepare stats data for Supabase
  const scienceGentStats = {
    sciencegent_address: scienceGentData.address,
    volume_24h: 0, // This would require tracking transactions
    transactions: 0, // This would require tracking transactions
    holders: 0, // This would require tracking token holders
    updated_at: new Date().toISOString()
  };
  
  return { scienceGent, scienceGentStats };
};

/**
 * Transforms Supabase data to a formatted ScienceGent object for UI
 * @param data The data from Supabase
 * @returns Formatted ScienceGent object
 */
export const transformSupabaseToFormattedScienceGent = (data: any): FormattedScienceGent => {
  // Calculate token price in USD (if available)
  const tokenPriceInEth = data.token_price ? parseFloat(data.token_price) : 0;
  const ethPriceInUsd = 3500; // This would ideally come from an oracle or API
  
  // Format capabilities
  const capabilities = data.capabilities || [];
  
  // Calculate maturity progress
  const maturityProgress = data.maturity_progress || 0;
  
  return {
    address: data.address,
    name: data.name,
    symbol: data.symbol,
    description: data.description || `${data.name} is a ScienceGent deployed on the DeSciAi platform.`,
    domain: data.domain || 'General Science',
    totalSupply: parseInt(data.total_supply) || 0,
    marketCap: tokenPriceInEth * ethPriceInUsd * (parseInt(data.total_supply) || 0),
    tokenPrice: tokenPriceInEth,
    priceChange24h: data.price_change_24h || 0,
    totalLiquidity: parseFloat(data.eth_reserve || '0') * ethPriceInUsd,
    maturityProgress: maturityProgress,
    virtualEth: parseFloat(data.virtual_eth || '0'),
    creatorAddress: data.creator_address || '',
    createdOnChainAt: data.created_on_chain_at || new Date().toISOString(),
    isMigrated: data.is_migrated || false,
    migrationEligible: data.migration_eligible || false,
    remainingMaturityTime: parseInt(data.remaining_maturity_time || '0'),
    collectedFees: parseFloat(data.collected_fees || '0'),
    stats: {
      volume24h: data.volume_24h || 0,
      transactions: data.transaction_count || 0,
      holders: data.holder_count || 0
    },
    capabilities: capabilities
  };
};
