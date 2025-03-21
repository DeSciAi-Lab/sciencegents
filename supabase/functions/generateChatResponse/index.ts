
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  scienceGentName: string;
  persona: string;
  capabilities: string;
}

serve(async (req) => {
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
    const { messages, scienceGentName, persona, capabilities }: RequestBody = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing messages" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Set up OpenAI
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    
    // Prepare system message with persona and capabilities
    const systemContent = `You are ${scienceGentName}, a specialized AI assistant for scientific research.
    
${persona || "You are helpful, concise, and focus on providing accurate scientific information."}

${capabilities || ""}

Always provide accurate and well-referenced scientific information. If you're not sure about something, acknowledge the limitations of your knowledge.`;
    
    // Convert messages to OpenAI format
    const formattedMessages: ChatCompletionRequestMessage[] = [
      { role: "system", content: systemContent },
      ...messages.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }))
    ];
    
    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    if (!response.data.choices[0]?.message?.content) {
      throw new Error("No response from OpenAI");
    }
    
    return new Response(
      JSON.stringify({
        message: response.data.choices[0].message.content.trim()
      }),
      { headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
