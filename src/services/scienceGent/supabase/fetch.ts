
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetches a ScienceGent from Supabase by address
 * @param address The token address
 * @returns The ScienceGent data or null if not found
 */
export const fetchScienceGentFromSupabase = async (address: string) => {
  try {
    console.log("Fetching ScienceGent from Supabase:", address);
    
    // Get the ScienceGent data
    const { data, error } = await supabase
      .from('sciencegents')
      .select(`
        *,
        capabilities:sciencegent_capabilities(
          id,
          capability_id
        )
      `)
      .eq('address', address)
      .single();
    
    if (error) {
      console.error("Supabase error:", error);
      return null;
    }
    
    if (!data) return null;
    
    // Fetch associated stats
    const { data: statsData } = await supabase
      .from('sciencegent_stats')
      .select('*')
      .eq('sciencegent_address', address)
      .single();
    
    // Format the data for frontend use (add calculated fields)
    const formattedData = {
      ...data,
      // Convert prices to numbers for easier handling
      token_price: data.token_price ? parseFloat(String(data.token_price)) : 0,
      // Add maturity progress calculation if not available
      maturity_progress: data.maturity_progress || 0,
      // Add any other derived fields from TokenStats
      tokenAge: data.created_on_chain_at 
        ? Math.floor(Date.now() / 1000) - new Date(data.created_on_chain_at).getTime() / 1000
        : 0,
      // Use a default value of 0 if maturity_deadline is missing
      remainingMaturityTime: 0,
      // Include stats data or provide defaults
      stats: statsData || {
        transactions: 0,
        volume_24h: 0,
        holders: 0
      }
    };
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return null;
  }
};
