
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavbarLayout from '@/components/layout/NavbarLayout';
import { 
  fetchScienceGents, 
  filterScienceGents, 
  sortScienceGents,
  type ScienceGentListItem
} from '@/services/scienceGentExploreService';
import { Skeleton } from '@/components/ui/skeleton';
import { syncAllScienceGents } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scienceGents, setScienceGents] = useState<ScienceGentListItem[]>([]);
  const [filteredGents, setFilteredGents] = useState<ScienceGentListItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState<keyof ScienceGentListItem>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch science gents on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters and sorting when data, filter, or sort options change
  useEffect(() => {
    const filtered = filterScienceGents(scienceGents, searchQuery, activeFilter);
    const sorted = sortScienceGents(filtered, sortBy, sortOrder);
    setFilteredGents(sorted);
    setTotalResults(sorted.length);

    // Reset to first page when filters change
    setPage(1);
  }, [scienceGents, searchQuery, activeFilter, sortBy, sortOrder]);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchScienceGents();
      setScienceGents(data);
    } catch (error) {
      console.error("Error fetching ScienceGents:", error);
      toast({
        title: "Error",
        description: "Failed to load ScienceGents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger a sync with blockchain
  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await syncAllScienceGents();
      await fetchData(); // Refresh data after sync
      toast({
        title: "Sync Complete",
        description: "ScienceGents have been synced from the blockchain"
      });
    } catch (error) {
      console.error("Sync failed:", error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync ScienceGents from the blockchain",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle sort order and column
  const handleSortChange = (column: keyof ScienceGentListItem) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Handle clearing all filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSortBy('marketCap');
    setSortOrder('desc');
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredGents.slice(startIndex, endIndex);
  };

  // Render star rating (1-5)
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  // Render maturity progress
  const renderMaturityProgress = (status: string) => {
    return (
      <div className="w-full max-w-[150px]">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full ${status === 'Ready' ? 'bg-blue-500' : status === 'Migrated' ? 'bg-green-500' : 'bg-purple-500'}`} 
            style={{ width: status === 'Migrated' ? '100%' : status === 'Ready' ? '80%' : '30%' }}
          />
        </div>
      </div>
    );
  };

  // Generate skeleton for loading state
  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
    </div>
  );

  return (
    <NavbarLayout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Explore ScienceGents</h1>
        
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and action buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              
              <div className="flex gap-3 ml-auto">
                <Button 
                  variant="outline"
                  className="border-purple-300 text-purple-700"
                  onClick={() => navigate('/create-sciencegent')}
                >
                  Create ScienceGent
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-purple-300 text-purple-700"
                  onClick={() => navigate('/create-capability')}
                >
                  Create Capability
                </Button>
                
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {}}
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleSortChange('marketCap')}
              >
                Market cap {sortBy === 'marketCap' && (sortOrder === 'asc' ? <ChevronDown className="h-4 w-4 rotate-180" /> : <ChevronDown className="h-4 w-4" />)}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleSortChange('age')}
              >
                Age {sortBy === 'age' && (sortOrder === 'asc' ? <ChevronDown className="h-4 w-4 rotate-180" /> : <ChevronDown className="h-4 w-4" />)}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleSortChange('revenue')}
              >
                Revenue {sortBy === 'revenue' && (sortOrder === 'asc' ? <ChevronDown className="h-4 w-4 rotate-180" /> : <ChevronDown className="h-4 w-4" />)}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Curation <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Maturity <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Roles <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                Domain <ChevronDown className="h-4 w-4" />
              </Button>
              
              {(searchQuery || activeFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-sm"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Results Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              {renderSkeleton()}
            </div>
          ) : filteredGents.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">
                        <Checkbox />
                      </th>
                      <th className="p-4 text-left font-medium">Logo</th>
                      <th className="p-4 text-left font-medium">NAME</th>
                      <th className="p-4 text-left font-medium">Age</th>
                      <th className="p-4 text-left font-medium">Market cap</th>
                      <th className="p-4 text-left font-medium">24h Chg</th>
                      <th className="p-4 text-left font-medium">24h vol</th>
                      <th className="p-4 text-left font-medium">Revenue</th>
                      <th className="p-4 text-left font-medium">Price</th>
                      <th className="p-4 text-left font-medium">Rating</th>
                      <th className="p-4 text-left font-medium">Maturity</th>
                      <th className="p-4 text-left font-medium">Domain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentPageItems().map((gent) => (
                      <tr 
                        key={gent.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/sciencegent/${gent.address}`)}
                      >
                        <td className="p-4">
                          <Checkbox onClick={(e) => e.stopPropagation()} />
                        </td>
                        <td className="p-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-purple-500">
                            {gent.profilePic ? (
                              <img 
                                src={gent.profilePic} 
                                alt={gent.name} 
                                className="w-full h-full object-cover rounded-full" 
                              />
                            ) : (
                              gent.symbol.substring(0, 1)
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {gent.name} ${gent.symbol}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="text-xs font-mono">
                                {gent.address.substring(0, 11)}...{gent.address.slice(-4)}
                              </span>
                              {gent.isCurated && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  curated
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">{gent.age}</td>
                        <td className="p-4 text-gray-700">{formatValue(gent.marketCap)}</td>
                        <td className={`p-4 ${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {gent.priceChange24h > 0 ? '+' : ''}{gent.priceChange24h}%
                        </td>
                        <td className="p-4 text-gray-700">{formatValue(gent.volume24h)}</td>
                        <td className="p-4 text-gray-700">{formatValue(gent.revenue)} DSI</td>
                        <td className="p-4 text-gray-700">{gent.tokenPrice.toFixed(3)}</td>
                        <td className="p-4">{renderRating(gent.rating)}</td>
                        <td className="p-4">{renderMaturityProgress(gent.maturityStatus)}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">{gent.domain.toLowerCase()}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Show 1 to {Math.min(page * itemsPerPage, totalResults)} of {totalResults} results
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[...Array(Math.min(5, Math.ceil(totalResults / itemsPerPage)))].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      className={page === i + 1 ? "bg-purple-600" : ""}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  {Math.ceil(totalResults / itemsPerPage) > 5 && (
                    <>
                      <span>...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(Math.ceil(totalResults / itemsPerPage))}
                      >
                        {Math.ceil(totalResults / itemsPerPage)}
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={page >= Math.ceil(totalResults / itemsPerPage)}
                    onClick={() => setPage(p => Math.min(Math.ceil(totalResults / itemsPerPage), p + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-12">
              <h3 className="text-xl font-medium mb-2">No ScienceGents found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery || activeFilter !== 'all' 
                  ? "No matches for your current search criteria."
                  : "There are no ScienceGents in the database yet. Try syncing from the blockchain or creating a new one."}
              </p>
              <div className="flex gap-4 justify-center">
                {(searchQuery || activeFilter !== 'all') && (
                  <Button onClick={clearFilters} variant="outline">
                    Reset Filters
                  </Button>
                )}
                <Button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isSyncing ? 'Syncing...' : 'Sync from Blockchain'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

// Helper function to format values
const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toString();
};

export default Explore;
