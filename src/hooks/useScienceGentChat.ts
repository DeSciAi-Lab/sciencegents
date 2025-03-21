
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const useScienceGentChat = (scienceGent: any) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Convert previous messages to the format expected by the API
      const history = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('chat-with-sciencegent', {
        body: {
          prompt: content,
          persona: scienceGent?.persona,
          sciencegentName: scienceGent?.name,
          capabilities: scienceGent?.capabilities?.map((cap: any) => cap.capability_id),
          history,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add assistant message to chat
      const assistantMessage: ChatMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: `Failed to get a response: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearMessages = () => {
    setMessages([]);
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};
