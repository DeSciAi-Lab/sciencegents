
import { ethers } from "ethers";
import { ScienceGentData, TokenStats, FormattedScienceGent } from "./types";

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
    creator_address: scienceGentData.creator,
    created_on_chain_at: new Date(parseInt(tokenStats.creationTimestamp) * 1000).toISOString(),
    is_migrated: tokenStats.migrated,
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
 * Transforms Supabase data to a formatted ScienceGent object
 * @param supabaseData Data from Supabase
 * @returns Formatted ScienceGent object
 */
export const transformSupabaseToFormattedScienceGent = (
  supabaseData: any
): FormattedScienceGent => {
  return {
    address: supabaseData.address,
    name: supabaseData.name,
    symbol: supabaseData.symbol,
    description: supabaseData.description || "",
    domain: supabaseData.domain || "General",
    totalSupply: supabaseData.total_supply || 0,
    marketCap: supabaseData.market_cap || 0,
    tokenPrice: supabaseData.token_price || 0,
    priceChange24h: supabaseData.price_change_24h || 0,
    totalLiquidity: supabaseData.total_liquidity || 0,
    maturityProgress: supabaseData.maturity_progress || 0,
    virtualEth: supabaseData.virtual_eth || 0,
    creatorAddress: supabaseData.creator_address || "",
    createdOnChainAt: supabaseData.created_on_chain_at || new Date().toISOString(),
    isMigrated: supabaseData.is_migrated || false,
    stats: {
      volume24h: supabaseData.stats?.volume_24h || 0,
      transactions: supabaseData.stats?.transactions || 0,
      holders: supabaseData.stats?.holders || 0
    },
    capabilities: supabaseData.capabilities?.map(cap => cap) || []
  };
};
