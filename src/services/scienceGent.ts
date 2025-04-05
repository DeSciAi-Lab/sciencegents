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
 * Syncs token statistics for all ScienceGent tokens
 * @param progressCallback Optional callback to report progress
 * @returns Object containing sync results
 */
export const syncAllTokenStats = async (
  progressCallback?: (current: number, total: number, status: string) => void
): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // Fetch all ScienceGent tokens from Supabase
    const { data: tokens, error } = await supabase
      .from('sciencegents')
      .select('address')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch tokens: ${error.message}`);
    }

    const total = tokens.length;
    let syncCount = 0;
    let errorCount = 0;

    // Get current ETH price (you may want to implement this)
    const ethPrice = 1; // placeholder, implement actual ETH price fetching

    // Process each token
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      if (progressCallback) {
        progressCallback(i + 1, total, `Processing token ${i + 1}/${total}`);
      }

      try {
        // Fetch and update stats for each token
        const stats = await fetchTokenStats(token.address, ethPrice);
        
        // Update Supabase with new stats
        const { error: updateError } = await supabase
          .from('sciencegent_stats')
          .upsert({
            sciencegent_address: token.address,
            holders: stats.holders,
            updated_at: new Date().toISOString()
          })
          .select();

        if (updateError) {
          console.error(`Failed to update stats for ${token.address}:`, updateError);
          errorCount++;
        } else {
          syncCount++;
        }
      } catch (err) {
        console.error(`Error processing token ${token.address}:`, err);
        errorCount++;
      }
    }

    return { syncCount, errorCount };
  } catch (error) {
    console.error('Error in syncAllTokenStats:', error);
    throw error;
  }
};

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
    
    // Normalize the address
    const normalizedAddress = tokenAddress.toLowerCase();
    console.log('Fetching stats for address:', normalizedAddress);
    
    // First get all matching tokens to debug
    const { data: allMatches, error: matchError } = await supabase
      .from('sciencegents')
      .select('address, interactions_count, agent_fee')
      .or(`address.eq.${normalizedAddress},address.eq.${tokenAddress}`);
      
    console.log('All potential matches:', allMatches);
    
    if (matchError) {
      console.error('Error checking matches:', matchError);
    }
    
    // Try case-insensitive match
    const { data: sgData, error: sgError } = await supabase
      .from('sciencegents')
      .select('interactions_count, agent_fee')
      .ilike('address', normalizedAddress)
      .maybeSingle();
      
    if (sgError) {
      console.error('Supabase error:', sgError);
      // Continue with defaults instead of throwing
    } else if (sgData) {
      // Update interactions from Supabase
      const data = sgData as { interactions_count?: number; agent_fee?: number };
      stats.interactions = data.interactions_count || 0;
      
      // Calculate revenue in DSI (agent_fee * interactions_count)
      const agentFee = data.agent_fee || 0;
      stats.revenue = agentFee * stats.interactions;
      
      console.log('Fetched data:', {
        address: normalizedAddress,
        interactions: stats.interactions,
        agentFee,
        revenue: stats.revenue,
        rawData: sgData
      });
    } else {
      // Try direct query without any case transformation
      const { data: directData, error: directError } = await supabase
        .from('sciencegents')
        .select('interactions_count, agent_fee')
        .eq('address', tokenAddress)
        .maybeSingle();
        
      if (directError) {
        console.error('Direct query error:', directError);
      } else if (directData) {
        const data = directData as { interactions_count?: number; agent_fee?: number };
        stats.interactions = data.interactions_count || 0;
        const agentFee = data.agent_fee || 0;
        stats.revenue = agentFee * stats.interactions;
        
        console.log('Fetched data (direct):', {
          address: tokenAddress,
          interactions: stats.interactions,
          agentFee,
          revenue: stats.revenue,
          rawData: directData
        });
      } else {
        console.log('No data found for address:', tokenAddress);
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
        const errorText = await holdersResponse.text();
        console.error('Failed to fetch holders count from Moralis:', errorText);
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