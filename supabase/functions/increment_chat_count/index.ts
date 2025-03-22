
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse the request body
    const { sciencegent_address } = await req.json();
    
    if (!sciencegent_address) {
      return new Response(
        JSON.stringify({ error: "Missing ScienceGent address" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log(`Incrementing chat count for ScienceGent: ${sciencegent_address}`);
    
    // First check if a record exists
    const { data: existingRecord, error: checkError } = await supabase
      .from('sciencegent_stats')
      .select('id')
      .eq('sciencegent_address', sciencegent_address)
      .maybeSingle();
    
    let result;
    
    if (checkError) {
      console.error("Error checking for existing record:", checkError);
      throw new Error(checkError.message);
    }
    
    if (existingRecord) {
      // Update existing record
      const { error } = await supabase
        .from('sciencegent_stats')
        .update({ chat_count: supabase.rpc('increment', { amount: 1, column: 'chat_count' }) })
        .eq('sciencegent_address', sciencegent_address);
      
      if (error) throw new Error(error.message);
      result = { updated: true };
    } else {
      // Insert new record
      const { error } = await supabase
        .from('sciencegent_stats')
        .insert({
          sciencegent_address,
          chat_count: 1
        });
      
      if (error) throw new Error(error.message);
      result = { inserted: true };
    }
    
    return new Response(
      JSON.stringify({ success: true, result }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
