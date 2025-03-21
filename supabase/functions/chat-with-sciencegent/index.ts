
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  prompt: string;
  persona?: string;
  sciencegentName?: string;
  capabilities?: string[];
  history?: Array<{role: string, content: string}>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found');
    }

    // Parse request
    const { prompt, persona, sciencegentName, capabilities, history = [] } = await req.json() as ChatRequest;
    
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    // Construct system message based on persona and capabilities
    let systemMessage = "You are a helpful and knowledgeable AI assistant specialized in scientific domains.";
    
    if (persona) {
      systemMessage = persona;
    }
    
    if (sciencegentName) {
      systemMessage += ` Your name is ${sciencegentName}.`;
    }
    
    if (capabilities && capabilities.length > 0) {
      systemMessage += ` You have expertise in: ${capabilities.join(', ')}.`;
    }

    // Prepare messages for OpenAI API
    const messages = [
      { role: "system", content: systemMessage },
      ...history,
      { role: "user", content: prompt }
    ];

    console.log('Sending to OpenAI:', { 
      system: systemMessage,
      historyLength: history.length,
      prompt
    });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-sciencegent function:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
