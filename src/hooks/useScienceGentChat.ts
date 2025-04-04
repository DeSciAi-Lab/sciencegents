import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { createScienceGentAssistant } from '@/services/scienceGentService/createAssistant';
import { ScienceGentData } from '@/services/scienceGent/types';
import { sendChatRequest } from '@/services/chatService';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
  timestamp?: string;
}

// Convert the existing ChatMessage array to the updated format
const formatMessages = (messages: ChatMessage[]): ChatMessage[] => {
  return messages.map(msg => ({
    role: msg.role,
    content: msg.content,
    id: msg.id || crypto.randomUUID(),
    timestamp: msg.timestamp || new Date().toISOString()
  }));
};

const useScienceGentChat = (
  scienceGentAddress: string,
  scienceGent?: ScienceGentData | null
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('initializing useScienceGentChat', { 
      scienceGentAddress, 
      scienceGent: scienceGent ? {
        name: scienceGent.name,
        hasPersona: Boolean(scienceGent?.persona),
        personaLength: scienceGent?.persona?.length,
        capabilities: scienceGent?.capabilities
      } : 'none'
    });
  }, [scienceGentAddress, scienceGent]);
  
  // Load chat history and check for existing assistant on mount
  useEffect(() => {
    if (scienceGentAddress) {
      const initializeChat = async () => {
        try {
          // Load chat history from localStorage
          const savedMessages = localStorage.getItem(`chat_${scienceGentAddress}`);
          if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
          }
          
          // Check if this ScienceGent has an associated assistant
          const { data: assistantData, error: assistantError } = await supabase
            .from('sciencegent_assistants')
            .select('assistant_id')
            .eq('sciencegent_address', scienceGentAddress)
            .maybeSingle();
            
          if (assistantData) {
            console.log("Found existing assistant ID:", assistantData.assistant_id);
            setAssistantId(assistantData.assistant_id);
          } else if (assistantError) {
            console.log("No existing assistant found, will create on first message");
          }
        } catch (e) {
          console.error('Error initializing chat:', e);
        } finally {
          setIsInitializing(false);
        }
      };
      
      initializeChat();
    }
  }, [scienceGentAddress]);
  
  // Save chat history to localStorage when messages change
  useEffect(() => {
    if (scienceGentAddress && messages.length > 0) {
      try {
        localStorage.setItem(`chat_${scienceGentAddress}`, JSON.stringify(messages));
      } catch (e) {
        console.error('Error saving chat history:', e);
      }
    }
  }, [messages, scienceGentAddress]);
  
  // Function to track user interactions
  const trackInteraction = async (content: string) => {
    try {
      // Insert into user_interactions table
      const { error } = await supabase
        .from('user_interactions')
        .insert({
          sciencegent_address: scienceGentAddress,
          user_address: 'anonymous', // Replace with actual user address when available
          interaction_type: 'chat',
          interaction_data: { message: content }
        });
        
      if (error) throw error;
      
      // Try to increment the interactions_count in sciencegents table
      try {
        console.log('Incrementing interaction count for address:', scienceGentAddress);
        
        // First check the current count
        const { data: checkData, error: checkError } = await supabase
          .from('sciencegents')
          .select('*')  // Select all columns to avoid TypeScript errors
          .eq('address', scienceGentAddress)
          .single();
        
        // Get the current count (if it exists)
        const currentCount = checkData ? 
          // @ts-ignore - TypeScript doesn't know about this column yet
          (checkData.interactions_count || 0) : 0;
          
        console.log('Current interactions count:', currentCount);
        
        // Update the count directly using a simple update
        // We're using the `any` type to bypass TypeScript's type checking
        const updateResult = await supabase
          .from('sciencegents')
          .update({ 
            // Specify the column and new value
            interactions_count: currentCount + 1 
          } as any)  // Type assertion to bypass TypeScript
          .eq('address', scienceGentAddress);
          
        if (updateResult.error) {
          console.error('Error updating interactions_count:', updateResult.error);
        } else {
          console.log('Successfully incremented interactions count for', scienceGentAddress);
          
          // Verify the update
          const { data: verifyData } = await supabase
            .from('sciencegents')
            .select('*')
            .eq('address', scienceGentAddress)
            .single();
            
            // @ts-ignore - TypeScript doesn't know about this column yet
            console.log('Updated interactions count:', verifyData?.interactions_count || 0);
        }
      } catch (updateErr) {
        console.error('Error in interactions_count update process:', updateErr);
      }
    } catch (err) {
      console.error('Error tracking interaction:', err);
    }
  };
  
  const sendMessage = async (
    message: string,
    onMessageResponse?: (response: string) => void
  ) => {
    try {
      if (!scienceGentAddress) {
        console.error('No scienceGentAddress provided');
        return;
      }

      // Debug persona information
      const personaValue = scienceGent?.persona;
      console.log('Persona debug:', {
        exists: Boolean(personaValue),
        type: typeof personaValue,
        value: personaValue ? (personaValue.length > 50 ? personaValue.substring(0, 50) + '...' : personaValue) : null,
        length: personaValue?.length
      });

      // Add the new message to the message list
      const userMessage: ChatMessage = {
        content: message,
        role: 'user',
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Track this interaction (but don't wait for it)
      trackInteraction(message).catch(err => {
        console.error('Error tracking interaction:', err);
        // Non-critical, continue with chat
      });

      // Use the new chat service instead of making direct API call
      const payload = {
        messages: [...messages, userMessage].map((m) => ({
          content: m.content,
          role: m.role,
        })),
        scienceGentAddress,
        scienceGentName: scienceGent?.name,
        persona: scienceGent?.persona || '',
        capabilities: scienceGent?.capabilities || [],
        assistantId, // Pass the assistant ID if we already created one
      };

      console.log('Sending chat request with payload:', {
        messageCount: payload.messages.length,
        scienceGentAddress: payload.scienceGentAddress,
        scienceGentName: payload.scienceGentName,
        personaLength: payload.persona?.length,
        capabilitiesCount: payload.capabilities?.length,
        assistantId: payload.assistantId
      });

      // Call the chat service
      const response = await sendChatRequest(payload);

      // Update assistant ID if it was created on the server
      if (response.assistantId) {
        setAssistantId(response.assistantId);
      }

      // Add the AI's response to the message list
      const assistantMessage: ChatMessage = {
        content: response.message,
        role: 'assistant',
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (onMessageResponse) {
        onMessageResponse(response.message);
      }
      
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      toast({
        title: "Chat Error",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear chat history
  const clearChat = () => {
    if (scienceGentAddress) {
      localStorage.removeItem(`chat_${scienceGentAddress}`);
      setMessages([]);
      toast({
        title: "Chat cleared",
        description: "Your chat history has been cleared.",
      });
    }
  };
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    isInitializing,
    hasAssistant: !!assistantId
  };
};

export default useScienceGentChat;
