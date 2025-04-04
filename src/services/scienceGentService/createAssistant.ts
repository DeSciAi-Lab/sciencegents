import { supabase } from '@/integrations/supabase/client';
import OpenAI from 'openai';

export const createScienceGentAssistant = async (
  scienceGentAddress: string,
  scienceGentName: string,
  persona: string | null | undefined,
  capabilities: string[] | null = []
): Promise<string | null> => {
  try {
    // Check if this ScienceGent already has an assistant
    const { data: existingAssistant } = await supabase
      .from('sciencegent_assistants')
      .select('assistant_id')
      .eq('sciencegent_address', scienceGentAddress)
      .maybeSingle();
      
    if (existingAssistant?.assistant_id) {
      console.log(`Using existing assistant ID: ${existingAssistant.assistant_id}`);
      return existingAssistant.assistant_id;
    }
    
    // Get OpenAI API key from environment variable
    const apiKey = import.meta.env.VITE_OPENAI_ASSISTANT_API_KEY;
    if (!apiKey) {
      console.error("OpenAI API key not found");
      throw new Error("OpenAI API key not found");
    }
    
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Only for development! In production, use server-side API calls
    });
    
    // Prepare the system instructions
    const assistantName = scienceGentName || "ScienceGent Assistant";
    let instructions = `You are ${assistantName}, a specialized AI agent designed to help with scientific tasks.`;
    
    // Add persona if available
    if (persona) {
      instructions += `\n\n${persona}`;
    }
    
    // Add capabilities if available
    if (capabilities && capabilities.length > 0) {
      const capabilitiesText = capabilities.map(cap => `- ${cap}`).join('\n');
      instructions += `\n\nYou have the following capabilities:\n${capabilitiesText}`;
    }
    
    instructions += `\n\nYour responses should be helpful, accurate, and scientifically sound.`;
    
    console.log("Creating assistant with instructions:", instructions.substring(0, 100) + "...");
    
    // Create the assistant
    const assistant = await openai.beta.assistants.create({
      name: assistantName,
      instructions: instructions,
      model: "gpt-4o-mini", // Can be configured based on needs
    });
    
    const assistantId = assistant.id;
    console.log(`New assistant created with ID: ${assistantId}`);
    
    // Store the assistant ID in Supabase
    const { error } = await supabase
      .from('sciencegent_assistants')
      .insert({
        sciencegent_address: scienceGentAddress,
        assistant_id: assistantId
      });
    
    if (error) {
      console.error("Error storing assistant ID:", error);
    }
    
    return assistantId;
  } catch (error) {
    console.error("Error creating OpenAI assistant:", error);
    return null;
  }
}; 