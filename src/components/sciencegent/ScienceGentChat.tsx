import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, User, Trash2, ExternalLink, Info, Search, Edit, ThumbsUp, ThumbsDown, PencilLine, Copy, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import useScienceGentChat from '@/hooks/useScienceGentChat';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
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
import RatingScienceGent from './RatingScienceGent';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface ScienceGentChatProps {
  scienceGent: any;
  address: string;
}

// Function to generate prompt suggestions based on the ScienceGent's persona
const generatePromptSuggestions = async (persona: string, name: string) => {
  try {
    // Default suggestions in case the API call fails
    const defaultSuggestions = [
      "What research areas do you specialize in?",
      "Can you explain your core capabilities?",
      "How can you help with scientific research?",
      "What's your background in science?"
    ];
    
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using default suggestions');
      return defaultSuggestions;
    }
    
    const truncatedPersona = persona?.substring(0, 500) || `A scientific assistant named ${name} specializing in research and academic work`;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You generate relevant prompt suggestions for users to ask an AI assistant. Provide 4 short, specific questions (under 50 characters each) that would be interesting to ask this assistant based on their persona.'
          },
          {
            role: 'user',
            content: `Generate 4 interesting prompt suggestions for users to ask an AI assistant with this persona: "${truncatedPersona}". Make the suggestions concise, specific, and focused on the assistant's expertise areas.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      console.error('Error generating prompt suggestions:', await response.text());
      return defaultSuggestions;
    }
    
    const data = await response.json();
    const suggestionsText = data.choices[0].message.content;
    
    // Parse the response - expected format is a list of 4 suggestions
    // We'll handle various formats including numbered lists, bullet points, etc.
    let suggestions = suggestionsText
      .split(/\d+\.\s|\n-\s|\n\*\s|\n/)  // Split by common list formats
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 60);  // Filter empty strings and long suggestions
    
    // If we couldn't extract 4 suggestions, use the defaults
    if (suggestions.length < 2) {
      return defaultSuggestions;
    }
    
    // Limit to 4 suggestions
    return suggestions.slice(0, 4);
  } catch (error) {
    console.error('Error generating prompt suggestions:', error);
    return [
      "What research areas do you specialize in?",
      "Can you explain your core capabilities?",
      "How can you help with scientific research?",
      "What's your background in science?"
    ];
  }
};

const ScienceGentChat: React.FC<ScienceGentChatProps> = ({ scienceGent, address }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showPrompts, setShowPrompts] = useState(true);
  const { messages, isLoading, sendMessage, clearChat, isInitializing, hasAssistant } = useScienceGentChat(address, scienceGent);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hasRated, setHasRated] = useState(false);
  const [shouldShowRating, setShouldShowRating] = useState(false);
  const [capabilityNames, setCapabilityNames] = useState<string[]>([]);
  const [promptSuggestions, setPromptSuggestions] = useState<string[]>([
    "What research areas do you specialize in?",
    "Can you explain your core capabilities?",
    "How can you help with scientific research?",
    "What's your background in science?"
  ]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  // Add state for tracking message feedback
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

  // Generate prompt suggestions based on persona
  useEffect(() => {
    const fetchPromptSuggestions = async () => {
      if (!scienceGent?.persona) return;
      
      setIsLoadingSuggestions(true);
      try {
        const suggestions = await generatePromptSuggestions(
          scienceGent.persona,
          scienceGent?.name || 'ScienceGent'
        );
        setPromptSuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching prompt suggestions:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };
    
    fetchPromptSuggestions();
  }, [scienceGent?.persona, scienceGent?.name]);

  // Check if user has already rated and if they've chatted
  useEffect(() => {
    // Check if user has already rated this ScienceGent
    const userHasRated = localStorage.getItem(`rated_${address}`) === 'true';
    setHasRated(userHasRated);
    
    // Determine if we should show the rating component
    // Only show after first message and if not already rated
    const hasMessages = messages.length > 0 && messages.some(m => m.role === 'user');
    setShouldShowRating(hasMessages && !userHasRated);
  }, [address, messages]);

  // Fetch capability names if needed
  useEffect(() => {
    const fetchCapabilityNames = async () => {
      try {
        console.log('Attempting to fetch capabilities for ScienceGent with address:', address);
        
        // Get the capability IDs associated with this ScienceGent
        const { data: capabilityLinks, error: linksError } = await supabase
          .from('sciencegent_capabilities')
          .select('capability_id')
          .eq('sciencegent_address', address);
          
        if (linksError) {
          console.error('Error fetching capability links:', linksError);
          return;
        }
        
        if (!capabilityLinks || capabilityLinks.length === 0) {
          console.log('No capabilities found for this ScienceGent');
          return;
        }
        
        // Extract the capability IDs
        const capabilityIds = capabilityLinks.map(link => link.capability_id);
        console.log('Found capability IDs:', capabilityIds);
        
        // Fetch the detailed information for each capability
        // Using a SQL query to ensure we get the name field
        const { data: capabilities, error: capabilitiesError } = await supabase
          .from('capabilities')
          .select('id, name, description')
          .in('id', capabilityIds);
        
        if (capabilitiesError) {
          console.error('Error fetching capability details:', capabilitiesError);
          return;
        }
        
        console.log('Raw capabilities data from database:', capabilities);
        
        if (capabilities && capabilities.length > 0) {
          // Extract just the names from the capabilities data
          const names = capabilities.map(cap => cap.name || cap.id);
          console.log('Extracted capability names:', names);
          setCapabilityNames(names);
        } else {
          console.log('No capability details found in database');
        }
      } catch (err) {
        console.error('Error processing capabilities:', err);
      }
    };
    
    if (address) {
      console.log('Fetching capabilities for address:', address);
      fetchCapabilityNames();
    }
  }, [address]);

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

  const capabilitiesCount = scienceGent?.capabilities?.length || 0;

  // Handle the thumbs up action
  const handleThumbsUp = (messageId: string) => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === 'like' ? null : 'like'
    }));
  };

  // Handle the thumbs down action
  const handleThumbsDown = (messageId: string) => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === 'dislike' ? null : 'dislike'
    }));
  };

  // Handle the copy to clipboard action
  const handleCopy = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopyStatus(prev => ({ ...prev, [messageId]: true }));
        toast({
          title: "Copied to clipboard",
          duration: 2000
        });
        
        // Reset copy status after 2 seconds
        setTimeout(() => {
          setCopyStatus(prev => ({ ...prev, [messageId]: false }));
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Failed to copy",
          description: "Please try again",
          variant: "destructive",
          duration: 2000
        });
      });
  };

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
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border overflow-hidden">
      <div className="h-[700px] flex flex-col">
        {/* Header with capabilities */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">
              {scienceGent?.name || 'ScienceGent'}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Display capabilities in the header */}
            <div className="flex items-center mr-4 flex-wrap">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-2 mb-1">
                Chat: Active
              </Badge>
              {capabilityNames.map((capability, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 mr-2 mb-1">
                  {capability}: Inactive
                </Badge>
              ))}
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
        </div>
        
        {/* Messages Area */}
        <ScrollArea className="flex-grow p-4 relative">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={message.id || index}>
                  {message.role === 'user' ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                        {message.content}
                </p>
              </div>
                  ) : (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 mt-1 bg-science-100">
                  <Bot className="h-4 w-4 text-science-500" />
                </Avatar>
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border">
                  <p className="font-medium text-sm mb-3">
                    {scienceGent?.name || 'ScienceGent'}
                  </p>
                        <div className="prose prose-sm prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-pre:bg-gray-100 prose-pre:p-2 prose-pre:rounded prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:text-gray-700 max-w-none">
                          <ReactMarkdown className="break-words">
                            {message.content}
                          </ReactMarkdown>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`h-7 ${messageFeedback[message.id || index] === 'like' ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
                            onClick={() => handleThumbsUp(message.id || index.toString())}
                          >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                    </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`h-7 ${messageFeedback[message.id || index] === 'dislike' ? 'bg-red-100 text-red-700 border-red-200' : ''}`}
                            onClick={() => handleThumbsDown(message.id || index.toString())}
                          >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                    </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7"
                            onClick={() => handleCopy(message.id || index.toString(), message.content)}
                          >
                            {copyStatus[message.id || index] ? 
                              <Check className="h-3 w-3 mr-1 text-green-500" /> : 
                      <Copy className="h-3 w-3 mr-1" />
                            }
                    </Button>
                  </div>
                </div>
              </div>
                  )}
                </div>
              ))}
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
              {isLoadingSuggestions ? (
                <div className="w-full flex justify-center py-2">
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                promptSuggestions.map((prompt, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setInputMessage(prompt)}
                >
                  {prompt}
                </Button>
                ))
              )}
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
