
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
      const persona = scienceGent?.description || '';
      
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
        ? `This AI has the following capabilities:\n${capabilities.map(cap => 
            `- ${cap.name}: ${cap.description}`
          ).join('\n')}` 
        : '';
      
      // Call the Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('generateChatResponse', {
        body: {
          messages: [...messages, userMessage],
          scienceGentName: scienceGent?.name || 'ScienceGent',
          persona,
          capabilities: capabilitiesText
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
      
    } catch (err) {
      console.error('Error in chat:', err);
      setError(err.message || 'Failed to get a response');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};

export default useScienceGentChat;
