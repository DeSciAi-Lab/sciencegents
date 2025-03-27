
import { supabase } from '@/integrations/supabase/client';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { updateEthPrice } from '@/utils/scienceGentCalculations';

/**
 * Update prices of multiple tokens in Supabase
 * @param count Number of tokens to update (default: 10)
 * @returns Promise resolving to number of tokens updated
 */
export const syncPriceData = async (count: number = 10): Promise<number> => {
  try {
    // Get tokens that need price update (oldest first)
    const { data: tokens, error } = await supabase
      .from('sciencegents')
      .select('address, total_supply')
      .order('last_price_update', { ascending: true })
      .limit(count);
    
    if (error || !tokens || tokens.length === 0) {
      console.error("Error fetching tokens for price update:", error);
      return 0;
    }
    
    // Get current ETH to USD rate
    const ethToUsdRate = await updateEthPrice();
    
    // Update prices for tokens
    let updatedCount = 0;
    
    // Initialize Ethereum provider
    const provider = new ethers.providers.JsonRpcProvider(contractConfig.network.rpcUrls[0]);
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      [
        'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
      ],
      provider
    );
    
    // Process tokens in batches
    for (const token of tokens) {
      try {
        // Get current ETH price from blockchain
        const stats = await swapContract.getTokenStats(token.address);
        const currentPriceInEth = stats[11] ? parseFloat(ethers.utils.formatEther(stats[11])) : 0;
        
        // Calculate market cap based on token price and total supply
        const totalSupply = token.total_supply ? parseFloat(ethers.utils.formatUnits(token.total_supply, 18)) : 0;
        const marketCap = currentPriceInEth * totalSupply;
        
        // Calculate USD price
        const priceInUsd = currentPriceInEth * ethToUsdRate;
        
        // Update token data in Supabase
        await supabase
          .from('sciencegents')
          .update({
            token_price: currentPriceInEth,
            price_usd: priceInUsd,
            market_cap: marketCap,
            last_price_update: new Date().toISOString()
          })
          .eq('address', token.address);
        
        updatedCount++;
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (err) {
        console.error(`Error updating price for token ${token.address}:`, err);
      }
    }
    
    console.log(`Updated prices for ${updatedCount} tokens`);
    return updatedCount;
  } catch (error) {
    console.error("Error in syncPriceData:", error);
    return 0;
  }
};

/**
 * Initialize background price syncing
 * Sets up interval to update prices in background
 * @param intervalMinutes Minutes between updates (default: 5)
 * @param batchSize Number of tokens to update per batch (default: 10)
 */
export const initBackgroundPriceSync = (
  intervalMinutes: number = 5,
  batchSize: number = 10
): () => void => {
  // Initial sync
  void syncPriceData(batchSize);
  
  // Set up regular interval
  const intervalId = setInterval(() => {
    void syncPriceData(batchSize);
  }, intervalMinutes * 60 * 1000);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};
