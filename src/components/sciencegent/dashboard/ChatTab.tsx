
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatTabProps {
  address: string;
  scienceGent: any;
}

const ChatTab: React.FC<ChatTabProps> = ({ address, scienceGent }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `Hello! I'm ${scienceGent?.name || 'ScienceGent'}. How can I assist you with your scientific questions today?` 
    }
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', content: message }]);
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I'm a simulated response to "${message}". In a real implementation, this would be processed by the AI agent with capabilities selected for this ScienceGent.` 
      }]);
      setIsLoading(false);
    }, 1500);
    
    // Clear input
    setMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const agentName = scienceGent?.name || 'ScienceGent';
  const firstLetter = agentName.charAt(0).toUpperCase();
  
  return (
    <div className="flex flex-col h-[600px] p-4">
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar className={`h-8 w-8 ${msg.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                {msg.role === 'user' ? (
                  <>
                    <AvatarFallback className="bg-blue-500 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src={scienceGent?.profile_pic} />
                    <AvatarFallback className="bg-purple-500 text-white">
                      {firstLetter}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8 bg-purple-500">
                <AvatarFallback className="bg-purple-500 text-white">
                  {firstLetter}
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-gray-100">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto flex gap-2">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatTab;
