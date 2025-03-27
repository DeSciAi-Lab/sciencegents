import { supabase } from '@/integrations/supabase/client';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { toast } from '@/components/ui/use-toast';

// Interface for trade event data
export interface TradeEvent {
  timestamp: number;
  isBuy: boolean;
  tokenAmount: string;
  ethAmount: string;
  transactionHash?: string;
  user?: string;
}

/**
 * Fetches price history for a ScienceGent token
 * @param tokenAddress Token address to fetch history for
 * @returns Array of price points or null if error
 */
export const fetchPriceHistory = async (tokenAddress: string) => {
  try {
    const { data, error } = await supabase
      .from('sciencegent_stats')
      .select('price_history')
      .eq('sciencegent_address', tokenAddress)
      .single();
    
    if (error) {
      console.error('Error fetching price history:', error);
      return null;
    }
    
    return data?.price_history || [];
  } catch (error) {
    console.error('Error in fetchPriceHistory:', error);
    return null;
  }
};

/**
 * Records a trade event to the price history
 * @param tokenAddress Token address
 * @param event Trade event details
 */
export const recordTradeEvent = async (tokenAddress: string, event: TradeEvent): Promise<boolean> => {
  try {
    // Call our edge function to record the trade
    const response = await supabase.functions.invoke('record_token_swap', {
      body: {
        tokenAddress,
        events: [event]
      }
    });
    
    if (response.error) {
      console.error('Error recording trade event:', response.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in recordTradeEvent:', error);
    return false;
  }
};

/**
 * Fetch and process swap events from the blockchain
 * This is a more comprehensive approach that would be used in a production environment
 * to initially populate price history from blockchain events
 */
export const syncTradeEventsFromBlockchain = async (tokenAddress: string): Promise<boolean> => {
  try {
    // Check if provider is available
    if (!window.ethereum) {
      toast({
        title: "No Ethereum Provider",
        description: "Please install MetaMask or another web3 provider.",
        variant: "destructive"
      });
      return false;
    }
    
    // Create provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Define ABI for swap events
    const swapABI = [
      "event TokenSwap(address indexed token, bool indexed isBuy, uint256 tokenAmount, uint256 ethAmount)"
    ];
    
    // Create contract instance
    const swapContract = new ethers.Contract(
      contractConfig.addresses.ScienceGentsSwap,
      swapABI,
      provider
    );
    
    // Toast for user feedback
    toast({
      title: "Syncing Trade Data",
      description: "Fetching historical trades from the blockchain...",
    });
    
    // Get token creation block (approximate by getting block timestamp close to token creation)
    const { data: tokenData } = await supabase
      .from('sciencegents')
      .select('created_at')
      .eq('address', tokenAddress)
      .single();
      
    let fromBlock = 0;
    
    if (tokenData?.created_at) {
      // Use created_at instead of created_on_chain_at
      const creationDate = new Date(tokenData.created_at);
      const currentBlock = await provider.getBlockNumber();
      const currentBlockData = await provider.getBlock(currentBlock);
      
      // Calculate blocks per day based on average block time
      const avgBlockTime = 12; // seconds, for Ethereum
      const blocksPerDay = Math.floor(86400 / avgBlockTime);
      
      // Calculate days between now and creation
      const daysDiff = Math.floor((Date.now() - creationDate.getTime()) / (1000 * 86400));
      
      // Approximate starting block
      fromBlock = Math.max(0, currentBlock - (daysDiff * blocksPerDay));
    }
    
    // Filter for swap events involving this token
    const filter = swapContract.filters.TokenSwap(tokenAddress);
    
    // Get events from blockchain (limit range to avoid timeouts)
    const events = await swapContract.queryFilter(
      filter, 
      fromBlock, 
      'latest'
    );
    
    // Process events
    const tradeEvents: TradeEvent[] = events.map(event => {
      const args = event.args;
      const block = event.blockNumber;
      
      return {
        timestamp: block, // Will be replaced with actual timestamp when processing
        isBuy: args?.isBuy || false,
        tokenAmount: args?.tokenAmount?.toString() || '0',
        ethAmount: args?.ethAmount?.toString() || '0',
        transactionHash: event.transactionHash
      };
    });
    
    // If we have events, record them
    if (tradeEvents.length > 0) {
      // We'll process them in batches to avoid timeout
      const batchSize = 50;
      for (let i = 0; i < tradeEvents.length; i += batchSize) {
        const batch = tradeEvents.slice(i, i + batchSize);
        
        // Call our edge function to record trades
        await supabase.functions.invoke('record_token_swap', {
          body: {
            tokenAddress,
            events: batch
          }
        });
      }
      
      toast({
        title: "Sync Complete",
        description: `Successfully processed ${tradeEvents.length} historical trades.`,
      });
      
      return true;
    } else {
      toast({
        title: "No Trade Events Found",
        description: "No historical trades were found for this token.",
      });
      
      return false;
    }
  } catch (error) {
    console.error('Error syncing trade events:', error);
    
    toast({
      title: "Sync Failed",
      description: "Failed to sync historical trade data.",
      variant: "destructive"
    });
    
    return false;
  }
};

/**
 * Adds a manual price point for testing
 * @param tokenAddress Token address
 * @param price Price in ETH
 */
export const addTestPricePoint = async (tokenAddress: string, price: number): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('add_price_point', {
      token_address: tokenAddress,
      price: price,
      record_timestamp: new Date().toISOString()
    });
    
    if (error) {
      console.error('Error adding test price point:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in addTestPricePoint:', error);
    return false;
  }
};

// Export function to record trades when they happen through the swap interface
export const recordTokenSwap = async (
  tokenAddress: string, 
  isBuy: boolean, 
  tokenAmount: string, 
  ethAmount: string,
  txHash: string,
  userAddress: string
): Promise<void> => {
  try {
    // Create trade event
    const event: TradeEvent = {
      timestamp: Math.floor(Date.now() / 1000),
      isBuy,
      tokenAmount,
      ethAmount,
      transactionHash: txHash,
      user: userAddress
    };
    
    // Record the event
    await recordTradeEvent(tokenAddress, event);
  } catch (error) {
    console.error('Error recording token swap:', error);
    // Don't throw here as this is non-critical functionality
  }
};
