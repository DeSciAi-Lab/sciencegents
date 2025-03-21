
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.2";
import OpenAI from "https://esm.sh/openai@4.0.0";

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
    // Create Supabase and OpenAI clients
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const openai = new OpenAI({ apiKey: openaiApiKey });
    
    // Parse the request body
    const requestData = await req.json();
    const { 
      messages, 
      scienceGentName, 
      persona, 
      capabilities, 
      scienceGentAddress,
      assistantId
    } = requestData;
    
    // Validate essential inputs
    if (!messages || !scienceGentAddress) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log(`Processing request for ScienceGent: ${scienceGentName} (${scienceGentAddress})`);
    
    // Try to get existing assistant from the database if not provided in request
    let finalAssistantId = assistantId;
    if (!finalAssistantId) {
      const { data: existingAssistant } = await supabase
        .from('sciencegent_assistants')
        .select('assistant_id')
        .eq('sciencegent_address', scienceGentAddress)
        .maybeSingle();
      
      if (existingAssistant) {
        finalAssistantId = existingAssistant.assistant_id;
        console.log(`Using existing assistant ID: ${finalAssistantId}`);
      }
    }
    
    // If no assistant exists, create a new one
    if (!finalAssistantId) {
      console.log("Creating new assistant for ScienceGent...");
      const assistantName = scienceGentName || "ScienceGent Assistant";
      
      // Prepare the system instructions, combining persona and capabilities
      let instructions = `You are ${assistantName}, a specialized AI agent designed to help with scientific tasks.`;
      
      if (persona) {
        instructions += `\n\n${persona}`;
      }
      
      if (capabilities) {
        instructions += `\n\nYou have the following capabilities:\n${capabilities}`;
      }
      
      instructions += `\n\nYour responses should be helpful, accurate, and scientifically sound.`;
      
      // Create the assistant
      const assistant = await openai.beta.assistants.create({
        name: assistantName,
        instructions: instructions,
        model: "gpt-4-turbo-preview",
      });
      
      finalAssistantId = assistant.id;
      console.log(`New assistant created with ID: ${finalAssistantId}`);
      
      // Store the assistant ID in the database
      const { error: dbError } = await supabase
        .from('sciencegent_assistants')
        .insert({
          sciencegent_address: scienceGentAddress,
          assistant_id: finalAssistantId
        });
      
      if (dbError) {
        console.error("Error storing assistant ID:", dbError);
      }
    }
    
    // Create a thread if needed
    const thread = await openai.beta.threads.create();
    console.log(`Created thread: ${thread.id}`);
    
    // Add the user messages to the thread
    for (const message of messages) {
      if (message.role === 'user') {
        await openai.beta.threads.messages.create(thread.id, {
          role: "user",
          content: message.content
        });
      }
    }
    
    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: finalAssistantId,
    });
    
    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Wait for the run to complete (with timeout)
    const startTime = Date.now();
    const timeout = 60000; // 60 seconds
    
    while (runStatus.status !== "completed" && runStatus.status !== "failed") {
      // Check for timeout
      if (Date.now() - startTime > timeout) {
        throw new Error("Request timed out");
      }
      
      // Wait a bit before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    
    if (runStatus.status === "failed") {
      throw new Error(`Run failed: ${runStatus.last_error?.message || "Unknown error"}`);
    }
    
    // Get the latest message from the thread
    const responseMessages = await openai.beta.threads.messages.list(thread.id);
    const latestMessage = responseMessages.data
      .filter(m => m.role === "assistant")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    
    if (!latestMessage) {
      throw new Error("No assistant response found");
    }
    
    // Extract the text content
    let responseText = "";
    if (latestMessage.content[0].type === "text") {
      responseText = latestMessage.content[0].text.value;
    }
    
    // Update last_used_at in the database
    await supabase
      .from('sciencegent_assistants')
      .update({ last_used_at: new Date().toISOString() })
      .eq('assistant_id', finalAssistantId);
    
    // Send the response
    return new Response(
      JSON.stringify({ 
        message: responseText,
        assistantId: finalAssistantId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error generating response:", error);
    
    return new Response(
      JSON.stringify({ error: `Error generating response: ${error.message}` }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
