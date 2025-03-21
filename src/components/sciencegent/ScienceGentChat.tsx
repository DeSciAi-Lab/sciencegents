
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, RefreshCw, Bot, User, Brain, Info } from "lucide-react";
import { type ChatMessage } from '@/hooks/useScienceGentChat';
import useScienceGentChat from '@/hooks/useScienceGentChat';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showPersonaInfo, setShowPersonaInfo] = useState(false);
  
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    isInitializing
  } = useScienceGentChat(address, scienceGent);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    await sendMessage(inputValue);
    setInputValue('');
    
    // Focus back on input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const togglePersonaInfo = () => {
    setShowPersonaInfo(!showPersonaInfo);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Focus input on component mount
  useEffect(() => {
    if (!isInitializing && !isLoading) {
      inputRef.current?.focus();
    }
  }, [isInitializing, isLoading]);

  const hasPersona = Boolean(scienceGent?.persona);
  
  // Show a truncated version of the persona for the tooltip
  const truncatedPersona = scienceGent?.persona ? 
    (scienceGent.persona.length > 150 ? scienceGent.persona.substring(0, 150) + '...' : scienceGent.persona) 
    : 'No custom persona defined';

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-sm">
      <div className="p-3 bg-card border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-science-600" />
          <h3 className="font-medium">{scienceGent?.name || 'ScienceGent'} Chat</h3>
          {hasPersona && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={togglePersonaInfo}
                  >
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{truncatedPersona}</p>
                  <p className="text-xs mt-1">Click to view full persona</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {hasPersona && (
            <Badge variant="outline" className="text-xs">Custom Persona</Badge>
          )}
        </div>
        
        {messages.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            title="Clear chat history"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showPersonaInfo && scienceGent?.persona && (
        <div className="p-4 bg-muted/30 border-b">
          <h4 className="text-sm font-medium mb-2">Custom Persona Definition</h4>
          <p className="text-sm whitespace-pre-wrap">{scienceGent.persona}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={togglePersonaInfo}
            className="mt-3"
          >
            Close
          </Button>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-secondary/10">
        {isInitializing ? (
          <div className="space-y-4">
            <Skeleton className="h-14 w-3/4" />
            <Skeleton className="h-10 w-1/2 ml-auto" />
            <Skeleton className="h-14 w-3/4" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <div className="mx-auto w-12 h-12 rounded-full bg-science-100 flex items-center justify-center mb-3">
                <Bot className="h-6 w-6 text-science-600" />
              </div>
              <p className="mb-2">Send a message to start chatting with {scienceGent?.name || 'ScienceGent'}</p>
              <p className="text-sm max-w-md">This AI assistant is specialized based on its persona and capabilities. Try asking something related to its scientific domain.</p>
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
            <Loader2 className="h-4 w-4 animate-spin text-science-600" />
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
      
      <div className="p-3 border-t bg-card">
        <div className="flex space-x-2">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${scienceGent?.name || 'ScienceGent'} a question...`}
            className="resize-none min-h-[60px]"
            rows={2}
            disabled={isLoading || isInitializing}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading || isInitializing}
            className="bg-science-600 hover:bg-science-700 self-end h-[60px] px-4"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 px-2">
          Press Enter to send, Shift+Enter for new line
        </p>
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
          <AvatarFallback className={isUser ? 'bg-primary' : 'bg-science-600 text-white'}>
            {isUser ? <User className="h-4 w-4" /> : scienceGent?.name?.[0] || <Bot className="h-4 w-4" />}
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
