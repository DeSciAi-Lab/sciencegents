
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, User, Trash2, ExternalLink, Info, Search, Edit, ThumbsUp, ThumbsDown, PencilLine, Copy, Check } from "lucide-react";
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
  const [showPrompts, setShowPrompts] = useState(true);

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

  // Sample prompt suggestions
  const promptSuggestions = [
    "Show me the temperature today",
    "Why does it rain",
    "Do you feel different because of weather",
    "What kind of clouds are there"
  ];

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
    <div className="flex h-[700px]">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-50 rounded-l-lg border-r overflow-hidden flex flex-col">
        <div className="p-4 bg-white flex items-center space-x-2 border-b">
          <Avatar className="h-8 w-8 bg-purple-100">
            <Bot className="h-4 w-4 text-purple-500" />
          </Avatar>
          <div>
            <p className="font-medium text-sm">Agent Chat</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="default" className="mx-4 mt-4 bg-black text-white hover:bg-gray-800">
          <PencilLine className="h-4 w-4 mr-2" /> New chat
        </Button>

        <ScrollArea className="flex-grow px-4 py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-medium mb-2 text-gray-500">Today</h3>
              <div className="space-y-1">
                {messages.length > 0 && (
                  <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                    <p className="text-xs truncate">
                      <Bot className="h-3 w-3 inline mr-1 text-purple-500" />
                      Current Chat
                    </p>
                  </div>
                )}
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs truncate">
                    <Bot className="h-3 w-3 inline mr-1 text-blue-500" />
                    Molecular Analysis
                  </p>
                </div>
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs truncate">
                    <Bot className="h-3 w-3 inline mr-1 text-green-500" />
                    Bose-Einstein Simulation
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium mb-2 text-gray-500">Previous 7 days</h3>
              <div className="space-y-1">
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs truncate">
                    <Bot className="h-3 w-3 inline mr-1 text-orange-500" />
                    Research question about...
                  </p>
                </div>
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs truncate">
                    <Bot className="h-3 w-3 inline mr-1 text-red-500" />
                    Protein folding analysis...
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium mb-2 text-gray-500">Capabilities</h3>
              <div className="space-y-1">
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs">Chat</p>
                </div>
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs">Molecular Vision</p>
                </div>
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs">LLAMPS</p>
                </div>
                <div className="bg-white/50 rounded-md p-2 hover:bg-white transition-colors">
                  <p className="text-xs">Bose-Einstein Simulation</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-white mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <img src="https://avatars.githubusercontent.com/u/124599?v=4" alt="User" />
            </Avatar>
            <div className="flex-1">
              <p className="text-xs font-medium truncate">{formatAddress(address)}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs px-2">
              Upgrade
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat info and actions */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">
              {scienceGent?.name || 'ScienceGent'} <Edit className="h-4 w-4 inline ml-1 text-gray-400" />
            </h2>
          </div>
          
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
        </div>
        
        {/* Persona display */}
        {showPersona && scienceGent?.persona && (
          <Card className="m-4 bg-slate-50">
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
        <ScrollArea className="flex-grow p-4">
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
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  Does Oxygen have paramagnetic behaviour in Bose-Einstein Condesate state?
                </p>
              </div>

              <div className="flex gap-3">
                <Avatar className="h-8 w-8 mt-1 bg-science-100">
                  <Bot className="h-4 w-4 text-science-500" />
                </Avatar>
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border">
                  <p className="font-medium text-sm mb-3">
                    {scienceGent?.name || 'ScienceGent'}
                  </p>
                  <div className="prose prose-sm max-w-none">
                    <p className="mb-4">Yes, oxygen (O₂) exhibits paramagnetic behavior under normal conditions due to its unpaired electrons. However, in a Bose-Einstein Condensate (BEC) state, the behavior becomes more complex:</p>
                    
                    <p className="mb-2">
                      <strong>Standard oxygen (O₂) molecules:</strong> Have two unpaired electrons giving them paramagnetic properties.
                    </p>
                    
                    <p className="mb-2">
                      <strong>In BEC state:</strong> Oxygen would need to be cooled to extremely low temperatures (near absolute zero). At these temperatures, the quantum mechanical properties dominate and all particles occupy the lowest quantum state.
                    </p>
                    
                    <p className="mb-2">
                      <strong>Quantum effects:</strong> The magnetic behavior in a BEC becomes governed by quantum statistics rather than classical paramagnetism.
                    </p>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm" className="h-7">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-7">
                      <ThumbsDown className="h-3 w-3 mr-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-7">
                      <Copy className="h-3 w-3 mr-1" />
                    </Button>
                  </div>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
        
        {/* Prompt Suggestions */}
        {showPrompts && (
          <div className="px-4 py-2 border-t">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-500">Suggested prompts</p>
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setShowPrompts(false)}>
                Hide Prompts
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((prompt, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInputMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <div className="p-4 border-t mt-auto">
          <div className="flex items-end gap-2">
            <Textarea
              ref={inputRef}
              placeholder={`Ask ${scienceGent?.name || 'this ScienceGent'} a question...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="resize-none flex-1"
              rows={1}
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                className="rounded-full w-10 h-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="20" cy="12" r="1"/></svg>
              </Button>
              <Button 
                type="submit" 
                onClick={handleSendMessage} 
                disabled={inputMessage.trim() === '' || isLoading}
                size="icon"
                className="rounded-full w-10 h-10"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <p className="text-xs text-gray-400">
              "{scienceGent?.name || 'ScienceGent'}" may produce inaccurate information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format address for display
const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.slice(-4)}`;
};

export default ScienceGentChat;
