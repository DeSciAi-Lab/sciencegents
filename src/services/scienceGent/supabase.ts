
import { supabase } from '@/integrations/supabase/client';
import { FormattedScienceGent } from './types';

export const saveScienceGentToSupabase = async (scienceGentData: any, tokenStats: any): Promise<boolean> => {
  try {
    const {
      name,
      symbol,
      totalSupply,
      creator,
      tradingEnabled,
      isMigrated,
      capabilityCount,
      adminLockAmount,
      adminLockRemainingTime,
      adminLockIsUnlocked
    } = scienceGentData;
    
    const {
      tokenPrice,
      marketCap,
      totalLiquidity,
      totalVolume,
      holders,
      transactions
    } = tokenStats;
    
    const { error } = await supabase
      .from('sciencegents')
      .upsert({
        address: scienceGentData.contractAddress || scienceGentData.address,
        name,
        symbol,
        total_supply: totalSupply.toString(), // Convert to string to match database type
        creator_address: creator, // Updated to match DB schema
        trading_enabled: tradingEnabled,
        is_migrated: isMigrated,
        capability_count: capabilityCount,
        admin_lock_amount: adminLockAmount ? adminLockAmount.toString() : null,
        admin_lock_remaining_time: adminLockRemainingTime ? adminLockRemainingTime.toString() : null,
        admin_lock_is_unlocked: adminLockIsUnlocked,
        token_price: tokenPrice,
        market_cap: marketCap,
        total_liquidity: totalLiquidity,
        total_volume: totalVolume,
        holders: holders,
        transactions: transactions
      }, { onConflict: 'address' });
    
    if (error) {
      console.error("Error saving sciencegent to Supabase:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in saveScienceGentToSupabase:", error);
    return false;
  }
};

export const fetchScienceGentFromSupabase = async (address: string): Promise<FormattedScienceGent | null> => {
  try {
    const { data: rawData, error } = await supabase
      .from('sciencegents')
      .select(`
        *,
        capabilities:sciencegent_capabilities(
          id,
          capability_id,
          capability_name,
          capability_fee,
          capability_creator
        )
      `)
      .eq('address', address)
      .single();

    if (error) {
      console.error("Error fetching sciencegent from Supabase:", error);
      return null;
    }

    // Check if data exists to avoid TypeScript errors
    if (!rawData) {
      return null;
    }

    // Type assertion to avoid direct property access errors
    const data = rawData as any;

    // Transform to formatted ScienceGent with correct property names
    const formattedScienceGent: FormattedScienceGent = {
      address: data.address,
      name: data.name,
      symbol: data.symbol,
      totalSupply: data.total_supply,
      creator: data.creator_address, // Mapping from creator_address
      tradingEnabled: !!data.trading_enabled,
      isMigrated: !!data.is_migrated,
      maturityProgress: data.maturity_progress || 0,
      virtualEth: data.virtual_eth || 0,
      collectedFees: data.collected_fees || 0,
      tokenPrice: data.token_price || 0,
      marketCap: data.market_cap || 0,
      liquidity: data.total_liquidity || 0,
      holdersCount: data.holders || 0, // Add fallback for missing fields
      transactions: data.transactions || 0, // Add fallback for missing fields
      capabilities: data.capabilities || [],
      created_at: data.created_at,
      description: data.description || '',
      profilePic: data.profile_pic,
      website: data.website || '',
      // Handle JSON data safely
      socialLinks: (typeof data.socials === 'object' && data.socials !== null) 
        ? data.socials as Record<string, string> 
        : {},
      domain: data.domain || 'General',
      agentFee: data.agent_fee || 0,
      remainingMaturityTime: data.remaining_maturity_time || 0,
      migrationEligible: !!data.migration_eligible,
      uniswapPair: data.uniswap_pair || null,
      capabilityFees: data.capability_fees || 0
    };

    return formattedScienceGent;
  } catch (error) {
    console.error("Error in fetchScienceGentFromSupabase:", error);
    return null;
  }
};
