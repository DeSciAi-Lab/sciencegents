
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ethers } from "ethers";
import { getProvider } from "@/services/walletService";
import { contractConfig } from "@/utils/contractConfig";

// Mock ABIs for development until we have the real ones
// These will be replaced with actual ABIs from the contract config once available
const mockScienceGentsSwapABI = [
  "function getTokenStats(address token) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)"
];

const mockScienceGentsFactoryABI = [
  "function getTokenDetails(address token) view returns (string, string, uint256, address, bool, bool, uint256, uint256, uint256, bool)",
  "function getTokenCapabilitiesPage(address token, uint256 offset, uint256 limit) view returns (string[])"
];

// Interface for ScienceGent data structure
export interface ScienceGentListItem {
  id: string;
  name: string;
  address: string;
  profilePic?: string;
  marketCap: number;
  tokenPrice: number;
  marketCapUsd?: number;
  tokenPriceUsd?: number;
  age: string;
  roi: number;
  domain: string;
  featured?: boolean;
  isMigrated?: boolean;
  migrationEligible?: boolean;
  symbol: string;
  volume24h: number;
  revenue: number;
  priceChange24h: number;
  rating: number;
  maturityStatus: string;
  isCurated?: boolean;
  capabilities?: string[];
  creationTimestamp?: string;
  maturityProgress: number; // Making sure this is required, not optional
}

// Default ETH price for USD conversions if no live data is available
const ETH_PRICE_USD = 3000;

/**
 * Fetches ScienceGent data from Supabase for the explore page
 */
