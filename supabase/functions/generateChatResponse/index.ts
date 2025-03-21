
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import OpenAI from "https://esm.sh/openai@4.20.1";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  scienceGentName: string;
  persona: string;
  capabilities: string;
  scienceGentAddress: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create an object to store assistant IDs by ScienceGent address
const assistantCache: Record<string, string> = {};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    
    // Get the request body
    const { messages, scienceGentName, persona, capabilities, scienceGentAddress }: RequestBody = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing messages" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Set up OpenAI API
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    // Prepare assistant instructions with persona and capabilities
    const instructions = `You are ${scienceGentName}, a specialized AI assistant for scientific research.
    
${persona || "You are helpful, concise, and focus on providing accurate scientific information."}

${capabilities ? `You have the following capabilities:\n${capabilities}` : ""}

Always provide accurate and well-referenced scientific information. If you're not sure about something, acknowledge the limitations of your knowledge.`;

    console.log(`Processing request for ScienceGent: ${scienceGentAddress}`);
    
    let assistantId: string | undefined = assistantCache[scienceGentAddress];
    
    // Check if we need to create a new assistant
    if (!assistantId) {
      console.log("No cached assistant found, checking Supabase...");
      
      // Check if assistant ID exists in supabase
      const { data: assistantData, error: assistantError } = await supabaseClient
        .from('sciencegent_assistants')
        .select('assistant_id')
        .eq('sciencegent_address', scienceGentAddress)
        .single();
      
      if (assistantError && assistantError.code !== 'PGRST116') {
        console.error("Error fetching assistant:", assistantError);
      }
      
      if (assistantData?.assistant_id) {
        assistantId = assistantData.assistant_id;
        assistantCache[scienceGentAddress] = assistantId;
        console.log(`Found existing assistant ID: ${assistantId}`);
        
        // Update the assistant with the latest persona
        try {
          await openai.beta.assistants.update(
            assistantId,
            {
              instructions,
              name: scienceGentName,
            }
          );
          console.log("Updated existing assistant with new instructions");
        } catch (updateError) {
          console.error("Error updating assistant:", updateError);
          // If assistant doesn't exist anymore, remove from cache and create a new one
          assistantId = undefined;
        }
      }
      
      // Create a new assistant if needed
      if (!assistantId) {
        console.log("Creating new assistant...");
        try {
          const assistant = await openai.beta.assistants.create({
            name: scienceGentName,
            instructions,
            model: "gpt-4o-mini",
          });
          
          assistantId = assistant.id;
          assistantCache[scienceGentAddress] = assistantId;
          
          // Store the assistant ID in Supabase
          const { error: insertError } = await supabaseClient
            .from('sciencegent_assistants')
            .insert({
              sciencegent_address: scienceGentAddress,
              assistant_id: assistantId,
              created_at: new Date().toISOString(),
            });
          
          if (insertError) {
            console.error("Error storing assistant ID:", insertError);
          }
          
          console.log(`Created new assistant with ID: ${assistantId}`);
        } catch (createError) {
          console.error("Error creating assistant:", createError);
          
          // Fall back to chat completion if assistant creation fails
          return fallbackToChatCompletion(openai, messages, instructions, corsHeaders);
        }
      }
    }
    
    // Create a thread if needed
    try {
      const thread = await openai.beta.threads.create();
      console.log(`Created thread: ${thread.id}`);
      
      // Add all past messages to the thread
      for (const msg of messages) {
        await openai.beta.threads.messages.create(
          thread.id,
          {
            role: msg.role,
            content: msg.content,
          }
        );
      }
      
      // Run the assistant
      console.log(`Running assistant ${assistantId} on thread ${thread.id}`);
      const run = await openai.beta.threads.runs.create(
        thread.id,
        {
          assistant_id: assistantId,
        }
      );
      
      // Poll for completion
      let runStatus = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      
      // Wait for the run to complete (with timeout)
      const startTime = Date.now();
      const TIMEOUT_MS = 30000; // 30 seconds
      
      while (runStatus.status !== "completed" && 
             runStatus.status !== "failed" && 
             runStatus.status !== "cancelled" && 
             runStatus.status !== "expired") {
        
        if (Date.now() - startTime > TIMEOUT_MS) {
          console.log("Run timed out, using fallback");
          return fallbackToChatCompletion(openai, messages, instructions, corsHeaders);
        }
        
        // Wait 1 second before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        runStatus = await openai.beta.threads.runs.retrieve(
          thread.id,
          run.id
        );
      }
      
      if (runStatus.status !== "completed") {
        console.log(`Run ended with status: ${runStatus.status}, using fallback`);
        return fallbackToChatCompletion(openai, messages, instructions, corsHeaders);
      }
      
      // Get the messages from the thread
      const threadMessages = await openai.beta.threads.messages.list(
        thread.id
      );
      
      // Find the most recent assistant message
      const latestMessage = threadMessages.data.find(msg => msg.role === "assistant");
      
      if (!latestMessage) {
        throw new Error("No assistant message found in thread");
      }
      
      // Extract the message content
      let responseContent = "";
      if (Array.isArray(latestMessage.content) && latestMessage.content.length > 0) {
        const textContent = latestMessage.content.find(content => content.type === "text");
        if (textContent && "text" in textContent) {
          responseContent = textContent.text.value;
        }
      }
      
      if (!responseContent) {
        throw new Error("No text content found in assistant response");
      }
      
      return new Response(
        JSON.stringify({ message: responseContent }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
      
    } catch (error) {
      console.error("Error using assistant:", error);
      // Fall back to chat completion if assistant usage fails
      return fallbackToChatCompletion(openai, messages, instructions, corsHeaders);
    }
  } catch (error) {
    console.error("Error:", error.message || error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Fallback to regular chat completion if assistant API fails
async function fallbackToChatCompletion(openai, messages, instructions, corsHeaders) {
  console.log("Using fallback chat completion");
  
  try {
    const formattedMessages = [
      { role: "system", content: instructions },
      ...messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }))
    ];
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    const responseContent = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    
    return new Response(
      JSON.stringify({ message: responseContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (fallbackError) {
    console.error("Error in fallback:", fallbackError);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
