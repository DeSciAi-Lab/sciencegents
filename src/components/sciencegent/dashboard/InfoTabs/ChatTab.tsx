
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface ChatTabProps {
  scienceGent: any;
  address: string;
}

const ChatTab: React.FC<ChatTabProps> = ({ scienceGent, address }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "system", content: "Hello! I'm your ScienceGent AI assistant. How can I help you today?" }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    const newUserMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    
    // Clear input
    setMessage("");
    
    // TODO: Implement actual AI response logic
    // Mock AI response for now
    setTimeout(() => {
      const aiResponse = { 
        role: "system", 
        content: "I'm a placeholder response. In the full implementation, I would process your query and provide a helpful scientific answer."
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Chat with {scienceGent?.name || "ScienceGent"}</CardTitle>
        <CardDescription>Ask questions and get scientific insights</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-4 pb-0">
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${chat.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className={chat.role === "user" ? "bg-blue-100" : "bg-purple-100"}>
                  {chat.role === "user" ? "U" : scienceGent?.symbol?.substring(0, 1) || "S"}
                </AvatarFallback>
              </Avatar>
              <div className={`rounded-lg px-4 py-2 ${
                chat.role === "user" 
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}>
                {chat.content}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-4">
        <form onSubmit={handleSendMessage} className="w-full flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatTab;
