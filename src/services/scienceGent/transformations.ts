
import { ScienceGentData, TokenStats, FormattedScienceGent } from './types';
import { ethers } from 'ethers';
import { fetchCurrentEthPrice, calculateTokenPrice, calculateMarketCap } from '@/utils/scienceGentCalculations';

/**
 * Transforms blockchain data to Supabase format
 * @param scienceGentData Blockchain data
 * @param tokenStats Token statistics
 * @returns Transformed data for Supabase
 */
export const transformBlockchainToSupabaseFormat = async (
  scienceGentData: ScienceGentData,
  tokenStats: TokenStats
) => {
  try {
    console.log("Transforming data for Supabase...");
    
    // Format total supply
    let totalSupplyFormatted = 0;
    try {
      totalSupplyFormatted = parseFloat(ethers.utils.formatEther(scienceGentData.totalSupply));
      console.log("Total supply formatted:", totalSupplyFormatted);
    } catch (error) {
      console.error("Error formatting total supply in transformation:", error);
      // Fallback to manual calculation
      totalSupplyFormatted = Number(scienceGentData.totalSupply) / 10**18;
    }
    
    // Get current ETH price
    const ethPrice = await fetchCurrentEthPrice();
    console.log("ETH price in transformation:", ethPrice);
    
    // Calculate token price in ETH
    const tokenPrice = calculateTokenPrice(tokenStats.currentPrice);
    console.log("Token price in ETH in transformation:", tokenPrice);
    
    // Calculate token price in USD
    const priceUsd = tokenPrice * ethPrice;
    console.log("Token price in USD in transformation:", priceUsd);
    
    // Calculate market cap
    const marketCap = priceUsd * totalSupplyFormatted;
    console.log("Calculated market cap in USD in transformation:", marketCap);
    
    // Calculate maturity progress
    let maturityProgress = 0;
    if (tokenStats.virtualETH && parseFloat(ethers.utils.formatEther(tokenStats.virtualETH)) > 0) {
      const virtualEth = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
      const collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees || '0'));
      const targetFees = 2 * virtualEth; // 2x virtual ETH for migration
      maturityProgress = Math.min(Math.round((collectedFees / targetFees) * 100), 100);
    }
    
    // Format basic token data
    const scienceGent = {
      address: scienceGentData.address,
      name: scienceGentData.name,
      symbol: scienceGentData.symbol,
      total_supply: totalSupplyFormatted,
      creator_address: scienceGentData.creator,
      description: scienceGentData.description || '',
      profile_pic: scienceGentData.profilePic || '',
      website: scienceGentData.website || '',
      socials: scienceGentData.socialLinks || scienceGentData.socials || {}, // Use either property
      is_migrated: tokenStats.migrated || tokenStats.isMigrated || false, // Handle both property names
      migration_eligible: tokenStats.migrationEligible || false,
      created_at: scienceGentData.createdAt ? 
        (typeof scienceGentData.createdAt === 'number' ? 
          new Date(scienceGentData.createdAt).toISOString() : 
          scienceGentData.createdAt) : 
        new Date().toISOString(),
      created_on_chain_at: scienceGentData.createdOnChainAt ? 
        (typeof scienceGentData.createdOnChainAt === 'number' ? 
          new Date(scienceGentData.createdOnChainAt).toISOString() : 
          scienceGentData.createdOnChainAt) : 
        null,
      maturity_deadline: tokenStats.maturityDeadline ? Number(tokenStats.maturityDeadline) : null,
      remaining_maturity_time: tokenStats.remainingMaturityTime ? Number(tokenStats.remainingMaturityTime) : null,
      maturity_progress: maturityProgress,
      token_price: tokenPrice,
      price_usd: priceUsd,
      market_cap: marketCap,
      virtual_eth: tokenStats.virtualETH ? parseFloat(ethers.utils.formatEther(tokenStats.virtualETH)) : 0,
      collected_fees: tokenStats.collectedFees ? parseFloat(ethers.utils.formatEther(tokenStats.collectedFees)) : 0,
      total_liquidity: tokenStats.ethReserve ? parseFloat(ethers.utils.formatEther(tokenStats.ethReserve)) : 0,
      last_synced_at: new Date().toISOString(),
      domain: scienceGentData.domain || 'General Science',
      agent_fee: scienceGentData.agentFee || 2,
      persona: scienceGentData.persona || '',
      developer_name: scienceGentData.developerName || '',
      developer_email: scienceGentData.developerEmail || '',
      bio: scienceGentData.bio || '',
      developer_twitter: scienceGentData.developerTwitter || '',
      developer_telegram: scienceGentData.developerTelegram || '',
      developer_github: scienceGentData.developerGithub || '',
      developer_website: scienceGentData.developerWebsite || ''
    };
    
    // Format statistics data
    const scienceGentStats = {
      sciencegent_address: scienceGentData.address,
      volume_24h: tokenStats.volume24h || 0, // Handle missing property
      transactions: tokenStats.transactions || 0, // Handle missing property
      holders: tokenStats.holders || 0, // Handle missing property
      updated_at: new Date().toISOString()
    };

    console.log("Transformation complete. Key values:", {
      token_price: scienceGent.token_price,
      price_usd: scienceGent.price_usd,
      market_cap: scienceGent.market_cap
    });
    
    return { scienceGent, scienceGentStats };
  } catch (error) {
    console.error("Error transforming data:", error);
    throw error;
  }
};

