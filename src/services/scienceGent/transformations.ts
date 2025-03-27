
import { ethers } from "ethers";
import { ScienceGentData, TokenStats, FormattedScienceGent } from "./types";
import { formatDistanceToNow } from "date-fns";

/**
 * Calculates maturity progress percentage
 * @param virtualETH Virtual ETH amount
 * @param collectedFees Collected fees
 * @returns Progress percentage (0-100)
 */
export const calculateMaturityProgress = (
  virtualETH: number | string,
  collectedFees: number | string
): number => {
  try {
    const vETH = typeof virtualETH === 'string' ? parseFloat(virtualETH) : virtualETH;
    const fees = typeof collectedFees === 'string' ? parseFloat(collectedFees) : collectedFees;
    
    if (isNaN(vETH) || vETH === 0) return 0;
    
    // Migration threshold is 2x virtualETH
    const targetFees = 2 * vETH;
    const progress = Math.min(Math.round((fees / targetFees) * 100), 100);
    
    return isNaN(progress) ? 0 : progress;
  } catch (error) {
    console.error("Error calculating maturity progress:", error);
    return 0;
  }
};

/**
 * Format token age based on creation timestamp
 * @param timestamp Creation timestamp from blockchain
 * @returns Formatted age string
 */
export const formatAge = (timestamp: number | string | Date | null | undefined): string => {
  if (!timestamp) return 'Unknown';
  
  try {
    // Handle different timestamp formats
    let date: Date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp * 1000); // Convert from Unix timestamp
    } else if (typeof timestamp === 'string') {
      // Try parsing as ISO string first
      date = new Date(timestamp);
      // If invalid or very old date, try parsing as Unix timestamp
      if (isNaN(date.getTime()) || date.getFullYear() < 2020) {
        date = new Date(parseInt(timestamp) * 1000);
      }
    } else {
      return 'Unknown';
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Unknown';
    }
    
    return formatDistanceToNow(date, { addSuffix: false });
  } catch (error) {
    console.error("Error formatting age:", error, "from timestamp:", timestamp);
    return 'Unknown';
  }
};

/**
 * Transforms blockchain data to Supabase format
 * @param data Blockchain ScienceGent data
 * @param stats Token statistics
 * @returns Formatted data for Supabase
 */
export const transformBlockchainToSupabaseFormat = (
  data: ScienceGentData,
  stats: TokenStats
) => {
  // Handle socials data - ensure compatibility with both naming conventions
  const socialsData = data.socials || {};
  
  // Format token price to a number
  const tokenPrice = stats.currentPrice ? 
    parseFloat(ethers.utils.formatEther(stats.currentPrice)) : 0;
  
  // Ensure consistency between migrated and isMigrated properties
  const isMigrated = data.isMigrated !== undefined ? data.isMigrated : stats.migrated;
  
  // Calculate market cap based on token price and total supply
  const totalSupplyBN = ethers.BigNumber.from(data.totalSupply);
  const marketCap = tokenPrice * parseFloat(ethers.utils.formatEther(totalSupplyBN));

  // Format timestamps
  const createdAt = data.createdAt || new Date(data.creationTimestamp * 1000).toISOString();
  const createdOnChainAt = data.createdOnChainAt || new Date(data.creationTimestamp * 1000).toISOString();
  
  // Calculate maturity progress
  const virtualETH = parseFloat(ethers.utils.formatEther(stats.virtualETH));
  const collectedFees = parseFloat(ethers.utils.formatEther(stats.collectedFees));
  const maturityProgress = calculateMaturityProgress(virtualETH, collectedFees);
  
  // Calculate remaining maturity time
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingMaturityTime = Math.max(0, stats.maturityDeadline - currentTime);
  
  const scienceGent = {
    address: data.address,
    name: data.name,
    symbol: data.symbol,
    description: data.description || '',
    total_supply: ethers.utils.formatEther(data.totalSupply),
    creator_address: data.creator,
    is_migrated: isMigrated,
    migration_eligible: stats.migrationEligible,
    created_on_chain_at: createdOnChainAt,
    maturity_deadline: stats.maturityDeadline,
    remaining_maturity_time: remainingMaturityTime,
    token_price: tokenPrice,
    market_cap: marketCap,
    virtual_eth: virtualETH,
    collected_fees: collectedFees,
    maturity_progress: maturityProgress,
    domain: 'General', // Default domain if not provided
    socials: socialsData,
    last_synced_at: new Date().toISOString()
  };
  
  // Stats object for sciencegent_stats table
  const scienceGentStats = {
    sciencegent_address: data.address,
    volume_24h: stats.volume24h ? parseFloat(stats.volume24h) : 0,
    transactions: stats.transactions || 0,
    holders: stats.holders || 0,
    updated_at: new Date().toISOString()
  };
  
  return {
    scienceGent,
    scienceGentStats
  };
};

/**
 * Transforms Supabase data to a format suitable for UI display
 * @param data Supabase ScienceGent data
 * @returns Formatted data for UI
 */
export const transformSupabaseToFormattedScienceGent = (
  data: any
): FormattedScienceGent => {
  // Fallback for missing data
  if (!data) {
    return {
      id: '',
      address: '',
      name: 'Unknown',
      symbol: 'UNKNOWN'
    };
  }
  
  // Calculate or use existing maturity progress
  const maturityProgress = data.maturity_progress || calculateMaturityProgress(
    data.virtual_eth || 0,
    data.collected_fees || 0
  );
  
  return {
    id: data.id || data.address,
    address: data.address,
    name: data.name,
    symbol: data.symbol,
    description: data.description,
    domain: data.domain,
    marketCap: data.market_cap,
    tokenPrice: data.token_price,
    age: formatAge(data.created_on_chain_at),
    formattedAge: formatAge(data.created_on_chain_at),
    maturityStatus: getMigrationStatusText(data),
    capabilities: data.capabilities ? 
      (Array.isArray(data.capabilities) ? data.capabilities : []) : 
      [],
    isMigrated: data.is_migrated,
    migrationEligible: data.migration_eligible,
    virtualETH: data.virtual_eth,
    collectedFees: data.collected_fees,
    maturityProgress,
    remainingMaturityTime: data.remaining_maturity_time
  };
};

/**
 * Determine migration status text from token data
 * @param data Token data
 * @returns Status text
 */
const getMigrationStatusText = (data: any): string => {
  if (data.is_migrated) {
    return 'Migrated';
  } else if (data.migration_eligible) {
    return 'Ready for Migration';
  } else if (data.maturity_progress >= 50) {
    return 'Near Maturity';
  } else {
    return 'Immature';
  }
};
