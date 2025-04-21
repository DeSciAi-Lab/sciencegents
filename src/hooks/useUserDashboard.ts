import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { fetchTokenStats24h } from '@/services/tradeService';
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from '@/services/capability/blockchain';

export interface DashboardScienceGent {
  address: string;
  name: string;
  symbol: string;
  marketCap: number;
  tradingEnabled: boolean;
  isMigrated: boolean;
  maturityProgress: number;
  description?: string;
  profilePic?: string;
  tokenPrice?: number;
  tokenPriceUsd?: number;
  priceChange24h?: number;
  virtualETH?: number;
  collectedFees?: number;
  capabilities?: string[];
  agent_fee?: number;
  detailed_description?: string;
  persona?: string;
  users?: number;
  interactions?: number;
  holders?: number;
  age?: string;
  created_at?: string;
  rating?: number;
  volume24h?: number;
}

export interface UserCapability {
  id: string;
  name: string;
  domain: string;
  revenue: number;
  usageCount: number;
  price?: number;
  description?: string;
  rating?: number;
  displayImage?: string;
}

export interface DashboardInvestment {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
  balanceUSD: number;
  tokenPrice?: number;
  priceChange24h?: number;
  domain?: string;
}

export const useUserDashboard = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [userScienceGents, setUserScienceGents] = useState<DashboardScienceGent[]>([]);
  const [userCapabilities, setUserCapabilities] = useState<UserCapability[]>([]);
  const [userInvestments, setUserInvestments] = useState<DashboardInvestment[]>([]);

  // Connect wallet function
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "No Wallet Found",
        description: "Please install MetaMask or another Ethereum wallet provider.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      // Get network and accounts
      const network = await provider.getNetwork();
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: `Connected with ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        });
        
        // Force reload after connection to ensure Wagmi context is updated
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    }
  };

  // Load user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!account) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        // Connect to provider
        if (!window.ethereum) {
          throw new Error("No Ethereum provider detected");
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        try {
          // Get the address in lowercase for case-insensitive comparison
          const normalizedAddress = account.toLowerCase();
          
          console.log("Fetching ScienceGents created by address:", normalizedAddress);
          
          // Directly query sciencegents table where creator matches the wallet address
            const { data: createdScienceGents, error: scienceGentsError } = await supabase
              .from('sciencegents')
              .select('*')
            .eq('creator_address', normalizedAddress);
              
            if (scienceGentsError) {
              console.error("Error fetching ScienceGents from Supabase:", scienceGentsError);
            throw scienceGentsError;
            }
            
            if (createdScienceGents && createdScienceGents.length > 0) {
              console.log("Fetched ScienceGents from Supabase:", createdScienceGents);
              
            const formattedScienceGents = await Promise.all(createdScienceGents.map(async (sg) => {
              // Fetch market cap and other trading data
              let marketCap = sg.market_cap || 0;
              // Get token price the same way as in the explore page
              const tokenPrice = sg.token_price || 0;
              const tokenPriceUsd = sg.token_price_usd || (tokenPrice * 3000); // Using same ETH_PRICE_USD constant as explore page
              let priceChange24h = 0;
              let volume24h = 0;
              
              // Get 24h price change data using the same method as the explore page
              try {
                const stats24h = await fetchTokenStats24h(sg.address);
                if (stats24h) {
                  priceChange24h = stats24h.price_change_percentage_24h || 0;
                  volume24h = stats24h.volume_24h || 0;
                } else {
                  // Fallback only if fetchTokenStats24h returns null (not used in explore page)
                  const { data: priceData } = await supabase
                    .from('trades')
                    .select('price_in_usd')
                    .eq('token_id', sg.address)
                    .order('time', { ascending: false })
                    .limit(1);
                    
                  if (priceData && priceData.length > 0) {
                    const latestPrice = priceData[0].price_in_usd;
                    
                    // Get price from 24h ago
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    const { data: oldPriceData } = await supabase
                      .from('trades')
                      .select('price_in_usd')
                      .eq('token_id', sg.address)
                      .lt('time', yesterday.toISOString())
                      .order('time', { ascending: false })
                      .limit(1);
                      
                    if (oldPriceData && oldPriceData.length > 0) {
                      const oldPrice = oldPriceData[0].price_in_usd;
                      priceChange24h = ((latestPrice - oldPrice) / oldPrice) * 100;
                    }
                  }
                }
              } catch (priceError) {
                console.error("Error fetching price data:", priceError);
              }
              
              // Calculate maturity progress (based on completion status, age, etc.)
              const createdAt = new Date(sg.created_at || new Date());
              const now = new Date();
              const ageInDays = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
              // Use only the raw maturity_progress value from Supabase
              const maturityProgress = sg.maturity_progress;
              
              // Get capabilities for this ScienceGent
              const { data: capabilityLinks } = await supabase
                .from('sciencegent_capabilities')
                .select('capability_id')
                .eq('sciencegent_address', sg.address);
                
              const capabilities = capabilityLinks?.map(link => link.capability_id) || [];
              
              // Get domain information
              let domain = sg.domain || "General Science";
              if (!domain) {
                // Try to get domain from the domains table by matching the domain value
                const { data: domainData } = await supabase
                  .from('domains')
                  .select('name')
                  .eq('name', sg.domain || 'General Science')
                  .single();
                  
                if (domainData) {
                  domain = domainData.name;
                }
              }
              
              // Calculate revenue for demo purposes based on interactions_count and agent_fee
              const interactionsCount = (sg as any).interactions_count || 0;
              const agentFee = sg.agent_fee || 3; // Default agent fee of 3
              const revenue = interactionsCount * agentFee;
              
              // Use only the raw rating from Supabase with no fallbacks
              const rating = sg.rating;
              
              // Format the ScienceGent data
              return {
                address: sg.address,
                name: sg.name || 'Unnamed ScienceGent',
                symbol: sg.symbol || 'SG',
                marketCap: marketCap,
                tradingEnabled: sg.is_migrated || false,
                isMigrated: sg.is_migrated || false,
                maturityProgress: maturityProgress,
                tokenPrice: tokenPrice,
                tokenPriceUsd: tokenPriceUsd,
                priceChange24h: priceChange24h,
                description: sg.description || '',
                profilePic: sg.profile_pic || '',
                virtualETH: sg.virtual_eth || 0,
                collectedFees: revenue, // Use calculated revenue based on interactions
                domain: domain,
                capabilities: capabilities,
                created_at: sg.created_at,
                age: `${ageInDays} day${ageInDays !== 1 ? 's' : ''}`,
                agent_fee: sg.agent_fee || 3,
                detailed_description: sg.description || '',
                persona: sg.persona || '',
                users: (sg as any).users || 0,
                interactions: (sg as any).interactions || 0,
                holders: (sg as any).holders || 0,
                rating: rating,
                volume24h: volume24h
              };
            }));
              
              setUserScienceGents(formattedScienceGents);
          } else {
            console.log("No ScienceGents found for creator address:", normalizedAddress);
            setUserScienceGents([]);
          }
        } catch (scienceGentError) {
          console.error("Error fetching created ScienceGents:", scienceGentError);
          setUserScienceGents([]);
        }
        
        try {
          // NEW APPROACH: Get user's created capabilities from blockchain first
          // Use the lowercase version of account for case-insensitive comparison
          const normalizedWalletAddress = account.toLowerCase();
          console.log("Fetching capabilities created by address:", normalizedWalletAddress);
          
          // Get all registered capability IDs from the blockchain
          const allCapabilityIds = await fetchCapabilityIdsFromBlockchain();
          
          if (allCapabilityIds && allCapabilityIds.length > 0) {
            console.log("Fetched capability IDs from blockchain:", allCapabilityIds);
            
            // Filter capabilities by creator (since the blockchain returns all capabilities)
            const userCapabilityDetailsPromises = allCapabilityIds.map(async (id) => {
              try {
                const blockchainDetails = await fetchCapabilityDetailsFromBlockchain(id);
                // Check if this capability was created by the current user
                if (blockchainDetails.creator && blockchainDetails.creator.toLowerCase() === normalizedWalletAddress) {
                  return blockchainDetails;
                }
                return null;
              } catch (error) {
                console.error(`Error fetching blockchain details for capability ${id}:`, error);
                return null;
              }
            });
            
            // Wait for all promises to resolve and filter out nulls
            const userCapabilityDetails = (await Promise.all(userCapabilityDetailsPromises)).filter(Boolean);
            
            if (userCapabilityDetails.length > 0) {
              console.log("User capabilities from blockchain:", userCapabilityDetails);
              
              // Now fetch additional details from Supabase for these capabilities
              const capabilityIds = userCapabilityDetails.map(cap => cap.id);
              
              const { data: supabaseCapabilities, error: capabilitiesError } = await supabase
                .from('capabilities')
                .select('*')
                .in('id', capabilityIds);
                
              if (capabilitiesError) {
                console.error("Error fetching capabilities from Supabase:", capabilitiesError);
              }
              
              // Combine blockchain and Supabase data (blockchain is source of truth for creator)
              const formattedCapabilities = userCapabilityDetails.map(blockchainCap => {
                // Find matching Supabase record if it exists
                const supabaseRecord = supabaseCapabilities?.find(sc => sc.id === blockchainCap.id);
                
                return {
                  id: blockchainCap.id,
                  name: (supabaseRecord?.name || blockchainCap.name || blockchainCap.id),
                  domain: (supabaseRecord?.domain || blockchainCap.domain || 'Unknown'),
                  revenue: (supabaseRecord?.revenue || 0),
                  usageCount: (supabaseRecord?.usage_count || 0),
                  price: blockchainCap.price || (supabaseRecord?.price || 0),
                  description: (supabaseRecord?.description || blockchainCap.description || ''),
                  rating: (supabaseRecord?.rating || 4.0),
                  displayImage: (supabaseRecord?.display_image || null)
                };
              });
              
              setUserCapabilities(formattedCapabilities);
            } else {
              console.log("No capabilities found for address:", normalizedWalletAddress);
              setUserCapabilities([]);
            }
          } else {
            console.log("No capabilities found on blockchain");
            setUserCapabilities([]);
          }
        } catch (capabilityError) {
          console.error("Error fetching created capabilities:", capabilityError);
          setUserCapabilities([]);
          
          // Fallback to original method if blockchain approach fails
          try {
            // Get user's created capabilities directly from Supabase as fallback
          const { data: createdCapabilities, error: capabilitiesError } = await supabase
            .from('capabilities')
            .select('*')
            .eq('creator', account);
            
          if (capabilitiesError) {
              console.error("Error fetching capabilities from Supabase (fallback):", capabilitiesError);
          }
          
          if (createdCapabilities && createdCapabilities.length > 0) {
              console.log("Fetched capabilities from Supabase (fallback):", createdCapabilities);
            
            const formattedCapabilities = createdCapabilities.map(cap => ({
              id: cap.id,
              name: cap.name || cap.id,
              domain: cap.domain || 'Unknown',
              revenue: cap.revenue || 0,
              usageCount: cap.usage_count || 0,
              price: cap.price || 0,
              description: cap.description || '',
              rating: cap.rating || 4.0,
              displayImage: cap.display_image || null
            }));
            
            setUserCapabilities(formattedCapabilities);
            }
          } catch (fallbackError) {
            console.error("Error with fallback capability fetch:", fallbackError);
          }
        }
        
        try {
          // Get user's investments
          const { data: scienceGents } = await supabase
            .from('sciencegents')
            .select('address, name, symbol, token_price, price_change_24h, domain');
          
          if (scienceGents?.length) {
            const investmentsPromises = scienceGents.map(async (token) => {
              try {
                // Check if user has balance of this token
                const tokenContract = new ethers.Contract(
                  token.address,
                  ["function balanceOf(address) view returns (uint256)"],
                  provider
                );
                
                const balance = await tokenContract.balanceOf(account);
                
                if (balance.gt(0)) {
                  const formattedBalance = ethers.utils.formatUnits(balance, 18);
                  const balanceUSD = parseFloat(formattedBalance) * (token.token_price || 0) * 1500; // Rough ETH to USD conversion
                  
                  return {
                    tokenAddress: token.address,
                    tokenName: token.name,
                    tokenSymbol: token.symbol,
                    balance: formattedBalance,
                    balanceUSD,
                    tokenPrice: token.token_price || 0,
                    priceChange24h: token.price_change_24h || 0,
                    domain: token.domain || 'General'
                  };
                }
                
                return null;
              } catch (error) {
                console.error(`Error checking balance for token ${token.address}:`, error);
                return null;
              }
            });
            
            const investments = await Promise.all(investmentsPromises);
            setUserInvestments(investments.filter(Boolean) as DashboardInvestment[]);
          }
        } catch (investmentError) {
          console.error("Error fetching investments:", investmentError);
        }
      } catch (error) {
        console.error("Error loading user dashboard data:", error);
        toast({
          title: "Data Loading Error",
          description: "Failed to load your dashboard data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [account]);

  // Listen for account changes
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          } else {
            setAccount(null);
            setIsConnected(false);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
          setAccount(null);
          setIsConnected(false);
        }
      }
    };
    
    checkConnection();
    
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setAccount(null);
        setIsConnected(false);
      }
    };
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // Add a function to refresh the data manually
  const refreshData = async () => {
    if (account) {
      setIsLoading(true);
      try {
        // Connect to provider
        if (!window.ethereum) {
          throw new Error("No Ethereum provider detected");
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Fetch ScienceGents
        const normalizedAddress = account.toLowerCase();
        
        const { data: createdScienceGents, error: scienceGentsError } = await supabase
          .from('sciencegents')
          .select('*')
          .eq('creator_address', normalizedAddress);
          
        if (scienceGentsError) {
          console.error("Error fetching ScienceGents from Supabase:", scienceGentsError);
          throw scienceGentsError;
        }
        
        if (createdScienceGents && createdScienceGents.length > 0) {
          console.log("Fetched ScienceGents from Supabase:", createdScienceGents);
          
          const formattedScienceGents = await Promise.all(createdScienceGents.map(async (sg) => {
            // Fetch market cap and other trading data
            let marketCap = sg.market_cap || 0;
            // Get token price the same way as in the explore page
            const tokenPrice = sg.token_price || 0;
            const tokenPriceUsd = sg.token_price_usd || (tokenPrice * 3000); // Using same ETH_PRICE_USD constant as explore page
            let priceChange24h = 0;
            let volume24h = 0;
            
            // Get 24h price change data using the same method as the explore page
            try {
              const stats24h = await fetchTokenStats24h(sg.address);
              if (stats24h) {
                priceChange24h = stats24h.price_change_percentage_24h || 0;
                volume24h = stats24h.volume_24h || 0;
              } else {
                // Fallback only if fetchTokenStats24h returns null (not used in explore page)
                const { data: priceData } = await supabase
                  .from('trades')
                  .select('price_in_usd')
                  .eq('token_id', sg.address)
                  .order('time', { ascending: false })
                  .limit(1);
                  
                if (priceData && priceData.length > 0) {
                  const latestPrice = priceData[0].price_in_usd;
                  
                  // Get price from 24h ago
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  
                  const { data: oldPriceData } = await supabase
                    .from('trades')
                    .select('price_in_usd')
                    .eq('token_id', sg.address)
                    .lt('time', yesterday.toISOString())
                    .order('time', { ascending: false })
                    .limit(1);
                    
                  if (oldPriceData && oldPriceData.length > 0) {
                    const oldPrice = oldPriceData[0].price_in_usd;
                    priceChange24h = ((latestPrice - oldPrice) / oldPrice) * 100;
                  }
                }
              }
            } catch (priceError) {
              console.error("Error fetching price data:", priceError);
            }
            
            // Calculate maturity progress (based on completion status, age, etc.)
            const createdAt = new Date(sg.created_at || new Date());
            const now = new Date();
            const ageInDays = Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
            // Use only the raw maturity_progress value from Supabase
            const maturityProgress = sg.maturity_progress;
            
            // Get capabilities for this ScienceGent
            const { data: capabilityLinks } = await supabase
              .from('sciencegent_capabilities')
              .select('capability_id')
              .eq('sciencegent_address', sg.address);
              
            const capabilities = capabilityLinks?.map(link => link.capability_id) || [];
            
            // Get domain information
            let domain = sg.domain || "General Science";
            if (!domain) {
              // Try to get domain from the domains table by matching the domain value
              const { data: domainData } = await supabase
                .from('domains')
                .select('name')
                .eq('name', sg.domain || 'General Science')
                .single();
                
              if (domainData) {
                domain = domainData.name;
              }
            }
            
            // Calculate revenue for demo purposes based on interactions_count and agent_fee
            const interactionsCount = (sg as any).interactions_count || 0;
            const agentFee = sg.agent_fee || 3; // Default agent fee of 3
            const revenue = interactionsCount * agentFee;
            
            // Use only the raw rating from Supabase with no fallbacks
            const rating = sg.rating;
            
            // Format the ScienceGent data
            return {
              address: sg.address,
              name: sg.name || 'Unnamed ScienceGent',
              symbol: sg.symbol || 'SG',
              marketCap: marketCap,
              tradingEnabled: sg.is_migrated || false,
              isMigrated: sg.is_migrated || false,
              maturityProgress: maturityProgress,
              tokenPrice: tokenPrice,
              tokenPriceUsd: tokenPriceUsd,
              priceChange24h: priceChange24h,
              description: sg.description || '',
              profilePic: sg.profile_pic || '',
              virtualETH: sg.virtual_eth || 0,
              collectedFees: revenue, // Use calculated revenue based on interactions
              domain: domain,
              capabilities: capabilities,
              created_at: sg.created_at,
              age: `${ageInDays} day${ageInDays !== 1 ? 's' : ''}`,
              agent_fee: sg.agent_fee || 3,
              detailed_description: sg.description || '',
              persona: sg.persona || '',
              users: (sg as any).users || 0,
              interactions: (sg as any).interactions || 0,
              holders: (sg as any).holders || 0,
              rating: rating,
              volume24h: volume24h
            };
          }));
          
          setUserScienceGents(formattedScienceGents);
        } else {
          console.log("No ScienceGents found for creator address:", normalizedAddress);
          setUserScienceGents([]);
        }

        // Add capability refresh using blockchain approach
        try {
          // Use the lowercase version of account for case-insensitive comparison
          console.log("Refreshing capabilities created by address:", normalizedAddress);
          
          // Get all registered capability IDs from the blockchain
          const allCapabilityIds = await fetchCapabilityIdsFromBlockchain();
          
          if (allCapabilityIds && allCapabilityIds.length > 0) {
            console.log("Fetched capability IDs from blockchain:", allCapabilityIds);
            
            // Filter capabilities by creator (since the blockchain returns all capabilities)
            const userCapabilityDetailsPromises = allCapabilityIds.map(async (id) => {
              try {
                const blockchainDetails = await fetchCapabilityDetailsFromBlockchain(id);
                // Check if this capability was created by the current user
                if (blockchainDetails.creator && blockchainDetails.creator.toLowerCase() === normalizedAddress) {
                  return blockchainDetails;
                }
                return null;
              } catch (error) {
                console.error(`Error fetching blockchain details for capability ${id}:`, error);
                return null;
              }
            });
            
            // Wait for all promises to resolve and filter out nulls
            const userCapabilityDetails = (await Promise.all(userCapabilityDetailsPromises)).filter(Boolean);
            
            if (userCapabilityDetails.length > 0) {
              console.log("User capabilities from blockchain:", userCapabilityDetails);
              
              // Now fetch additional details from Supabase for these capabilities
              const capabilityIds = userCapabilityDetails.map(cap => cap.id);
              
              const { data: supabaseCapabilities, error: capabilitiesError } = await supabase
                .from('capabilities')
                .select('*')
                .in('id', capabilityIds);
                
              if (capabilitiesError) {
                console.error("Error fetching capabilities from Supabase:", capabilitiesError);
              }
              
              // Combine blockchain and Supabase data (blockchain is source of truth for creator)
              const formattedCapabilities = userCapabilityDetails.map(blockchainCap => {
                // Find matching Supabase record if it exists
                const supabaseRecord = supabaseCapabilities?.find(sc => sc.id === blockchainCap.id);
                
                return {
                  id: blockchainCap.id,
                  name: (supabaseRecord?.name || blockchainCap.name || blockchainCap.id),
                  domain: (supabaseRecord?.domain || blockchainCap.domain || 'Unknown'),
                  revenue: (supabaseRecord?.revenue || 0),
                  usageCount: (supabaseRecord?.usage_count || 0),
                  price: blockchainCap.price || (supabaseRecord?.price || 0),
                  description: (supabaseRecord?.description || blockchainCap.description || ''),
                  rating: (supabaseRecord?.rating || 4.0),
                  displayImage: (supabaseRecord?.display_image || null)
                };
              });
              
              setUserCapabilities(formattedCapabilities);
            } else {
              console.log("No capabilities found for address:", normalizedAddress);
              setUserCapabilities([]);
            }
          } else {
            console.log("No capabilities found on blockchain");
            setUserCapabilities([]);
          }
        } catch (capabilityError) {
          console.error("Error refreshing capabilities:", capabilityError);
          setUserCapabilities([]);
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Return the refresh function along with other values
  return {
    account,
    isConnected,
    isLoading,
    userScienceGents,
    userCapabilities,
    userInvestments,
    connectWallet,
    refreshData
  };
};
