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
    
    // Calculate price in ETH per token
    let price
    if (parseFloat(tokenAmount) > 0) {
      price = parseFloat(ethAmount) / parseFloat(tokenAmount)
    } else {
      return // Skip if we can't calculate a valid price
    }
    
    // Call the record_trade function in Supabase
    const { data, error } = await supabase.rpc('record_trade', {
      token_address: tokenAddress,
      price: price,
      volume: parseFloat(ethAmount),
      record_timestamp: new Date(timestamp * 1000).toISOString()
    })
    
    if (error) {
      console.error('Error recording trade:', error)
      throw error
    }
    
    console.log(`Successfully recorded trade for ${tokenAddress}: ${ethAmount} ETH at price ${price}`)
    
    // Also record the transaction in user_interactions for additional tracking
    if (transactionHash && event.user) {
      await supabase.from('user_interactions').insert({
        sciencegent_address: tokenAddress,
        user_address: event.user,
        interaction_type: isBuy ? 'BUY' : 'SELL',
        interaction_data: {
          tx_hash: transactionHash,
          token_amount: tokenAmount,
          eth_amount: ethAmount,
          price: price,
          timestamp: timestamp
        }
      })
    }
  } catch (error) {
    console.error(`Failed to record trade for ${tokenAddress}:`, error)
    throw error
  }
}
