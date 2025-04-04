import { ethers } from 'ethers';
import { TokenStats } from './types';
import { contractConfig } from '@/utils/contractConfig';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Interface for the data stored in Supabase
export interface TokenStatsUpdateData {
  address: string;
  name: string;
  symbol: string;
  total_supply?: number;
  eth_reserves?: number;
  token_reserves?: number;
  virtual_eth?: number;
  collected_fees?: number;
  capability_fees?: number;
  token_price?: number;
  token_price_usd?: number;
  market_cap?: number;
  market_cap_usd?: number;
  total_liquidity?: number;
  total_liquidity_usd?: number;
  trading_enabled?: boolean;
  is_migrated?: boolean;
  migration_eligible?: boolean;
  maturity_progress?: number;
  migration_condition?: number;
  remaining_maturity_time?: number;
  maturity_deadline?: number;
  creator_address?: string;
  created_on_chain_at?: string;
  last_synced_at?: string;
  last_price_update?: string;
  age?: number; // Age of token in days
}

// Interface for fetched token stats result
export interface FetchedTokenStats {
  success: boolean;
  error?: string;
  data?: any;
  tokenStats?: TokenStats;
}

/**
 * Saves token statistics to Supabase database
 */
export const saveTokenStatsToSupabase = async (
  tokenAddress: string, 
  tokenStats: TokenStats, 
  rawTotalSupply: string | null,
  tokenDecimals: number,
  capabilityFee: number,
  rawTokenReserve: string,
  currentEthPrice: number,
  tokenName: string,
  tokenSymbol: string
): Promise<any> => {
  try {
    console.log('Preparing data for Supabase update...');
    console.log('Token metadata:', { 
      name: tokenName, 
      symbol: tokenSymbol, 
      rawTotalSupply, 
      tokenDecimals 
    });

    // Always normalize the address to lowercase
    const normalizedAddress = tokenAddress.toLowerCase();
    console.log('Normalized address for consistency:', normalizedAddress);

    // First check if there are duplicate records with the same address
    // Using ilike for case-insensitive matching
    const { data: duplicateRecords, error: duplicateError } = await supabase
      .from('sciencegents')
      .select('id, address, name, symbol, total_supply, updated_at')
      .ilike('address', normalizedAddress);

    if (duplicateError) {
      console.error('Error checking for duplicates:', duplicateError);
    } else if (duplicateRecords && duplicateRecords.length > 1) {
      console.warn(`Found ${duplicateRecords.length} records with address ${normalizedAddress}:`, duplicateRecords);
      
      // Sort by updated_at to find the most recent one
      duplicateRecords.sort((a, b) => 
        new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
      );
      
      const mostRecentRecord = duplicateRecords[0];
      console.log('Most recent record:', mostRecentRecord);
      
      // Keep the most recent record and delete others
      for (let i = 1; i < duplicateRecords.length; i++) {
        console.log(`Deleting duplicate record ${duplicateRecords[i].id}`);
        const { error: deleteError } = await supabase
          .from('sciencegents')
          .delete()
          .eq('id', duplicateRecords[i].id);
          
        if (deleteError) {
          console.error(`Error deleting duplicate record ${duplicateRecords[i].id}:`, deleteError);
        }
      }
    }

    // Format values from raw data
    const tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
    const tokenPriceUsd = tokenPriceEth * currentEthPrice;
    const ethReserveAmount = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
    const totalLiquidityUsd = ethReserveAmount * currentEthPrice;
    
    // Calculate total supply with proper decimal handling
    let totalSupply = null;
    let tokenReservesAmount = null;
    let maturityProgress = 0;
    let migrationCondition = 0;
    
    try {
      console.log('Total supply calculation:', {
        rawTotalSupply,
        formattedSupply: rawTotalSupply ? ethers.utils.formatUnits(rawTotalSupply, tokenDecimals) : null,
        parsedValue: rawTotalSupply ? parseFloat(ethers.utils.formatUnits(rawTotalSupply, tokenDecimals)) : null
      });
      
      if (rawTotalSupply) {
        // Format with proper decimals and parse to number
        const formattedSupply = ethers.utils.formatUnits(rawTotalSupply, tokenDecimals);
        totalSupply = parseFloat(formattedSupply);
      }
      
      if (rawTokenReserve) {
        const formattedReserve = ethers.utils.formatUnits(rawTokenReserve, tokenDecimals);
        tokenReservesAmount = parseFloat(formattedReserve);
      }
    } catch (error) {
      console.error('Error formatting total supply:', error);
    }
    
    // Calculate market cap
    const marketCap = totalSupply ? totalSupply * tokenPriceEth : 0;
    const marketCapUsd = marketCap * currentEthPrice;
    
    // Additional derived values
    const virtualEthAmount = parseFloat(ethers.utils.formatEther(tokenStats.virtualETH));
    const collectedFeesAmount = parseFloat(ethers.utils.formatEther(tokenStats.collectedFees));
    
    // Calculate maturity condition and progress
    migrationCondition = (2 * virtualEthAmount) + capabilityFee;
    maturityProgress = migrationCondition > 0 
      ? Math.min(100, (collectedFeesAmount / migrationCondition) * 100) 
      : 0;

    // Calculate remaining maturity time in days
    const remainingMaturityDays = tokenStats.maturityDeadline 
      ? Math.max(0, Math.floor((parseInt(tokenStats.maturityDeadline, 10) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
      : null;

    // Add remaining maturity days to tokenStats
    tokenStats.remainingMaturityTime = remainingMaturityDays;
    
    // Calculate token age in days from creation timestamp
    const creationDate = new Date(parseInt(tokenStats.creationTimestamp, 10) * 1000);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    
    console.log('Token age calculation:', {
      creationTimestamp: tokenStats.creationTimestamp,
      creationDate: creationDate.toISOString(),
      currentDate: currentDate.toISOString(),
      ageInDays
    });

    // Store formatted values
    const updateData: TokenStatsUpdateData = {
      address: normalizedAddress, // Always use normalized address
      name: tokenName || 'Unknown Token',
      symbol: tokenSymbol || 'UNKNOWN',
      eth_reserves: ethReserveAmount,
      token_reserves: tokenReservesAmount,
      total_supply: totalSupply,
      virtual_eth: virtualEthAmount,
      collected_fees: collectedFeesAmount,
      capability_fees: capabilityFee,
      token_price: tokenPriceEth,
      token_price_usd: tokenPriceUsd,
      market_cap: marketCap,
      market_cap_usd: marketCapUsd,
      total_liquidity: ethReserveAmount,
      total_liquidity_usd: totalLiquidityUsd,
      trading_enabled: tokenStats.tradingEnabled,
      is_migrated: tokenStats.migrated,
      migration_eligible: tokenStats.migrationEligible,
      maturity_progress: maturityProgress,
      migration_condition: migrationCondition,
      remaining_maturity_time: tokenStats.remainingMaturityTime || 0,
      maturity_deadline: tokenStats.maturityDeadline ? parseInt(tokenStats.maturityDeadline, 10) : undefined,
      creator_address: tokenStats.creator.toLowerCase(),
      created_on_chain_at: new Date(parseInt(tokenStats.creationTimestamp, 10) * 1000).toISOString(),
      last_synced_at: new Date().toISOString(),
      last_price_update: new Date().toISOString(),
      age: ageInDays
    };

    // Verify the data before saving
    console.log('Update data prepared:', {
      address: updateData.address,
      name: updateData.name,
      symbol: updateData.symbol,
      total_supply: updateData.total_supply,
      token_price: updateData.token_price,
      market_cap: updateData.market_cap
    });

    // Check if the token exists in the database using ilike for case-insensitive matching
    const { data: existingTokens, error: checkError } = await supabase
      .from('sciencegents')
      .select('id, address, name, symbol, updated_at')
      .ilike('address', normalizedAddress);

    if (checkError) {
      console.error('Error checking if token exists:', checkError);
      throw new Error('Could not verify if token exists in database');
    }

    let result;
    
    // If no token exists, insert it with basic information
    if (!existingTokens || existingTokens.length === 0) {
      console.log('Creating new token record with data:', {
        address: updateData.address,
        name: updateData.name,
        symbol: updateData.symbol,
        total_supply: updateData.total_supply,
        token_price: updateData.token_price,
        market_cap: updateData.market_cap
      });
      
      const { data: insertData, error: insertError } = await supabase
        .from('sciencegents')
        .insert(updateData)
        .select()
        .single();

      if (insertError || !insertData) {
        console.error('Error inserting token:', insertError);
        throw new Error('Could not create new token record');
      }
      
      result = { status: 'created', data: insertData };
    } else {
      // Use the most recently updated token record if multiple exist
      const existingToken = existingTokens.length > 1 
        ? existingTokens.sort((a, b) => 
            new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
          )[0]
        : existingTokens[0];
      
      console.log('Found existing token to update:', {
        id: existingToken.id,
        address: existingToken.address,
        name: existingToken.name,
        symbol: existingToken.symbol
      });
      
      // If blockchain provided values for name and symbol, use them
      // Otherwise keep existing values from database
      if (!tokenName || tokenName === 'Unknown Token') {
        updateData.name = existingToken.name;
      }
      
      if (!tokenSymbol || tokenSymbol === 'UNKNOWN') {
        updateData.symbol = existingToken.symbol;
      }
      
      console.log('Updating existing token with data:', {
        id: existingToken.id,
        name: updateData.name,
        symbol: updateData.symbol,
        total_supply: updateData.total_supply,
        token_price: updateData.token_price,
        market_cap: updateData.market_cap
      });
      
      // Make sure to update the specific record by ID, not by address
      const { data: updatedTokenData, error: updateError } = await supabase
        .from('sciencegents')
        .update({
          // Don't update the address to preserve foreign key relationships
          name: updateData.name,
          symbol: updateData.symbol,
          total_supply: updateData.total_supply,
          eth_reserves: updateData.eth_reserves,
          token_reserves: updateData.token_reserves,
          virtual_eth: updateData.virtual_eth,
          collected_fees: updateData.collected_fees,
          capability_fees: updateData.capability_fees,
          token_price: updateData.token_price,
          token_price_usd: updateData.token_price_usd,
          market_cap: updateData.market_cap,
          market_cap_usd: updateData.market_cap_usd,
          total_liquidity: updateData.total_liquidity,
          total_liquidity_usd: updateData.total_liquidity_usd,
          trading_enabled: updateData.trading_enabled,
          is_migrated: updateData.is_migrated,
          migration_eligible: updateData.migration_eligible,
          maturity_progress: updateData.maturity_progress,
          migration_condition: updateData.migration_condition,
          remaining_maturity_time: updateData.remaining_maturity_time,
          maturity_deadline: updateData.maturity_deadline,
          creator_address: updateData.creator_address,
          created_on_chain_at: updateData.created_on_chain_at,
          last_synced_at: updateData.last_synced_at,
          last_price_update: updateData.last_price_update,
          age: updateData.age
        })
        .eq('id', existingToken.id) // Use ID for precise targeting
        .select()
        .single();

      if (updateError || !updatedTokenData) {
        console.error('Error updating token stats:', updateError);
        throw new Error('Could not update token statistics');
      }
      
      result = { status: 'updated', data: updatedTokenData };
    }

    // Verify the saved data
    if (!result.data.total_supply) {
      console.error('Total supply is null in saved data:', result.data);
      throw new Error('Total supply was not saved correctly');
    }

    console.log('Successfully saved to Supabase:', {
      status: result.status,
      id: result.data.id,
      name: result.data.name,
      symbol: result.data.symbol,
      total_supply: result.data.total_supply,
      token_price: result.data.token_price,
      market_cap: result.data.market_cap
    });
    
    return result.data;
  } catch (error) {
    console.error('Error saving token stats to Supabase:', error);
    throw error;
  }
};

/**
 * Fetches token data from Supabase by address
 */
export const fetchTokenDataFromSupabase = async (address: string): Promise<any> => {
  try {
    const normalizedAddress = address.toLowerCase();
    console.log(`Fetching data for token: ${normalizedAddress}`);
    
    // First check if there are multiple records with the same address (case insensitive)
    const { data: allRecords, error: listError } = await supabase
      .from('sciencegents')
      .select(`
        id, address, name, symbol, total_supply, 
        eth_reserves, token_reserves, virtual_eth, 
        collected_fees, capability_fees, token_price, 
        token_price_usd, market_cap, market_cap_usd, 
        total_liquidity, total_liquidity_usd, 
        trading_enabled, is_migrated, migration_eligible, 
        maturity_progress, migration_condition, 
        remaining_maturity_time, maturity_deadline, 
        creator_address, created_on_chain_at, last_synced_at,
        last_price_update, updated_at
      `)
      .ilike('address', normalizedAddress);

    if (listError) {
      console.error('Error listing records from Supabase:', listError);
      throw new Error('Failed to list token records from database');
    }

    // If no records found, return null
    if (!allRecords || allRecords.length === 0) {
      return null;
    }

    // If multiple records found, use the most recently updated one
    const mostRecentRecord = allRecords.length > 1
      ? allRecords.sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime())[0]
      : allRecords[0];

    return mostRecentRecord;
  } catch (error) {
    console.error('Error fetching token data from Supabase:', error);
    throw error;
  }
};

/**
 * Fetches token statistics from blockchain and updates Supabase
 */
export const fetchTokenStats = async (
  address: string,
  currentEthPrice: number,
  showToast: boolean = true
): Promise<FetchedTokenStats> => {
  try {
    if (!ethers.utils.isAddress(address)) {
      return { 
        success: false, 
        error: 'Invalid Ethereum address' 
      };
    }

    if (typeof window === 'undefined' || !window.ethereum) {
      return { 
        success: false, 
        error: 'No Ethereum provider detected. Please install MetaMask.' 
      };
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Fetch token metadata (name, symbol, totalSupply, decimals)
    let tokenName = '';
    let tokenSymbol = '';
    let totalSupplyValue = null;
    let tokenDecimals = 18;
    
    try {
      const tokenAbi = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function decimals() view returns (uint8)"
      ];
      
      const tokenContract = new ethers.Contract(
        address,
        tokenAbi,
        provider
      );
      
      // Fetch token details in parallel for better performance
      console.log('Fetching token metadata...');
      const [nameResult, symbolResult, totalSupplyBN, decimalsResult] = await Promise.all([
        tokenContract.name().catch(e => { 
          console.warn('Could not fetch token name:', e);
          return 'Unknown Token';
        }),
        tokenContract.symbol().catch(e => {
          console.warn('Could not fetch token symbol:', e);
          return 'UNKNOWN';
        }),
        tokenContract.totalSupply(),
        tokenContract.decimals().catch(e => {
          console.warn('Could not fetch decimals, using default of 18:', e);
          return 18;
        })
      ]);
      
      tokenName = nameResult;
      tokenSymbol = symbolResult;
      totalSupplyValue = totalSupplyBN.toString();
      tokenDecimals = decimalsResult;
      
      console.log('Token metadata:', {
        name: tokenName,
        symbol: tokenSymbol,
        totalSupply: totalSupplyValue,
        decimals: tokenDecimals
      });
      
      // Log the formatted total supply for verification
      const formattedSupply = ethers.utils.formatUnits(totalSupplyValue, tokenDecimals);
      console.log('Formatted total supply:', formattedSupply);
      console.log('Parsed total supply:', parseFloat(formattedSupply));
    } catch (error) {
      console.error('Error fetching token metadata:', error);
      return {
        success: false,
        error: 'Failed to fetch token metadata. Please verify the token contract.'
      };
    }
    
    // Fetch all token stats from the contract
    try {
      // Fetch other token stats
      const swapAbi = [
        "function getTokenStats(address token) view returns (uint256, uint256, uint256, uint256, bool, address, uint256, uint256, bool, uint256, uint256, uint256, bool)"
      ];
      
      const swapContract = new ethers.Contract(
        contractConfig.addresses.ScienceGentsSwap,
        swapAbi,
        provider
      );
      
      const stats = await swapContract.getTokenStats(address);
      
      const formattedStats: TokenStats = {
        tokenReserve: stats[0].toString(),
        ethReserve: stats[1].toString(),
        virtualETH: stats[2].toString(),
        collectedFees: stats[3].toString(),
        tradingEnabled: stats[4],
        creator: stats[5],
        creationTimestamp: stats[6].toString(), // Store as string but convert to number later
        maturityDeadline: stats[7].toString(), // Store as string but convert to number later
        migrated: stats[8],
        lpUnlockTime: stats[9].toString(), // Store as string but convert to number later
        lockedLPAmount: stats[10].toString(),
        currentPrice: stats[11].toString(),
        migrationEligible: stats[12]
      };
      
      // Format values for easier use
      const virtualEthAmount = parseFloat(ethers.utils.formatEther(formattedStats.virtualETH));
      const collectedFeesAmount = parseFloat(ethers.utils.formatEther(formattedStats.collectedFees));
      const ethReserveAmount = parseFloat(ethers.utils.formatEther(formattedStats.ethReserve));
      const tokenPriceEth = parseFloat(ethers.utils.formatEther(formattedStats.currentPrice));
      
      // Calculate derived values
      const capabilityFee = 0.004; // Default value, can be fetched from contract if available
      const migrationCondition = (2 * virtualEthAmount) + capabilityFee;
      const maturityProgress = migrationCondition > 0 
        ? Math.min(100, (collectedFeesAmount / migrationCondition) * 100) 
        : 0;
      
      // Calculate remaining maturity time in days
      const remainingMaturityDays = formattedStats.maturityDeadline 
        ? Math.max(0, Math.floor((parseInt(formattedStats.maturityDeadline, 10) * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
        : null;
      
      // Add calculated values to stats object
      formattedStats.maturityProgress = maturityProgress;
      formattedStats.remainingMaturityTime = remainingMaturityDays;
      
      console.log('Saving to Supabase with:', {
        tokenName,
        tokenSymbol,
        totalSupplyValue,
        tokenDecimals,
        formattedTotalSupply: totalSupplyValue ? ethers.utils.formatUnits(totalSupplyValue, tokenDecimals) : null
      });
      
      // Save to Supabase first
      const savedData = await saveTokenStatsToSupabase(
        address, 
        formattedStats, 
        totalSupplyValue, // Pass the raw total supply string
        tokenDecimals,
        capabilityFee, // Use the capability fee
        formattedStats.tokenReserve,
        currentEthPrice,
        tokenName,
        tokenSymbol
      );
      
      console.log('Saved data returned from Supabase:', {
        name: savedData.name,
        symbol: savedData.symbol,
        total_supply: savedData.total_supply,
        token_price: savedData.token_price,
        market_cap: savedData.market_cap
      });
      
      // After successful save, fetch from Supabase
      const supabaseData = await fetchTokenDataFromSupabase(address);
      
      // Verify fetched data
      if (!supabaseData.total_supply) {
        console.warn('Total supply is null in fetched data:', {
          id: supabaseData.id,
          address: supabaseData.address
        });
        
        // Try to recover by using the saved data
        console.log('Using saved data as fallback instead of throwing error');
        supabaseData.total_supply = savedData.total_supply;
        supabaseData.token_price = savedData.token_price;
        supabaseData.market_cap = savedData.market_cap;
      }
      
      console.log('Final data for UI:', {
        id: supabaseData.id,
        address: supabaseData.address,
        name: supabaseData.name,
        symbol: supabaseData.symbol,
        total_supply: supabaseData.total_supply,
        token_price: supabaseData.token_price,
        market_cap: supabaseData.market_cap
      });

      if (showToast) {
        toast({
          title: "Stats Updated",
          description: `Updated ${supabaseData.name} (${supabaseData.symbol}) statistics successfully`
        });
      }
      
      return {
        success: true,
        data: supabaseData,
        tokenStats: formattedStats
      };
    } catch (error) {
      console.error('Error fetching from blockchain:', error);
      return {
        success: false,
        error: `Failed to fetch data from blockchain: ${error.message}`
      };
    }
  } catch (error) {
    console.error('Error in fetch process:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch token statistics'
    };
  }
};

/**
 * Function to sync all token statistics from blockchain to database
 */
export const syncAllTokenStats = async (
  onProgress?: (current: number, total: number, status: string) => void
): Promise<{ syncCount: number; errorCount: number }> => {
  try {
    // First, get all token addresses from the contract
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('No Ethereum provider detected. Please install MetaMask.');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const factoryAbi = [
      "function getTokenCount() view returns (uint256)",
      "function getTokensWithPagination(uint256 offset, uint256 limit) view returns (address[], uint256)"
    ];
    
    const factoryContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsFactory,
      factoryAbi,
      provider
    );
    
    // Get total number of tokens
    const tokenCount = await factoryContract.getTokenCount();
    console.log(`Found ${tokenCount.toString()} tokens in total`);
    
    if (onProgress) {
      onProgress(0, tokenCount.toNumber(), 'Fetching token addresses...');
    }
    
    // Fetch tokens in batches
    const batchSize = 20;
    let syncCount = 0;
    let errorCount = 0;
    
    // Get current ETH price
    let currentEthPrice = 0;
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      currentEthPrice = data.ethereum.usd;
    } catch (e) {
      console.error('Failed to fetch ETH price, using default', e);
      currentEthPrice = 1800; // Fallback price
    }
    
    // Process tokens in batches
    for (let offset = 0; offset < tokenCount.toNumber(); offset += batchSize) {
      const actualBatchSize = Math.min(batchSize, tokenCount.toNumber() - offset);
      
      if (onProgress) {
        onProgress(
          offset,
          tokenCount.toNumber(),
          `Fetching tokens ${offset + 1} to ${offset + actualBatchSize} of ${tokenCount.toNumber()}...`
        );
      }
      
      try {
        // Get batch of token addresses
        const [tokenAddresses] = await factoryContract.getTokensWithPagination(offset, actualBatchSize);
        
        // Process each token in the batch
        for (let i = 0; i < tokenAddresses.length; i++) {
          const tokenAddress = tokenAddresses[i];
          
          if (onProgress) {
            onProgress(
              offset + i,
              tokenCount.toNumber(),
              `Syncing token ${offset + i + 1} of ${tokenCount.toNumber()}: ${tokenAddress}`
            );
          }
          
          try {
            // Fetch and save token stats
            await fetchTokenStats(tokenAddress, currentEthPrice, false);
            syncCount++;
          } catch (error) {
            console.error(`Error syncing token ${tokenAddress}:`, error);
            errorCount++;
          }
        }
      } catch (batchError) {
        console.error(`Error fetching batch at offset ${offset}:`, batchError);
        errorCount += Math.min(batchSize, tokenCount.toNumber() - offset);
      }
    }
    
    if (onProgress) {
      onProgress(
        tokenCount.toNumber(),
        tokenCount.toNumber(),
        `Completed! Synced ${syncCount} tokens successfully, ${errorCount} errors.`
      );
    }
    
    return { syncCount, errorCount };
  } catch (error) {
    console.error('Error syncing all tokens:', error);
    throw error;
  }
}; 