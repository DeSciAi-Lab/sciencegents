
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ChevronRight } from "lucide-react";
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import ScienceGentDetailView from './ScienceGentDetailView';

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

const MyCreatedScienceGents: React.FC = () => {
  const { isLoading, userScienceGents } = useUserDashboard();
  const navigate = useNavigate();
  const [selectedScienceGent, setSelectedScienceGent] = useState<string | null>(null);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Created ScienceGents</CardTitle>
          <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  // If viewing a single ScienceGent detail
  if (selectedScienceGent) {
    const scienceGent = userScienceGents.find(sg => sg.address === selectedScienceGent);
    if (scienceGent) {
      return (
        <ScienceGentDetailView 
          scienceGent={scienceGent} 
          onBack={() => setSelectedScienceGent(null)} 
        />
      );
    }
  }
  
  // If no ScienceGents, show empty state
  if (!userScienceGents || userScienceGents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Created ScienceGents</CardTitle>
          <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>You haven't created any ScienceGents yet.</p>
            <p className="mt-2 text-sm">Create your first AI agent and start earning.</p>
            <Button
              className="mt-6"
              onClick={() => navigate('/create-sciencegent')}
            >
              Create ScienceGent
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Created ScienceGents</CardTitle>
        <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
      </CardHeader>
      <CardContent>
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
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userScienceGents.map((scienceGent, index) => (
                <TableRow 
                  key={scienceGent.address}
                  className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                >
                  <TableCell className="py-2">
                    <Checkbox onClick={(e) => e.stopPropagation()} />
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {scienceGent.symbol ? scienceGent.symbol.charAt(0) : 'D'}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {scienceGent.name}
                        {index === 0 && (
                          <Badge variant="outline" className="bg-gray-100 text-xs">
                            curated
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="font-semibold">${scienceGent.symbol}</span>
                        <span className="text-xs text-gray-400">
                          {scienceGent.address.substring(0, 6)}...{scienceGent.address.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">1 day</TableCell>
                  <TableCell className="py-2">{scienceGent.marketCap}k</TableCell>
                  <TableCell className="py-2 text-green-600">+7%</TableCell>
                  <TableCell className="py-2">14k</TableCell>
                  <TableCell className="py-2">21k DSI</TableCell>
                  <TableCell className="py-2">{scienceGent.tokenPrice?.toFixed(3) || '0.023'}</TableCell>
                  <TableCell className="py-2">{renderRating(4)}</TableCell>
                  <TableCell className="py-2">{renderMaturityProgress(scienceGent.maturityProgress || 60)}</TableCell>
                  <TableCell className="py-2">
                    <Badge variant="outline" className="bg-gray-50">
                      {scienceGent.description?.toLowerCase() || 'chemistry'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedScienceGent(scienceGent.address)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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

export default MyCreatedScienceGents;
