
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
  
  // Load chat history from localStorage on mount
  useEffect(() => {
    if (scienceGentAddress) {
      try {
        const savedMessages = localStorage.getItem(`chat_${scienceGentAddress}`);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (e) {
        console.error('Error loading chat history:', e);
      } finally {
        setIsInitializing(false);
      }
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
  
  // Function to send message to the Edge Function API
  const sendMessage = async (content: string) => {
    if (!content.trim() || !scienceGentAddress) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message to the state immediately
      const userMessage: ChatMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);
      
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
      
      // Call the Edge Function with scienceGentAddress
      const { data, error: functionError } = await supabase.functions.invoke('generateChatResponse', {
        body: {
          messages: [...messages, userMessage],
          scienceGentName: scienceGent?.name || 'ScienceGent',
          persona: persona, // Now correctly retrieving the persona from the db
          capabilities: capabilitiesText,
          scienceGentAddress // Add the address to create or reuse the assistant
        }
      });
      
      if (functionError) throw new Error(functionError.message);
      if (!data || !data.message) throw new Error('Invalid response from AI');
      
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
    isInitializing
  };
};

export default useScienceGentChat;
