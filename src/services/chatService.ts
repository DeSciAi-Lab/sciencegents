import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  scienceGentAddress: string;
  scienceGentName?: string;
  persona?: string;
  capabilities?: string[];
  assistantId?: string | null;
}

export const sendChatRequest = async (request: ChatRequest): Promise<{ message: string; assistantId: string }> => {
  try {
    const {
      messages,
      scienceGentAddress,
      scienceGentName,
      persona,
      capabilities,
      assistantId: providedAssistantId,
    } = request;

    console.log('Processing chat request for:', {
      scienceGentName,
      scienceGentAddress,
      personaLength: persona?.length || 0,
      capabilitiesLength: capabilities?.length || 0,
      messageCount: messages.length,
      providedAssistantId: providedAssistantId || 'none'
    });

    // Initialize OpenAI client
    const apiKey = import.meta.env.VITE_OPENAI_ASSISTANT_API_KEY;
    if (!apiKey) {
      throw new Error('Missing OpenAI API key');
    }

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Only for development! In production, use a backend service
    });

    // Determine final assistant ID
    let finalAssistantId = providedAssistantId || null;

    if (!finalAssistantId) {
      // Check if we already have an assistant for this ScienceGent
      const { data: existingAssistant } = await supabase
        .from('sciencegent_assistants')
        .select('assistant_id')
        .eq('sciencegent_address', scienceGentAddress)
        .maybeSingle();

      if (existingAssistant?.assistant_id) {
        finalAssistantId = existingAssistant.assistant_id;
        console.log(`Using existing assistant ID: ${finalAssistantId}`);
      } else {
        // Create a new assistant
        console.log('Creating new assistant for:', scienceGentName);
        
        // Prepare the system instructions
        const assistantName = scienceGentName || 'ScienceGent Assistant';
        let instructions = `You are ${assistantName}, a specialized AI agent designed to help with scientific tasks.`;
        
        // Add persona if available
        if (persona) {
          instructions += `\n\n${persona}`;
        }
        
        // Add capabilities if available
        if (capabilities && capabilities.length > 0) {
          const capabilitiesText = Array.isArray(capabilities) 
            ? capabilities.map(cap => `- ${cap}`).join('\n')
            : capabilities;
          instructions += `\n\nYou have the following capabilities:\n${capabilitiesText}`;
        }
        
        instructions += `\n\nYour responses should be helpful, accurate, and scientifically sound.`;
        
        console.log('Creating assistant with instructions (first 100 chars):', 
          instructions.substring(0, 100) + '...');
        
        try {
          // Create the assistant
          const assistant = await openai.beta.assistants.create({
            name: assistantName,
            instructions: instructions,
            model: "gpt-4o-mini", // Can be configured based on needs
          });
          
          finalAssistantId = assistant.id;
          console.log(`New assistant created with ID: ${finalAssistantId}`);
          
          // Store the assistant ID in Supabase
          const { error } = await supabase
            .from('sciencegent_assistants')
            .insert({
              sciencegent_address: scienceGentAddress,
              assistant_id: finalAssistantId
            });
          
          if (error) {
            console.error('Error storing assistant ID:', error);
          }
        } catch (createError) {
          console.error('Error creating OpenAI assistant:', createError);
          throw new Error('Failed to create assistant: ' + (createError instanceof Error ? createError.message : String(createError)));
        }
      }
    }

    if (!finalAssistantId) {
      throw new Error('Failed to get or create an assistant ID');
    }

    // Create a thread
    let threadId;
    try {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      console.log(`Created thread: ${threadId}`);
    } catch (threadError) {
      console.error('Error creating thread:', threadError);
      throw new Error('Failed to create thread');
    }

    // Add messages to the thread
    try {
      for (const msg of messages) {
        await openai.beta.threads.messages.create(threadId, {
          role: msg.role,
          content: msg.content,
        });
      }
      console.log(`Added ${messages.length} messages to thread`);
    } catch (messageError) {
      console.error('Error adding messages to thread:', messageError);
      throw new Error('Failed to add messages to thread');
    }
    
    // Run the assistant
    let runId;
    try {
      console.log(`Running assistant ${finalAssistantId} on thread ${threadId}...`);
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: finalAssistantId,
      });
      runId = run.id;
      console.log(`Run created with ID ${runId}, initial status: ${run.status}`);
    } catch (runError) {
      console.error('Error creating run:', runError);
      throw new Error('Failed to create run');
    }

    // Poll for completion
    let runStatus;
    let pollCount = 0;
    const startTime = Date.now();
    const timeoutMs = 120000; // 2 minutes timeout
    
    try {
      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      
      while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
        pollCount++;
        console.log(`Run status (poll #${pollCount}): ${runStatus.status}`);
        
        // Wait before checking again
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
        
        // Log processing time
        const elapsedMs = Date.now() - startTime;
        const elapsedSec = Math.round(elapsedMs / 1000);
        console.log(`Run has been processing for ${elapsedSec} seconds`);
        
        // Check for timeout
        if (elapsedMs > timeoutMs) {
          console.log(`Timeout reached after ${pollCount} polling attempts`);
          throw new Error(`Request timed out after ${timeoutMs/1000} seconds`);
        }
      }
      
      console.log(`Run completed with final status: ${runStatus.status}`);
    } catch (pollError) {
      console.error('Error polling run status:', pollError);
      throw new Error('Failed to poll run status');
    }

    if (runStatus.status !== 'completed') {
      console.error(`Run failed with status: ${runStatus.status}`);
      throw new Error(`Assistant run failed with status: ${runStatus.status}`);
    }

    // Get the assistant's response
    let responseContent = '';
    try {
      const messagesResponse = await openai.beta.threads.messages.list(threadId);
      console.log(`Retrieved ${messagesResponse.data.length} messages from thread`);
      
      const assistantMessages = messagesResponse.data.filter(
        msg => msg.role === 'assistant'
      );
      
      if (assistantMessages.length === 0) {
        throw new Error('No assistant messages found in response');
      }
      
      // Get the latest message
      const latestMessage = assistantMessages[0];
      
      if (latestMessage.content && latestMessage.content.length > 0) {
        const textContent = latestMessage.content.find(
          content => content.type === 'text'
        );
        if (textContent && 'text' in textContent) {
          responseContent = textContent.text.value;
          console.log(`Found response text (${responseContent.length} chars)`);
        }
      }
      
      if (!responseContent) {
        throw new Error('Empty or invalid response content');
      }
    } catch (responseError) {
      console.error('Error getting response:', responseError);
      throw new Error('Failed to get assistant response');
    }

    return {
      message: responseContent,
      assistantId: finalAssistantId,
    };
  } catch (error) {
    console.error('Error in chat service:', error);
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}; 