
import React, { useState } from 'react';
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Wallet, Beaker, Sparkles, Loader2, ChevronRight, ArrowRight, 
  Copy, ExternalLink, Star, Clock, Settings, FileText, Upload, Plus
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistance } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    account,
    isLoading,
    isConnected,
    userScienceGents,
    userCapabilities,
    userInvestments,
    connectWallet
  } = useUserDashboard();
  
  const [developerProfile, setDeveloperProfile] = useState({
    name: '',
    email: '',
    bio: '',
    twitter: '',
    telegram: '',
    github: '',
    website: '',
    profilePicture: null
  });
  
  const [selectedScienceGent, setSelectedScienceGent] = useState(null);
  const [agentFee, setAgentFee] = useState(2);
  const [personaInstructions, setPersonaInstructions] = useState('');
  const [capabilityIdToAdd, setCapabilityIdToAdd] = useState('');
  const [capabilityIdToRemove, setCapabilityIdToRemove] = useState('');
  
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const [integrationGuide, setIntegrationGuide] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  
  const portfolioValue = userInvestments.reduce((sum, investment) => sum + investment.balanceUSD, 0);
  const profitLoss = portfolioValue * 0.07; // Example profit calculation
  
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  };
  
  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    // You could add a toast here to show it was copied
  };
  
  const handleFileUpload = (event, setter) => {
    if (event.target.files && event.target.files[0]) {
      setter(event.target.files[0]);
    }
  };
  
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  if (!isConnected) {
    return (
      <NavbarLayout>
        <div className="container py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-blue-100 p-6">
                <Wallet className="h-10 w-10 text-science-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-8">
              Connect your wallet to view your ScienceGents dashboard, including your investments,
              created ScienceGents, and capabilities.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-science-600 hover:bg-science-700 text-white" 
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </NavbarLayout>
    );
  }

  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                {account ? account.substring(2, 4).toUpperCase() : "UN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">User Dashboard</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{account}</span>
                <button onClick={() => handleCopyAddress(account)}>
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="sciencegents">My ScienceGents</TabsTrigger>
            <TabsTrigger value="capabilities">My Capabilities</TabsTrigger>
            <TabsTrigger value="profile">Developer Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investments">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Invested</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{portfolioValue.toFixed(0)}k</div>
                    <p className="text-muted-foreground text-sm">Value in USD</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Profit and Loss</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(1)}k
                    </div>
                    <p className="text-muted-foreground text-sm">Overall P&L</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tokens I Hold</CardTitle>
                  <CardDescription>Your ScienceGent token holdings</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : userInvestments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Logo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Market Cap</TableHead>
                          <TableHead>24h Chg</TableHead>
                          <TableHead>24h Vol</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Maturity</TableHead>
                          <TableHead>Domain</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userInvestments.map((investment) => (
                          <TableRow key={investment.tokenAddress}>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                  {investment.tokenSymbol.substring(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div>{investment.tokenName}</div>
                              <div className="text-xs text-muted-foreground">${investment.tokenSymbol}</div>
                              <div className="text-xs flex items-center">
                                <Badge variant="outline" className="mr-1">curated</Badge>
                                {formatAddress(investment.tokenAddress)}
                              </div>
                            </TableCell>
                            <TableCell>1 day</TableCell>
                            <TableCell>18k</TableCell>
                            <TableCell className="text-green-600">+7%</TableCell>
                            <TableCell>14k</TableCell>
                            <TableCell>21k DSI</TableCell>
                            <TableCell>0.023</TableCell>
                            <TableCell>{renderRating(4)}</TableCell>
                            <TableCell>
                              <Progress value={75} className="h-2 w-20" />
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">chemistry</Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/sciencegent/${investment.tokenAddress}`)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <div className="bg-muted rounded-full p-3 mb-4 inline-block">
                        <Beaker className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">No Investments Found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You don&apos;t own any ScienceGent tokens yet.
                      </p>
                      <Button onClick={() => navigate('/sciencegents')}>
                        Explore ScienceGents
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trades</CardTitle>
                  <CardDescription>Your recent trading activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {userInvestments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Logo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Bought at</TableHead>
                          <TableHead>Market Cap</TableHead>
                          <TableHead>24h Chg</TableHead>
                          <TableHead>24h Vol</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Maturity</TableHead>
                          <TableHead>Domain</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userInvestments.map((investment) => (
                          <TableRow key={`trade-${investment.tokenAddress}`}>
                            <TableCell>
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                  {investment.tokenSymbol.substring(0, 1)}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div>{investment.tokenName}</div>
                              <div className="text-xs text-muted-foreground">${investment.tokenSymbol}</div>
                              <div className="text-xs">{formatAddress(investment.tokenAddress)}</div>
                            </TableCell>
                            <TableCell>1 day</TableCell>
                            <TableCell>18k</TableCell>
                            <TableCell className="text-green-600">+7%</TableCell>
                            <TableCell>14k</TableCell>
                            <TableCell>21k DSI</TableCell>
                            <TableCell>0.023</TableCell>
                            <TableCell>{renderRating(4)}</TableCell>
                            <TableCell>
                              <Progress value={75} className="h-2 w-20" />
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">chemistry</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No trading activity yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sciencegents">
            {selectedScienceGent ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedScienceGent(null)}
                  >
                    Back to List
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedScienceGent.isMigrated ? "default" : "outline"}>
                      {selectedScienceGent.isMigrated ? "Migrated" : "Internal DEX"}
                    </Badge>
                    <Button
                      onClick={() => navigate(`/sciencegent/${selectedScienceGent.address}`)}
                    >
                      View Token Page
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                      {selectedScienceGent.symbol ? selectedScienceGent.symbol.substring(0, 1) : "S"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedScienceGent.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{selectedScienceGent.symbol}</span>
                      <Badge variant="outline" className="ml-2">{formatAddress(selectedScienceGent.address)}</Badge>
                      <button onClick={() => handleCopyAddress(selectedScienceGent.address)}>
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Token Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 p-2 bg-gray-50 rounded-md">
                          <div className="text-xs text-muted-foreground">Users</div>
                          <div className="font-medium">1273</div>
                        </div>
                        <div className="space-y-1 p-2 bg-gray-50 rounded-md">
                          <div className="text-xs text-muted-foreground">Interactions</div>
                          <div className="font-medium">1273</div>
                        </div>
                        <div className="space-y-1 p-2 bg-gray-50 rounded-md">
                          <div className="text-xs text-muted-foreground">Revenue</div>
                          <div className="font-medium">1273</div>
                        </div>
                        <div className="space-y-1 p-2 bg-gray-50 rounded-md">
                          <div className="text-xs text-muted-foreground">Holders</div>
                          <div className="font-medium">265</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Maturity Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-center text-lg font-medium">{selectedScienceGent.maturityProgress}%</div>
                        <Progress value={selectedScienceGent.maturityProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          Migration condition: trading fee {'>='}  2x virtualETH + capability fees
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Capabilities</CardTitle>
                    <CardDescription>
                      5 Capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-white border hover:bg-gray-100">Chat</Badge>
                      <Badge className="bg-white border hover:bg-gray-100">Molecular Vision</Badge>
                      <Badge className="bg-white border hover:bg-gray-100">LLAMPS</Badge>
                      <Badge className="bg-white border hover:bg-gray-100">Bose-Einstein Simulation</Badge>
                      <Badge className="bg-white border hover:bg-gray-100">more</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Update</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="font-medium">1. Update Agent Fee per interaction (in DSI)</div>
                        <div className="flex gap-2">
                          <Input 
                            type="number"
                            placeholder="e.g. 3" 
                            value={agentFee}
                            onChange={(e) => setAgentFee(Number(e.target.value))}
                            className="max-w-xs"
                          />
                          <Button>Update</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="font-medium">2. Update Persona</div>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="new custom instructions to set Persona" 
                            value={personaInstructions}
                            onChange={(e) => setPersonaInstructions(e.target.value)}
                            className="max-w-md"
                          />
                          <Button>Update</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="font-medium">3. Add and Remove a capability from Sciencegent</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex gap-2">
                            <Input 
                              placeholder="capability ID" 
                              value={capabilityIdToAdd}
                              onChange={(e) => setCapabilityIdToAdd(e.target.value)}
                            />
                            <Button>Add</Button>
                          </div>
                          <div className="flex gap-2">
                            <Input 
                              placeholder="capability ID" 
                              value={capabilityIdToRemove}
                              onChange={(e) => setCapabilityIdToRemove(e.target.value)}
                            />
                            <Button variant="destructive">Remove</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                  [1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))
                ) : userScienceGents.length > 0 ? (
                  [...userScienceGents, null].map((scienceGent, index) => 
                    scienceGent ? (
                      <Card 
                        key={scienceGent.address} 
                        className="cursor-pointer hover:border-blue-300 transition-all"
                        onClick={() => setSelectedScienceGent(scienceGent)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                  {scienceGent.symbol ? scienceGent.symbol.substring(0, 1) : "S"}
                                </AvatarFallback>
                              </Avatar>
                              <div>{scienceGent.name}</div>
                            </div>
                            <Badge variant={scienceGent.isMigrated ? "default" : "outline"}>
                              {scienceGent.isMigrated ? "Migrated" : "Internal DEX"}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <div>{scienceGent.symbol}</div>
                            <div className="text-xs ml-2 text-gray-500">
                              {formatAddress(scienceGent.address)}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Market Cap:</span>
                              <span>${scienceGent.marketCap.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Trading:</span>
                              <span>{scienceGent.tradingEnabled ? "Enabled" : "Disabled"}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Maturity:</span>
                              <span>{scienceGent.maturityProgress}%</span>
                            </div>
                            <Progress value={scienceGent.maturityProgress} className="h-1.5" />
                          </div>
                          <Button
                            className="w-full mt-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/sciencegent/${scienceGent.address}`);
                            }}
                          >
                            Manage
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card 
                        key="create-new"
                        className="flex flex-col items-center justify-center p-6 h-full border-dashed"
                        onClick={() => navigate('/create-sciencegent')}
                      >
                        <Sparkles className="h-8 w-8 mb-4 text-science-500" />
                        <h3 className="text-lg font-medium mb-2">Create New ScienceGent</h3>
                        <p className="text-sm text-center text-muted-foreground mb-4">
                          Launch your own AI agent with token and capabilities.
                        </p>
                        <Button onClick={() => navigate('/create-sciencegent')}>
                          Create ScienceGent
                        </Button>
                      </Card>
                    )
                  )
                ) : (
                  <Card className="col-span-full text-center py-8">
                    <div className="bg-muted rounded-full p-3 mb-4 inline-block mx-auto">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No ScienceGents Created</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven&apos;t created any ScienceGent tokens yet.
                    </p>
                    <Button onClick={() => navigate('/create-sciencegent')} className="mx-auto">
                      Create ScienceGent
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="capabilities">
            {selectedCapability ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCapability(null)}
                  >
                    Back to List
                  </Button>
                  <Button
                    onClick={() => navigate(`/capability/${selectedCapability.id}`)}
                  >
                    View Capability Page
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl">
                      {selectedCapability.name.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCapability.name}</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedCapability.id}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Agents using</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">67800 DSI</div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="flex justify-center">{renderRating(4.3)}</div>
                        <div className="text-sm text-muted-foreground mt-1">Rating</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Update the SDKs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="font-medium">Documentation (optional)</div>
                        <div 
                          className="border border-dashed rounded-md p-6 flex items-center justify-center cursor-pointer"
                          onClick={() => document.getElementById('docUpload').click()}
                        >
                          <input
                            id="docUpload"
                            type="file"
                            hidden
                            onChange={(e) => handleFileUpload(e, setDocumentation)}
                          />
                          <div className="flex flex-col items-center">
                            <Plus className="h-6 w-6 text-muted-foreground mb-2" />
                            <div className="text-sm text-muted-foreground">
                              {documentation ? documentation.name : "No file chosen (under 2MB)"}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Detailed documentation about your capability's functionality, limitations, and use cases.
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  This documentation will help users understand how to use your capability effectively.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="font-medium">Integration Guide (optional)</div>
                        <div 
                          className="border border-dashed rounded-md p-6 flex items-center justify-center cursor-pointer"
                          onClick={() => document.getElementById('guideUpload').click()}
                        >
                          <input
                            id="guideUpload"
                            type="file"
                            hidden
                            onChange={(e) => handleFileUpload(e, setIntegrationGuide)}
                          />
                          <div className="flex flex-col items-center">
                            <Plus className="h-6 w-6 text-muted-foreground mb-2" />
                            <div className="text-sm text-muted-foreground">
                              {integrationGuide ? integrationGuide.name : "No file chosen (under 2MB)"}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center">
                                  <FileText className="h-3 w-3 mr-1" />
                                  Provide step-by-step instructions for integrating your capability.
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  This guide will help developers integrate your capability into their applications.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button>
                          Update Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                  [1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))
                ) : userCapabilities.length > 0 ? (
                  [...userCapabilities, null].map((capability, index) => 
                    capability ? (
                      <Card 
                        key={capability.id} 
                        className="cursor-pointer hover:border-blue-300 transition-all overflow-hidden"
                        onClick={() => setSelectedCapability(capability)}
                      >
                        <div className="aspect-video bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                          <Avatar className="h-16 w-16 shadow-sm">
                            <AvatarFallback className="bg-white text-indigo-600 text-2xl">
                              {capability.name.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle>{capability.name}</CardTitle>
                          <CardDescription className="truncate">{capability.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Price</span>
                              <span className="font-medium">0.2 ETH</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>usage</span>
                              <span>{capability.usageCount}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>rating</span>
                              <div>{renderRating(4.1)}</div>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>revenue</span>
                              <span>{capability.revenue} ETH</span>
                            </div>
                            <div className="mt-2">
                              <Badge variant="outline" className="bg-purple-50">{capability.domain}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card 
                        key="create-new"
                        className="flex flex-col items-center justify-center p-6 h-full border-dashed"
                        onClick={() => navigate('/create-capability')}
                      >
                        <Beaker className="h-8 w-8 mb-4 text-science-500" />
                        <h3 className="text-lg font-medium mb-2">Create New Capability</h3>
                        <p className="text-sm text-center text-muted-foreground mb-4">
                          Create a new capability for ScienceGents to use.
                        </p>
                        <Button onClick={() => navigate('/create-capability')}>
                          Create Capability
                        </Button>
                      </Card>
                    )
                  )
                ) : (
                  <Card className="col-span-full text-center py-8">
                    <div className="bg-muted rounded-full p-3 mb-4 inline-block mx-auto">
                      <Beaker className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No Capabilities Created</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven&apos;t created any capabilities yet.
                    </p>
                    <Button onClick={() => navigate('/create-capability')} className="mx-auto">
                      Create Capability
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Developer Profile</CardTitle>
                <CardDescription>
                  Your public profile information that will be displayed on capabilities and ScienceGents you create.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Display Name</label>
                        <Input 
                          value={developerProfile.name}
                          onChange={(e) => setDeveloperProfile({...developerProfile, name: e.target.value})}
                          placeholder="Your name or pseudonym"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email (not publicly visible)</label>
                        <Input 
                          type="email"
                          value={developerProfile.email}
                          onChange={(e) => setDeveloperProfile({...developerProfile, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <Input 
                          value={developerProfile.bio}
                          onChange={(e) => setDeveloperProfile({...developerProfile, bio: e.target.value})}
                          placeholder="Brief description about yourself as a developer"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Twitter</label>
                          <Input 
                            value={developerProfile.twitter}
                            onChange={(e) => setDeveloperProfile({...developerProfile, twitter: e.target.value})}
                            placeholder="@username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Telegram</label>
                          <Input 
                            value={developerProfile.telegram}
                            onChange={(e) => setDeveloperProfile({...developerProfile, telegram: e.target.value})}
                            placeholder="@username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">GitHub</label>
                          <Input 
                            value={developerProfile.github}
                            onChange={(e) => setDeveloperProfile({...developerProfile, github: e.target.value})}
                            placeholder="username"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Website</label>
                          <Input 
                            value={developerProfile.website}
                            onChange={(e) => setDeveloperProfile({...developerProfile, website: e.target.value})}
                            placeholder="https://yourdomain.com"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Profile Picture</label>
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-32 w-32">
                            <AvatarFallback className="text-2xl">
                              {developerProfile.name ? developerProfile.name[0].toUpperCase() : account?.substring(2, 4).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline" onClick={() => document.getElementById('profileUpload')?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                          <input
                            id="profileUpload"
                            type="file"
                            hidden
                            onChange={(e) => handleFileUpload(e, (file) => setDeveloperProfile({...developerProfile, profilePicture: file}))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Profile</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NavbarLayout>
  );
};

export default Dashboard;
