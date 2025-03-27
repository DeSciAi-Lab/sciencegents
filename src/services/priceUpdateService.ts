
import { supabase } from '@/integrations/supabase/client';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { updateEthPrice } from '@/utils/scienceGentCalculations';

/**
 * Update price data for a specific token in Supabase
 * @param address Token address
 * @returns Promise resolving to updated token data or null
 */
export const updateTokenPrice = async (address: string): Promise<any> => {
  try {
    // Check if token exists in database
    const { data: token, error: tokenError } = await supabase
      .from('sciencegents')
      .select('address, total_supply')
      .eq('address', address)
      .single();
    
    if (tokenError || !token) {
      console.error("Token not found:", address);
      return null;
    }
    
    // Get current ETH price from blockchain
    const provider = new ethers.providers.JsonRpcProvider(contractConfig.network.rpcUrls[0]);
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      [
        'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
      ],
      provider
    );
    
    const stats = await swapContract.getTokenStats(address);
    const currentPriceInEth = stats[11] ? parseFloat(ethers.utils.formatEther(stats[11])) : 0;
    
    // Calculate market cap based on token price and total supply
    const totalSupply = token.total_supply ? parseFloat(ethers.utils.formatUnits(token.total_supply, 18)) : 0;
    const marketCap = currentPriceInEth * totalSupply;
    
    // Get current ETH to USD rate
    const ethToUsdRate = await updateEthPrice();
    const priceInUsd = currentPriceInEth * ethToUsdRate;
    
    // Update token data in Supabase
    const { data: updatedToken, error: updateError } = await supabase
      .from('sciencegents')
      .update({
        token_price: currentPriceInEth,
        price_usd: priceInUsd,
        market_cap: marketCap,
        last_price_update: new Date().toISOString()
      })
      .eq('address', address)
      .select()
      .single();
    
    if (updateError) {
      console.error("Error updating token price:", updateError);
      return null;
    }
    
    return updatedToken;
  } catch (error) {
    console.error("Error in updateTokenPrice:", error);
    return null;
  }
};

/**
 * Update price data for all tokens in Supabase
 * @param limit Maximum number of tokens to update (default: 10)
 * @returns Promise resolving to number of updated tokens
 */
export const updateAllTokenPrices = async (limit: number = 10): Promise<number> => {
  try {
    // Get tokens that need price update (oldest first, limit to 10 by default)
    const { data: tokens, error } = await supabase
      .from('sciencegents')
      .select('address')
      .order('last_price_update', { ascending: true })
      .limit(limit);
    
    if (error || !tokens || tokens.length === 0) {
      console.error("No tokens found for update or error:", error);
      return 0;
    }
    
    // Update prices for tokens
    let updatedCount = 0;
    for (const token of tokens) {
      const updated = await updateTokenPrice(token.address);
      if (updated) updatedCount++;
      
      // Add small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`Updated prices for ${updatedCount} tokens`);
    return updatedCount;
  } catch (error) {
    console.error("Error in updateAllTokenPrices:", error);
    return 0;
  }
};

/**
 * Check if token price data needs update
 * @param address Token address
 * @param maxAgeMinutes Maximum age in minutes before update needed (default: 10)
 * @returns Promise resolving to boolean indicating if update is needed
 */
export const shouldUpdateTokenPrice = async (
  address: string, 
  maxAgeMinutes: number = 10
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('sciencegents')
      .select('last_price_update')
      .eq('address', address)
      .single();
    
    if (error || !data || !data.last_price_update) {
      return true; // Update needed if error or no data
    }
    
    const lastUpdate = new Date(data.last_price_update);
    const now = new Date();
    const diffMs = now.getTime() - lastUpdate.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    
    return diffMinutes > maxAgeMinutes;
  } catch (error) {
    console.error("Error checking if token price needs update:", error);
    return true; // Update when in doubt
  }
};
