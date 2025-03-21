
import { ScienceGentData, TokenStats } from './types';
import { ethers } from 'ethers';

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
    ? currentTimestamp - blockchainData.creationTimestamp 
    : 0;
  
  // Calculate remaining maturity time
  const remainingMaturityTime = blockchainData.maturityDeadline 
    ? Math.max(0, blockchainData.maturityDeadline - currentTimestamp)
    : 0;
  
  // Calculate market cap
  let marketCap = 0;
  if (tokenStats.currentPrice && blockchainData.totalSupply) {
    const price = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
    const supply = parseFloat(ethers.utils.formatEther(blockchainData.totalSupply));
    marketCap = price * supply;
  }
  
  // Calculate maturity progress
  let maturityProgress = 0;
  if (tokenStats.virtualETH && tokenStats.collectedFees) {
    const virtualETH = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
    const collectedFees = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
    
    // Target is 2x virtualETH
    const targetFees = 2 * virtualETH;
    maturityProgress = Math.min(Math.round((collectedFees / targetFees) * 100), 100);
  }
  
  // Main ScienceGent data for the sciencegents table
  const scienceGent = {
    address: blockchainData.address,
    name: blockchainData.name,
    symbol: blockchainData.symbol,
    total_supply: blockchainData.totalSupply ? ethers.utils.formatEther(blockchainData.totalSupply) : null,
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
    remaining_maturity_time: remainingMaturityTime,
    maturity_progress: maturityProgress,
    token_price: tokenStats.currentPrice ? ethers.utils.formatEther(tokenStats.currentPrice) : 0,
    market_cap: marketCap,
    virtual_eth: tokenStats.virtualETH ? ethers.utils.formatEther(tokenStats.virtualETH) : 0,
    collected_fees: tokenStats.collectedFees ? ethers.utils.formatEther(tokenStats.collectedFees) : 0,
    last_synced_at: new Date().toISOString()
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
