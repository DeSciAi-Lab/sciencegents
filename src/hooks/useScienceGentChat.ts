
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const useScienceGentChat = (
  scienceGentAddress: string,
  scienceGent: any
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  
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
            .single();
            
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
  
  // Track user interactions
  const trackInteraction = async (content: string) => {
    if (!scienceGentAddress) return;
    
    try {
      await supabase.from('user_interactions').insert({
        user_address: 'anonymous', // Replace with actual user address when available
        sciencegent_address: scienceGentAddress,
        interaction_type: 'chat',
        interaction_data: { message_length: content.length }
      });
      
      // Update chat count in sciencegent_stats
      // Use the Edge Function to update the chat count instead of direct RPC call
      try {
        const { error } = await supabase.functions.invoke('increment_chat_count', {
          body: { sciencegent_address: scienceGentAddress }
        });
        
        if (error) {
          console.error('Failed to update chat count:', error);
        }
      } catch (err) {
        console.error('Failed to invoke increment_chat_count function:', err);
      }
    } catch (e) {
      console.error('Error tracking interaction:', e);
      // Non-critical error, don't show to user
    }
  };
  
  // Function to send message to the Edge Function API
  const sendMessage = async (content: string) => {
    if (!content.trim() || !scienceGentAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message to the state immediately
      const userMessage: ChatMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);
      
      // Track this interaction
      trackInteraction(content);
      
      // Get the persona from the scienceGent if available
      const persona = scienceGent?.persona || '';
      
      // Log the persona for debugging
      if (persona) {
        console.log("Using persona from scienceGent:", persona.substring(0, 100) + "...");
      } else {
        console.log("No persona found in scienceGent object. Falling back to description.");
      }
      
      // Fetch capabilities to enhance persona
      const { data: capabilityLinks } = await supabase
        .from('sciencegent_capabilities')
        .select('capability_id')
        .eq('sciencegent_address', scienceGentAddress);
        
      const capabilityIds = capabilityLinks?.map(link => link.capability_id) || [];
      
      let capabilities: any[] = [];
      if (capabilityIds.length > 0) {
        const { data } = await supabase
          .from('capabilities')
          .select('*')
          .in('id', capabilityIds);
          
        capabilities = data || [];
      }
      
      // Prepare the capabilities string
      const capabilitiesText = capabilities.length > 0 
        ? `${capabilities.map(cap => 
            `- ${cap.name}: ${cap.description}`
          ).join('\n')}` 
        : '';
      
      // Call the Edge Function with scienceGentAddress and assistantId (if exists)
      const { data, error: functionError } = await supabase.functions.invoke('generateChatResponse', {
        body: {
          messages: [...messages, userMessage],
          scienceGentName: scienceGent?.name || 'ScienceGent',
          persona: persona,
          capabilities: capabilitiesText,
          scienceGentAddress,
          assistantId // Pass the existing assistantId if we have one
        }
      });
      
      if (functionError) throw new Error(functionError.message);
      if (!data || !data.message) throw new Error('Invalid response from AI');
      
      // Store the assistantId if it's returned and we don't have it yet
      if (data.assistantId && !assistantId) {
        setAssistantId(data.assistantId);
        console.log("New assistant created with ID:", data.assistantId);
      }
      
      // Add AI response to messages
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: data.message
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err: any) {
      console.error('Error in chat:', err);
      setError(err.message || 'Failed to get a response');
      toast({
        title: "Chat Error",
        description: err.message || 'Failed to get a response',
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
