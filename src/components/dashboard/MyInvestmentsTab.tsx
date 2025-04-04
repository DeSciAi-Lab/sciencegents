import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface TokenHolding {
  name: string;
  symbol: string;
  address: string;
  age: string;
  tokenAmount: string;
  priceUsd: string;
  value: string;
  change24h: string;
  isPositiveChange: boolean;
}

interface TradeItem {
  name: string;
  symbol: string;
  address: string;
  timestamp: string;
  type: 'buy' | 'sell';
  priceUsd: string;
  tokenAmount: string;
  value: string;
}

// Helper to format address with copy functionality
const AddressWithCopy = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const formattedAddress = `${address.substring(0, 8)}...${address.slice(-4)}`;
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-6 px-2 text-xs flex items-center gap-1 font-mono"
      onClick={copyToClipboard}
    >
      {formattedAddress}
      <Copy className="h-3 w-3 opacity-50" />
    </Button>
  );
};

// Logo component with letter avatars
const TokenLogo = ({ symbol, name }: { symbol: string; name: string }) => {
  const letter = symbol ? symbol.charAt(0).toUpperCase() : name.charAt(0).toUpperCase();
  // Use specific colors for token logos
  const bgColor = letter === 'S' ? 'bg-indigo-900' : (letter === 'A' ? 'bg-purple-700' : 'bg-blue-600');
  
  return (
    <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white font-bold text-sm`}>
      {letter}
    </div>
  );
};

const MyInvestmentsTab: React.FC = () => {
  const { address, isConnected } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [heldTokens, setHeldTokens] = useState<TokenHolding[]>([]);
  const [trades, setTrades] = useState<TradeItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && address) {
      fetchHeldScienceGents();
      fetchTradeHistory();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const fetchHeldScienceGents = async () => {
    if (!address) return;
    
    setIsLoading(true);
    
    try {
      // Use Moralis API to fetch wallet token holdings
      const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;
      
      if (!moralisApiKey) {
        console.error("Moralis API key not found");
        setHeldTokens([]);
        setIsLoading(false);
        return;
      }
      
      // First, get all ScienceGent token addresses from our database
      const { data: allScienceGents, error: scienceGentsError } = await supabase
        .from('sciencegents')
        .select('address, token_price_usd, name, symbol, created_at')
        .limit(1000);
        
      if (scienceGentsError) {
        console.error("Error fetching ScienceGent addresses:", scienceGentsError);
        setHeldTokens([]);
        setIsLoading(false);
        return;
      }
      
      // Create a map of all known ScienceGent addresses to their data
      const scienceGentMap = new Map();
      allScienceGents.forEach(token => {
        // Use lowercase for the key, but preserve the original case in the token data
        scienceGentMap.set(token.address.toLowerCase(), {
          ...token,
          originalAddress: token.address // Store original case
        });
      });
      
      console.log('ScienceGent addresses map size:', scienceGentMap.size);
      
      // Fetch tokens held by the user's wallet from Moralis
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=sepolia`,
        {
          headers: {
            'accept': 'application/json',
            'X-API-Key': moralisApiKey
          }
        }
      );
      
      const data = await response.json();
      console.log('Moralis wallet tokens response:', data);
      
      if (response.ok && data.result && Array.isArray(data.result)) {
        // Filter only for ScienceGent tokens using our map of addresses
        const scienceGentTokens = data.result.filter(token => 
          scienceGentMap.has(token.token_address.toLowerCase())
        );
        
        console.log('Filtered ScienceGent tokens:', scienceGentTokens);
        
        // If no ScienceGent tokens found, return empty array
        if (!scienceGentTokens || scienceGentTokens.length === 0) {
          console.log('No ScienceGent tokens found in wallet');
          // If no tokens found in production, use mock data
          if (import.meta.env.PROD) {
            setHeldTokens([]);
          } else {
            // Use mock data for development
            setHeldTokens(getMockTokens());
          }
          setIsLoading(false);
          return;
        }
        
        // Format the token data
        const formattedTokens = scienceGentTokens.map(token => {
          const tokenAddress = token.token_address.toLowerCase();
          const scienceGentData = scienceGentMap.get(tokenAddress);
          
          // Calculate age since creation
          const createdAt = scienceGentData?.created_at;
          const age = createdAt ? calculateAge(createdAt) : "N/A";
          
          // Format the token amount with commas
          const formattedAmount = Number(token.balance_formatted).toLocaleString();
          
          // Get token price from ScienceGent data
          const priceUsd = scienceGentData?.token_price_usd || "0";
          
          // Calculate value based on token amount and price
          const valueInUsd = Number(token.balance_formatted) * Number(priceUsd);
          const formattedValue = `$${valueInUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
          
          // Mock change values (in production would come from price history)
          const randomChange = (Math.random() * 10).toFixed(1);
          const isPositive = Math.random() > 0.3; // 70% chance of positive change
          
          return {
            name: scienceGentData?.name || token.name || "Unknown Token",
            symbol: scienceGentData?.symbol || token.symbol || "???",
            address: scienceGentData?.originalAddress || token.token_address, // Use original case
            age,
            tokenAmount: formattedAmount,
            priceUsd: Number(priceUsd).toLocaleString(undefined, { maximumFractionDigits: 9, minimumFractionDigits: 2 }),
            value: formattedValue,
            change24h: `${isPositive ? '+' : '-'}${randomChange}%`,
            isPositiveChange: isPositive
          };
        });
        
        setHeldTokens(formattedTokens);
      } else {
        // If API call fails, use mock data in development
        if (!import.meta.env.PROD) {
          setHeldTokens(getMockTokens());
        } else {
          console.error("Error fetching tokens from Moralis:", data);
          setHeldTokens([]);
        }
      }
    } catch (err) {
      console.error("Error fetching held ScienceGents:", err);
      // Use mock data in development
      if (!import.meta.env.PROD) {
        setHeldTokens(getMockTokens());
      } else {
        setHeldTokens([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTradeHistory = async () => {
    if (!address) {
      setTrades([]);
      return;
    }
    
    try {
      // Use a simpler approach with explicit typing to avoid deep type instantiation
      const result = await supabase
        .from('trades')
        .select('*')
        .eq('maker', address)
        .order('time', { ascending: false })
        .limit(50);
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      const data = result.data;
      
      if (!data || data.length === 0) {
        // In development mode, use mock data when no results
        if (!import.meta.env.PROD) {
          setTrades(getMockTrades());
        } else {
          setTrades([]);
        }
        return;
      }
      
      // First get the unique token IDs to look up token details
      const tokenIds = Array.from(new Set(data.map(trade => trade.token_id)));
      
      // Then fetch token details from sciencegents table
      const tokensQuery = await supabase
        .from('sciencegents')
        .select('address, name, symbol')
        .in('address', tokenIds);
      
      // Create a map of token addresses to their details for quick lookup
      const tokenMap: Record<string, any> = {};
      if (tokensQuery.data) {
        tokensQuery.data.forEach(token => {
          // Store the original case in the map value
          tokenMap[token.address.toLowerCase()] = {
            ...token,
            originalAddress: token.address
          };
        });
      }
      
      // Map the trade data to our UI format
      const formattedTrades = data.map(trade => {
        const tokenDetails = tokenMap[trade.token_id.toLowerCase()];
        const tradeDate = new Date(trade.time);
        const formattedDate = tradeDate.toISOString().replace('T', ' ').substring(0, 19);
        
        // Positive volume is buy, negative is sell
        const tradeType = (trade.volume > 0) ? 'buy' : 'sell';
        
        // Calculate trade value
        const tradeValue = Math.abs(trade.volume) * Number(trade.price_in_usd);
        
        return {
          name: tokenDetails?.name || "Unknown Token",
          symbol: tokenDetails?.symbol || "???",
          address: tokenDetails?.originalAddress || trade.token_id, // Use original case
          timestamp: formattedDate,
          type: tradeType as 'buy' | 'sell',
          priceUsd: Number(trade.price_in_usd).toLocaleString(undefined, { maximumFractionDigits: 9, minimumFractionDigits: 2 }),
          tokenAmount: Math.abs(trade.volume).toLocaleString(),
          value: `$${tradeValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        };
      });
      
      setTrades(formattedTrades);
      
    } catch (error) {
      console.error("Error fetching trades:", error);
      // Use mock data in development
      if (!import.meta.env.PROD) {
        setTrades(getMockTrades());
      } else {
        setTrades([]);
      }
    }
  };

  // Helper function to calculate age from created date
  const calculateAge = (createdAt: string): string => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  // Mock data for development/preview
  const getMockTokens = (): TokenHolding[] => {
    return [
      {
        name: "ScienceGents Name",
        symbol: "STICKER",
        address: "0x1C4C...F463a3",
        age: "1 day",
        tokenAmount: "6,765,343",
        priceUsd: "0.023",
        value: "$589",
        change24h: "+7.9%",
        isPositiveChange: true
      },
      {
        name: "content",
        symbol: "A",
        address: "0x1C4C...F463a3",
        age: "3 day",
        tokenAmount: "8,765,765",
        priceUsd: "0.00024",
        value: "$550",
        change24h: "+2.5%",
        isPositiveChange: true
      }
    ];
  };
  
  const getMockTrades = (): TradeItem[] => {
    return [
      {
        name: "ScienceGents Name",
        symbol: "STICKER",
        address: "0x1C4C...F463a3",
        timestamp: "2025-03-25 05:39:55",
        type: "sell",
        priceUsd: "0.023",
        tokenAmount: "6,765,343",
        value: "$589"
      },
      {
        name: "content",
        symbol: "A",
        address: "0x1C4C...F463a3",
        timestamp: "2025-03-25 05:23:58",
        type: "buy",
        priceUsd: "0.00024",
        tokenAmount: "8,765,765",
        value: "$550"
      }
    ];
  };
  
  // Handler for row click to navigate to ScienceGent details
  const handleRowClick = (tokenAddress: string) => {
    // Preserve the original case of the address when navigating
    // Get the original case of the address from our database
    const originalAddress = getOriginalCaseAddress(tokenAddress);
    navigate(`/sciencegent/${originalAddress}`);
  };

  // Function to get the original case of an address
  const getOriginalCaseAddress = (address: string): string => {
    // Check in heldTokens first
    const tokenHeld = heldTokens.find(token => 
      token.address.toLowerCase() === address.toLowerCase()
    );
    if (tokenHeld) {
      return tokenHeld.address;
    }
    
    // Then check in trades if not found in heldTokens
    const tradeWithToken = trades.find(trade => 
      trade.address.toLowerCase() === address.toLowerCase()
    );
    if (tradeWithToken) {
      return tradeWithToken.address;
    }
    
    // If not found in either, return the address as is
    return address;
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-4">Tokens I hold</h3>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  // If no investments, show empty state
  if (!heldTokens || heldTokens.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-4">Tokens I hold</h3>
          
          <div className="text-center py-12 text-muted-foreground">
            <p>You don't have any ScienceGent tokens yet.</p>
            <p className="mt-2 text-sm">Explore the marketplace and invest in AI agents.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-4">Tokens I hold</h3>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[60px]">Logo</TableHead>
                <TableHead className="w-[250px]">NAME</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Token amount</TableHead>
                <TableHead>Price in usd</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>24h change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heldTokens.map((token, index) => (
                <TableRow 
                  key={`token-${index}`}
                  className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => handleRowClick(token.address)}
                >
                  <TableCell className="py-2">
                    <TokenLogo symbol={token.symbol} name={token.name} />
                  </TableCell>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {token.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">{token.symbol}</span>
                        <span onClick={(e) => e.stopPropagation()}>
                          <AddressWithCopy address={token.address} />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">{token.age}</TableCell>
                  <TableCell className="py-2">{token.tokenAmount}</TableCell>
                  <TableCell className="py-2">{token.priceUsd}</TableCell>
                  <TableCell className="py-2">{token.value}</TableCell>
                  <TableCell className={`py-2 ${token.isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
                    {token.change24h}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <h3 className="text-xl font-bold my-6">Trades</h3>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[60px]">Logo</TableHead>
                <TableHead className="w-[250px]">NAME</TableHead>
                <TableHead>timestamp UTC</TableHead>
                <TableHead>type</TableHead>
                <TableHead>Price in usd</TableHead>
                <TableHead>Token amount</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade, index) => (
                <TableRow 
                  key={`trade-${index}`}
                  className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => handleRowClick(trade.address)}
                >
                  <TableCell className="py-2">
                    <TokenLogo symbol={trade.symbol} name={trade.name} />
                  </TableCell>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium">{trade.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">{trade.symbol}</span>
                        <span onClick={(e) => e.stopPropagation()}>
                          <AddressWithCopy address={trade.address} />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">{trade.timestamp}</TableCell>
                  <TableCell className={`py-2 ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.type}
                  </TableCell>
                  <TableCell className="py-2">{trade.priceUsd}</TableCell>
                  <TableCell className="py-2">{trade.tokenAmount}</TableCell>
                  <TableCell className="py-2">{trade.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyInvestmentsTab;
