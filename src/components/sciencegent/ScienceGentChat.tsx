
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send, Trash } from 'lucide-react';
import { useScienceGentChat, ChatMessage } from '@/hooks/useScienceGentChat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ScienceGentChatProps {
  scienceGent: any;
}

const ScienceGentChat: React.FC<ScienceGentChatProps> = ({ scienceGent }) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useScienceGentChat(scienceGent);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-[600px] max-h-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chat with {scienceGent?.name || 'ScienceGent'}</h3>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearMessages}>
            <Trash className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-muted/30 rounded-lg">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p>No messages yet. Start a conversation with this ScienceGent.</p>
            {scienceGent?.capabilities && scienceGent.capabilities.length > 0 && (
              <div className="mt-2 text-sm">
                <p>This ScienceGent has expertise in:</p>
                <ul className="list-disc list-inside mt-1">
                  {scienceGent.capabilities.map((cap: any, index: number) => (
                    <li key={index}>{cap.capability_id}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} scienceGent={scienceGent} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p>Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

// Message component to display individual chat messages
const ChatMessage: React.FC<{ message: ChatMessage; scienceGent: any }> = ({ message, scienceGent }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8">
          {isUser ? (
            <>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/user-avatar.png" alt="User" />
            </>
          ) : (
            <>
              <AvatarFallback>{scienceGent?.name?.substring(0, 2) || 'SG'}</AvatarFallback>
              <AvatarImage src={scienceGent?.profile_image || '/placeholder.svg'} alt={scienceGent?.name} />
            </>
          )}
        </Avatar>
        <div className={`${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} px-4 py-2 rounded-lg whitespace-pre-wrap`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ScienceGentChat;
