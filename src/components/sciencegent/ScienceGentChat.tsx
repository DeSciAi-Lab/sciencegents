
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, User, Trash2, ExternalLink, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useScienceGentChat from '@/hooks/useScienceGentChat';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ScienceGentChatProps {
  scienceGent: any;
  address: string;
}

const ScienceGentChat: React.FC<ScienceGentChatProps> = ({ scienceGent, address }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showPersona, setShowPersona] = useState(false);
  const { messages, isLoading, sendMessage, clearChat, isInitializing, hasAssistant } = useScienceGentChat(address, scienceGent);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus on input after user sends a message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '' && !isLoading) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasPersona = Boolean(scienceGent?.persona);
  const capabilitiesCount = scienceGent?.capabilities?.length || 0;

  if (isInitializing) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat info and actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {hasAssistant && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active AI
            </Badge>
          )}
          {hasPersona && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={() => setShowPersona(!showPersona)}
                  >
                    <Info className="h-4 w-4" />
                    Persona
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View this ScienceGent's custom persona</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {capabilitiesCount > 0 && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {capabilitiesCount} Capabilities
            </Badge>
          )}
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Chat
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete all messages in this chat. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearChat}>Clear History</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      {/* Persona display */}
      {showPersona && scienceGent?.persona && (
        <Card className="mb-4 bg-slate-50">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-1">Custom Persona</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {scienceGent.persona.length > 500 
                ? scienceGent.persona.substring(0, 500) + "..." 
                : scienceGent.persona}
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Messages Area */}
      <ScrollArea className="flex-grow mb-4 border rounded-md p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              This ScienceGent is ready to assist you with scientific questions and tasks
              {capabilitiesCount > 0 ? ` using its ${capabilitiesCount} specialized capabilities` : ''}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === 'assistant' ? 'flex-row' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  <Avatar>
                    {message.role === 'assistant' ? (
                      <Bot className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Avatar>
                </div>
                <div className={`flex-1 ${message.role === 'assistant' ? 'bg-slate-50 rounded-md p-3' : 'p-3'}`}>
                  <p className="font-medium text-sm mb-1">
                    {message.role === 'assistant' ? scienceGent?.name || 'ScienceGent' : 'You'}
                  </p>
                  <div className="text-sm whitespace-pre-line">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      {/* Input Area */}
      <div className="flex flex-col gap-2">
        <Textarea
          ref={inputRef}
          placeholder={`Ask ${scienceGent?.name || 'this ScienceGent'} a question...`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none"
          rows={3}
          disabled={isLoading}
        />
        <div className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            {isLoading ? (
              <span className="animate-pulse">Generating response...</span>
            ) : (
              <span>Press Shift+Enter for a new line</span>
            )}
          </div>
          <Button type="submit" onClick={handleSendMessage} disabled={inputMessage.trim() === '' || isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Processing
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScienceGentChat;
