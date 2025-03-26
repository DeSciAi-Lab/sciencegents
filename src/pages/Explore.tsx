
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X } from 'lucide-react';
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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import ScienceGentTable from '@/components/sciencegent/ScienceGentTable';

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

  // Generate skeleton for loading state
  const renderSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
    </div>
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <NavbarLayout>
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Explore ScienceGents</h1>
        
        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
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
                  className="ml-auto flex items-center gap-1 text-sm text-gray-500"
                >
                  Clear filters <X className="h-3.5 w-3.5" />
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
              <ScienceGentTable 
                scienceGents={getCurrentPageItems()}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
              
              {/* Pagination */}
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Show 1 to {Math.min(page * itemsPerPage, totalResults)} of {totalResults} results
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

export default Explore;
