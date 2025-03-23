
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { 
  fetchScienceGents, 
  filterScienceGents, 
  sortScienceGents,
  getPlatformStats,
  type ScienceGentListItem
} from '@/services/scienceGentExploreService';
import { Skeleton } from '@/components/ui/skeleton';
import { syncAllScienceGents } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';
import ScienceGentTable from '@/components/sciencegent/ScienceGentTable';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [stats, setStats] = useState({
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
    const filtered = filterScienceGents(scienceGents, searchQuery, activeFilter);
    const sorted = sortScienceGents(filtered, sortBy, sortOrder);
    setFilteredGents(sorted);

    // Reset to first page when filters change
    setPage(1);
  }, [scienceGents, searchQuery, activeFilter, sortBy, sortOrder]);

  // Calculate platform stats when scienceGents data changes
  useEffect(() => {
    if (scienceGents.length > 0) {
      setStats(getPlatformStats(scienceGents));
    }
  }, [scienceGents]);

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

  // Available domain filters
  const domainFilters = [
    { value: 'all', label: 'All' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'genomics', label: 'Genomics' },
    { value: 'physics', label: 'Physics' },
    { value: 'materials science', label: 'Materials Science' },
    { value: 'protein analysis', label: 'Protein Analysis' },
    { value: 'drug discovery', label: 'Drug Discovery' },
    { value: 'general', label: 'General' }
  ];

  // Generate skeleton for loading state
  const renderSkeleton = () => (
    <div className="bg-white p-6 rounded-lg">
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );

  // Generate pagination numbers
  const generatePaginationItems = () => {
    const totalPages = Math.ceil(filteredGents.length / itemsPerPage);
    const items = [];

    // Add numeric pages
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setPage(i)}
            isActive={page === i}
            className={page === i ? "bg-blue-500 text-white" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
      
      // Add ellipsis after page 5 if there are more pages
      if (i === 5 && totalPages > 6) {
        items.push(
          <PaginationItem key="ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
        // Add the last page
        if (totalPages > 6) {
          items.push(
            <PaginationItem key={totalPages}>
              <PaginationLink onClick={() => setPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
        break;
      }
    }

    return items;
  };

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredGents.slice(startIndex, endIndex);
  };

  // Dropdown for filters
  const renderFilterDropdown = (title: string, options: { value: string, label: string }[], activeValue: string, onChange: (value: string) => void) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white border-gray-200">
          {title} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map(option => (
          <DropdownMenuItem 
            key={option.value}
            className={activeValue === option.value ? "bg-gray-100" : ""}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Sort buttons
  const renderSortButton = (label: string, column: keyof ScienceGentListItem) => (
    <Button 
      variant="outline" 
      className="bg-white border-gray-200"
      onClick={() => handleSortChange(column)}
    >
      {label} {sortBy === column ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
    </Button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-8">Explore ScienceGents</h1>
            
            {/* Stats Section */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold">{stats.totalScienceGents}</p>
                <p className="text-sm text-gray-500">Total ScienceGents</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold">{stats.totalTransactions}</p>
                <p className="text-sm text-gray-500">Total Transactions</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold">{stats.totalLiquidity}</p>
                <p className="text-sm text-gray-500">Total Liquidity</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-4xl font-bold">{stats.totalRevenue}</p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
            </div>
            
            {/* Table container */}
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Search and Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-4">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {renderSortButton('Market cap', 'marketCap')}
                    {renderSortButton('Age', 'age')}
                    {renderSortButton('Revenue', 'revenue')}
                    
                    {renderFilterDropdown('Curation', [
                      { value: 'all', label: 'All' },
                      { value: 'curated', label: 'Curated' },
                      { value: 'uncurated', label: 'Uncurated' }
                    ], activeFilter === 'curated' || activeFilter === 'uncurated' ? activeFilter : 'all', 
                    (value) => setActiveFilter(value))}
                    
                    {renderFilterDropdown('Maturity', [
                      { value: 'all', label: 'All' },
                      { value: 'migrated', label: 'Migrated' },
                      { value: 'ready', label: 'Ready for Migration' },
                      { value: 'immature', label: 'Immature' }
                    ], activeFilter === 'migrated' || activeFilter === 'ready' || activeFilter === 'immature' ? activeFilter : 'all',
                    (value) => setActiveFilter(value))}
                    
                    {renderFilterDropdown('Roles', [
                      { value: 'all', label: 'All Roles' },
                      { value: 'researcher', label: 'Researcher' },
                      { value: 'reviewer', label: 'Reviewer' },
                      { value: 'assistant', label: 'Assistant' }
                    ], activeFilter === 'researcher' || activeFilter === 'reviewer' || activeFilter === 'assistant' ? activeFilter : 'all',
                    (value) => setActiveFilter(value))}
                    
                    {renderFilterDropdown('Domain', domainFilters, activeFilter, setActiveFilter)}
                    
                    {(searchQuery || activeFilter !== 'all') && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="ml-auto flex items-center"
                      >
                        <X className="h-4 w-4 mr-1" /> Clear filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Results Table */}
              {isLoading ? (
                renderSkeleton()
              ) : filteredGents.length > 0 ? (
                <>
                  <ScienceGentTable 
                    scienceGents={getCurrentPageItems()} 
                    onSortChange={handleSortChange}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                  
                  {/* Pagination */}
                  <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {Math.min((page - 1) * itemsPerPage + 1, filteredGents.length)} to {Math.min(page * itemsPerPage, filteredGents.length)} of {filteredGents.length} results
                    </div>
                    
                    <Pagination>
                      <PaginationContent>
                        {page > 1 && (
                          <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                          </PaginationItem>
                        )}
                        
                        {generatePaginationItems()}
                        
                        {page < Math.ceil(filteredGents.length / itemsPerPage) && (
                          <PaginationItem>
                            <PaginationNext onClick={() => setPage(p => Math.min(Math.ceil(filteredGents.length / itemsPerPage), p + 1))} />
                          </PaginationItem>
                        )}
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
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      {isSyncing ? 'Syncing...' : 'Sync from Blockchain'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
