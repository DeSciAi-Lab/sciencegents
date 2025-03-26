
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X, Filter, Sliders, ArrowDown, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentTable from '@/components/sciencegent/ScienceGentTable';
import ScienceGentStatsCards from '@/components/sciencegent/ScienceGentStatsCards';
import { 
  fetchScienceGents, 
  filterScienceGents, 
  sortScienceGents,
  getPlatformStats,
  type ScienceGentListItem
} from '@/services/scienceGentExploreService';
import { syncAllScienceGents } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Explore = () => {
  const navigate = useNavigate();
  
  // State for data
  const [searchQuery, setSearchQuery] = useState('');
  const [scienceGents, setScienceGents] = useState<ScienceGentListItem[]>([]);
  const [filteredGents, setFilteredGents] = useState<ScienceGentListItem[]>([]);
  
  // State for UI
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState<keyof ScienceGentListItem>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    domain: 'all',
    maturity: 'all',
    role: 'all',
    curation: 'all'
  });
  
  // Platform stats
  const [platformStats, setPlatformStats] = useState({
    totalScienceGents: '0',
    totalTransactions: '0',
    totalLiquidity: '0',
    totalRevenue: '0'
  });

  // Fetch science gents on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters and sorting when data, filter, or sort options change
  useEffect(() => {
    const combinedFilter = getActiveCombinedFilter();
    const filtered = filterScienceGents(scienceGents, searchQuery, combinedFilter);
    const sorted = sortScienceGents(filtered, sortBy, sortOrder);
    setFilteredGents(sorted);
    setTotalResults(sorted.length);
    setPlatformStats(getPlatformStats(scienceGents));

    // Reset to first page when filters change
    setPage(1);
  }, [scienceGents, searchQuery, activeFilter, sortBy, sortOrder, filterOptions]);

  // Get combined filter from all filter options
  const getActiveCombinedFilter = () => {
    const { domain, maturity, role, curation } = filterOptions;
    
    // Priority: domain > maturity > role > curation
    if (domain !== 'all') return domain;
    if (maturity !== 'all') return maturity;
    if (role !== 'all') return role;
    if (curation !== 'all') return curation;
    
    return activeFilter;
  };

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchScienceGents();
      setScienceGents(data);
      
      // Calculate platform stats
      setPlatformStats(getPlatformStats(data));
      
      // Show success toast
      toast({
        title: "Data Loaded",
        description: `Loaded ${data.length} ScienceGents`,
      });
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
    setFilterOptions({
      domain: 'all',
      maturity: 'all',
      role: 'all',
      curation: 'all'
    });
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredGents.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  // Handle filter option changes
  const handleFilterOptionChange = (category: string, value: string) => {
    setFilterOptions(prev => ({ 
      ...prev, 
      [category]: value 
    }));
    setShowFilterMenu(false);
  };
  
  // Determine if any filters are active
  const hasActiveFilters = () => {
    return Object.values(filterOptions).some(value => value !== 'all') || searchQuery !== '';
  };
  
  // Featured ScienceGent for the top card
  const featuredGent = scienceGents.find(gent => gent.featured) || (scienceGents.length > 0 ? scienceGents[0] : null);

  return (
    <NavbarLayout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Explore ScienceGents</h1>
            <p className="text-gray-500">Discover and interact with AI agents on the blockchain</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/create-sciencegent')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create ScienceGent
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync Data'}
            </Button>
          </div>
        </div>
        
        {/* Featured ScienceGent Card */}
        {featuredGent && !isLoading && (
          <Card className="mb-6 overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center gap-2">
                Featured ScienceGent
                <Badge variant="secondary" className="text-xs font-normal">Featured</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-medium ${
                    featuredGent.profilePic ? '' : 'bg-purple-500'
                  }`}>
                    {featuredGent.profilePic ? (
                      <img 
                        src={featuredGent.profilePic} 
                        alt={featuredGent.name} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      featuredGent.symbol.charAt(0)
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{featuredGent.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>${featuredGent.symbol}</span>
                      <span>•</span>
                      <span>{featuredGent.domain}</span>
                      {featuredGent.isMigrated && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-green-50 text-green-700 border-green-200">
                            Migrated
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <ScienceGentStatsCards scienceGent={featuredGent} />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-purple-600"
                  onClick={() => navigate(`/sciencegent/${featuredGent.address}`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {isLoading && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Total ScienceGents</div>
              {isLoading ? (
                <Skeleton className="h-6 w-16 mt-1" />
              ) : (
                <div className="text-2xl font-semibold">{platformStats.totalScienceGents}</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Total Transactions</div>
              {isLoading ? (
                <Skeleton className="h-6 w-16 mt-1" />
              ) : (
                <div className="text-2xl font-semibold">{platformStats.totalTransactions}</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Total Liquidity</div>
              {isLoading ? (
                <Skeleton className="h-6 w-16 mt-1" />
              ) : (
                <div className="text-2xl font-semibold">{platformStats.totalLiquidity}</div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Total Revenue</div>
              {isLoading ? (
                <Skeleton className="h-6 w-16 mt-1" />
              ) : (
                <div className="text-2xl font-semibold">{platformStats.totalRevenue}</div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and filter row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, symbol or address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              
              {/* Filter buttons */}
              <div className="flex items-center gap-2">
                <DropdownMenu open={showFilterMenu} onOpenChange={setShowFilterMenu}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Sliders className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-normal text-gray-500">Domain</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('domain', 'all')}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('domain', 'chemistry')}>
                        Chemistry
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('domain', 'physics')}>
                        Physics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('domain', 'genomics')}>
                        Genomics
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('domain', 'general')}>
                        General
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-normal text-gray-500">Maturity</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('maturity', 'all')}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('maturity', 'migrated')}>
                        Migrated
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('maturity', 'ready')}>
                        Ready
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('maturity', 'immature')}>
                        Immature
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-normal text-gray-500">Curation</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('curation', 'all')}>
                        All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('curation', 'curated')}>
                        Curated
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFilterOptionChange('curation', 'uncurated')}>
                        Uncurated
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleSortChange('marketCap')}
                >
                  Market cap <ArrowDown className={`h-4 w-4 ${sortBy === 'marketCap' && (sortOrder === 'asc' ? 'rotate-180' : '')}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleSortChange('tokenPrice')}
                >
                  Price <ArrowDown className={`h-4 w-4 ${sortBy === 'tokenPrice' && (sortOrder === 'asc' ? 'rotate-180' : '')}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleSortChange('age')}
                >
                  Age <ArrowDown className={`h-4 w-4 ${sortBy === 'age' && (sortOrder === 'asc' ? 'rotate-180' : '')}`} />
                </Button>
                
                {hasActiveFilters() && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="ml-auto flex items-center gap-1 text-sm text-gray-500"
                  >
                    Clear filters <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Active filters display */}
            {hasActiveFilters() && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>
                {Object.entries(filterOptions).map(([key, value]) => {
                  if (value !== 'all') {
                    return (
                      <Badge key={key} variant="secondary" className="flex gap-1 items-center">
                        {key}: {value}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleFilterOptionChange(key, 'all')}
                        />
                      </Badge>
                    );
                  }
                  return null;
                })}
                {searchQuery && (
                  <Badge variant="secondary" className="flex gap-1 items-center">
                    search: {searchQuery}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Results Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <ScienceGentTable 
            scienceGents={getCurrentPageItems()}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
            isLoading={isLoading}
          />
          
          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Show {filteredGents.length > 0 ? (page - 1) * itemsPerPage + 1 : 0} to {Math.min(page * itemsPerPage, totalResults)} of {totalResults} results
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
                        ...
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(totalPages);
                        }}
                        isActive={page === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Explore;
