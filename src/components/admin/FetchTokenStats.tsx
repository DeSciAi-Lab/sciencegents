import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contractConfig } from '@/utils/contractConfig';
import { TokenStats } from '@/services/scienceGent/types';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { calculateMaturityProgress, calculateTokenPrice } from '@/utils/scienceGentCalculations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface UpdateData {
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

const saveTokenStatsToSupabase = async (
  tokenAddress: string, 
  tokenStats: TokenStats, 
  rawTotalSupply: string | null,
  tokenDecimals: number,
  capabilityFee: number,
  rawTokenReserve: string,
  currentEthPrice: number,
  tokenName: string,
  tokenSymbol: string
) => {
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
      ? Math.max(0, Math.floor((tokenStats.maturityDeadline * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
      : null;

    // Add remaining maturity days to tokenStats
    tokenStats.remainingMaturityTime = remainingMaturityDays;
    
    // Calculate token age in days
    const creationDate = new Date(tokenStats.creationTimestamp * 1000);
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
    const updateData: UpdateData = {
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
      maturity_deadline: tokenStats.maturityDeadline,
      creator_address: tokenStats.creator.toLowerCase(),
      created_on_chain_at: new Date(tokenStats.creationTimestamp * 1000).toISOString(),
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
    
    toast({
      title: result.status === 'created' ? 'Token Created' : 'Stats Updated',
      description: `Updated ${result.data.name} (${result.data.symbol}) statistics successfully`
    });

    return result.data;
  } catch (error) {
    console.error('Error in saveTokenStatsToSupabase:', error);
    throw error;
  }
};

const FetchTokenStats: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [supabaseData, setSupabaseData] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const { ethPrice } = useEthPriceContext();
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0 });
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Function to fetch data from Supabase
  const fetchSupabaseData = async (address: string) => {
    setIsLoading(true);
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

      console.log('Found records with similar address:', allRecords);

      if (!allRecords || allRecords.length === 0) {
        throw new Error(`No records found for address: ${normalizedAddress}`);
      }
      
      // Use the most recently updated record if multiple exist
      const records = [...allRecords];
      records.sort((a, b) => {
        const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return bTime - aTime;
      });
      
      const data = records[0];
      
      // Calculate token age if created_on_chain_at is available
      if (data.created_on_chain_at) {
        const creationDate = new Date(data.created_on_chain_at);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
        const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
        
        // Add age to the data object for UI display
        const dataWithAge = {
          ...data,
          age: ageInDays
        };
        
        // Try to update the age in the database if possible
        try {
          const { error: updateError } = await supabase
            .from('sciencegents')
            .update({ age: ageInDays } as any)
            .eq('id', data.id);
            
          if (updateError) {
            console.warn('Could not update token age in database:', updateError);
            // This could be due to the column not existing yet, which is fine
          }
        } catch (updateError) {
          console.warn('Error updating token age:', updateError);
        }
        
        return dataWithAge;
      }
      
      return data;
    } catch (error) {
      console.error('Error in fetchSupabaseData:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch all token addresses from Supabase
  const fetchAllTokenAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from('sciencegents')
        .select('address')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching token addresses:', error);
        throw new Error('Failed to fetch token addresses');
      }
      
      return data.map(item => item.address);
    } catch (error) {
      console.error('Error in fetchAllTokenAddresses:', error);
      throw error;
    }
  };

  // Function to sync all tokens
  const syncAllTokens = async () => {
    setSyncingAll(true);
    setSyncStatus('Fetching token addresses...');
    setError(null);
    
    try {
      // Get all token addresses
      const addresses = await fetchAllTokenAddresses();
      setSyncProgress({ current: 0, total: addresses.length });
      setSyncStatus(`Found ${addresses.length} tokens to sync`);
      
      // Process each token one by one
      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];
        setSyncProgress({ current: i + 1, total: addresses.length });
        setSyncStatus(`Syncing token ${i + 1}/${addresses.length}: ${address}`);
        
        try {
          // Set the current token address and fetch its stats
          setTokenAddress(address);
          await fetchTokenStats(address);
          console.log(`Successfully synced token ${i + 1}/${addresses.length}: ${address}`);
        } catch (tokenError) {
          console.error(`Error syncing token ${address}:`, tokenError);
          // Continue with next token even if one fails
        }
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      setSyncStatus(`Completed syncing ${addresses.length} tokens`);
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${addresses.length} ScienceGent tokens`,
      });
    } catch (error) {
      console.error('Error in syncAllTokens:', error);
      setError(`Failed to sync all tokens: ${error.message}`);
      setSyncStatus('Sync failed');
    } finally {
      setSyncingAll(false);
    }
  };

  // Modified fetchTokenStats to accept an address parameter
  const fetchTokenStats = async (address: string = tokenAddress) => {
    setError(null);
    setTokenStats(null);
    setSupabaseData(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      if (!ethers.utils.isAddress(address)) {
        throw new Error('Invalid Ethereum address');
      }

      if (!window.ethereum) {
        throw new Error('No Ethereum provider detected. Please install MetaMask.');
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
        throw new Error('Failed to fetch token metadata. Please verify the token contract.');
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
          creationTimestamp: stats[6].toNumber(),
          maturityDeadline: stats[7].toNumber(),
          migrated: stats[8],
          lpUnlockTime: stats[9].toNumber(),
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
          ? Math.max(0, Math.floor((formattedStats.maturityDeadline * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
          : null;
        
        // Add calculated values to stats object
        formattedStats.maturityProgress = maturityProgress;
        formattedStats.remainingMaturityTime = remainingMaturityDays;
        
        setTokenStats(formattedStats);
        
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
          ethPrice,
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
        const supabaseData = await fetchSupabaseData(address);
        
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
        
        setSupabaseData(supabaseData);
        setSuccess(true);
      } catch (error) {
        console.error('Error fetching from blockchain:', error);
        throw new Error(`Failed to fetch data from blockchain: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in fetch process:', error);
      setError(error.message || 'Failed to fetch token statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatEthValue = (value: string) => {
    try {
      return `${parseFloat(ethers.utils.formatEther(value)).toFixed(8)} ETH`;
    } catch (e) {
      return `${value} wei`;
    }
  };

  const formatCurrentPrice = (value: string) => {
    try {
      return `${ethers.utils.formatEther(value)} ETH`;
    } catch (e) {
      return `${value} wei`;
    }
  };

  const calculateUsdValue = (ethValue: string) => {
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(ethValue));
      return `$${(ethAmount * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateTokenPriceUsd = (ethValue: string) => {
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(ethValue));
      const usdPrice = ethAmount * ethPrice;
      return `$${usdPrice.toFixed(18)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateTotalLiquidity = () => {
    if (!tokenStats) return 'N/A';
    try {
      const ethAmount = parseFloat(ethers.utils.formatEther(tokenStats.ethReserve));
      return `$${(ethAmount * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  const calculateMarketCap = () => {
    if (!tokenStats || !supabaseData.total_supply) return 'N/A';
    try {
      const tokenPriceEth = parseFloat(ethers.utils.formatEther(tokenStats.currentPrice));
      const totalSupplyNum = parseFloat(supabaseData.total_supply);
      return `$${(tokenPriceEth * totalSupplyNum * ethPrice).toFixed(2)}`;
    } catch (e) {
      return 'N/A';
    }
  };

  // Format ETH value with exactly 8 decimal places
  const formatEthDisplay = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '0.00000000';
    return value.toFixed(8);
  };

  // Format USD value with 2 decimal places
  const formatUsdDisplay = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '$0.00';
    return `$${value.toFixed(2)}`;
  };

  // Format token price USD with more precision for very small values
  const formatTokenPriceUsd = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '$0.00000000';
    
    // Use scientific notation for very small numbers
    if (value < 0.00000001) {
      return `$${value.toExponential(8)}`;
    }
    
    // For small but displayable numbers, show more decimals
    return `$${value.toFixed(18)}`;
  };

  // Format token amount with 4 decimal places
  const formatTokenAmount = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '0.0000';
    return value.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fetch Token Statistics</CardTitle>
        <CardDescription>
          Get detailed statistics for a ScienceGent token from our database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Input 
              placeholder="Token Address (0x...)" 
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => fetchTokenStats()} 
              disabled={isLoading || !tokenAddress || syncingAll}
              className="whitespace-nowrap"
            >
              {isLoading && !syncingAll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Fetch Stats'}
            </Button>
            <Button 
              onClick={syncAllTokens} 
              disabled={isLoading || syncingAll}
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
              variant="secondary"
            >
              {syncingAll ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : 'Sync All ScienceGents'}
            </Button>
          </div>
          
          {/* Sync progress indicator */}
          {syncingAll && (
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-indigo-800">
                  {syncStatus}
                </span>
                <span className="text-sm text-indigo-800">
                  {syncProgress.current}/{syncProgress.total}
                </span>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ 
                    width: syncProgress.total > 0 
                      ? `${(syncProgress.current / syncProgress.total) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && supabaseData && (
            <div className="mt-4 space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Successfully fetched token statistics!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Total Supply</h3>
                  <p className="text-gray-900 font-medium">{formatTokenAmount(supabaseData.total_supply)} tokens</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Token Reserves</h3>
                  <p className="text-gray-900 font-medium">{formatTokenAmount(supabaseData.token_reserves)} tokens</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">ETH Reserves</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.eth_reserves)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.eth_reserves * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Virtual ETH</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.virtual_eth)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.virtual_eth * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Collected Fees</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.collected_fees)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.collected_fees * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Capability Fee</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.capability_fees)} ETH</p>
                  <p className="text-xs text-gray-500">${(supabaseData.capability_fees * ethPrice).toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Trading Enabled</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.trading_enabled ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Creator</h3>
                  <p className="text-gray-900 font-medium truncate">{supabaseData.creator_address}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Creation Date</h3>
                  <p className="text-gray-900 font-medium">{new Date(supabaseData.created_on_chain_at).toLocaleString()}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Maturity Deadline</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.maturity_deadline ? new Date(supabaseData.maturity_deadline * 1000).toLocaleString() : 'Not set'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migrated to Uniswap</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.is_migrated ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migration Eligible</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.migration_eligible ? 'Yes' : 'No'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Current Price</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.token_price)} ETH</p>
                  <p className="text-xs text-gray-500">${supabaseData.token_price_usd}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Current Price (USD)</h3>
                  <p className="text-gray-900 font-medium">{formatTokenPriceUsd(supabaseData.token_price_usd)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Market Cap</h3>
                  <p className="text-gray-900 font-medium">${supabaseData.market_cap.toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Total Liquidity</h3>
                  <p className="text-gray-900 font-medium">${supabaseData.total_liquidity_usd.toFixed(2)}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Maturity Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${supabaseData.maturity_progress || 0}%` }}></div>
                  </div>
                  <p className="text-gray-900 font-medium">{supabaseData.maturity_progress?.toFixed(4)}%</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Remaining Maturity Time</h3>
                  <p className="text-gray-900 font-medium">{supabaseData.remaining_maturity_time ? `${supabaseData.remaining_maturity_time} days` : 'N/A'}</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Migration Condition</h3>
                  <p className="text-gray-900 font-medium">{formatEthDisplay(supabaseData.migration_condition)} ETH</p>
                  <p className="text-xs text-gray-500">2 × virtualETH + capabilityFee</p>
                </div>
                
                <div className="bg-white border rounded-md p-4">
                  <h3 className="font-medium text-gray-700 mb-1">Token Age</h3>
                  <p className="text-gray-900 font-medium">
                    {supabaseData.age !== undefined ? 
                      `${supabaseData.age} days` : 
                      supabaseData.created_on_chain_at ? 
                        `${Math.floor((Date.now() - new Date(supabaseData.created_on_chain_at).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                        'Unknown'
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Data fetched directly from ScienceGentsSwap contract and token contract
                <br />
                Current ETH price: ${ethPrice.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500 flex flex-col items-start">
        <p>Data fetched from Supabase database after blockchain sync</p>
        <p className="mt-1">Current ETH price: ${ethPrice.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default FetchTokenStats;

