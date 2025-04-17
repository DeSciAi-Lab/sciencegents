import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Twitter, Github, Globe, AtSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchCapabilityById } from '@/services/capability/supabase';
import { fetchScienceGentFromSupabase } from '@/services/scienceGent/supabase';
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from '@/services/capability/blockchain';
import { fetchScienceGentFromBlockchain } from '@/services/scienceGent/blockchain';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { getProvider } from '@/services/walletService';

interface DeveloperInfoProps {
  scienceGent: any;
}

interface DeveloperProfile {
  bio: string | null;
  wallet_address: string;
  developer_name: string | null;
  developer_twitter: string | null;
  developer_github: string | null;
  developer_website: string | null;
  profile_pic: string | null;
  created_sciencegents?: string[] | null;
  created_capabilities?: string[] | null;
}

interface ScienceGentListItem {
  name: string;
  symbol?: string;
  address: string;
  market_cap?: number;
  market_cap_usd?: number;
  token_price_usd?: number | null;
  value_in_usd?: number | null;
  created_at?: string;
  profile_pic?: string;
  curated?: boolean;
  logo?: string;
  balance?: string;
}

interface CapabilityItem {
  id: string;
  name: string;
  description: string;
  price: number;
  usage_count?: number | null;
  rating?: number | null;
  revenue?: number | null;
  domain?: string;
  display_image?: string | null;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ scienceGent }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('sciencegents-held');
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileNotFound, setProfileNotFound] = useState(false);
  
  // State for list data
  const [heldScienceGents, setHeldScienceGents] = useState<ScienceGentListItem[]>([]);
  const [createdScienceGents, setCreatedScienceGents] = useState<ScienceGentListItem[]>([]);
  const [createdCapabilities, setCreatedCapabilities] = useState<CapabilityItem[]>([]);
  const [isLoadingLists, setIsLoadingLists] = useState({
    held: false,
    created: false,
    capabilities: false
  });
  
  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      if (!scienceGent?.creator_address) {
        setIsLoading(false);
        setProfileNotFound(true);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setProfileNotFound(false);
        
        const { data, error } = await supabase
          .from('developer_profiles')
          .select('*')
          .eq('wallet_address', scienceGent.creator_address.toLowerCase())
          .single();
        
        if (error) {
          console.error("Error fetching developer profile:", error);
          if (error.code === 'PGRST116') {
            console.log("Developer profile not found in Supabase.");
            setProfileNotFound(true);
            setDeveloperProfile({
              bio: scienceGent.bio || null,
              wallet_address: scienceGent.creator_address,
              developer_name: scienceGent.developer_name || "Unknown Developer",
              developer_twitter: scienceGent.developer_twitter || null,
              developer_github: scienceGent.developer_github || null,
              developer_website: scienceGent.developer_website || null,
              profile_pic: scienceGent.profile_pic || null
            });
          } else {
            setError("Failed to load developer data. Please try again later.");
          }
        } else if (data) {
          setDeveloperProfile(data);
        } else {
          console.log("Developer profile query returned no data.");
          setProfileNotFound(true);
          setDeveloperProfile({
            bio: scienceGent.bio || null,
            wallet_address: scienceGent.creator_address,
            developer_name: scienceGent.developer_name || "Unknown Developer",
            developer_twitter: scienceGent.developer_twitter || null,
            developer_github: scienceGent.developer_github || null,
            developer_website: scienceGent.developer_website || null,
            profile_pic: scienceGent.profile_pic || null
          });
        }
      } catch (err) {
        console.error("Exception during developer profile fetch:", err);
        setError("An unexpected error occurred while loading developer data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeveloperProfile();
  }, [scienceGent?.creator_address, scienceGent]);

  useEffect(() => {
    // Get list data when developer profile is loaded and tab changes
    if (!developerProfile) return;

    // Fetch held tokens
    if (activeTab === 'sciencegents-held') {
      fetchHeldScienceGents();
    }
    
    // Fetch created tokens  
    if (activeTab === 'sciencegents-created') {
      fetchCreatedScienceGents();
    }

    // Fetch created capabilities
    if (activeTab === 'capabilities-created') {
      fetchCreatedCapabilities();
    }
  }, [developerProfile, activeTab]);

  const fetchHeldScienceGents = async () => {
    if (!developerProfile?.wallet_address) return;
    
    setIsLoadingLists(prev => ({ ...prev, held: true }));
    
    try {
      // Use Moralis API to fetch wallet token holdings
      const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
      
      if (!moralisApiKey) {
        console.error("Moralis API key not found");
        setHeldScienceGents([]);
        setIsLoadingLists(prev => ({ ...prev, held: false }));
        return;
      }
      
      // First, get all ScienceGent token addresses from our database
      const { data: allScienceGents, error: scienceGentsError } = await supabase
        .from('sciencegents')
        .select('address, token_price_usd')
        .limit(1000);
        
      if (scienceGentsError) {
        console.error("Error fetching ScienceGent addresses:", scienceGentsError);
        setHeldScienceGents([]);
        setIsLoadingLists(prev => ({ ...prev, held: false }));
        return;
      }
      
      // Create a map of all known ScienceGent addresses to their price
      const scienceGentAddressMap = new Map();
      allScienceGents.forEach(token => {
        scienceGentAddressMap.set(token.address.toLowerCase(), token.token_price_usd);
      });
      
      console.log('ScienceGent addresses map:', 
        Object.fromEntries([...scienceGentAddressMap.entries()].slice(0, 5)) // Log first 5 entries for debugging
      );
      
      // Fetch tokens held by the developer's wallet from Moralis
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${developerProfile.wallet_address}/tokens?chain=sepolia`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      const data = await response.json();
      console.log('Moralis wallet tokens:', data);
      
      if (response.ok && data.result && Array.isArray(data.result)) {
        // Filter only for ScienceGent tokens using our map of addresses
        const scienceGentTokens = data.result.filter(token => 
          scienceGentAddressMap.has(token.token_address.toLowerCase())
        );
        
        console.log('Filtered ScienceGent tokens:', scienceGentTokens);
        
        // If no ScienceGent tokens found, return empty array
        if (!scienceGentTokens || scienceGentTokens.length === 0) {
          console.log('No ScienceGent tokens found in wallet');
          setHeldScienceGents([]);
          setIsLoadingLists(prev => ({ ...prev, held: false }));
          return;
        }
        
        // Get ScienceGent token addresses from filtered list
        const scienceGentAddresses = scienceGentTokens.map(token => token.token_address.toLowerCase());
        
        console.log('ScienceGent addresses to fetch details for:', scienceGentAddresses);
        
        // Fetch detailed info for these ScienceGent tokens
        const { data: tokensData, error } = await supabase
          .from('sciencegents')
          .select('name, symbol, address, market_cap, market_cap_usd, token_price_usd, profile_pic, created_at')
          .in('address', scienceGentAddresses);
        
        if (error) {
          console.error("Error fetching ScienceGent details:", error);
          
          // If Supabase fetch fails but we still have Moralis data, use that with prices from our map
          const fallbackData = scienceGentTokens.map(token => {
            const tokenAddress = token.token_address.toLowerCase();
            // Get token balance as number (not string)
            const tokenBalance = parseFloat(token.balance_formatted || '0');
            // Get token price from our map
            const tokenPriceUsd = scienceGentAddressMap.get(tokenAddress) || null;
            const valueInUsd = tokenPriceUsd && tokenBalance ? tokenPriceUsd * tokenBalance : null;
            
            console.log(`Token ${tokenAddress} - Balance: ${tokenBalance}, Price: ${tokenPriceUsd}, Value: ${valueInUsd}`);
            
            return {
              name: token.name || "Unknown Token",
              symbol: token.symbol || "",
              address: token.token_address,
              market_cap_usd: null,
              token_price_usd: tokenPriceUsd,
              value_in_usd: valueInUsd,
              profile_pic: null,
              created_at: null,
              balance: token.balance_formatted || '0',
              logo: token.symbol ? token.symbol.charAt(0).toUpperCase() : 'S'
            };
          });
          
          console.log('Fallback data with pricing:', fallbackData);
          setHeldScienceGents(fallbackData);
        } else if (!tokensData || tokensData.length === 0) {
          console.log('No data returned from Supabase for the token addresses');
          
          // Similar fallback but in case of empty results
          const fallbackData = scienceGentTokens.map(token => {
            const tokenAddress = token.token_address.toLowerCase();
            // Get token balance as number (not string)
            const tokenBalance = parseFloat(token.balance_formatted || '0');
            // Get token price from our map
            const tokenPriceUsd = scienceGentAddressMap.get(tokenAddress) || null;
            const valueInUsd = tokenPriceUsd && tokenBalance ? tokenPriceUsd * tokenBalance : null;
            
            console.log(`Token ${tokenAddress} - Balance: ${tokenBalance}, Price: ${tokenPriceUsd}, Value: ${valueInUsd}`);
            
            return {
              name: token.name || "Unknown Token",
              symbol: token.symbol || "",
              address: token.token_address,
              market_cap_usd: null,
              token_price_usd: tokenPriceUsd,
              value_in_usd: valueInUsd,
              profile_pic: null,
              created_at: null,
              balance: token.balance_formatted || '0',
              logo: token.symbol ? token.symbol.charAt(0).toUpperCase() : 'S'
            };
          });
          
          console.log('Fallback data with pricing (empty results):', fallbackData);
          setHeldScienceGents(fallbackData);
        } else {
          console.log('Matched tokens from database:', tokensData);
          
          // Create a map of addresses to token data for easy lookup
          const tokenDataMap = new Map();
          tokensData.forEach(token => {
            tokenDataMap.set(token.address.toLowerCase(), token);
          });
          
          // Join the Moralis data with our database data
          const formattedData = scienceGentTokens.map(moralisToken => {
            const tokenAddress = moralisToken.token_address.toLowerCase();
            const dbToken = tokenDataMap.get(tokenAddress);
            
            // Get token balance as number (not string)
            const tokenBalance = parseFloat(moralisToken.balance_formatted || '0');
            
            // Calculate USD value if token price is available
            // Try from DB first, then from our map if not in DB
            let tokenPriceUsd = dbToken?.token_price_usd;
            if (tokenPriceUsd === null || tokenPriceUsd === undefined) {
              tokenPriceUsd = scienceGentAddressMap.get(tokenAddress) || null;
            }
            
            const valueInUsd = tokenPriceUsd && tokenBalance ? tokenPriceUsd * tokenBalance : null;
            
            console.log(`Token ${tokenAddress} - Balance: ${tokenBalance}, Price: ${tokenPriceUsd}, Value: ${valueInUsd}`);
            
            // If we have matching database info, use it, otherwise use Moralis data
            return {
              name: dbToken?.name || moralisToken.name || "Unknown Token",
              symbol: dbToken?.symbol || moralisToken.symbol || "",
              address: moralisToken.token_address,
              market_cap: dbToken?.market_cap || null,
              market_cap_usd: dbToken?.market_cap_usd || null,
              token_price_usd: tokenPriceUsd,
              value_in_usd: valueInUsd,
              profile_pic: dbToken?.profile_pic || null,
              created_at: dbToken?.created_at || null,
              // Use balance from Moralis
              balance: moralisToken.balance_formatted || '0',
              // Use first letter of token name as logo fallback
              logo: (dbToken?.name ? dbToken.name.charAt(0) : (moralisToken.symbol ? moralisToken.symbol.charAt(0) : 'S')).toUpperCase()
            };
          });
          
          console.log('Final formatted data:', formattedData);
          setHeldScienceGents(formattedData);
        }
      } else {
        // Fallback for testing - show some tokens not created by developer
        console.log("Falling back to sample tokens for testing");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('sciencegents')
          .select('name, symbol, address, market_cap, market_cap_usd, token_price_usd, profile_pic, created_at')
          .not('creator_address', 'eq', developerProfile.wallet_address)
          .limit(3);
          
        if (fallbackError) {
          console.error("Error fetching fallback ScienceGents:", fallbackError);
          setHeldScienceGents([]);
        } else {
          // Format the data
          const formattedData = fallbackData.map(token => {
            // For demonstration purpose, use a sample price
            const samplePriceUsd = token.token_price_usd || 0.05;
            const balance = 1000;
            const valueInUsd = samplePriceUsd * balance;
            
            return {
              name: token.name,
              symbol: token.symbol,
              address: token.address,
              market_cap: token.market_cap,
              market_cap_usd: token.market_cap_usd,
              token_price_usd: samplePriceUsd,
              value_in_usd: valueInUsd,
              profile_pic: token.profile_pic,
              created_at: token.created_at,
              balance: balance.toString(), // Placeholder balance
              // Use first letter of token name as logo fallback
              logo: token.name ? token.name.charAt(0).toUpperCase() : 'S'
            };
          });
          
          setHeldScienceGents(formattedData);
        }
      }
    } catch (err) {
      console.error("Error fetching held ScienceGents:", err);
      setHeldScienceGents([]);
    } finally {
      setIsLoadingLists(prev => ({ ...prev, held: false }));
    }
  };

  const fetchCreatedScienceGents = async () => {
    if (!developerProfile?.wallet_address) return;
    
    setIsLoadingLists(prev => ({ ...prev, created: true }));
    
    try {
      console.log("Fetching created ScienceGents (Blockchain-first approach)...", developerProfile.wallet_address);
      const developerWalletAddress = developerProfile.wallet_address.toLowerCase();

      // --- Blockchain Fetching Logic ---
      let blockchainScienceGents: ScienceGentListItem[] = [];
      try {
        const provider = await getProvider();
        const factoryAbi = [
          "function getTokenCount() view returns (uint256)",
          "function getTokensWithPagination(uint256 offset, uint256 limit) view returns (address[], uint256)"
        ];
        const factoryContract = new ethers.Contract(
          contractConfig.addresses.ScienceGentsFactory,
          factoryAbi,
          provider
        );

        const tokenCountBN = await factoryContract.getTokenCount();
        const tokenCount = tokenCountBN.toNumber();
        console.log(`Total tokens on blockchain: ${tokenCount}`);

        const batchSize = 50;
        // Removed unused createdTokenAddresses: string[] = [];

        for (let offset = 0; offset < tokenCount; offset += batchSize) {
          console.log(`Fetching token batch ${offset} to ${offset + batchSize}`);
          const [tokenAddresses] = await factoryContract.getTokensWithPagination(offset, batchSize);

          // For each address, check its creator
          const creatorChecks = tokenAddresses.map(async (address) => {
            try {
              const sgData = await fetchScienceGentFromBlockchain(address);
              
              // Log the received sgData object
              console.log(`sgData received for ${address}:`, sgData);

              // --- DETAILED DEBUG LOG --- 
              if (sgData && sgData.creator) { // Check sgData and sgData.creator exist
                const blockchainCreator = sgData.creator;
                console.log(`Comparing for ${address}:`);
                console.log(`  Chain Creator Raw: ${blockchainCreator} (Type: ${typeof blockchainCreator})`);
                console.log(`  Profile Address Raw: ${developerWalletAddress} (Type: ${typeof developerWalletAddress})`);
                
                // Print Char Codes
                const printCharCodes = (label: string, str: string | undefined) => {
                  if (!str) { console.log(`    ${label} Char Codes: undefined`); return; }
                  const codes = str.split('').map(char => char.charCodeAt(0)).join(' ');
                  console.log(`    ${label} Char Codes: [${codes}]`);
                };
                printCharCodes('Chain Creator', blockchainCreator);
                printCharCodes('Profile Address', developerWalletAddress);

                // Trim and lowercase for comparison
                const chainCreatorLower = blockchainCreator.trim().toLowerCase();
                const profileAddressLower = developerWalletAddress.trim().toLowerCase();
                console.log(`  Chain Creator Lower (Trimmed): ${chainCreatorLower}`);
                console.log(`  Profile Address Lower (Trimmed): ${profileAddressLower}`);
                const comparisonResult = chainCreatorLower === profileAddressLower;
                console.log(`  Comparison Result (Trimmed): ${comparisonResult}`);
              } else {
                  console.log(`sgData or sgData.creator is missing for ${address}`);
              }
              // --- END DETAILED DEBUG LOG ---

              // Perform the comparison using trimmed and lowercased values
              if (sgData && 
                  sgData.creator && 
                  developerWalletAddress && 
                  sgData.creator.trim().toLowerCase() === developerWalletAddress.trim().toLowerCase()) { 
                
                // --- SUCCESS LOG --- 
                console.log(`SUCCESS: Comparison SUCCEEDED for ${address}`);
                // --- END SUCCESS LOG ---

                console.log(`Found created ScienceGent on blockchain: ${address}`);
                // Directly return the basic info needed for the list item
                return {
                  address: sgData.address,
                  name: sgData.name || "Unnamed SG", // Add fallback name
                  symbol: sgData.symbol || "SG",     // Add fallback symbol
                  // Initialize other fields needed for ScienceGentListItem
                  market_cap: undefined,
                  market_cap_usd: undefined,
                  token_price_usd: undefined,
                  value_in_usd: undefined,
                  created_at: undefined,
                  profile_pic: undefined,
                  curated: undefined,
                  logo: undefined,
                  balance: undefined
                };
              }
            } catch (checkError) {
              console.error(`Error checking creator for ${address}:`, checkError);
            }
            return null;
          });

          const results = (await Promise.all(creatorChecks)).filter(Boolean);
          if (results.length > 0) {
            blockchainScienceGents.push(...results as ScienceGentListItem[]); // Ensure correct type
          }
        }

        console.log("Found created ScienceGents on blockchain:", blockchainScienceGents);

      } catch (blockchainError) {
        console.error("Error fetching ScienceGents from blockchain:", blockchainError);
        // Don't stop here, continue to Supabase fallback
        console.log("Proceeding with Supabase fallback for created ScienceGents.");
        // Ensure blockchainScienceGents is empty so fallback triggers
        blockchainScienceGents = [];
      }

      // --- Supabase Fetching & Merging Logic ---
      if (blockchainScienceGents.length > 0) {
        // We found tokens on the blockchain, now enrich with Supabase data
        const createdAddresses = blockchainScienceGents.map(sg => sg.address);

        const { data: supabaseData, error: supabaseError } = await supabase
          .from('sciencegents')
          .select('address, name, symbol, market_cap, market_cap_usd, profile_pic, created_at')
          .in('address', createdAddresses);

        if (supabaseError) {
          console.error("Error fetching Supabase details for blockchain tokens:", supabaseError);
          // Use blockchain data as is, providing necessary fallbacks for UI
          setCreatedScienceGents(blockchainScienceGents.map(sg => ({
            ...sg,
            market_cap_usd: sg.market_cap_usd || 0, // Ensure fallback value
            logo: sg.logo || (sg.name ? sg.name.charAt(0).toUpperCase() : 'S'),
            curated: sg.curated || false, // Ensure fallback value
          })));
        } else {
          const supabaseMap = new Map(supabaseData.map(item => [item.address, item]));
          const mergedData = blockchainScienceGents.map(blockchainSg => {
            const supabaseSg = supabaseMap.get(blockchainSg.address);
            return {
              address: blockchainSg.address,
              name: supabaseSg?.name || blockchainSg.name,
              symbol: supabaseSg?.symbol || blockchainSg.symbol,
              market_cap: supabaseSg?.market_cap || 0, // Ensure fallback
              market_cap_usd: supabaseSg?.market_cap_usd || 0, // Ensure fallback
              profile_pic: supabaseSg?.profile_pic || null,
              created_at: supabaseSg?.created_at || null,
              curated: true, // Assume curated if found via this method
              logo: (supabaseSg?.name || blockchainSg.name)
                    ? (supabaseSg?.name || blockchainSg.name).charAt(0).toUpperCase()
                    : 'S',
              // Keep other fields from initial blockchain fetch if needed, or null/undefined
              token_price_usd: undefined,
              value_in_usd: undefined,
              balance: undefined
            };
          });
          console.log("Merged created ScienceGents data:", mergedData);
          setCreatedScienceGents(mergedData);
        }
      } else {
        // Blockchain fetch failed or returned 0, use Supabase as fallback
        console.log("Using Supabase fallback for created ScienceGents");
      const { data, error } = await supabase
        .from('sciencegents')
        .select('name, symbol, address, market_cap, market_cap_usd, profile_pic, created_at')
          .eq('creator_address', developerWalletAddress) // Use normalized address
        .order('created_at', { ascending: false });
      
      if (error) {
          console.error("Error fetching created ScienceGents (Supabase fallback):", error);
        setCreatedScienceGents([]);
      } else {
        const formattedData = data.map(token => ({
          name: token.name,
          symbol: token.symbol,
          address: token.address,
          market_cap: token.market_cap,
          market_cap_usd: token.market_cap_usd,
          profile_pic: token.profile_pic,
          created_at: token.created_at,
          curated: true,
            logo: token.name ? token.name.charAt(0).toUpperCase() : 'S',
            // Add missing fields for ScienceGentListItem type consistency
            token_price_usd: undefined,
            value_in_usd: undefined,
            balance: undefined
          }));
          console.log("Created ScienceGents (Supabase fallback data):", formattedData);
        setCreatedScienceGents(formattedData);
        }
      }
    } catch (err) {
      console.error("Overall error fetching created ScienceGents:", err);
      setCreatedScienceGents([]);
    } finally {
      setIsLoadingLists(prev => ({ ...prev, created: false }));
    }
  };

  const fetchCreatedCapabilities = async () => {
    if (!developerProfile?.wallet_address) return;
    
    setIsLoadingLists(prev => ({ ...prev, capabilities: true }));
    
    try {
      // First attempt to fetch capabilities from blockchain
      console.log("Fetching capabilities from blockchain...");
      
      try {
        // Step 1: Get all capability IDs from the blockchain
        const allCapabilityIds = await fetchCapabilityIdsFromBlockchain();
        console.log("All capability IDs from blockchain:", allCapabilityIds);
      
        if (allCapabilityIds && allCapabilityIds.length > 0) {
          // Step 2: Get details of each capability and filter for ones created by this developer
          const developerWalletAddress = developerProfile.wallet_address.toLowerCase();
          console.log("Developer wallet address (normalized):", developerWalletAddress);
          
          const capabilityPromises = allCapabilityIds.map(async (id) => {
            try {
              const blockchainCapDetails = await fetchCapabilityDetailsFromBlockchain(id);
              
              // Check if this capability was created by our developer
              if (blockchainCapDetails && 
                  blockchainCapDetails.creator && 
                  blockchainCapDetails.creator.toLowerCase() === developerWalletAddress) {
                
                console.log(`Found capability ${id} created by the developer`);
                
                // Get additional details from Supabase
                try {
                  const supabaseCapDetails = await fetchCapabilityById(id);
                  
                  // Combine blockchain and Supabase data, with blockchain as source of truth for creator
                  return {
                    id: blockchainCapDetails.id,
                    name: supabaseCapDetails?.name || blockchainCapDetails.name || blockchainCapDetails.id,
                    description: supabaseCapDetails?.description || blockchainCapDetails.description || '',
                    price: blockchainCapDetails.price || (supabaseCapDetails?.price || 0),
                    usage_count: supabaseCapDetails?.usage_count || 0,
                    rating: supabaseCapDetails?.rating || 4.0,
                    revenue: supabaseCapDetails?.revenue || 0,
                    domain: supabaseCapDetails?.domain || blockchainCapDetails.domain || 'General',
                    display_image: supabaseCapDetails?.display_image || null
                  };
                } catch (supabaseError) {
                  console.error(`Error fetching Supabase details for capability ${id}:`, supabaseError);
                  
                  // If Supabase fetch fails, still return the blockchain data
                  return {
                    id: blockchainCapDetails.id,
                    name: blockchainCapDetails.name || blockchainCapDetails.id,
                    description: blockchainCapDetails.description || '',
                    price: blockchainCapDetails.price || 0,
                    usage_count: 0,
                    rating: 4.0,
                    revenue: 0,
                    domain: blockchainCapDetails.domain || 'General',
                    display_image: null
                  };
                }
              }
              return null;
            } catch (error) {
              console.error(`Error fetching blockchain details for capability ${id}:`, error);
              return null;
            }
          });
          
          const capabilities = await Promise.all(capabilityPromises);
          const filteredCapabilities = capabilities.filter(Boolean) as CapabilityItem[];
          
          console.log("Developer's capabilities from blockchain:", filteredCapabilities);
          
          if (filteredCapabilities.length > 0) {
            setCreatedCapabilities(filteredCapabilities);
            setIsLoadingLists(prev => ({ ...prev, capabilities: false }));
            return;
          }
          
          console.log("No capabilities found on blockchain for this developer, trying Supabase fallback");
        }
      } catch (blockchainError) {
        console.error("Error fetching capabilities from blockchain:", blockchainError);
        console.log("Falling back to Supabase for capability data");
      }
      
      // Fallback: Use Supabase approach if blockchain approach fails or returns no results
      
      // Option 1: Look in the developer profile's created_capabilities list
      const capabilityIds = developerProfile.created_capabilities || [];
      
      if (capabilityIds.length > 0) {
        console.log("Fetching capabilities from developer profile's created_capabilities list:", capabilityIds);
        
        // Fetch capabilities by their IDs
        const capabilities = await Promise.all(
          capabilityIds.map(async (id) => {
            try {
              const capability = await fetchCapabilityById(id);
              return capability ? {
                id: capability.id,
                name: capability.name,
                description: capability.description,
                price: capability.price,
                usage_count: capability.usage_count,
                rating: capability.rating,
                revenue: capability.revenue,
                domain: capability.domain,
                display_image: capability.display_image
              } : null;
            } catch (error) {
              console.error(`Error fetching capability ${id}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null results
        const filteredCapabilities = capabilities.filter(Boolean) as CapabilityItem[];
        console.log("Capabilities from developer profile:", filteredCapabilities);
        setCreatedCapabilities(filteredCapabilities);
      } else {
        // Option 2: If no capabilities in profile, check if there are any created by this developer in Supabase
        console.log("Fetching capabilities by creator field in Supabase");
        const { data, error } = await supabase
          .from('capabilities')
          .select('id, name, description, price, usage_count, rating, revenue, domain, display_image')
          .eq('creator', developerProfile.wallet_address)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching capabilities by creator:", error);
          setCreatedCapabilities([]);
        } else {
          console.log("Capabilities from Supabase by creator field:", data);
          setCreatedCapabilities(data);
        }
      }
    } catch (err) {
      console.error("Error fetching created capabilities:", err);
      setCreatedCapabilities([]);
    } finally {
      setIsLoadingLists(prev => ({ ...prev, capabilities: false }));
    }
  };
  
  const copyToClipboard = (text: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 8)}...${address.slice(-5)}`;
  };
  
  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return 'N/A';
    
    // Format large numbers to shortened format (K, M, B)
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else if (value >= 0.01) {
      return value.toFixed(2);
    } else {
      // For very small values, use scientific notation or show up to 8 decimal places
      return value < 0.0000001 ? value.toExponential(2) : value.toFixed(8);
    }
  };
  
  const renderCapabilities = () => {
    if (isLoadingLists.capabilities) {
      return (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b pb-6">
              <div className="flex gap-4">
                <div className="flex-grow">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-32 mb-3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-24 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (createdCapabilities.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No capabilities created yet</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        {createdCapabilities.map((capability, index) => (
          <div key={capability.id} className={`${index > 0 ? 'border-t pt-8' : ''}`}>
            <div className="flex gap-8">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{capability.name}</h3>
                  <span className="text-xs text-purple-600">{capability.id}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{capability.description}</p>
                <p className="text-sm font-medium mb-2">Price {capability.price} ETH</p>
                
                <div className="flex flex-wrap gap-3">
                  {capability.usage_count !== null && (
                    <span className="text-xs text-gray-600">usage {capability.usage_count}</span>
                  )}
                  
                  {capability.rating !== null && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600">rating</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`text-xs ${star <= Math.floor(capability.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs">{capability.rating}</span>
                    </div>
                  )}
                  
                  {capability.revenue && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">revenue {capability.revenue}DSI</span>
                  )}
                  
                  {capability.domain && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{capability.domain}</span>
                  )}
                </div>
              </div>
              
              {capability.display_image && (
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={capability.display_image} 
                    alt={capability.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderTable = (type: 'held' | 'created') => {
    const data = type === 'held' ? heldScienceGents : createdScienceGents;
    const isListLoading = type === 'held' ? isLoadingLists.held : isLoadingLists.created;
    
    if (isListLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b py-3">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex-grow">
                  <Skeleton className="h-5 w-40 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No ScienceGents {type === 'held' ? 'held' : 'created'} yet</p>
        </div>
      );
    }
    
    if (type === 'held') {
      return (
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-normal text-gray-500">Logo</th>
              <th className="text-left py-2 font-normal text-gray-500">NAME</th>
              <th className="text-right py-2 font-normal text-gray-500">amount</th>
              <th className="text-right py-2 font-normal text-gray-500">in USD</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.address} className="border-b">
                <td className="py-3">
                  {item.profile_pic ? (
                    <img 
                      src={item.profile_pic} 
                      alt={item.name} 
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                      {item.logo || 'S'}
                    </div>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    {item.symbol && (
                      <Badge className="w-fit mt-1 text-xs bg-gray-100 text-gray-800 font-normal">{item.symbol}</Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 text-right">{item.balance}</td>
                <td className="py-3 text-right">{formatNumber(item.value_in_usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      // Created tokens
      return (
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-normal text-gray-500">Logo</th>
              <th className="text-left py-2 font-normal text-gray-500">NAME</th>
              <th className="text-left py-2 font-normal text-gray-500">created at</th>
              <th className="text-right py-2 font-normal text-gray-500">market cap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.address} className="border-b">
                <td className="py-3">
                  {item.profile_pic ? (
                    <img 
                      src={item.profile_pic} 
                      alt={item.name} 
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                      {item.logo || 'S'}
                    </div>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.symbol && (
                        <Badge className="text-xs bg-gray-100 text-gray-800 font-normal">{item.symbol}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs font-normal bg-gray-100 text-gray-600 border rounded">
                        {formatAddress(developerProfile?.wallet_address || '')}
                      </Badge>
                      {item.curated && (
                        <Badge className="text-xs font-normal bg-green-100 text-green-800 border rounded">
                          curated
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                </td>
                <td className="py-3 text-right">{formatNumber(item.market_cap_usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6 mb-8">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="flex-grow space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (profileNotFound && !developerProfile?.developer_name) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <AlertCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p>Developer profile information is not available for this ScienceGent.</p>
          <p className="text-xs mt-1">(Creator: {formatAddress(scienceGent?.creator_address)})</p>
        </CardContent>
      </Card>
    );
  }

  // Generate initials for avatar
  const getInitials = () => {
    if (!developerProfile?.developer_name) return 'LO';
    const nameParts = developerProfile.developer_name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return developerProfile.developer_name.substring(0, 2).toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-6 mb-8">
          <div className="flex-shrink-0">
            {developerProfile?.profile_pic ? (
              <img 
                src={developerProfile.profile_pic} 
                alt={developerProfile.developer_name || 'Developer'} 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials()}
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold">{developerProfile?.developer_name || 'Unknown Developer'}</h2>
              <div className="flex gap-1">
                {developerProfile?.developer_twitter && (
                  <a href={`https://twitter.com/${developerProfile.developer_twitter}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                      <Twitter className="h-4 w-4 text-gray-500" />
                    </Button>
                  </a>
                )}
                {developerProfile?.developer_github && (
                  <a href={`https://github.com/${developerProfile.developer_github}`} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                      <Github className="h-4 w-4 text-gray-500" />
                    </Button>
                  </a>
                )}
                {developerProfile?.developer_website && (
                  <a href={developerProfile.developer_website} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                      <Globe className="h-4 w-4 text-gray-500" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 px-2"
                onClick={() => copyToClipboard(developerProfile?.wallet_address || '')}
              >
                <span className="text-xs mr-1">{formatAddress(developerProfile?.wallet_address || '')}</span>
                {copied ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3 text-gray-500" />
                )}
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <p className="text-sm text-gray-600">{developerProfile?.bio || '(No bio provided)'}</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="sciencegents-held" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 border-b w-full flex rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="sciencegents-held"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0 mr-6"
              onClick={() => setActiveTab('sciencegents-held')}
            >
              ScienceGents Held
            </TabsTrigger>
            <TabsTrigger 
              value="sciencegents-created"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0 mr-6"
              onClick={() => setActiveTab('sciencegents-created')}
            >
              ScienceGents Created
            </TabsTrigger>
            <TabsTrigger 
              value="capabilities-created"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0"
              onClick={() => setActiveTab('capabilities-created')}
            >
              Capabilities Created
            </TabsTrigger>
          </TabsList>
          
          <div className="overflow-x-auto">
            {activeTab === 'sciencegents-held' && renderTable('held')}
            {activeTab === 'sciencegents-created' && renderTable('created')}
            {activeTab === 'capabilities-created' && renderCapabilities()}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfo;
