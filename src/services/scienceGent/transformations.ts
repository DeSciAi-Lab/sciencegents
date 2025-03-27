import { ethers } from "ethers";
import { ScienceGentData, TokenStats, FormattedScienceGent } from "./types";
import { formatDistanceToNow } from "date-fns";
import { safeFormatEther, safeFormatEtherAsNumber } from "@/utils/ethersUtils";

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
 * Safely format ETH value from BigNumber string
 * @param value BigNumber string
 * @returns Formatted ETH value as number or 0 if conversion fails
 */
export const safeFormatEtherValue = (value: string): number => {
  return safeFormatEtherAsNumber(value);
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
  try {
    // Handle socials data
    const socialsData = data.socials || {};
    
    // Safely convert values to prevent overflow errors
    const tokenPrice = safeFormatEtherAsNumber(stats.currentPrice);
    const virtualETH = safeFormatEtherAsNumber(stats.virtualETH);
    const collectedFees = safeFormatEtherAsNumber(stats.collectedFees);
    
    // Ensure consistency between migrated and isMigrated properties
    const isMigrated = data.isMigrated !== undefined ? data.isMigrated : stats.migrated;
    
    // Calculate market cap - handle large numbers
    let marketCap = 0;
    try {
      if (data.totalSupply) {
        // Keep total_supply as a string in the database
        const totalSupplyFormatted = ethers.utils.formatEther(data.totalSupply);
        marketCap = tokenPrice * parseFloat(totalSupplyFormatted);
      }
    } catch (error) {
      console.error("Error calculating market cap:", error);
    }

    // Format timestamps
    const createdAt = data.createdAt || new Date(data.creationTimestamp * 1000).toISOString();
    const createdOnChainAt = data.createdOnChainAt || new Date(data.creationTimestamp * 1000).toISOString();
    
    // Calculate maturity progress
    const maturityProgress = calculateMaturityProgress(virtualETH, collectedFees);
    
    // Calculate remaining maturity time
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingMaturityTime = Math.max(0, stats.maturityDeadline - currentTime);
    
    const scienceGent = {
      address: data.address,
      name: data.name,
      symbol: data.symbol,
      description: data.description || '',
      total_supply: data.totalSupply, // Keep as string
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
      last_synced_at: new Date().toISOString(),
      // Add these fields if present in the data
      profile_pic: data.profile_pic,
      website: data.website,
      agent_fee: data.agent_fee,
      persona: data.persona,
      developer_name: data.developer_name,
      developer_email: data.developer_email,
      bio: data.bio,
      developer_twitter: data.developer_twitter,
      developer_telegram: data.developer_telegram,
      developer_github: data.developer_github,
      developer_website: data.developer_website
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
  } catch (error) {
    console.error("Error transforming blockchain data to Supabase format:", error);
    throw error;
  }
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
