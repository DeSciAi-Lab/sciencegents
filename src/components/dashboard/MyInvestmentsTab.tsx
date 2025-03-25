
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { useUserDashboard } from '@/hooks/useUserDashboard';

const InvestmentSummary = ({ totalInvested, profitLoss }: { totalInvested: string, profitLoss: string }) => {
  const isProfitable = !profitLoss.startsWith('-');
  
  return (
    <div className="flex gap-6 mb-8">
      <div className="bg-gray-100 px-6 py-4 rounded-lg">
        <div className="text-3xl font-bold">{totalInvested}</div>
        <div className="text-sm text-muted-foreground">Total Invested</div>
      </div>
      
      <div className={`px-6 py-4 rounded-lg ${isProfitable ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className={`text-3xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
          {profitLoss}
        </div>
        <div className="text-sm text-muted-foreground">Profit and loss</div>
      </div>
    </div>
  );
};

const renderRating = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={16} 
        className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const renderMaturityProgress = (progress: number) => {
  return (
    <div className="w-full max-w-[150px]">
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full rounded-full bg-blue-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const MyInvestmentsTab: React.FC = () => {
  const { isLoading, userInvestments } = useUserDashboard();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
          <CardDescription>Track your ScienceGent token investments and trading history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 mb-8">
            <Skeleton className="h-24 w-40" />
            <Skeleton className="h-24 w-40" />
          </div>
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  // If no investments, show empty state
  if (!userInvestments || userInvestments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Investments</CardTitle>
          <CardDescription>Track your ScienceGent token investments and trading history</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentSummary totalInvested="0" profitLoss="0" />
          
          <h3 className="text-xl font-bold mb-4">Tokens I hold</h3>
          
          <div className="text-center py-12 text-muted-foreground">
            <p>You don't have any ScienceGent tokens yet.</p>
            <p className="mt-2 text-sm">Explore the marketplace and invest in AI agents.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate total invested and profit/loss
  const totalInvested = userInvestments.reduce((acc, inv) => acc + inv.balanceUSD, 0);
  // Mock profit/loss calculation - in a real app, would need historical data
  const profitLoss = "+5.2k";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Investments</CardTitle>
        <CardDescription>Track your ScienceGent token investments and trading history</CardDescription>
      </CardHeader>
      <CardContent>
        <InvestmentSummary 
          totalInvested={`${Math.round(totalInvested)}k`} 
          profitLoss={profitLoss}
        />
        
        <h3 className="text-xl font-bold mb-4">Tokens I hold</h3>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[40px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[60px]">Logo</TableHead>
                <TableHead className="w-[250px]">NAME</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Market cap</TableHead>
                <TableHead>24h Chg</TableHead>
                <TableHead>24h vol</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Domain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInvestments.map((investment, index) => (
                <TableRow 
                  key={investment.tokenAddress}
                  className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="py-2">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {investment.tokenSymbol ? investment.tokenSymbol.charAt(0) : 'D'}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {investment.tokenName}
                        <Badge variant="outline" className="bg-gray-100 text-xs">
                          curated
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">${investment.tokenSymbol}</span>
                        <span className="text-xs text-gray-400">
                          {investment.tokenAddress.substring(0, 6)}...{investment.tokenAddress.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">1 day</TableCell>
                  <TableCell className="py-2">18k</TableCell>
                  <TableCell className="py-2 text-green-600">+7%</TableCell>
                  <TableCell className="py-2">14k</TableCell>
                  <TableCell className="py-2">21k DSI</TableCell>
                  <TableCell className="py-2">{investment.tokenPrice?.toFixed(3) || '0.023'}</TableCell>
                  <TableCell className="py-2">{renderRating(4)}</TableCell>
                  <TableCell className="py-2">{renderMaturityProgress(60)}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant="outline" className="bg-gray-50">
                      {investment.domain?.toLowerCase() || 'chemistry'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <h3 className="text-xl font-bold my-6">Trades</h3>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-[40px]">Logo</TableHead>
                <TableHead className="w-[250px]">NAME</TableHead>
                <TableHead>Bought at</TableHead>
                <TableHead>Market cap</TableHead>
                <TableHead>24h Chg</TableHead>
                <TableHead>24h vol</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Domain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userInvestments.map((investment, index) => (
                <TableRow 
                  key={`trade-${investment.tokenAddress}`}
                  className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {investment.tokenSymbol ? investment.tokenSymbol.charAt(0) : 'D'}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium">{investment.tokenName}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">${investment.tokenSymbol}</span>
                        <span className="text-xs text-gray-400">
                          {investment.tokenAddress.substring(0, 6)}...{investment.tokenAddress.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">1 day</TableCell>
                  <TableCell className="py-2">18k</TableCell>
                  <TableCell className="py-2 text-green-600">+7%</TableCell>
                  <TableCell className="py-2">14k</TableCell>
                  <TableCell className="py-2">21k DSI</TableCell>
                  <TableCell className="py-2">{investment.tokenPrice?.toFixed(3) || '0.023'}</TableCell>
                  <TableCell className="py-2">{renderRating(4)}</TableCell>
                  <TableCell className="py-2">{renderMaturityProgress(60)}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant="outline" className="bg-gray-50">
                      {investment.domain?.toLowerCase() || 'chemistry'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyInvestmentsTab;
