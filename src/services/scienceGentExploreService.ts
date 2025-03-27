
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';

export interface ScienceGentListItem {
  id: string;
  address: string;
  name: string;
  symbol: string;
  profilePic?: string;
  description?: string;
  tokenPrice: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  age: string;
  revenue: number;
  rating: number;
  domain: string;
  isCurated: boolean;
  maturityProgress: number;
}

interface ScienceGentFilter {
  domain?: string[];
  maturityStatus?: ('Immature' | 'Near Maturity' | 'Ready for Migration' | 'Migrated')[];
  isCurated?: boolean;
  searchTerm?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export async function getScienceGentsList(
  sort: keyof ScienceGentListItem = 'marketCap',
  order: 'asc' | 'desc' = 'desc',
  page: number = 1,
  pageSize: number = 10,
  filters: ScienceGentFilter = {}
): Promise<{ data: ScienceGentListItem[], totalCount: number }> {
  try {
    console.info('Fetching ScienceGents from Supabase');
    
    // Start building the query
    let query = supabase
      .from('sciencegents')
      .select(`
        *,
        sciencegent_stats (
          volume_24h,
          holders,
          transactions
        )
      `, { count: 'exact' });
    
    // Apply filters
    if (filters.domain && filters.domain.length > 0) {
      query = query.in('domain', filters.domain);
    }
    
    if (filters.isCurated !== undefined) {
      query = query.eq('is_curated', filters.isCurated);
    }
    
    if (filters.searchTerm) {
      query = query.or(`name.ilike.%${filters.searchTerm}%,symbol.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,address.ilike.%${filters.searchTerm}%`);
    }
    
    // Apply sorting
    let sortField = sort;
    
    // Map frontend sort fields to database fields if needed
    const sortMapping: Record<string, string> = {
      'marketCap': 'market_cap',
      'tokenPrice': 'token_price',
      'age': 'created_at',
      'name': 'name',
      'priceChange24h': 'price_change_24h'
      // Add more mappings as needed
    };
    
    const dbSortField = sortMapping[sortField as string] || sortField;
    
    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Execute query
    const { data: scienceGents, count, error } = await query
      .order(dbSortField as string, { ascending: order === 'asc' })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching ScienceGents:', error);
      throw error;
    }
    
    console.info('Found', scienceGents?.length, 'ScienceGents');
    
    // Fetch ETH price using getTokenStats for more accurate price and market cap
    const provider = new ethers.providers.JsonRpcProvider(contractConfig.rpcUrl);
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      [
        'function getTokenStats(address) view returns (uint256,uint256,uint256,uint256,bool,address,uint256,uint256,bool,uint256,uint256,uint256,bool)'
      ],
      provider
    );
    
    // Transform data and calculate additional metrics
    const transformedData: ScienceGentListItem[] = [];
    
    if (scienceGents) {
      for (const sg of scienceGents) {
        try {
          // Fetch token stats from blockchain for current price
          const stats = await swapContract.getTokenStats(sg.address);
          const currentPrice = stats[11] ? parseFloat(ethers.utils.formatEther(stats[11])) : 0;
          
          // Calculate market cap based on token price and total supply
          const totalSupply = sg.total_supply ? parseFloat(ethers.utils.formatUnits(sg.total_supply, 18)) : 0;
          const marketCap = currentPrice * totalSupply;
          
          transformedData.push({
            id: sg.id,
            address: sg.address,
            name: sg.name,
            symbol: sg.symbol,
            profilePic: sg.profile_pic,
            description: sg.description,
            tokenPrice: currentPrice,
            priceChange24h: sg.price_change_24h || 0,
            marketCap: marketCap || 0,
            volume24h: sg.sciencegent_stats?.[0]?.volume_24h || 0,
            age: sg.created_at ? formatDistanceToNow(new Date(sg.created_at), { addSuffix: false }) : 'Unknown',
            revenue: Math.floor(Math.random() * 10000), // Placeholder
            rating: Math.floor(Math.random() * 5) + 1, // Placeholder
            domain: sg.domain || 'General',
            isCurated: false, // Placeholder
            maturityProgress: sg.maturity_progress || 0
          });
        } catch (err) {
          console.error(`Error processing ScienceGent ${sg.address}:`, err);
          
          // Still add the token with default values if token stats fetching fails
          transformedData.push({
            id: sg.id,
            address: sg.address,
            name: sg.name,
            symbol: sg.symbol,
            profilePic: sg.profile_pic,
            description: sg.description,
            tokenPrice: sg.token_price || 0,
            priceChange24h: sg.price_change_24h || 0,
            marketCap: sg.market_cap || 0,
            volume24h: sg.sciencegent_stats?.[0]?.volume_24h || 0,
            age: sg.created_at ? formatDistanceToNow(new Date(sg.created_at), { addSuffix: false }) : 'Unknown',
            revenue: Math.floor(Math.random() * 10000), // Placeholder
            rating: Math.floor(Math.random() * 5) + 1, // Placeholder
            domain: sg.domain || 'General',
            isCurated: false, // Placeholder
            maturityProgress: sg.maturity_progress || 0
          });
        }
      }
    }
    
    return { 
      data: transformedData,
      totalCount: count || 0
    };
  } catch (error) {
    console.error('Error in getScienceGentsList:', error);
    throw error;
  }
}

export async function getDomainOptions(): Promise<FilterOption[]> {
  try {
    const { data, error } = await supabase
      .from('sciencegents')
      .select('domain, count(*)')
      .not('domain', 'is', null)
      .group('domain');
    
    if (error) {
      console.error('Error fetching domain options:', error);
      throw error;
    }
    
    return data.map(item => ({
      label: item.domain,
      value: item.domain,
      count: item.count
    }));
  } catch (error) {
    console.error('Error in getDomainOptions:', error);
    return [];
  }
}
