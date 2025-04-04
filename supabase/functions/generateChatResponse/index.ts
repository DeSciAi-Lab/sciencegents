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
    
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    
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
    
    // Log incoming data for debugging
    console.log(`Processing request for ScienceGent: ${scienceGentName} (${scienceGentAddress})`);
    console.log(`Persona data received:`, persona ? `${persona.substring(0, 50)}...` : 'No persona data');
    console.log(`Capabilities data received:`, capabilities ? 'Has capabilities' : 'No capabilities');
    
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
    
    // Try to get existing assistant from the database if not provided in request
    let finalAssistantId = assistantId;
    if (!finalAssistantId) {
      const { data: existingAssistant, error: assistantError } = await supabase
        .from('sciencegent_assistants')
        .select('assistant_id')
        .eq('sciencegent_address', scienceGentAddress)
        .maybeSingle();
      
      if (existingAssistant) {
        finalAssistantId = existingAssistant.assistant_id;
        console.log(`Using existing assistant ID: ${finalAssistantId}`);
      } else if (assistantError) {
        console.log("Error checking for assistant:", assistantError.message);
        console.log("No existing assistant found, will create a new one");
      } else {
        console.log("No existing assistant found, will create a new one");
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
      
      if (capabilities && capabilities.trim()) {
        instructions += `\n\nYou have the following capabilities:\n${capabilities}`;
      }
      
      instructions += `\n\nYour responses should be helpful, accurate, and scientifically sound.`;
      
      console.log("Creating assistant with instructions:", instructions.substring(0, 100) + "...");
      
      try {
        // Create the assistant
        const assistant = await openai.beta.assistants.create({
          name: assistantName,
          instructions: instructions,
          model: "gpt-4o-mini", // Using the latest model
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
      } catch (error) {
        console.error("Error creating OpenAI assistant:", error);
        throw new Error(`Failed to create assistant: ${error.message}`);
      }
    }
    
    // Verify that we have an assistant ID
    if (!finalAssistantId) {
      throw new Error("Failed to get or create an assistant");
    }
    
    // Create a thread if needed
    let thread;
    try {
      thread = await openai.beta.threads.create();
      console.log(`Created thread: ${thread.id}`);
    } catch (error) {
      console.error("Error creating thread:", error);
      throw new Error(`Failed to create thread: ${error.message}`);
    }
    
    // Add the user messages to the thread
    try {
      for (const message of messages) {
        if (message.role === 'user') {
          await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: message.content
          });
        }
      }
    } catch (error) {
      console.error("Error adding messages to thread:", error);
      throw new Error(`Failed to add messages to thread: ${error.message}`);
    }
    
    // Run the assistant
    let run;
    try {
      run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: finalAssistantId,
      });
    } catch (error) {
      console.error("Error creating run:", error);
      throw new Error(`Failed to create run: ${error.message}`);
    }
    
    // Poll for the run to complete
    let runStatus;
    try {
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    } catch (error) {
      console.error("Error retrieving run:", error);
      throw new Error(`Failed to retrieve run: ${error.message}`);
    }
    
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
      
      try {
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      } catch (error) {
        console.error("Error retrieving run status:", error);
        throw new Error(`Failed to retrieve run status: ${error.message}`);
      }
    }
    
    if (runStatus.status === "failed") {
      throw new Error(`Run failed: ${runStatus.last_error?.message || "Unknown error"}`);
    }
    
    // Get the latest message from the thread
    let responseMessages;
    try {
      responseMessages = await openai.beta.threads.messages.list(thread.id);
    } catch (error) {
      console.error("Error retrieving messages:", error);
      throw new Error(`Failed to retrieve messages: ${error.message}`);
    }
    
    const latestMessage = responseMessages.data
      .filter(m => m.role === "assistant")
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    
    if (!latestMessage) {
      throw new Error("No assistant response found");
    }
    
    // Extract the text content
    let responseText = "";
    if (latestMessage.content && latestMessage.content.length > 0 && latestMessage.content[0].type === "text") {
      responseText = latestMessage.content[0].text.value;
    }
    
    // Update last_used_at in the database
    try {
      await supabase
        .from('sciencegent_assistants')
        .update({ last_used_at: new Date().toISOString() })
        .eq('assistant_id', finalAssistantId);
    } catch (error) {
      console.error("Error updating last_used_at:", error);
      // Non-critical, don't throw
    }
    
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
