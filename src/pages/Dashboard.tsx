
import React from 'react';
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScienceGentCard } from '@/components/ui/ScienceGentCard';
import { Wallet, Beaker, Sparkles, Loader2, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { NavbarLayout } from '@/components/layout/NavbarLayout';

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
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Manage your ScienceGents, investments, and capabilities.</p>
        
        <Tabs defaultValue="investments" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="sciencegents">My ScienceGents</TabsTrigger>
            <TabsTrigger value="capabilities">My Capabilities</TabsTrigger>
          </TabsList>
          
          {/* Investments Tab */}
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>Token Investments</CardTitle>
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
                  <div className="divide-y">
                    {userInvestments.map((investment) => (
                      <div key={investment.tokenAddress} className="py-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{investment.tokenName} ({investment.tokenSymbol})</h3>
                          <div className="text-sm text-muted-foreground">
                            {parseFloat(investment.balance).toFixed(4)} tokens (≈${investment.balanceUSD.toFixed(2)})
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/sciencegent/${investment.tokenAddress}`)}
                        >
                          View Token
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-muted rounded-full p-3 mb-4 inline-block">
                      <Beaker className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No Investments Found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't own any ScienceGent tokens yet.
                    </p>
                    <Button onClick={() => navigate('/sciencegents')}>
                      Explore ScienceGents
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* ScienceGents Tab */}
          <TabsContent value="sciencegents">
            <Card>
              <CardHeader>
                <CardTitle>My ScienceGents</CardTitle>
                <CardDescription>ScienceGents created by you</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-64 w-full" />
                    ))}
                  </div>
                ) : userScienceGents.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {userScienceGents.map((scienceGent) => (
                      <div key={scienceGent.address} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{scienceGent.name}</h3>
                          <Badge variant={scienceGent.isMigrated ? "default" : "outline"}>
                            {scienceGent.isMigrated ? "Migrated" : "Internal DEX"}
                          </Badge>
                        </div>
                        <div className="text-sm mb-2">{scienceGent.symbol}</div>
                        <div className="space-y-3 mb-4">
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
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => navigate(`/sciencegent/${scienceGent.address}`)}
                        >
                          Manage
                        </Button>
                      </div>
                    ))}
                    <div className="border rounded-lg p-6 flex flex-col items-center justify-center bg-muted/30">
                      <Sparkles className="h-8 w-8 mb-4 text-science-500" />
                      <h3 className="text-lg font-medium mb-2">Create New ScienceGent</h3>
                      <p className="text-sm text-center text-muted-foreground mb-4">
                        Launch your own AI agent with token and capabilities.
                      </p>
                      <Button onClick={() => navigate('/create-sciencegent')}>
                        Create ScienceGent
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-muted rounded-full p-3 mb-4 inline-block">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No ScienceGents Created</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't created any ScienceGent tokens yet.
                    </p>
                    <Button onClick={() => navigate('/create-sciencegent')}>
                      Create ScienceGent
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Capabilities Tab */}
          <TabsContent value="capabilities">
            <Card>
              <CardHeader>
                <CardTitle>My Capabilities</CardTitle>
                <CardDescription>Capabilities created by you</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : userCapabilities.length > 0 ? (
                  <div className="space-y-4">
                    {userCapabilities.map((capability) => (
                      <div
                        key={capability.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{capability.name}</h3>
                          <Badge variant="outline">{capability.domain}</Badge>
                        </div>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">ID:</span>
                            <span className="font-mono">{capability.id}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Usage:</span>
                            <span>{capability.usageCount} usages</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Revenue:</span>
                            <span>{capability.revenue} ETH</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => navigate(`/capability/${capability.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                    <div className="border rounded-lg p-6 flex flex-col items-center justify-center bg-muted/30">
                      <Beaker className="h-8 w-8 mb-4 text-science-500" />
                      <h3 className="text-lg font-medium mb-2">Create New Capability</h3>
                      <p className="text-sm text-center text-muted-foreground mb-4">
                        Create a new capability for ScienceGents to use.
                      </p>
                      <Button onClick={() => navigate('/create-capability')}>
                        Create Capability
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-muted rounded-full p-3 mb-4 inline-block">
                      <Beaker className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">No Capabilities Created</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't created any capabilities yet.
                    </p>
                    <Button onClick={() => navigate('/create-capability')}>
                      Create Capability
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NavbarLayout>
  );
};

export default Dashboard;
