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
        if (!window.ethereum) {
          throw new Error("No Ethereum provider detected");
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        try {
          // Get user's created ScienceGents from Supabase instead of blockchain
          // This avoids the contract method errors
          const { data: createdScienceGents, error: scienceGentsError } = await supabase
            .from('sciencegents')
            .select('*')
            .eq('creator_address', account);
            
          if (scienceGentsError) {
            console.error("Error fetching ScienceGents from Supabase:", scienceGentsError);
          }
          
          if (createdScienceGents && createdScienceGents.length > 0) {
            console.log("Fetched ScienceGents from Supabase:", createdScienceGents);
            
            const formattedScienceGents = createdScienceGents.map(sg => ({
              address: sg.address,
              name: sg.name || 'Unknown Token',
              symbol: sg.symbol || '???',
              marketCap: sg.market_cap || 0,
              tradingEnabled: sg.is_migrated || false,
              isMigrated: sg.is_migrated || false,
              maturityProgress: sg.maturity_progress || 0,
              tokenPrice: sg.token_price || 0,
              priceChange24h: sg.price_change_24h || 0,
              description: sg.description || '',
              profilePic: sg.profile_pic || '',
              virtualETH: sg.virtual_eth || 0,
              collectedFees: sg.collected_fees || 0,
              domain: sg.domain || 'General',
              capabilities: []
            }));
            
            // Get capabilities for each ScienceGent
            for (const sg of formattedScienceGents) {
              const { data: capabilityData } = await supabase
                .from('sciencegent_capabilities')
                .select('capability_id')
                .eq('sciencegent_address', sg.address);
                
              if (capabilityData && capabilityData.length > 0) {
                sg.capabilities = capabilityData.map(cap => cap.capability_id);
              }
            }
            
            setUserScienceGents(formattedScienceGents);
          } else {
            console.log("No ScienceGents found for address:", account);
          }
        } catch (tokenError) {
          console.error("Error fetching created ScienceGents:", tokenError);
        }
        
        try {
          // Get user's created capabilities from Supabase instead of blockchain
          // This avoids the contract method errors
          const { data: createdCapabilities, error: capabilitiesError } = await supabase
            .from('capabilities')
            .select('*')
            .eq('creator', account);
            
          if (capabilitiesError) {
            console.error("Error fetching capabilities from Supabase:", capabilitiesError);
          }
          
          if (createdCapabilities && createdCapabilities.length > 0) {
            console.log("Fetched capabilities from Supabase:", createdCapabilities);
            
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
          } else {
            console.log("No capabilities found for address:", account);
          }
        } catch (capabilityError) {
          console.error("Error fetching created capabilities:", capabilityError);
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