export const fetchScienceGents = async (): Promise<ScienceGentListItem[]> => {
  try {
    console.log("Fetching ScienceGents from Supabase");

    // Get ScienceGents with their stats
    const { data, error } = await supabase
      .from('sciencegents')
      .select(`
        id, 
        name, 
        address, 
        profile_pic, 
        market_cap, 
        market_cap_usd,
        token_price, 
        token_price_usd,
        created_at,
        created_on_chain_at,
        domain, 
        virtual_eth,
        symbol,
        price_change_24h,
        is_migrated,
        migration_eligible,
        maturity_progress,
        agent_fee,
        total_supply,
        age,
        stats:sciencegent_stats(volume_24h, transactions, holders, trade_volume_eth)
      `)
      .order('market_cap', { ascending: false });

    if (error) {
      console.error("Error fetching ScienceGents:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("No ScienceGents found");
      return [];
    }

    console.log(`Found ${data.length} ScienceGents`);

    // Format the data for the UI
    const formattedData = data.map(item => {
      // Calculate ROI (simplified calculation for now)
      const virtualEth = item.virtual_eth || 0;
      const volume = item.stats?.[0]?.volume_24h || 0;
      
      // Simple ROI formula: (volume / virtual_eth * 10) limited to reasonable range
      const roi = virtualEth > 0 
        ? Math.min(Math.max((volume / virtualEth * 10) - 5, -50), 100) 
        : 0;
      
      // Calculate age from created_on_chain_at or age field if available
      let ageDisplay = "unknown";
      if (item.age) {
        ageDisplay = `${item.age} days`;
      } else if (item.created_on_chain_at) {
        try {
          // Calculate age in days from creation timestamp
          const creationDate = new Date(item.created_on_chain_at);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - creationDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          ageDisplay = `${diffDays} days`;
        } catch (e) {
          console.error("Error calculating age from creation date:", e, item.created_on_chain_at);
        }
      } else if (item.created_at) {
        try {
          // Parse the timestamp and format it as a relative time
          const creationDate = new Date(item.created_at);
          ageDisplay = formatDistanceToNow(creationDate, { addSuffix: false });
        } catch (e) {
          console.error("Error parsing creation date:", e, item.created_at);
        }
      }

      // Featured status based on market cap or other criteria
      const featured = item.market_cap > 500000;
      
      // Determine maturity status
      let maturityStatus = "Immature";
      if (item.is_migrated) {
        maturityStatus = "Migrated";
      } else if (item.migration_eligible) {
        maturityStatus = "Ready";
      } else if (item.maturity_progress && item.maturity_progress >= 50) {
        maturityStatus = "Near";
      }

      // Calculate revenue for demo purposes based on market cap and agent fee
      const agentFee = item.agent_fee || 2;
      const revenue = Math.floor(item.market_cap * 0.1 * agentFee);
      
      // Rating based on transaction volume and maturity
      const volumeScore = Math.min(5, Math.max(3, 3 + (item.stats?.[0]?.volume_24h || 0) / 1000));
      const maturityScore = item.is_migrated ? 5 : (item.migration_eligible ? 4 : 3);
      const rating = Math.round((volumeScore + maturityScore) / 2);
      
      // Calculate USD values safely
      const marketCapUsd = item.market_cap_usd ?? (item.market_cap ? item.market_cap * ETH_PRICE_USD : 0);
      const tokenPriceUsd = item.token_price_usd ?? (item.token_price ? item.token_price * ETH_PRICE_USD : 0);

      return {
        id: item.id,
        name: item.name,
        address: item.address,
        profilePic: item.profile_pic,
        marketCap: item.market_cap || 0,
        tokenPrice: item.token_price || 0,
        marketCapUsd,
        tokenPriceUsd,
        age: ageDisplay,
        roi,
        domain: item.domain || "General",
        featured,
        isMigrated: item.is_migrated || false,
        migrationEligible: item.migration_eligible || false,
        symbol: item.symbol || `${item.name.substring(0, 3).toUpperCase()}`,
        volume24h: item.stats?.[0]?.volume_24h || 0,
        revenue: revenue,
        priceChange24h: item.price_change_24h || 0,
        rating,
        maturityStatus,
        isCurated: Math.random() > 0.7, // Random for demo, will update with real data
        creationTimestamp: item.created_at,
        maturityProgress: item.maturity_progress || 0
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Error in fetchScienceGents:", error);
    return [];
  }
};

/**
 * Fetch blockchain details for a specific token
 */
export const fetchTokenBlockchainDetails = async (tokenAddress: string) => {
  try {
    const provider = await getProvider();
    
    // Create contract instances with mock ABIs for now
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap, 
      mockScienceGentsSwapABI, 
      provider
    );
    
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      mockScienceGentsFactoryABI,
      provider
    );
    
    // Get token details
    const tokenStats = await swapContract.getTokenStats(tokenAddress);
    const tokenDetails = await factoryContract.getTokenDetails(tokenAddress);
    
    // Return formatted data
    return {
      tokenReserve: tokenStats.tokenReserve,
      ethReserve: tokenStats.ethReserve,
      virtualETH: tokenStats.virtualETH,
      collectedFees: tokenStats.collectedFees,
      tradingEnabled: tokenStats.tradingEnabled,
      creator: tokenStats.creator,
      creationTimestamp: tokenStats.creationTimestamp,
      maturityDeadline: tokenStats.maturityDeadline,
      isMigrated: tokenStats.migrated,
      lpUnlockTime: tokenStats.lpUnlockTime,
      lockedLPAmount: tokenStats.lockedLPAmount,
      currentPrice: tokenStats.currentPrice,
      migrationEligible: tokenStats.migrationEligible,
      name: tokenDetails.name,
      symbol: tokenDetails.symbol,
      totalSupply: tokenDetails.totalSupply,
      capabilities: await factoryContract.getTokenCapabilitiesPage(tokenAddress, 0, 100)
    };
  } catch (error) {
    console.error("Error fetching blockchain details:", error);
    return null;
  }
};

/**
 * Filters ScienceGents based on search query and domain
 */
export const filterScienceGents = (
  scienceGents: ScienceGentListItem[],
  searchQuery: string,
  activeFilter: string
): ScienceGentListItem[] => {
  let result = [...scienceGents];
  
  // Apply domain filter if it's a domain
  if (activeFilter !== 'all' && ['chemistry', 'genomics', 'physics', 'materials science', 'protein analysis', 'drug discovery', 'general'].includes(activeFilter)) {
    result = result.filter(gent => 
      gent.domain.toLowerCase() === activeFilter.toLowerCase()
    );
  }
  
  // Apply curation filter
  if (activeFilter === 'curated') {
    result = result.filter(gent => gent.isCurated);
  } else if (activeFilter === 'uncurated') {
    result = result.filter(gent => !gent.isCurated);
  }
  
  // Apply maturity filter
  if (activeFilter === 'migrated') {
    result = result.filter(gent => gent.maturityStatus === 'Migrated');
  } else if (activeFilter === 'ready') {
    result = result.filter(gent => gent.maturityStatus === 'Ready');
  } else if (activeFilter === 'immature') {
    result = result.filter(gent => gent.maturityStatus === 'Immature' || gent.maturityStatus === 'Near');
  }
  
  // Apply role filter (simplified for demo)
  if (activeFilter === 'researcher' || activeFilter === 'reviewer' || activeFilter === 'assistant') {
    // In a real app, this would filter based on actual role data
    result = result.filter(() => Math.random() > 0.5);
  }
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(gent => 
      gent.name.toLowerCase().includes(query) || 
      gent.address.toLowerCase().includes(query) ||
      gent.symbol.toLowerCase().includes(query)
    );
  }
  
  return result;
};

/**
 * Sorts ScienceGents based on sort criteria
 */
export const sortScienceGents = (
  scienceGents: ScienceGentListItem[],
  sortBy: keyof ScienceGentListItem,
  sortOrder: 'asc' | 'desc'
): ScienceGentListItem[] => {
  return [...scienceGents].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    // Handle string comparison differently
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    // Handle number comparison
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

/**
 * Get platform statistics from ScienceGents data
 */
export const getPlatformStats = (scienceGents: ScienceGentListItem[]) => {
  // Calculate total stats
  const totalScienceGents = scienceGents.length;
  
  // Sum up volumes across all tokens for "transactions"
  const totalTransactions = scienceGents.reduce((sum, gent) => sum + Math.floor(gent.volume24h / 0.01), 0);
  
  // Sum up market caps for "total liquidity"
  const totalLiquidity = scienceGents.reduce((sum, gent) => sum + gent.marketCap, 0);
  
  // Sum up revenues for "total revenue"
  const totalRevenue = scienceGents.reduce((sum, gent) => sum + gent.revenue, 0);
  
  return {
    totalScienceGents: formatStatValue(totalScienceGents),
    totalTransactions: formatStatValue(totalTransactions),
    totalLiquidity: formatStatValue(totalLiquidity),
    totalRevenue: formatStatValue(totalRevenue)
  };
};

/**
 * Format stat values for display
 */
const formatStatValue = (value: number): string => {
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)}M`;
  } else if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }
  return value.toString();
};
