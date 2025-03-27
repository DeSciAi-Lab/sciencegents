import { ScienceGentData, TokenStats, FormattedScienceGent } from './types';
import { ethers } from 'ethers';
import { 
  calculateMaturityProgress,
  calculateTokenPrice,
  calculateMarketCap,
  fetchCurrentEthPrice,
  calculateTokenPriceUSD,
  calculateMarketCapUSD,
  calculateTotalLiquidity
} from '@/utils/scienceGentCalculations';

/**
 * Formats a timestamp to a human-readable age string
 * @param creationTimestamp Creation timestamp (seconds since epoch or ISO string)
 * @returns Formatted age string (e.g., "2 days" or "3 months")
 */
export const formatAge = (creationTimestamp: number | string | undefined): string => {
  if (!creationTimestamp) return 'Unknown';
  
  // Convert timestamp to Date object
  let creationDate: Date;
  if (typeof creationTimestamp === 'number') {
    creationDate = new Date(creationTimestamp * 1000);
  } else if (typeof creationTimestamp === 'string') {
    creationDate = new Date(creationTimestamp);
  } else {
    return 'Unknown';
  }
  
  const now = new Date();
  const diffInMs = now.getTime() - creationDate.getTime();
  
  // Calculate days, hours, etc.
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (days > 365) {
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${hours || 1} hour${hours !== 1 ? 's' : ''}`;
  }
};

/**
 * Safe conversion of BigNumber-like values to numbers
 * @param value Value to convert (string, BigNumber, or number)
 * @param defaultValue Default value if conversion fails
 * @returns Converted number
 */
const safeToNumber = (value: any, defaultValue: number = 0): number => {
  if (!value) return defaultValue;
  
  try {
    // If it's already a number
    if (typeof value === 'number') return value;
    
    // If it's a BigNumber with toNumber method
    if (value.toNumber && typeof value.toNumber === 'function') {
      return value.toNumber();
    }
    
    // If it's a string or can be converted to string
    return parseFloat(value.toString()) || defaultValue;
  } catch (error) {
    console.warn("Error converting to number:", error);
    return defaultValue;
  }
};

/**
 * Transforms blockchain data to Supabase format
 * @param blockchainData ScienceGent data from blockchain
 * @param tokenStats Token statistics from blockchain
 * @returns Object with scienceGent and scienceGentStats data
 */
export const transformBlockchainToSupabaseFormat = async (
  blockchainData: ScienceGentData,
  tokenStats: TokenStats
) => {
  // Calculate current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  // Calculate token age in seconds - safely handle potentially large numbers
  const creationTimestamp = safeToNumber(blockchainData.creationTimestamp);
  const tokenAge = creationTimestamp ? currentTimestamp - creationTimestamp : 0;
  
  // Calculate remaining maturity time - safely handle potentially large numbers
  const maturityDeadline = safeToNumber(blockchainData.maturityDeadline);
  const remainingMaturityTime = maturityDeadline 
    ? Math.max(0, maturityDeadline - currentTimestamp)
    : 0;
  
  // Calculate token price in ETH - safely parse large numbers
  const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
  
  // Fetch current ETH price
  const ethPrice = await fetchCurrentEthPrice();
  
  // Ensure totalSupply is properly formatted
  let formattedTotalSupply: number;
  try {
    formattedTotalSupply = parseFloat(ethers.utils.formatEther(blockchainData.totalSupply || '0'));
  } catch (e) {
    console.warn("Failed to format totalSupply as ETH in transformations, using direct parse");
    formattedTotalSupply = parseFloat(blockchainData.totalSupply || '0');
  }
  
  // Calculate price in USD
  const priceUSD = calculateTokenPriceUSD(ethPrice, tokenPrice);
  
  // Calculate market cap in ETH
  const marketCap = calculateMarketCap(
    tokenPrice,
    formattedTotalSupply
  );
  
  // Calculate market cap in USD directly
  const marketCapUSD = priceUSD * formattedTotalSupply;
  
  console.log("Transformation calculations:", {
    tokenPrice,
    ethPrice,
    priceUSD,
    formattedTotalSupply,
    marketCap,
    marketCapUSD
  });
  
  // Calculate virtual ETH and collected fees - safely parse large numbers
  let virtualETH = 0;
  let collectedFees = 0;
  let ethReserve = 0;
  
  if (tokenStats.virtualETH) {
    try {
      virtualETH = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
    } catch (error) {
      console.warn("Error parsing virtualETH:", error);
    }
  }
  
  if (tokenStats.collectedFees) {
    try {
      collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
    } catch (error) {
      console.warn("Error parsing collectedFees:", error);
    }
  }
  
  if (tokenStats.ethReserve) {
    try {
      ethReserve = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
    } catch (error) {
      console.warn("Error parsing ethReserve:", error);
    }
  }
  
  // Calculate total liquidity
  const totalLiquidity = calculateTotalLiquidity(ethReserve, ethPrice);
  
  // Calculate maturity progress using the utility function
  const maturityProgress = calculateMaturityProgress(
    virtualETH,
    collectedFees,
    blockchainData.capabilityFees || 0
  );
  
  // Calculate migration condition
  const migrationCondition = (2 * virtualETH) + (blockchainData.capabilityFees || 0);
  
  // Convert creation timestamp to ISO string if available
  const createdAt = creationTimestamp
    ? new Date(creationTimestamp * 1000).toISOString()
    : null;
  
  // Main ScienceGent data for the sciencegents table
  const scienceGent = {
    address: blockchainData.address,
    name: blockchainData.name,
    symbol: blockchainData.symbol,
    total_supply: formattedTotalSupply,
    creator_address: blockchainData.creator,
    description: blockchainData.description || null,
    profile_pic: blockchainData.profilePic || null,
    website: blockchainData.website || null,
    socials: blockchainData.socialLinks ? JSON.stringify(blockchainData.socialLinks) : null,
    is_migrated: tokenStats.migrated,
    migration_eligible: tokenStats.migrationEligible,
    created_at: createdAt,
    created_on_chain_at: createdAt, // Also populate the new created_on_chain_at field
    maturity_deadline: maturityDeadline || null,
    remaining_maturity_time: remainingMaturityTime,
    maturity_progress: maturityProgress,
    token_price: tokenPrice,
    price_usd: priceUSD,
    market_cap: marketCap,
    virtual_eth: virtualETH,
    collected_fees: collectedFees,
    total_liquidity: totalLiquidity,
    last_synced_at: new Date().toISOString(),
    domain: blockchainData.domain || "General Science",
    agent_fee: blockchainData.agentFee || 2,
    persona: blockchainData.persona || null,
    developer_name: blockchainData.developerName || null,
    developer_email: blockchainData.developerEmail || null,
    bio: blockchainData.bio || null,
    developer_twitter: blockchainData.developerTwitter || null,
    developer_telegram: blockchainData.developerTelegram || null,
    developer_github: blockchainData.developerGithub || null,
    developer_website: blockchainData.developerWebsite || null
  };
  
  // Stats data for the sciencegent_stats table
  const scienceGentStats = {
    sciencegent_address: blockchainData.address,
    volume_24h: 0, // Default values for now, can be populated with real data later
    transactions: 0,
    holders: 0,
    trade_volume_eth: 0,
    updated_at: new Date().toISOString()
  };
  
  return { scienceGent, scienceGentStats };
};

/**
 * Transforms Supabase data to formatted ScienceGent for UI
 * @param supabaseData ScienceGent data from Supabase
 * @returns Formatted ScienceGent for UI display
 */
export const transformSupabaseToFormattedScienceGent = (
  supabaseData: any
): FormattedScienceGent => {
  if (!supabaseData) return null;

  // Extract capabilities from the supabase data if available
  const capabilities = supabaseData.capabilities
    ? supabaseData.capabilities.map(cap => cap.capability_id)
    : [];

  // Convert socials JSON string to object if needed
  let socialLinks = {};
  try {
    if (supabaseData.socials) {
      if (typeof supabaseData.socials === 'string') {
        socialLinks = JSON.parse(supabaseData.socials);
      } else {
        socialLinks = supabaseData.socials;
      }
    }
  } catch (e) {
    console.error("Error parsing social links:", e);
  }
  
  // Use created_on_chain_at first, then fallback to created_at for timestamps
  const timestampField = supabaseData.created_on_chain_at || supabaseData.created_at;
  
  // Calculate token age from creation timestamp
  const creationTimestamp = timestampField 
    ? new Date(timestampField).getTime() / 1000
    : undefined;
    
  // Calculate formatted token age
  const formattedAge = formatAge(timestampField);
  
  // Create a formatted ScienceGent object for UI
  return {
    address: supabaseData.address,
    name: supabaseData.name,
    symbol: supabaseData.symbol,
    description: supabaseData.description,
    profilePic: supabaseData.profile_pic,
    website: supabaseData.website,
    socialLinks,
    isMigrated: !!supabaseData.is_migrated,
    totalSupply: supabaseData.total_supply?.toString(),
    tokenPrice: supabaseData.token_price ? parseFloat(String(supabaseData.token_price)) : 0,
    marketCap: supabaseData.market_cap ? parseFloat(String(supabaseData.market_cap)) : 0,
    maturityProgress: supabaseData.maturity_progress || 0,
    virtualEth: supabaseData.virtual_eth ? parseFloat(String(supabaseData.virtual_eth)) : 0,
    collectedFees: supabaseData.collected_fees ? parseFloat(String(supabaseData.collected_fees)) : 0,
    remainingMaturityTime: supabaseData.remaining_maturity_time,
    creationTimestamp,
    formattedAge,
    tokenAge: creationTimestamp ? Math.floor(Date.now() / 1000) - creationTimestamp : 0,
    migrationEligible: supabaseData.migration_eligible,
    capabilities,
    domain: supabaseData.domain || "General Science",
    agentFee: supabaseData.agent_fee || 2,
    persona: supabaseData.persona
  };
};
