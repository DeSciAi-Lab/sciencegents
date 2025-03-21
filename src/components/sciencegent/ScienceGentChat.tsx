
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send } from "lucide-react";
import { type ChatMessage } from '@/hooks/useScienceGentChat';
import useScienceGentChat from '@/hooks/useScienceGentChat';

interface ScienceGentChatProps {
  scienceGent: any;
  address: string;
}

const ScienceGentChat: React.FC<ScienceGentChatProps> = ({
  scienceGent,
  address
}) => {
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isLoading,
    error,
    sendMessage
  } = useScienceGentChat(address, scienceGent);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-md bg-secondary/20">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">Send a message to start chatting with {scienceGent?.name || 'ScienceGent'}</p>
              <p className="text-sm">This AI assistant is specialized in scientific tasks based on its capabilities.</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} scienceGent={scienceGent} />
            ))}
          </>
        )}
        
        {isLoading && (
          <div className="flex items-center space-x-2 p-4 rounded-md bg-secondary/40">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p className="text-sm text-muted-foreground">{scienceGent?.name || 'ScienceGent'} is thinking...</p>
          </div>
        )}
        
        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive text-destructive">
            <p className="text-sm">Error: {error}</p>
          </Card>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      <div className="flex space-x-2">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask ${scienceGent?.name || 'ScienceGent'} a question...`}
          className="resize-none"
          rows={2}
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!inputValue.trim() || isLoading}
          className="bg-science-600 hover:bg-science-700"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  scienceGent: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, scienceGent }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className={`w-8 h-8 ${isUser ? 'bg-primary' : 'bg-science-600'}`}>
          {!isUser && <AvatarImage src={scienceGent?.profile_pic} alt={scienceGent?.name} />}
          <AvatarFallback>
            {isUser ? 'U' : scienceGent?.name?.[0] || 'S'}
          </AvatarFallback>
        </Avatar>
        
        <div className={`p-3 rounded-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border border-border'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ScienceGentChat;
