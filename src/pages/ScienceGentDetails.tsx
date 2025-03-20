import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowRight, 
  Beaker, 
  Brain, 
  ChevronDown, 
  Clock, 
  Copy, 
  DollarSign, 
  ExternalLink, 
  Globe, 
  Info, 
  MessageSquare, 
  Send, 
  TrendingUp,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';

// Mock ScienceGent data for demo
const mockGentData = {
  id: '1',
  name: 'SpectrumAI',
  address: '0x1a2b3c4d5e6f7g8h9i0j',
  description: 'SpectrumAI is a specialized AI agent for spectroscopy analysis, molecular visualization, and chemical reaction prediction. It helps researchers analyze spectral data, visualize molecular structures, and predict chemical reactions with high accuracy.',
  profilePic: null,
  website: 'https://spectrumai.example',
  socials: {
    twitter: 'https://twitter.com/spectrumai',
    github: 'https://github.com/spectrumai'
  },
  marketCap: 450000,
  tokenPrice: 0.00235,
  priceChange24h: 3.7,
  totalLiquidity: 85000,
  age: '3 months',
  roi: 18.7,
  maturityProgress: 42,
  domain: 'Chemistry',
  capabilities: [
    { name: 'Molecule Visualization', id: 'mol-viz', domain: 'Chemistry' },
    { name: 'Spectroscopy Analysis', id: 'spec-analysis', domain: 'Chemistry' },
    { name: 'Reaction Simulation', id: 'react-sim', domain: 'Chemistry' }
  ],
  stats: {
    volume24h: 12500,
    transactions: 867,
    holders: 124
  },
  creator: '0x9a8b7c6d5e4f3g2h1i0j',
  created: '2023-11-15T12:00:00Z'
};

// Mock chat messages
const initialMessages = [
  {
    id: '1',
    sender: 'ai',
    content: 'Hello! I am SpectrumAI, your chemistry research assistant. How can I help you today?',
    timestamp: new Date().toISOString()
  }
];

