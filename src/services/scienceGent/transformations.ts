import { ScienceGentData, TokenStats, FormattedScienceGent } from './types';
import { ethers } from 'ethers';
import { 
  calculateMaturityProgress,
  calculateTokenPrice,
  calculateMarketCap
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
 * Transforms blockchain data to Supabase format
 * @param blockchainData ScienceGent data from blockchain
 * @param tokenStats Token statistics from blockchain
 * @returns Object with scienceGent and scienceGentStats data
 */
export const transformBlockchainToSupabaseFormat = (
  blockchainData: ScienceGentData,
  tokenStats: TokenStats
) => {
  // Calculate current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  // Calculate token age in seconds
  const tokenAge = blockchainData.creationTimestamp 
    ? currentTimestamp - parseInt(blockchainData.creationTimestamp, 10) 
    : 0;
  
  // Calculate remaining maturity time
  const remainingMaturityTime = blockchainData.maturityDeadline 
    ? Math.max(0, parseInt(blockchainData.maturityDeadline, 10) - currentTimestamp)
    : 0;
  
  // Calculate token price
  const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
  
  // Calculate market cap
  const marketCap = calculateMarketCap(
    tokenPrice,
    blockchainData.totalSupply || '0'
  );
  
  // Calculate maturity progress
  let virtualETH = 0;
  let collectedFees = 0;
  
  if (tokenStats.virtualETH) {
    virtualETH = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
  }
  
  if (tokenStats.collectedFees) {
    collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
  }
  
  // Calculate maturity progress using the utility function
  const maturityProgress = calculateMaturityProgress(
    virtualETH,
    collectedFees,
    blockchainData.capabilityFees || 0
  );
  
  // Main ScienceGent data for the sciencegents table
  const scienceGent = {
    address: blockchainData.address,
    name: blockchainData.name,
    symbol: blockchainData.symbol,
    total_supply: blockchainData.totalSupply ? parseFloat(ethers.utils.formatEther(blockchainData.totalSupply)) : null,
    creator_address: blockchainData.creator,
    description: blockchainData.description || null,
    profile_pic: blockchainData.profilePic || null,
    website: blockchainData.website || null,
    socials: blockchainData.socialLinks ? JSON.stringify(blockchainData.socialLinks) : null,
    is_migrated: blockchainData.isMigrated,
    migration_eligible: tokenStats.migrationEligible,
    created_on_chain_at: blockchainData.creationTimestamp 
      ? new Date(blockchainData.creationTimestamp * 1000).toISOString() 
      : null,
    maturity_deadline: blockchainData.maturityDeadline || null,
    remaining_maturity_time: tokenStats.remainingMaturityTime || null,
    maturity_progress: tokenStats.maturityProgress || 0,
    token_price: tokenStats.currentPrice ? parseFloat(ethers.utils.formatEther(tokenStats.currentPrice)) : 0,
    market_cap: calculateMarketCap(
      parseFloat(ethers.utils.formatEther(tokenStats.currentPrice || '0')),
      blockchainData.totalSupply || '0'
    ),
    virtual_eth: parseFloat(ethers.utils.formatEther(tokenStats.virtualETH || '0')),
    collected_fees: parseFloat(ethers.utils.formatEther(tokenStats.collectedFees || '0')),
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
    // Default values for now, can be populated with real data later
    volume_24h: 0,
    transactions: 0,
    holders: 0,
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
  
  // Calculate token age from creation timestamp
  const creationTimestamp = supabaseData.created_on_chain_at 
    ? new Date(supabaseData.created_on_chain_at).getTime() / 1000
    : undefined;
    
  // Calculate formatted token age
  const formattedAge = formatAge(supabaseData.created_on_chain_at);
  
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
