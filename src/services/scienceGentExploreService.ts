
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

// Interface for ScienceGent data structure
export interface ScienceGentListItem {
  id: string;
  name: string;
  address: string;
  profilePic?: string;
  marketCap: number;
  tokenPrice: number;
  age: string;
  roi: number;
  domain: string;
  featured?: boolean;
}

/**
 * Fetches ScienceGent data from Supabase for the explore page
 */
export const fetchScienceGents = async (): Promise<ScienceGentListItem[]> => {
  try {
    console.log("Fetching ScienceGents from Supabase");

    // Get ScienceGents with their stats
    const { data, error } = await supabase
      .from('sciencegents')
      .select(`
        id, 
        name, 
        address, 
        profile_pic, 
        market_cap, 
        token_price, 
        created_on_chain_at, 
        domain, 
        virtual_eth,
        stats:sciencegent_stats(volume_24h, transactions, holders)
      `)
      .order('market_cap', { ascending: false });

    if (error) {
      console.error("Error fetching ScienceGents:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("No ScienceGents found");
      return [];
    }

    console.log(`Found ${data.length} ScienceGents`);

    // Format the data for the UI
    return data.map(item => {
      // Calculate ROI (simplified calculation for now)
      // In a real app, this would be based on actual trading data
      const virtualEth = item.virtual_eth || 0;
      const volume = item.stats?.[0]?.volume_24h || 0;
      const transactions = item.stats?.[0]?.transactions || 0;
      
      // Simple ROI formula: (volume / virtual_eth * 10) limited to reasonable range
      // This is just a placeholder - real calculation would be more complex
      const roi = virtualEth > 0 
        ? Math.min(Math.max((volume / virtualEth * 10) - 5, -50), 100) 
        : 0;
      
      // Calculate age from created_on_chain_at
      const age = item.created_on_chain_at 
        ? formatDistanceToNow(new Date(item.created_on_chain_at), { addSuffix: false })
        : "unknown";

      // Featured status based on market cap or other criteria
      const featured = item.market_cap > 500000;

      return {
        id: item.id,
        name: item.name,
        address: item.address,
        profilePic: item.profile_pic,
        marketCap: item.market_cap || 0,
        tokenPrice: item.token_price || 0,
        age,
        roi,
        domain: item.domain || "General",
        featured
      };
    });
  } catch (error) {
    console.error("Error in fetchScienceGents:", error);
    return [];
  }
};

/**
 * Filters ScienceGents based on search query and domain
 */
export const filterScienceGents = (
  scienceGents: ScienceGentListItem[],
  searchQuery: string,
  activeFilter: string
): ScienceGentListItem[] => {
  let result = [...scienceGents];
  
  // Apply domain filter
  if (activeFilter !== 'all') {
    result = result.filter(gent => 
      gent.domain.toLowerCase() === activeFilter.toLowerCase()
    );
  }
  
  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(gent => 
      gent.name.toLowerCase().includes(query) || 
      gent.address.toLowerCase().includes(query)
    );
  }
  
  return result;
};

/**
 * Sorts ScienceGents based on sort criteria
 */
export const sortScienceGents = (
  scienceGents: ScienceGentListItem[],
  sortBy: keyof ScienceGentListItem,
  sortOrder: 'asc' | 'desc'
): ScienceGentListItem[] => {
  return [...scienceGents].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};
