
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { supabase } from '@/integrations/supabase/client';
import { contractConfig, factoryABI } from '@/utils/contractConfig';
import { toast } from "@/components/ui/use-toast";

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
  priceChange24h?: number;
  virtualETH?: number;
  collectedFees?: number;
  capabilities?: string[];
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
      
      // Check if on the right network (Sepolia)
      const network = await provider.getNetwork();
      if (network.chainId !== parseInt(contractConfig.network.chainId, 16)) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: contractConfig.network.chainId }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: contractConfig.network.chainId,
                    chainName: contractConfig.network.chainName,
                    nativeCurrency: contractConfig.network.nativeCurrency,
                    rpcUrls: contractConfig.network.rpcUrls,
                    blockExplorerUrls: contractConfig.network.blockExplorerUrls,
                  },
                ],
              });
            } catch (addError) {
              console.error("Error adding Ethereum chain:", addError);
            }
          }
        }
      }
      
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: `Connected with ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        });
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Get user's created ScienceGents
        const factory = new ethers.Contract(
          contractConfig.addresses.ScienceGentsFactory,
          factoryABI,
          provider
        );
        
        // Get tokens created by this user
        const createdTokens = await factory.getTokensOfCreator(account);
        
        if (createdTokens.length > 0) {
          const tokenDetailsPromises = createdTokens.map(async (tokenAddress: string) => {
            try {
              const details = await factory.getTokenDetails(tokenAddress);
              
              // Get token data from Supabase for additional info
              const { data: dbData } = await supabase
                .from('sciencegents')
                .select('name, symbol, market_cap, maturity_progress, token_price, price_change_24h, description, profile_pic, virtual_eth, collected_fees, domain')
                .eq('address', tokenAddress)
                .single();
              
              // Get capabilities for this ScienceGent
              const { data: capabilityData } = await supabase
                .from('sciencegent_capabilities')
                .select('capability_id')
                .eq('sciencegent_address', tokenAddress);
                
              const capabilities = capabilityData ? capabilityData.map(cap => cap.capability_id) : [];
              
              return {
                address: tokenAddress,
                name: details.name || dbData?.name || 'Unknown Token',
                symbol: details.symbol || dbData?.symbol || '???',
                marketCap: dbData?.market_cap || 0,
                tradingEnabled: details.tradingEnabled,
                isMigrated: details.isMigrated,
                maturityProgress: dbData?.maturity_progress || 0,
                tokenPrice: dbData?.token_price || 0,
                priceChange24h: dbData?.price_change_24h || 0,
                description: dbData?.description || '',
                profilePic: dbData?.profile_pic || '',
                virtualETH: dbData?.virtual_eth || 0,
                collectedFees: dbData?.collected_fees || 0,
                domain: dbData?.domain || 'General',
                capabilities
              };
            } catch (error) {
              console.error(`Error fetching details for token ${tokenAddress}:`, error);
              return null;
            }
          });
          
          const tokenDetails = await Promise.all(tokenDetailsPromises);
          setUserScienceGents(tokenDetails.filter(Boolean) as DashboardScienceGent[]);
        }
        
        // Get user's created capabilities
        const createdCapabilities = await factory.getCapabilitiesOfCreator(account);
        
        if (createdCapabilities.length > 0) {
          const capabilityDetailsPromises = createdCapabilities.map(async (capabilityId: string) => {
            try {
              // Get capability from Supabase
              const { data } = await supabase
                .from('capabilities')
                .select('name, domain, revenue, usage_count, price, description, rating, display_image')
                .eq('id', capabilityId)
                .single();
              
              if (data) {
                return {
                  id: capabilityId,
                  name: data.name,
                  domain: data.domain,
                  revenue: data.revenue || 0,
                  usageCount: data.usage_count || 0,
                  price: data.price || 0,
                  description: data.description || '',
                  rating: data.rating || 4.0,
                  displayImage: data.display_image || null
                };
              }
              
              // Fallback to blockchain data if not in Supabase
              const [description, feeInETH, ] = await factory.getCapabilityDetails(capabilityId);
              
              return {
                id: capabilityId,
                name: capabilityId, // Use ID as name if not in Supabase
                domain: 'Unknown',
                description,
                revenue: 0,
                usageCount: 0,
                price: feeInETH ? parseFloat(ethers.utils.formatEther(feeInETH)) : 0,
                rating: 4.0
              };
            } catch (error) {
              console.error(`Error fetching details for capability ${capabilityId}:`, error);
              return null;
            }
          });
          
          const capabilityDetails = await Promise.all(capabilityDetailsPromises);
          setUserCapabilities(capabilityDetails.filter(Boolean) as UserCapability[]);
        }
        
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
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });
    }
    
    return () => {
      if (window.ethereum) {
        // Fix: Use removeListener instead of removeAllListeners
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return {
    account,
    isLoading,
    isConnected,
    userScienceGents,
    userCapabilities,
    userInvestments,
    connectWallet
  };
};
