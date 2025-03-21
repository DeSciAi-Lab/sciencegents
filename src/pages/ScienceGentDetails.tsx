
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowRight,
  Beaker,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Globe,
  Info,
  MessageSquare,
  RefreshCcw,
  Send,
  Share2,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Wallet,
  ArrowUpDown,
  BarChart3,
  AlertTriangle,
  Users,
  Activity,
  Zap,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import useScienceGentDetails, { LoadingStatus } from '@/hooks/useScienceGentDetails';
import { useTokenSwap } from '@/hooks/useTokenSwap';
import { connectWallet } from '@/services/walletService';

const initialMessages = [
  {
    id: '1',
    sender: 'ai',
    content: 'Hello! I am an AI assistant. How can I help you today?',
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
  
  const { scienceGent, status, isRefreshing, refreshData } = useScienceGentDetails(address);
  const {
    direction,
    ethAmount,
    tokenAmount,
    isCalculating,
    isProcessing,
    walletConnected,
    ethBalance,
    tokenBalance,
    toggleDirection,
    connectWallet: connectSwapWallet,
    handleEthAmountChange,
    handleTokenAmountChange,
    executeSwap
  } = useTokenSwap(address ?? '');

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => {
        setCopiedText('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedText]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoadingResponse(true);
    
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: `I can help with that. Let me analyze your question and provide some information about ${scienceGent?.name || 'this topic'}.`,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoadingResponse(false);
    }, 1500);
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (value: number) => {
    if (!value && value !== 0) return '$0.00';
    
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatTimeDuration = (seconds: number) => {
    if (!seconds) return 'N/A';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatEth = (ethAmount: number) => {
    if (!ethAmount && ethAmount !== 0) return '0 ETH';
    
    if (ethAmount >= 1000) {
      return `${(ethAmount / 1000).toFixed(2)}K ETH`;
    } else {
      return `${ethAmount.toFixed(4)} ETH`;
    }
  };

  if (status === LoadingStatus.Loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <Skeleton className="h-16 w-1/3 mb-4 bg-gray-800" />
              <Skeleton className="h-8 w-1/2 bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-64 w-full mb-6 bg-gray-800" />
                <Skeleton className="h-64 w-full bg-gray-800" />
              </div>
              <div>
                <Skeleton className="h-64 w-full mb-6 bg-gray-800" />
                <Skeleton className="h-64 w-full bg-gray-800" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (status === LoadingStatus.NotFound || status === LoadingStatus.Error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">ScienceGent Not Found</h1>
            <p className="text-gray-400 mb-6">
              The ScienceGent you're looking for could not be found or there was an error loading it.
            </p>
            <Button onClick={() => window.history.back()} variant="outline" className="border-cyan-600 text-cyan-400 hover:bg-cyan-950">
              Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Reveal>
            {/* Header section with token info */}
            <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-cyan-500 to-purple-600">
                    {scienceGent?.profile_pic ? (
                      <img 
                        src={scienceGent.profile_pic} 
                        alt={scienceGent.name} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      scienceGent?.name?.substring(0, 2).toUpperCase() || "SG"
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold">{scienceGent?.name}</h1>
                      <div className="flex items-center gap-1 text-xs font-medium text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded-full border border-cyan-800">
                        ${scienceGent?.symbol || "???"}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(scienceGent?.address || '', 'address')}
                          className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1 transition-colors"
                        >
                          {formatAddress(scienceGent?.address || '')}
                          {copiedText === 'address' ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      
                      {scienceGent?.website && (
                        <a 
                          href={scienceGent.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                        >
                          <Globe size={14} />
                          <span>Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow"></div>
                
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    className="gap-1.5 border-gray-700 hover:border-cyan-600 text-gray-300"
                    onClick={refreshData}
                    disabled={isRefreshing}
                    size="sm"
                  >
                    <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} />
                    <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-1.5 border-gray-700 hover:border-cyan-600 text-gray-300"
                    size="sm"
                  >
                    <Star size={14} className="text-yellow-500" />
                    <span>Favorite</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-1.5 border-gray-700 hover:border-cyan-600 text-gray-300"
                    size="sm"
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-1.5 border-gray-700 hover:border-cyan-600 text-gray-300"
                    onClick={() => window.open(`https://sepolia.etherscan.io/address/${scienceGent?.address}`, '_blank')}
                    size="sm"
                  >
                    <ExternalLink size={14} />
                    <span>Etherscan</span>
                  </Button>
                </div>
              </div>
              
              {/* Key Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-xs text-gray-400">Current Price</p>
                  <p className="text-xl font-bold">{formatCurrency(scienceGent?.token_price || 0)}</p>
                  <p className={`text-xs flex items-center ${(scienceGent?.price_change_24h || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp size={12} className="mr-1" />
                    {(scienceGent?.price_change_24h || 0) >= 0 ? '+' : ''}{scienceGent?.price_change_24h || 0}% (24h)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Market Cap</p>
                  <p className="text-xl font-bold">{formatCurrency(scienceGent?.market_cap || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Liquidity</p>
                  <p className="text-xl font-bold">{formatCurrency(scienceGent?.total_liquidity || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Capabilities</p>
                  <p className="text-xl font-bold">{scienceGent?.capabilities?.length || 0}</p>
                </div>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area - 3 columns */}
            <div className="lg:col-span-3">
              <Reveal delay={100}>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="bg-gray-800/50 border border-gray-700 p-1 mb-6 w-full overflow-x-auto">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400">
                      AI Chat
                    </TabsTrigger>
                    <TabsTrigger value="capabilities" className="data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400">
                      Capabilities
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400">
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger value="holders" className="data-[state=active]:bg-gray-700 data-[state=active]:text-cyan-400">
                      Holders
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="overview" className="space-y-6">
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Info size={18} className="text-cyan-400" />
                          About {scienceGent?.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">
                          {scienceGent?.description || 
                            `${scienceGent?.name} is a ScienceGent deployed on the DeSciAi platform. This AI agent has specialized scientific capabilities and an associated token that can be traded on the platform.`}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Activity size={18} className="text-cyan-400" />
                            Maturity Progress
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            Progress towards migration eligibility
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="font-medium">{scienceGent?.maturity_progress || 0}%</span>
                          </div>
                          <Progress 
                            value={scienceGent?.maturity_progress || 0} 
                            className="h-2 bg-gray-700" 
                          />
                          <div className="mt-4 text-sm text-gray-400">
                            <p>This ScienceGent will be eligible for migration to an external DEX when trading fees reach 2× the virtual ETH amount plus capability fees.</p>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-700/50 rounded-lg">
                              <p className="text-xs text-gray-400">Virtual ETH</p>
                              <p className="text-lg font-semibold">{formatEth(parseFloat(scienceGent?.virtual_eth?.toString() || '0'))}</p>
                            </div>
                            <div className="p-3 bg-gray-700/50 rounded-lg">
                              <p className="text-xs text-gray-400">Status</p>
                              <p className={`text-lg font-semibold flex items-center ${scienceGent?.migrationEligible ? 'text-green-500' : 'text-blue-500'}`}>
                                {scienceGent?.migrationEligible ? (
                                  <>
                                    <CheckCircle2 size={16} className="mr-1" />
                                    <span>Ready</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock size={16} className="mr-1" />
                                    <span>Pending</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Beaker size={18} className="text-cyan-400" />
                            Featured Capabilities
                          </CardTitle>
                          <CardDescription className="text-gray-400">
                            Key AI capabilities of this ScienceGent
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {scienceGent?.capabilities && scienceGent.capabilities.length > 0 ? (
                            <div className="space-y-3">
                              {scienceGent.capabilities.slice(0, 3).map((cap, index) => (
                                <div 
                                  key={cap.id}
                                  className="p-3 bg-gray-700/50 rounded-lg flex items-center gap-3 hover:bg-gray-700 transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400">
                                    <Beaker size={16} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-sm">{cap.capability_id || cap.id}</h3>
                                    <p className="text-xs text-gray-400">{cap.domain || "General"}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-400">No capabilities have been added yet.</p>
                          )}
                          
                          {scienceGent?.capabilities && scienceGent.capabilities.length > 3 && (
                            <div className="mt-4 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 gap-1"
                              >
                                <span>View All Capabilities</span>
                                <ArrowRight size={14} />
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Zap size={18} className="text-cyan-400" />
                          Market Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
                              <BarChart3 size={18} />
                            </div>
                            <p className="text-xl font-semibold">{formatCurrency(scienceGent?.stats?.volume_24h || 0)}</p>
                            <p className="text-xs text-gray-400">24h Volume</p>
                          </div>
                          
                          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
                              <Activity size={18} />
                            </div>
                            <p className="text-xl font-semibold">{scienceGent?.stats?.transactions || 0}</p>
                            <p className="text-xs text-gray-400">Transactions</p>
                          </div>
                          
                          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
                              <Users size={18} />
                            </div>
                            <p className="text-xl font-semibold">{scienceGent?.stats?.holders || 0}</p>
                            <p className="text-xs text-gray-400">Holders</p>
                          </div>
                          
                          <div className="p-4 bg-gray-700/50 rounded-lg text-center">
                            <div className="w-10 h-10 rounded-full bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
                              <PieChart size={18} />
                            </div>
                            <p className="text-xl font-semibold">{scienceGent?.total_supply ? Number(scienceGent.total_supply).toLocaleString() : 0}</p>
                            <p className="text-xs text-gray-400">Total Supply</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-700">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Token Age</span>
                            <span className="font-medium">{formatTimeDuration(scienceGent?.tokenAge || 0)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Created On</span>
                            <span className="font-medium">
                              {scienceGent?.created_on_chain_at ? new Date(scienceGent.created_on_chain_at).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Migration Status</span>
                            <span className={`font-medium ${scienceGent?.is_migrated ? 'text-green-500' : 'text-blue-500'} flex items-center gap-1`}>
                              {scienceGent?.is_migrated ? (
                                <>
                                  <CheckCircle2 size={14} />
                                  <span>Migrated</span>
                                </>
                              ) : (
                                <>
                                  <Clock size={14} />
                                  <span>Internal DEX</span>
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                
                  <TabsContent value="chat" className="space-y-6">
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg h-[600px] flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Brain size={18} className="text-cyan-400" />
                          Chat with {scienceGent?.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Ask questions about this ScienceGent's capabilities
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-grow overflow-y-auto p-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.sender === 'user'
                                  ? 'bg-cyan-700 text-white'
                                  : 'bg-gray-700 border border-gray-600'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                        
                        {isLoadingResponse && (
                          <div className="mb-4 flex justify-start">
                            <div className="bg-gray-700 border border-gray-600 max-w-[80%] p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse delay-300"></div>
                                <span className="text-sm text-gray-400">Thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0">
                        <div className="relative w-full">
                          <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask something..."
                            className="w-full pl-4 pr-12 py-3 border border-gray-600 rounded-full bg-gray-700/50 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors"
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isLoadingResponse}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                
                  <TabsContent value="capabilities" className="space-y-6">
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <CardTitle className="text-lg font-semibold">Capabilities</CardTitle>
                          <CardDescription className="text-gray-400">
                            All AI capabilities of this ScienceGent
                          </CardDescription>
                        </div>
                        {!scienceGent?.is_migrated && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-cyan-800 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/50"
                          >
                            <Sparkles size={14} className="mr-2" />
                            Add Capability
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {scienceGent?.capabilities && scienceGent.capabilities.length > 0 ? (
                            scienceGent.capabilities.map((cap) => (
                              <div 
                                key={cap.id}
                                className="p-4 border border-gray-700 rounded-xl bg-gray-800/30 hover:border-cyan-800 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-cyan-950 flex items-center justify-center text-cyan-400">
                                      <Beaker size={18} />
                                    </div>
                                    <div>
                                      <h3 className="font-medium">{cap.capability_id || cap.id}</h3>
                                      <p className="text-xs text-gray-400">{cap.domain || "General"}</p>
                                    </div>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-xs text-gray-400 hover:text-gray-100"
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12 border border-dashed border-gray-700 rounded-xl">
                              <Beaker size={32} className="mx-auto mb-3 text-gray-500" />
                              <p className="text-gray-400">No capabilities have been added yet.</p>
                              {!scienceGent?.is_migrated && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-4 border-cyan-800 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/50"
                                >
                                  <Sparkles size={14} className="mr-2" />
                                  Add First Capability
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                
                  <TabsContent value="stats" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 size={18} className="text-cyan-400" />
                            Liquidity Pool Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400">Token Reserve</span>
                              <span className="font-medium">{parseInt(scienceGent?.tokenReserve || '0').toLocaleString()} {scienceGent?.symbol}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400">ETH Reserve</span>
                              <span className="font-medium">{formatEth(parseFloat(scienceGent?.ethReserve || '0'))}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400">Virtual ETH</span>
                              <span className="font-medium">{formatEth(parseFloat(scienceGent?.virtual_eth?.toString() || '0'))}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400">Trading Enabled</span>
                              <span className={`font-medium ${scienceGent?.tradingEnabled ? 'text-green-500' : 'text-yellow-500'} flex items-center gap-1`}>
                                {scienceGent?.tradingEnabled ? (
                                  <>
                                    <CheckCircle2 size={16} />
                                    <span>Enabled</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle size={16} />
                                    <span>Disabled</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <Timer size={18} className="text-cyan-400" />
                            Maturity Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-400">Migration Progress</span>
                              <span className="font-medium">{scienceGent?.maturity_progress || 0}%</span>
                            </div>
                            <Progress 
                              value={scienceGent?.maturity_progress || 0} 
                              className="h-2 bg-gray-700" 
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0%</span>
                              <span>Target: 2x Virtual ETH</span>
                              <span>100%</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400 flex items-center gap-1">
                                <Calendar size={14} />
                                <span>Creation Date</span>
                              </span>
                              <span className="font-medium">
                                {scienceGent?.created_on_chain_at ? new Date(scienceGent.created_on_chain_at).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400 flex items-center gap-1">
                                <Clock size={14} />
                                <span>Token Age</span>
                              </span>
                              <span className="font-medium">
                                {formatTimeDuration(scienceGent?.tokenAge || 0)}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                              <span className="text-gray-400 flex items-center gap-1">
                                <Wallet size={14} />
                                <span>Migration Eligible</span>
                              </span>
                              <span className={`font-medium ${scienceGent?.migrationEligible ? 'text-green-500' : 'text-blue-500'} flex items-center gap-1`}>
                                {scienceGent?.migrationEligible ? (
                                  <>
                                    <CheckCircle2 size={14} />
                                    <span>Ready</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock size={14} />
                                    <span>Not Yet</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <TrendingUp size={18} className="text-cyan-400" />
                          Trading Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-green-950 flex items-center justify-center text-green-400 mb-3">
                              <BarChart3 size={18} />
                            </div>
                            <span className="text-xl font-semibold">{formatCurrency(scienceGent?.stats?.volume_24h || 0)}</span>
                            <span className="text-sm text-gray-400">24h Volume</span>
                          </div>
                          
                          <div className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-blue-950 flex items-center justify-center text-blue-400 mb-3">
                              <Activity size={18} />
                            </div>
                            <span className="text-xl font-semibold">{scienceGent?.stats?.transactions || 0}</span>
                            <span className="text-sm text-gray-400">Total Transactions</span>
                          </div>
                          
                          <div className="flex flex-col items-center p-4 bg-gray-700/50 rounded-lg">
                            <div className="w-10 h-10 rounded-full bg-purple-950 flex items-center justify-center text-purple-400 mb-3">
                              <Users size={18} />
                            </div>
                            <span className="text-xl font-semibold">{scienceGent?.stats?.holders || 0}</span>
                            <span className="text-sm text-gray-400">Token Holders</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="holders" className="space-y-6">
                    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Users size={18} className="text-cyan-400" />
                          Token Holders
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Top addresses holding {scienceGent?.symbol} tokens
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {/* Sample data - would need to be replaced with real data */}
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                                1
                              </div>
                              <div>
                                <p className="text-sm font-medium">{formatAddress(scienceGent?.creator_address || '')}</p>
                                <p className="text-xs text-gray-400">Creator</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{scienceGent?.total_supply ? (Number(scienceGent.total_supply) * 0.01).toLocaleString() : 0}</p>
                              <p className="text-xs text-gray-400">1% of supply</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                                2
                              </div>
                              <div>
                                <p className="text-sm font-medium">Liquidity Pool</p>
                                <p className="text-xs text-gray-400">Contract</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{scienceGent?.total_supply ? (Number(scienceGent.total_supply) * 0.99).toLocaleString() : 0}</p>
                              <p className="text-xs text-gray-400">99% of supply</p>
                            </div>
                          </div>
                          
                          <div className="text-center py-4 text-gray-400">
                            <p>Detailed holder data is available after migration to external DEX</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </Reveal>
            </div>
            
            {/* Sidebar - 1 column */}
            <div className="lg:col-span-1">
              <Reveal delay={150}>
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold">Token Price</CardTitle>
                    <CardDescription className="text-gray-400">
                      Current market data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-4 flex items-baseline">
                      ${(scienceGent?.token_price || 0).toFixed(6)}
                      <span className={`ml-2 text-sm font-medium px-2 py-0.5 rounded-full ${(scienceGent?.price_change_24h || 0) >= 0 ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
                        {(scienceGent?.price_change_24h || 0) >= 0 ? '+' : ''}{scienceGent?.price_change_24h || 0}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-400">Market Cap</p>
                        <p className="font-medium">{formatCurrency(scienceGent?.market_cap || 0)}</p>
                      </div>
                      <div className="p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-400">Liquidity</p>
                        <p className="font-medium">{formatCurrency(scienceGent?.total_liquidity || 0)}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-700/50 rounded-lg space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Token Symbol</span>
                        <span>{scienceGent?.symbol}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Total Supply</span>
                        <span>{scienceGent?.total_supply ? Number(scienceGent.total_supply).toLocaleString() : 0}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Contract</span>
                        <button 
                          onClick={() => handleCopy(scienceGent?.address || '', 'contract')}
                          className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                        >
                          {formatAddress(scienceGent?.address || '')}
                          {copiedText === 'contract' ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-cyan-800 text-cyan-400 hover:bg-cyan-900/50"
                      onClick={() => window.open(`https://sepolia.etherscan.io/token/${scienceGent?.address}`, '_blank')}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      View on Etherscan
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
              
              <Reveal delay={200}>
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <ArrowUpDown size={16} className="mr-2 text-cyan-400" />
                      Swap
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Trade {scienceGent?.symbol} tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">From</span>
                          <span className="text-xs text-gray-400">
                            Balance: {direction === 'buy' 
                              ? `${parseFloat(ethBalance).toFixed(4)} ETH` 
                              : `${parseFloat(tokenBalance).toFixed(4)} ${scienceGent?.symbol}`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={direction === 'buy' ? ethAmount : tokenAmount}
                            onChange={(e) => direction === 'buy' 
                              ? handleEthAmountChange(e.target.value)
                              : handleTokenAmountChange(e.target.value)
                            }
                            className="w-full text-lg bg-transparent outline-none border-0 p-0 focus-visible:ring-0"
                            disabled={isProcessing || isCalculating}
                          />
                          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                            <div className={`w-5 h-5 rounded-full ${direction === 'buy' 
                              ? 'bg-gray-600 text-gray-300' 
                              : 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold'}`}>
                              {direction === 'buy' 
                                ? '' 
                                : scienceGent?.symbol?.substring(0, 2).toUpperCase() || "??"}
                            </div>
                            <span>{direction === 'buy' ? 'ETH' : scienceGent?.symbol || "????"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center hover:bg-gray-600 transition-colors"
                          onClick={toggleDirection}
                          disabled={isProcessing}
                        >
                          <ArrowUpDown size={16} className="text-gray-300" />
                        </button>
                      </div>
                      
                      <div className="p-3 rounded-lg border border-gray-700 bg-gray-800/50">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">To</span>
                          <span className="text-xs text-gray-400">
                            Balance: {direction === 'buy' 
                              ? `${parseFloat(tokenBalance).toFixed(4)} ${scienceGent?.symbol}` 
                              : `${parseFloat(ethBalance).toFixed(4)} ETH`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={direction === 'buy' ? tokenAmount : ethAmount}
                            onChange={(e) => direction === 'buy' 
                              ? handleTokenAmountChange(e.target.value)
                              : handleEthAmountChange(e.target.value)
                            }
                            className="w-full text-lg bg-transparent outline-none border-0 p-0 focus-visible:ring-0"
                            disabled={isProcessing || isCalculating}
                          />
                          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                            <div className={`w-5 h-5 rounded-full ${direction === 'buy' 
                              ? 'bg-gradient-to-br from-cyan-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold'
                              : 'bg-gray-600 text-gray-300'}`}>
                              {direction === 'buy' 
                                ? scienceGent?.symbol?.substring(0, 2).toUpperCase() || "??" 
                                : ''}
                            </div>
                            <span>{direction === 'buy' ? scienceGent?.symbol || "????" : 'ETH'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 mb-4 p-3 bg-gray-700/30 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span>Slippage Tolerance</span>
                        <span>1.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trading Fee</span>
                        <span>5.0%</span>
                      </div>
                      {isCalculating && (
                        <div className="mt-2 flex items-center justify-center text-xs text-gray-400">
                          <span className="mr-2">Calculating...</span>
                          <div className="animate-spin h-3 w-3 border-2 border-cyan-500 rounded-full border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    
                    {walletConnected ? (
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                        onClick={executeSwap}
                        disabled={
                          isProcessing || 
                          isCalculating || 
                          !ethAmount || 
                          !tokenAmount || 
                          parseFloat(ethAmount) <= 0 || 
                          parseFloat(tokenAmount) <= 0
                        }
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <span className="mr-2">Processing...</span>
                            <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                          </div>
                        ) : (
                          direction === 'buy' ? 'Buy Tokens' : 'Sell Tokens'
                        )}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                        onClick={connectSwapWallet}
                      >
                        Connect Wallet to Swap
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
              
              <Reveal delay={250}>
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm text-gray-100 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Brain size={18} className="text-cyan-400" />
                      About ScienceGents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-300 mb-4">
                      ScienceGents are AI agents deployed on the DeSciAi platform. Each ScienceGent has its own ERC20 token and specialized scientific capabilities.
                    </p>
                    <div className="flex justify-between text-sm mb-2 pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Platform</span>
                      <span>DeSciAi</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2 pb-2 border-b border-gray-700">
                      <span className="text-gray-400">Type</span>
                      <span>{scienceGent?.domain || "General"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Creator</span>
                      <a 
                        href={`https://sepolia.etherscan.io/address/${scienceGent?.creator_address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        {formatAddress(scienceGent?.creator_address || '')}
                      </a>
                    </div>
                  </CardContent>
                </Card>
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
