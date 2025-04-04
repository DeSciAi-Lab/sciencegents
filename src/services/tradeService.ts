import { supabase } from '@/integrations/supabase/client';
import { Time } from 'lightweight-charts';

export interface Trade {
    id?: string;
    token_id: string;
    price_in_usd: number;
    volume: number;
    time?: string | number | Date; // Allow different input types
}

// Define the expected return type for our RPC function
interface TokenStats {
    volume_24h: number;
    price_change_percentage_24h: number;
    high_24h: number;
    low_24h: number;
}

/**
 * Logs a trade to the Supabase database.
 */
export const logTrade = async (tradeData: Trade): Promise<{ data: any; error: any }> => {
    try {
        // Ensure time is an ISO string before inserting
        let isoTime: string;
        if (tradeData.time instanceof Date) {
            isoTime = tradeData.time.toISOString();
        } else if (typeof tradeData.time === 'number') {
            isoTime = new Date(tradeData.time).toISOString();
        } else if (typeof tradeData.time === 'string') {
            // Assume it might already be an ISO string, or attempt conversion
            try {
                isoTime = new Date(tradeData.time).toISOString();
            } catch {
                // Fallback or throw error if string is not a valid date format
                console.error('Invalid date string format for trade time:', tradeData.time);
                isoTime = new Date().toISOString(); // Use current time as fallback
            }
        } else {
            // Default to current time if time is not provided or invalid type
            isoTime = new Date().toISOString();
        }

        const preparedTradeData = {
            ...tradeData,
            time: isoTime, // Use the formatted ISO string
        };

        const { data, error } = await supabase
            .from('trades')
            .insert(preparedTradeData)
            .select(); // Optionally select the inserted data
        
        if (error) {
            console.error('Error logging trade:', error);
            throw error;
        }
        return { data, error: null };
    } catch (error) {
        console.error('Exception in logTrade:', error);
        return { data: null, error };
    }
};

/**
 * Fetches historical trade data for a specific token within a given time range.
 */
export const fetchHistoricalTrades = async (
    tokenId: string,
    startTime: Date,
    endTime: Date = new Date()
): Promise<Trade[]> => {
    try {
        const { data, error } = await supabase
            .from('trades')
            .select('*')
            .eq('token_id', tokenId)
            .gte('time', startTime.toISOString())
            .lte('time', endTime.toISOString())
            .order('time', { ascending: true });

        if (error) {
            console.error('Error fetching historical trades:', error);
            throw error;
        }
        // Cast the result to Trade[] if necessary, assuming structure matches
        return (data as Trade[] | null) || []; 
    } catch (error) {
        console.error('Exception fetching historical trades:', error);
        return [];
    }
};

/**
 * Fetches 24-hour volume, price change percentage, high, and low for a token using RPC.
 */
export const fetchTokenStats24h = async (tokenId: string): Promise<TokenStats | null> => {
    try {
        // Call RPC using type assertion for the function name
        const { data, error } = await supabase.rpc(
            'get_token_stats_24h' as any, // Bypass built-in function name check
            {
                p_token_id: tokenId,
            }
        );

        if (error) {
            console.error('Error fetching token 24h stats via RPC:', error);
            throw error;
        }

        // Ensure data exists before checking if it's an array
        // The actual return type might be T or T[], handle appropriately
        const statsResult = data && Array.isArray(data) ? data[0] : data;

        if (statsResult) {
            // Cast to TokenStats here for easier handling, assuming structure matches
            const resultTyped = statsResult as TokenStats;
            const stats: TokenStats = {
                volume_24h: Number(resultTyped.volume_24h ?? 0),
                price_change_percentage_24h: Number(resultTyped.price_change_percentage_24h ?? 0),
                high_24h: Number(resultTyped.high_24h ?? 0),
                low_24h: Number(resultTyped.low_24h ?? 0),
            };
            return stats;
        } else {
            console.warn('No data returned from get_token_stats_24h RPC for token:', tokenId);
            return { volume_24h: 0, price_change_percentage_24h: 0, high_24h: 0, low_24h: 0 };
        }
    } catch (error) {
        console.error('Exception fetching token 24h stats:', error);
        return null;
    }
};

export const tradeService = {
    // Get trades for a token within a time range
    async getTokenTrades(
        tokenId: string,
        startTime: Date = new Date(Date.now() - 24 * 60 * 60 * 1000), // Default to last 24 hours
        endTime: Date = new Date()
    ) {
        const { data, error } = await supabase
            .from('trades')
            .select('*')
            .eq('token_id', tokenId)
            .gte('time', startTime.toISOString())
            .lte('time', endTime.toISOString())
            .order('time', { ascending: true });

        if (error) {
            console.error('Error fetching trades:', error);
            throw error;
        }

        return data as Trade[];
    },

    // Calculate price in USD for a trade
    calculateTradePrice(tokenAmount: number, ethAmount: number, ethPriceUSD: number): number {
        return tokenAmount / (ethAmount * ethPriceUSD);
    },

    // Subscribe to new trades for a token
    subscribeToTrades(tokenId: string, callback: (trade: Trade) => void) {
        return supabase
            .channel('trades_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'trades',
                    filter: `token_id=eq.${tokenId}`
                },
                (payload) => {
                    callback(payload.new as Trade);
                }
            )
            .subscribe();
    }
}; 