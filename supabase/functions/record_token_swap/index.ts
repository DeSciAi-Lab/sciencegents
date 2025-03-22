
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { ethers } from 'https://esm.sh/ethers@5.7.2'

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Parse request body
    const { tokenAddress, provider, events } = await req.json()
    
    if (!tokenAddress) {
      return new Response(
        JSON.stringify({ error: 'Token address is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // If events were provided directly, process them
    if (events && Array.isArray(events)) {
      console.log(`Processing ${events.length} provided events for ${tokenAddress}`)
      
      for (const event of events) {
        await recordTradeFromEvent(event, tokenAddress, supabase)
      }
      
      return new Response(
        JSON.stringify({ success: true, message: `Processed ${events.length} events` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Otherwise, fetch events from blockchain if provider info is available
    if (provider) {
      console.log(`Fetching events from blockchain for ${tokenAddress}`)
      // This would require a full implementation of fetching events from the blockchain
      // which is not feasible within edge function due to complexity and time constraints
      
      return new Response(
        JSON.stringify({ error: 'Direct blockchain querying not implemented in edge function' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    return new Response(
      JSON.stringify({ error: 'Either events or provider information is required' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Process and record trade data from a swap event
async function recordTradeFromEvent(event: any, tokenAddress: string, supabase: any): Promise<void> {
  try {
    // Extract data from the event
    const { 
      timestamp = Math.floor(Date.now() / 1000),
      isBuy, 
      tokenAmount, 
      ethAmount,
      transactionHash
    } = event
    
    // Safely handle token and ETH amounts
    let safeTokenAmount, safeEthAmount;
    
    try {
      // Safe conversion for token amount
      if (typeof tokenAmount === 'string') {
        if (tokenAmount.length > 15) {
          // For very large numbers, try to get a reasonable representation
          if (tokenAmount.includes('.')) {
            // If it has decimals, use scientific notation
            safeTokenAmount = parseFloat(Number(tokenAmount).toExponential(6));
          } else {
            // For integers, trim to the most significant digits
            const numVal = Number(tokenAmount);
            if (!isNaN(numVal)) {
              safeTokenAmount = numVal;
            } else {
              // If conversion to Number fails, use a string representation
              const firstDigits = tokenAmount.substring(0, 15);
              safeTokenAmount = parseFloat(firstDigits);
            }
          }
        } else {
          safeTokenAmount = parseFloat(tokenAmount);
        }
      } else if (typeof tokenAmount === 'number') {
        safeTokenAmount = tokenAmount;
      } else {
        safeTokenAmount = 0;
      }
      
      // Simple conversion for ETH amount (usually smaller)
      safeEthAmount = parseFloat(ethAmount);
      
      // Validate that we have valid numbers
      if (isNaN(safeTokenAmount) || isNaN(safeEthAmount)) {
        throw new Error('Invalid number conversion');
      }
    } catch (parseError) {
      console.error('Error parsing amounts:', parseError);
      // Fallback to safe defaults
      safeTokenAmount = 0;
      safeEthAmount = 0;
    }
    
    // Calculate price in ETH per token (safely)
    let price = 0;
    if (safeTokenAmount > 0) {
      price = safeEthAmount / safeTokenAmount;
      
      // Handle potential floating point issues for very small numbers
      if (price < 1e-18) {
        price = 1e-18; // Set a minimum price to avoid DB issues
      }
      
      // Handle potential issues with very large token amounts resulting in extremely small prices
      if (safeTokenAmount > 1e15 && price < 1e-15) {
        // If token amount is extremely large and price very small, 
        // use a more reasonable representation to avoid precision issues
        console.log(`Very small price detected: ${price}. Using minimum value.`);
        price = 1e-15;
      }
    }
    
    // Call the record_trade function in Supabase
    const { data, error } = await supabase.rpc('record_trade', {
      token_address: tokenAddress,
      price: price,
      volume: safeEthAmount,
      record_timestamp: new Date(timestamp * 1000).toISOString()
    })
    
    if (error) {
      console.error('Error recording trade:', error)
      throw error
    }
    
    console.log(`Successfully recorded trade for ${tokenAddress}: ${safeEthAmount} ETH at price ${price}`)
    
    // Also record the transaction in user_interactions for additional tracking
    if (transactionHash && event.user) {
      await supabase.from('user_interactions').insert({
        sciencegent_address: tokenAddress,
        user_address: event.user,
        interaction_type: isBuy ? 'BUY' : 'SELL',
        interaction_data: {
          tx_hash: transactionHash,
          token_amount: safeTokenAmount.toString(),
          eth_amount: safeEthAmount.toString(),
          price: price.toString(),
          timestamp: timestamp
        }
      })
    }
  } catch (error) {
    console.error(`Failed to record trade for ${tokenAddress}:`, error)
    throw error
  }
}