const ScienceGentDetails = () => {
  const { address } = useParams<{ address: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset copied text after 2 seconds
  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => {
        setCopiedText('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoadingResponse(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `As SpectrumAI, I can help analyze that. Based on chemical principles, the spectroscopy data you're asking about could indicate the presence of carbonyl groups. Would you like me to provide a more detailed analysis of potential molecular structures?`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoadingResponse(false);
    }, 1500);
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header with basic info */}
          <Reveal>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-science-400 to-science-600">
                    {mockGentData.profilePic ? (
                      <img 
                        src={mockGentData.profilePic} 
                        alt={mockGentData.name} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      mockGentData.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold">{mockGentData.name}</h1>
                      <div className="flex items-center gap-1 text-xs font-medium text-science-700 bg-science-50 px-2 py-1 rounded-full">
                        <Beaker size={12} />
                        <span>{mockGentData.domain}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(mockGentData.address, 'address')}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                          {formatAddress(mockGentData.address)}
                          {copiedText === 'address' ? (
                            <span className="text-green-600 text-xs">Copied!</span>
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      
                      {mockGentData.website && (
                        <a 
                          href={mockGentData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-science-600 flex items-center gap-1"
                        >
                          <Globe size={14} />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow" />
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-1.5 border-science-200">
                    <Info size={16} />
                    <span>Token Info</span>
                  </Button>
                  <Button className="bg-science-600 hover:bg-science-700 text-white gap-1.5">
                    <MessageSquare size={16} />
                    <span>Chat with AI</span>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - AI info and interaction */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <Reveal delay={100}>
                <div className="mb-6 border-b border-border">
                  <div className="flex overflow-x-auto hidden-scrollbar">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'overview'
                          ? 'border-science-600 text-science-700'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('chat')}
                      className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'chat'
                          ? 'border-science-600 text-science-700'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      AI Chat
                    </button>
                    <button
                      onClick={() => setActiveTab('capabilities')}
                      className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                        activeTab === 'capabilities'
                          ? 'border-science-600 text-science-700'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Capabilities
                    </button>
                  </div>
                </div>
              </Reveal>
              
              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <Reveal delay={150}>
                    <div className="glass-card p-6">
                      <h2 className="text-lg font-semibold mb-3">About</h2>
                      <p className="text-muted-foreground">
                        {mockGentData.description}
                      </p>
                    </div>
                  </Reveal>
                  
                  <Reveal delay={200}>
                    <div className="glass-card p-6">
                      <h2 className="text-lg font-semibold mb-4">Featured Capabilities</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mockGentData.capabilities.map((cap, index) => (
                          <div 
                            key={cap.id}
                            className="p-4 bg-white rounded-xl border border-border hover:border-science-200 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-science-50 flex items-center justify-center text-science-700 mb-3">
                              <Beaker size={18} />
                            </div>
                            <h3 className="font-medium mb-1">{cap.name}</h3>
                            <p className="text-xs text-muted-foreground">{cap.domain}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setActiveTab('capabilities')}
                          className="text-science-700 hover:text-science-800 hover:bg-science-50 gap-1"
                        >
                          <span>View All Capabilities</span>
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                  
                  <Reveal delay={250}>
                    <div className="glass-card p-6">
                      <h2 className="text-lg font-semibold mb-4">Maturity Progress</h2>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress towards migration</span>
                        <span className="font-medium">{mockGentData.maturityProgress}%</span>
                      </div>
                      <Progress 
                        value={mockGentData.maturityProgress} 
                        className="h-2 bg-secondary" 
                      />
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>This ScienceGent will be eligible for migration to an external DEX when trading fees reach 2× the virtual ETH amount plus capability fees.</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              )}
              
              {activeTab === 'chat' && (
                <Reveal delay={150}>
                  <div className="glass-card p-6 h-[600px] flex flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Brain size={18} className="text-science-600" />
                        Chat with {mockGentData.name}
                      </h2>
                      <Button variant="ghost" size="sm" className="text-xs">
                        Clear Chat
                      </Button>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-grow overflow-y-auto mb-4 p-2">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-science-600 text-white'
                                : 'bg-white border border-border'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      
                      {isLoadingResponse && (
                        <div className="mb-4 flex justify-start">
                          <div className="bg-white border border-border max-w-[80%] p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-science-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-science-500 rounded-full animate-pulse delay-150"></div>
                              <div className="w-2 h-2 bg-science-600 rounded-full animate-pulse delay-300"></div>
                              <span className="text-sm text-muted-foreground">Thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Input */}
                    <div className="relative">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask a question..."
                        className="w-full pl-4 pr-12 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-science-500/20 focus:border-science-500 transition-colors"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoadingResponse}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-science-600 text-white disabled:bg-science-400 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              )}
              
              {activeTab === 'capabilities' && (
                <Reveal delay={150}>
                  <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Capabilities</h2>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs border-science-200"
                      >
                        <Sparkles size={14} className="mr-1 text-science-600" />
                        Add Capability
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {mockGentData.capabilities.map((cap) => (
                        <div 
                          key={cap.id}
                          className="p-4 border border-border rounded-xl hover:border-science-200 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                                <Beaker size={18} />
                              </div>
                              <div>
                                <h3 className="font-medium">{cap.name}</h3>
                                <p className="text-xs text-muted-foreground">{cap.domain}</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
            
            {/* Right column - Token info and trading */}
            <div>
              {/* Token Price Card */}
              <Reveal delay={150}>
                <div className="glass-card p-6 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Token Price</h2>
                    <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${mockGentData.priceChange24h >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {mockGentData.priceChange24h >= 0 ? '+' : ''}{mockGentData.priceChange24h}% (24h)
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold mb-4">
                    ${mockGentData.tokenPrice.toFixed(6)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                      <p className="font-medium">{formatCurrency(mockGentData.marketCap)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Liquidity</p>
                      <p className="font-medium">{formatCurrency(mockGentData.totalLiquidity)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              {/* Trading Card */}
              <Reveal delay={200}>
                <div className="glass-card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Swap</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">From</span>
                        <span className="text-xs text-muted-foreground">Balance: 0.5 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <input
                          type="number"
                          placeholder="0.0"
                          className="w-full text-lg bg-transparent outline-none"
                        />
                        <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-gray-400" />
                          <span>ETH</span>
                          <ChevronDown size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center">
                        <ArrowUpDown size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                    
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">To</span>
                        <span className="text-xs text-muted-foreground">Balance: 150 {mockGentData.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <input
                          type="number"
                          placeholder="0.0"
                          className="w-full text-lg bg-transparent outline-none"
                        />
                        <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-science-400 to-science-600 text-white flex items-center justify-center text-xs font-bold">
                            {mockGentData.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span>{mockGentData.name.substring(0, 4).toUpperCase()}</span>
                          <ChevronDown size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Slippage Tolerance</span>
                      <span>0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Trading Fee</span>
                      <span>5%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-science-600 hover:bg-science-700 text-white">
                    Connect Wallet to Swap
                  </Button>
                </div>
              </Reveal>
              
              {/* Stats Card */}
              <Reveal delay={250}>
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Token Stats</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <DollarSign size={16} />
                        </div>
                        <span>24h Volume</span>
                      </div>
                      <span className="font-medium">{formatCurrency(mockGentData.stats.volume24h)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <Clock size={16} />
                        </div>
                        <span>Transactions</span>
                      </div>
                      <span className="font-medium">{mockGentData.stats.transactions}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <TrendingUp size={16} />
                        </div>
                        <span>Capability ROI</span>
                      </div>
                      <span className={`font-medium ${mockGentData.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {mockGentData.roi >= 0 ? '+' : ''}{mockGentData.roi}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <Brain size={16} />
                        </div>
                        <span>Capabilities</span>
                      </div>
                      <span className="font-medium">{mockGentData.capabilities.length}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScienceGentDetails;
