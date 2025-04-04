import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight, RefreshCw, ArrowDown, ArrowUp, Copy, ExternalLink } from "lucide-react";
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import ScienceGentDetailView from './ScienceGentDetailView';
import { formatNumber, formatPercent, shortenNumber } from '@/utils/formatters';
import { useEthPriceContext } from '@/context/EthPriceContext';

const MyCreatedScienceGents: React.FC = () => {
  const { isLoading, userScienceGents, refreshData } = useUserDashboard();
  const navigate = useNavigate();
  const [selectedScienceGent, setSelectedScienceGent] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { ethPrice } = useEthPriceContext();
  const [sortBy, setSortBy] = useState<string>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Sort the user's ScienceGents based on the selected column and order
  const sortedScienceGents = [...userScienceGents].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a];
    const bValue = b[sortBy as keyof typeof b];
    
    if (aValue === undefined || bValue === undefined) {
      return 0;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? 
        aValue.localeCompare(bValue) : 
        bValue.localeCompare(aValue);
    }
    
    return 0;
  });
  
  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };
  
  // Render column header with sort indicator
  const renderSortableHeader = (label: string, column: string) => {
    const isSorted = sortBy === column;
    
    return (
      <button 
        className="flex items-center space-x-1 font-medium" 
        onClick={() => handleSortChange(column)}
      >
        <span>{label}</span>
        {isSorted ? (
          sortOrder === 'asc' ? 
            <ArrowUp className="h-4 w-4" /> : 
            <ArrowDown className="h-4 w-4" />
        ) : null}
      </button>
    );
  };
  
  // Render star rating (1-5)
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

  // Render maturity progress
  const renderMaturityProgress = (progress: number | undefined) => {
    const displayProgress = progress ?? 0;
  return (
    <div className="w-full max-w-[150px]">
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full rounded-full bg-blue-500" 
            style={{ width: `${displayProgress}%` }}
        />
      </div>
        <div className="text-xs text-gray-500 text-center mt-1">
          {displayProgress.toFixed(2)}%
      </div>
    </div>
  );
};

  // Truncate address display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 4)}`;
  };

  // Copy address to clipboard
  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  // Format Market Cap display
  const formatMarketCap = (value: number): string => {
    if (value === 0) return '$0.00';
    
    if (value < 1000) {
      return `$${value.toFixed(2)}`;
    } else if (value < 1000000) {
      return `$${(value / 1000).toFixed(2)}k`;
    } else if (value < 1000000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
  };

  // Format price with proper precision
  const formatPrice = (value: number): string => {
    if (value === 0) return '$0.00000000';
    
    // Use more decimal places for very small values
    if (value < 0.0001) {
      return `$${value.toFixed(9)}`;
    } else if (value < 0.01) {
      return `$${value.toFixed(6)}`;
    } else if (value < 1) {
      return `$${value.toFixed(4)}`;
    }
    
    return `$${value.toFixed(2)}`;
  };

  // Format 24h volume 
  const formatVolume = (value: number): string => {
    if (value === 0) return '$0.00';
    
    if (value < 10) {
      return `$${value.toFixed(2)}`;
    } else if (value < 1000) {
      return `$${value.toFixed(2)}`;
    } else if (value < 10000) {
      return `$${value.toFixed(2)}`;
    } else {
      // For larger values, use k/M formatting
      return formatMarketCap(value);
    }
  };
  
  // Loading row placeholder
  const renderLoadingRow = () => (
    <TableRow>
      <TableCell colSpan={11} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg className="animate-spin h-6 w-6 text-gray-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading ScienceGents...</p>
        </div>
      </TableCell>
    </TableRow>
  );
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
          <CardTitle>My Created ScienceGents</CardTitle>
          <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
          </div>
          <Button variant="outline" size="sm" disabled>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-y border-gray-200">
                  <TableHead className="w-[80px]">Logo</TableHead>
                  <TableHead className="w-[250px]">NAME</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Maturity</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Market cap</TableHead>
                  <TableHead>24h Chg</TableHead>
                  <TableHead>24h vol</TableHead>
                  <TableHead>Price (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderLoadingRow()}
              </TableBody>
            </Table>
          </div>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
          <CardTitle>My Created ScienceGents</CardTitle>
          <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
        <CardTitle>My Created ScienceGents</CardTitle>
        <CardDescription>Manage your created ScienceGent tokens and AI agents</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-y border-gray-200">
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead className="w-[250px]">
                  {renderSortableHeader('NAME', 'name')}
                </TableHead>
                <TableHead>{renderSortableHeader('Age', 'age')}</TableHead>
                <TableHead>{renderSortableHeader('Revenue', 'collectedFees')}</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>{renderSortableHeader('Market cap', 'marketCap')}</TableHead>
                <TableHead>24h Chg</TableHead>
                <TableHead>24h vol</TableHead>
                <TableHead>{renderSortableHeader('Price', 'tokenPrice')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedScienceGents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    <p className="text-gray-500">No ScienceGents found</p>
                  </TableCell>
                </TableRow>
              ) : (
                sortedScienceGents.map((gent) => {
                  // Convert ETH values to USD
                  const marketCapUsd = gent.marketCap ? gent.marketCap * ethPrice : 0;
                  
                  return (
                    <TableRow 
                      key={gent.address}
                      className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                      onClick={() => setSelectedScienceGent(gent.address)}
                    >
                      <TableCell>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                            gent.profilePic 
                              ? '' 
                              : 'bg-purple-600'
                          }`}
                        >
                          {gent.profilePic ? (
                            <img 
                              src={gent.profilePic} 
                              alt={gent.name} 
                              className="w-full h-full object-cover rounded-full"
                              loading="lazy" 
                            />
                          ) : (
                            gent.symbol.charAt(0)
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium flex items-center gap-1">
                            {gent.name} <span className="text-gray-600">${gent.symbol}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                              {truncateAddress(gent.address)}
                              <button 
                                onClick={(e) => copyToClipboard(e, gent.address)} 
                                className="ml-1 text-gray-400 hover:text-gray-600"
                              >
                                <Copy size={12} />
                              </button>
                            </span>
                            {gent.isMigrated && (
                              <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-50">
                                curated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{gent.age || '1 day'}</TableCell>
                      <TableCell>{formatNumber(gent.collectedFees || 0, 0)} DSI</TableCell>
                      <TableCell>{renderRating(gent.rating)}</TableCell>
                      <TableCell>{renderMaturityProgress(gent.maturityProgress)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {(gent as any).domain || 'general science'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatMarketCap(marketCapUsd)}</TableCell>
                      <TableCell className={`${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercent(gent.priceChange24h)}
                      </TableCell>
                      <TableCell>{formatVolume(gent.volume24h || 0)}</TableCell>
                      <TableCell>{formatPrice(gent.tokenPriceUsd || 0)}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCreatedScienceGents;