/**
 * Transforms Supabase data to formatted ScienceGent
 * @param data Supabase data
 * @returns Formatted ScienceGent
 */
export const transformSupabaseToFormattedScienceGent = (data: any): FormattedScienceGent => {
  if (!data) return null;

  // Extract capabilities from the supabase data if available
  const capabilities = data.capabilities
    ? data.capabilities.map(cap => cap.capability_id)
    : [];

  // Convert socials JSON string to object if needed
  let socialLinks = {};
  try {
    if (data.socials) {
      if (typeof data.socials === 'string') {
        socialLinks = JSON.parse(data.socials);
      } else {
        socialLinks = data.socials;
      }
    }
  } catch (e) {
    console.error("Error parsing social links:", e);
  }
  
  // Use created_on_chain_at first, then fallback to created_at for timestamps
  const timestampField = data.created_on_chain_at || data.created_at;
  
  // Calculate token age from creation timestamp
  const creationTimestamp = timestampField 
    ? new Date(timestampField).getTime() / 1000
    : undefined;
    
  // Calculate formatted token age
  const formattedAge = formatAge(timestampField);
  
  // Create a formatted ScienceGent object for UI
  return {
    address: data.address,
    name: data.name,
    symbol: data.symbol,
    description: data.description,
    profilePic: data.profile_pic,
    website: data.website,
    socialLinks,
    isMigrated: !!data.is_migrated,
    totalSupply: data.total_supply?.toString(),
    tokenPrice: data.token_price ? parseFloat(String(data.token_price)) : 0,
    marketCap: data.market_cap ? parseFloat(String(data.market_cap)) : 0,
    maturityProgress: data.maturity_progress || 0,
    virtualEth: data.virtual_eth ? parseFloat(String(data.virtual_eth)) : 0,
    collectedFees: data.collected_fees ? parseFloat(String(data.collected_fees)) : 0,
    remainingMaturityTime: data.remaining_maturity_time,
    creationTimestamp,
    formattedAge,
    tokenAge: creationTimestamp ? Math.floor(Date.now() / 1000) - creationTimestamp : 0,
    migrationEligible: data.migration_eligible,
    capabilities,
    domain: data.domain || "General Science",
    agentFee: data.agent_fee || 2,
    persona: data.persona
  };
};

/**
 * Formats time difference into an age string
 * @param timestamp Unix timestamp
 * @returns Formatted age string
 */
export const formatAge = (timestamp: number): string => {
  if (!timestamp) return 'Unknown';
  
  // Convert timestamp to Date object
  let creationDate: Date;
  if (typeof timestamp === 'number') {
    creationDate = new Date(timestamp * 1000);
  } else if (typeof timestamp === 'string') {
    creationDate = new Date(timestamp);
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
