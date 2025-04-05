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

// Define a more complete interface for ScienceGent data from Supabase
interface ScienceGentData {
  address: string;
  interactions_count?: number;
  agent_fee?: number;
  total_supply?: number;
  token_reserves?: number;
  eth_reserves?: number;
  virtual_eth?: number;
  collected_fees?: number;
  capability_fees?: number;
  trading_enabled?: boolean;
  creator_address?: string;
  created_on_chain_at?: string;
  maturity_deadline?: number;
  is_migrated?: boolean;
  migration_eligible?: boolean;
  token_price?: number;
  token_price_usd?: number;
  market_cap?: number;
  total_liquidity_usd?: number;
  maturity_progress?: number;
  remaining_maturity_time?: number;
  migration_condition?: number;
  age?: number;
  [key: string]: any; // Allow for additional fields
}

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
export type { TokenStatsUpdateData, FetchedTokenStats, TokenStats, ScienceGentData };

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
        const result = await fetchTokenStats(token.address, ethPrice);
        
        if (result.success && result.tokenStats) {
          // Update Supabase with new stats
          const { error: updateError } = await supabase
            .from('sciencegent_stats')
            .upsert({
              sciencegent_address: token.address,
              holders: result.tokenStats.holders,
              updated_at: new Date().toISOString()
            })
            .select();

          if (updateError) {
            console.error(`Failed to update stats for ${token.address}:`, updateError);
            errorCount++;
          } else {
            syncCount++;
          }
        } else {
          errorCount++;
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
 * @returns Object containing token stats and success/error information
 */
export const fetchTokenStats = async (
  tokenAddress: string, 
  ethPrice: number
): Promise<{ 
  success: boolean; 
  error?: string; 
  tokenStats?: TokenStats; 
  data?: any;
}> => {
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
    
    // Check on-chain trading status and fetch contract data to sync with Supabase
    let virtualEth = 0;
    let collectedFees = 0;
    let capabilityFees = 0;
    let maturityProgress = 0;
    let tradingEnabled = false;
    let migrationEligible = false;
    
    try {
      const { ethers } = await import('ethers');
      const { contractConfig } = await import('@/utils/contractConfig');
      
      // Get provider without needing wallet connection
      const provider = new ethers.providers.JsonRpcProvider(contractConfig.network.rpcUrls[0]);
      
      // Create contract instances
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        [
          'function isTradingEnabled(address) view returns (bool)',
          'function getTokenStats(address) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)'
        ],
        provider
      );
      
      // Check if trading is already enabled
      tradingEnabled = await swapContract.isTradingEnabled(tokenAddress);
      
      // Get token stats from the contract to update maturity progress
      const tokenStats = await swapContract.getTokenStats(tokenAddress);
      
      // Extract the required values for maturity progress calculation
      virtualEth = parseFloat(ethers.utils.formatEther(tokenStats[2])); // virtualETH
      collectedFees = parseFloat(ethers.utils.formatEther(tokenStats[3])); // collectedFees
      migrationEligible = tokenStats[12]; // migrationEligible
      
      // Calculate maturity progress
      try {
        // Get capability fees (could be 0 if not set)
        const factoryContract = new ethers.Contract(
          contractConfig.addresses.ScienceGentsFactory,
          ['function calculateTotalCapabilityFeeOfToken(address) view returns (uint256)'],
          provider
        );
        
        const rawCapabilityFees = await factoryContract.calculateTotalCapabilityFeeOfToken(tokenAddress);
        capabilityFees = parseFloat(ethers.utils.formatEther(rawCapabilityFees));
      } catch (err) {
        console.error("Error fetching capability fees:", err);
        // Continue with 0 capability fees if there's an error
      }
      
      // Calculate maturity progress
      const migrationCondition = (2 * virtualEth) + capabilityFees;
      maturityProgress = migrationCondition > 0 
        ? Math.min(100, (collectedFees / migrationCondition) * 100) 
        : 0;
      
      console.log("Calculated maturity progress:", {
        virtualEth,
        collectedFees,
        capabilityFees,
        migrationCondition,
        maturityProgress
      });
      
      if (tradingEnabled) {
        console.log("Trading is enabled on-chain for", tokenAddress, "- updating Supabase");
        // Use a function to update Supabase to reflect the correct state
        await updateTradingStatus(tokenAddress, true);
      } else {
        console.log("Trading is NOT enabled on-chain for", tokenAddress);
      }
    } catch (err) {
      console.error("Error checking on-chain trading status or calculating maturity:", err);
      // Continue with default values rather than failing the entire operation
    }
    
    // Initialize a variable to hold Supabase data
    let sgData: any = null;
    
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
    const { data: dbData, error: sgError } = await supabase
      .from('sciencegents')
      .select('*')
      .ilike('address', normalizedAddress)
      .maybeSingle();
      
    if (sgError) {
      console.error('Supabase error:', sgError);
      // Continue with defaults instead of throwing
    } else if (dbData) {
      // Found data in Supabase
      sgData = dbData;
      
      // Update interactions from Supabase
      // Use type assertion to safely access the properties
      const data = dbData as ScienceGentData;
      stats.interactions = data.interactions_count || 0;
      
      // Calculate revenue in DSI (agent_fee * interactions_count)
      const agentFee = data.agent_fee || 0;
      stats.revenue = agentFee * stats.interactions;
      
      console.log('Fetched data:', {
        address: normalizedAddress,
        interactions: stats.interactions,
        agentFee,
        revenue: stats.revenue,
        rawData: dbData
      });
    } else {
      // Try direct query without any case transformation
      const { data: directData, error: directError } = await supabase
        .from('sciencegents')
        .select('*')
        .eq('address', tokenAddress)
        .maybeSingle();
        
      if (directError) {
        console.error('Direct query error:', directError);
      } else if (directData) {
        sgData = directData;
        // Use type assertion to safely access the properties
        const data = directData as ScienceGentData;
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
    
    // Update maturity_progress in the database if we calculated a valid value
    if (maturityProgress > 0 && sgData) {
      try {
        console.log("Updating maturity_progress to:", maturityProgress, "for token:", normalizedAddress);
        
        // Try with a case-insensitive (ILIKE) match first
        const { data, error: updateError } = await supabase
          .from('sciencegents')
          .update({ 
            maturity_progress: maturityProgress,
            virtual_eth: virtualEth,
            collected_fees: collectedFees,
            capability_fees: capabilityFees,
            trading_enabled: tradingEnabled,
            migration_eligible: migrationEligible
          })
          .ilike('address', normalizedAddress)
          .select();
        
        if (updateError) {
          console.error("Failed to update maturity progress in Supabase:", updateError);
        } else if (!data || data.length === 0) {
          console.error("No rows matched for address when updating maturity progress:", normalizedAddress);
          
          // Try a direct query to see if the token exists in the database
          const { data: checkData } = await supabase
            .from('sciencegents')
            .select('address, maturity_progress')
            .ilike('address', normalizedAddress);
            
          console.log("Database check results for maturity update:", checkData);
          
          // If we found the token but couldn't update it, try with the exact address format
          if (checkData && checkData.length > 0) {
            const exactAddress = checkData[0].address;
            console.log("Trying with exact address format for maturity update:", exactAddress);
            
            const { error: exactError } = await supabase
              .from('sciencegents')
              .update({ 
                maturity_progress: maturityProgress,
                virtual_eth: virtualEth,
                collected_fees: collectedFees,
                capability_fees: capabilityFees,
                trading_enabled: tradingEnabled,
                migration_eligible: migrationEligible
              })
              .eq('address', exactAddress);
              
            if (exactError) {
              console.error("Exact address maturity update failed:", exactError);
            } else {
              console.log("Successfully updated maturity progress with exact address:", exactAddress);
              
              // Refresh the data to include our updates
              const { data: refreshedData } = await supabase
                .from('sciencegents')
                .select('*')
                .eq('address', exactAddress)
                .maybeSingle();
                
              if (refreshedData) {
                sgData = refreshedData;
              }
            }
          }
        } else {
          console.log("Successfully updated maturity progress for", normalizedAddress, "to", maturityProgress);
          
          // Refresh sgData with the updated data
          if (data && data.length > 0) {
            sgData = data[0];
          }
        }
      } catch (err) {
        console.error("Error updating maturity progress:", err);
      }
    }
    
    // 2. Get holders count from Moralis API
    const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
    
    if (!moralisApiKey) {
      console.warn('Moralis API key not found in environment variables.');
      return {
        success: true,
        tokenStats: stats,
        data: sgData || {
          address: tokenAddress,
          trading_enabled: tradingEnabled,
          virtual_eth: virtualEth,
          collected_fees: collectedFees,
          capability_fees: capabilityFees,
          maturity_progress: maturityProgress,
          migration_eligible: migrationEligible
        }
      };
    }
    
    try {
      // Fetch holders count
      const holdersResponse = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners?chain=bsc%20testnet`,
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
    
    // If we don't have sgData yet, create a basic one with the information we have
    if (!sgData) {
      sgData = {
        address: tokenAddress,
        trading_enabled: tradingEnabled,
        virtual_eth: virtualEth,
        collected_fees: collectedFees,
        capability_fees: capabilityFees,
        maturity_progress: maturityProgress,
        migration_eligible: migrationEligible
      };
    }
    
    return {
      success: true,
      tokenStats: stats,
      data: sgData
    };
  } catch (error) {
    console.error('Error fetching token stats:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Helper function to update trading status in Supabase
const updateTradingStatus = async (address: string, enabled: boolean) => {
  try {
    // First try with lowercase address
    const normalizedAddress = address.toLowerCase();
    
    // Debug log to check the query parameters
    console.log("Updating Supabase trading status for:", normalizedAddress, "to:", enabled);
    
    // Try with a case-insensitive (ILIKE) match instead of exact eq match
    const { data, error: updateError } = await supabase
      .from('sciencegents')
      .update({ trading_enabled: enabled })
      .ilike('address', normalizedAddress)
      .select();
    
    if (updateError) {
      console.error("Failed to update trading status in Supabase:", updateError);
    } else if (!data || data.length === 0) {
      console.error("No rows matched for address:", normalizedAddress);
      
      // Try a direct query to see if the token exists in the database
      const { data: checkData } = await supabase
        .from('sciencegents')
        .select('address, trading_enabled')
        .ilike('address', normalizedAddress);
        
      console.log("Database check results:", checkData);
      
      // If we found the token but couldn't update it, try with the exact address format
      if (checkData && checkData.length > 0) {
        const exactAddress = checkData[0].address;
        console.log("Trying with exact address format:", exactAddress);
        
        const { error: exactError } = await supabase
          .from('sciencegents')
          .update({ trading_enabled: enabled })
          .eq('address', exactAddress);
          
        if (exactError) {
          console.error("Exact address update failed:", exactError);
        } else {
          console.log("Successfully updated with exact address:", exactAddress);
        }
      }
    } else {
      console.log("Successfully updated trading status in Supabase for", normalizedAddress);
      console.log("Updated data:", data);
    }
  } catch (err) {
    console.error("Error updating Supabase:", err);
  }
}; 