import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Twitter, Github, Globe, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchCapabilityById } from '@/services/capability/supabase';
import { fetchScienceGentFromSupabase } from '@/services/scienceGent/supabase';

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
        setError("No creator address available");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('developer_profiles')
          .select('*')
          .eq('wallet_address', scienceGent.creator_address.toLowerCase())
          .single();
        
        if (error) {
          console.error("Error fetching developer profile:", error);
          setError("Failed to load developer data");
        } else if (data) {
          setDeveloperProfile(data);
        } else {
          // If no profile found, use some data from scienceGent
          setDeveloperProfile({
            bio: scienceGent.bio || "(No bio provided)",
            wallet_address: scienceGent.creator_address,
            developer_name: scienceGent.developer_name || "Unknown Developer",
            developer_twitter: scienceGent.developer_twitter || null,
            developer_github: scienceGent.developer_github || null,
            developer_website: scienceGent.developer_website || null,
            profile_pic: scienceGent.profile_pic || null
          });
        }
      } catch (err) {
        console.error("Error in developer profile fetch:", err);
        setError("Failed to load developer data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeveloperProfile();
  }, [scienceGent?.creator_address]);

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
      // Get tokens created by this developer
      const { data, error } = await supabase
        .from('sciencegents')
        .select('name, symbol, address, market_cap, market_cap_usd, profile_pic, created_at')
        .eq('creator_address', developerProfile.wallet_address)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching created ScienceGents:", error);
        setCreatedScienceGents([]);
      } else {
        // Format the data
        const formattedData = data.map(token => ({
          name: token.name,
          symbol: token.symbol,
          address: token.address,
          market_cap: token.market_cap,
          market_cap_usd: token.market_cap_usd,
          profile_pic: token.profile_pic,
          created_at: token.created_at,
          // Mark as curated (could be based on a condition in the future)
          curated: true,
          // Use first letter of token name as logo fallback
          logo: token.name ? token.name.charAt(0).toUpperCase() : 'S'
        }));
        
        setCreatedScienceGents(formattedData);
      }
    } catch (err) {
      console.error("Error fetching created ScienceGents:", err);
      setCreatedScienceGents([]);
    } finally {
      setIsLoadingLists(prev => ({ ...prev, created: false }));
    }
  };

  const fetchCreatedCapabilities = async () => {
    if (!developerProfile?.wallet_address || !developerProfile.created_capabilities) return;
    
    setIsLoadingLists(prev => ({ ...prev, capabilities: true }));
    
    try {
      // Fetch each capability by ID
      const capabilityIds = developerProfile.created_capabilities || [];
      
      if (capabilityIds.length === 0) {
        // If there are no capabilities, check if there are any created by this developer
        const { data, error } = await supabase
          .from('capabilities')
          .select('id, name, description, price, usage_count, rating, revenue, domain, display_image')
          .eq('creator', developerProfile.wallet_address)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching capabilities by creator:", error);
          setCreatedCapabilities([]);
        } else {
          setCreatedCapabilities(data);
        }
      } else {
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
        setCreatedCapabilities(capabilities.filter(Boolean) as CapabilityItem[]);
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
