import { supabase } from '@/integrations/supabase/client';
import { 
  syncAllCreationTimestampsFromBlockchain,
  fetchScienceGentFromBlockchain, 
  fetchTokenStatsFromBlockchain,
  syncAllScienceGentsFromBlockchain,
  fetchCreationTimestampFromBlockchain
} from './scienceGent/blockchain';
import { 
  syncScienceGent, 
  fetchScienceGentFromSupabase, 
  saveScienceGentToSupabase,
  fetchTokenDataFromSupabase
} from './scienceGent/index';
import type { TokenStatsUpdateData, FetchedTokenStats } from './scienceGent/index';
import { formatAge } from './scienceGent/transformations';

interface TokenStats {
  interactions: number;
  revenue: number;
  holders: number;
  error?: string;
}

// Re-export all the functions that are needed by other modules
export { 
  syncAllCreationTimestampsFromBlockchain, 
  syncScienceGent, 
  fetchScienceGentFromBlockchain,
  fetchTokenStatsFromBlockchain,
  fetchScienceGentFromSupabase,
  saveScienceGentToSupabase,
  formatAge,
  fetchTokenDataFromSupabase
};

// Re-export types
export type { TokenStatsUpdateData, FetchedTokenStats, TokenStats };

/**
 * Fetches token statistics for a ScienceGent token
 * @param tokenAddress The address of the ScienceGent token
 * @param ethPrice Current ETH price in USD
 * @returns Object containing interactions, revenue, and holders count
 */
export const fetchTokenStats = async (tokenAddress: string, ethPrice: number): Promise<TokenStats> => {
  try {
    // Initialize return object
    const stats: TokenStats = {
      interactions: 0,
      revenue: 0,
      holders: 0
    };
    
    // 1. Get interaction data from Supabase
    const { data: sgData, error: sgError } = await supabase
      .from('sciencegents')
      .select('interactions_count, agent_fee')
      .eq('address', tokenAddress.toLowerCase())
      .single();
      
    if (sgError) {
      console.error('Supabase error:', sgError);
      // Continue with defaults instead of throwing
    } else if (sgData) {
      // Update interactions from Supabase if the column exists
      if ('interactions_count' in sgData) {
        stats.interactions = typeof sgData.interactions_count === 'number' ? sgData.interactions_count : 0;
      }
      
      // Calculate revenue as agent_fee * interaction_count if both exist
      if ('agent_fee' in sgData) {
        const agentFee = typeof sgData.agent_fee === 'number' ? sgData.agent_fee : 0;
        stats.revenue = agentFee * stats.interactions;
      }
    }
    
    // 2. Get holders count from Moralis API
    const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
    
    if (!moralisApiKey) {
      console.warn('Moralis API key not found in environment variables.');
      return {
        ...stats,
        error: 'API key not configured.'
      };
    }
    
    try {
      // Fetch holders count
      const holdersResponse = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?chain=sepolia`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      if (holdersResponse.ok) {
        const holdersData = await holdersResponse.json();
        stats.holders = holdersData.result?.length || 0;
      } else {
        console.error('Failed to fetch holders count from Moralis:', 
          await holdersResponse.text());
      }
    } catch (fetchError) {
      console.error('Error fetching from Moralis:', fetchError);
    }
    
    return stats;
  } catch (error) {
    console.error('Error fetching token stats:', error);
    return {
      interactions: 0,
      revenue: 0, 
      holders: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 