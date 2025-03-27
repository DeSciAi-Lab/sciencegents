
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, X, Filter, ArrowDown, RefreshCw, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentTable from '@/components/sciencegent/ScienceGentTable';
import { 
  fetchScienceGents, 
  filterScienceGents, 
  sortScienceGents,
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

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
  const [itemsPerPage] = useState(20);
  const [totalResults, setTotalResults] = useState(0);
  
  // Define filter options
  const filterCategories = {
    domain: [
      { label: 'All Domains', value: 'all' },
      { label: 'Chemistry', value: 'chemistry' },
      { label: 'Physics', value: 'physics' },
      { label: 'Genomics', value: 'genomics' },
      { label: 'Materials Science', value: 'materials science' },
      { label: 'Drug Discovery', value: 'drug discovery' },
      { label: 'General', value: 'general' },
    ],
    curation: [
      { label: 'All', value: 'all' },
      { label: 'Curated', value: 'curated' },
      { label: 'Uncurated', value: 'uncurated' },
    ],
    maturity: [
      { label: 'All', value: 'all' },
      { label: 'Migrated', value: 'migrated' },
      { label: 'Ready', value: 'ready' },
      { label: 'Immature', value: 'immature' },
    ],
    roles: [
      { label: 'All Roles', value: 'all' },
      { label: 'Researcher', value: 'researcher' },
      { label: 'Assistant', value: 'assistant' },
      { label: 'Reviewer', value: 'reviewer' },
    ]
  };
  
  const [activeFilters, setActiveFilters] = useState({
    domain: 'all',
    curation: 'all',
    maturity: 'all',
    roles: 'all'
  });

  // Fetch science gents on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters and sorting when data, filter, or sort options change
  useEffect(() => {
    let filtered = scienceGents;
    
    // Apply domain filter
    if (activeFilters.domain !== 'all') {
      filtered = filtered.filter(gent => 
        gent.domain.toLowerCase() === activeFilters.domain.toLowerCase()
      );
    }
    
    // Apply curation filter
    if (activeFilters.curation === 'curated') {
      filtered = filtered.filter(gent => gent.isCurated);
    } else if (activeFilters.curation === 'uncurated') {
      filtered = filtered.filter(gent => !gent.isCurated);
    }
    
    // Apply maturity filter
    if (activeFilters.maturity === 'migrated') {
      filtered = filtered.filter(gent => gent.isMigrated);
    } else if (activeFilters.maturity === 'ready') {
      filtered = filtered.filter(gent => gent.migrationEligible && !gent.isMigrated);
    } else if (activeFilters.maturity === 'immature') {
      filtered = filtered.filter(gent => !gent.migrationEligible && !gent.isMigrated);
    }
    
    // Apply roles filter (simplified for demo)
    if (activeFilters.roles !== 'all') {
      // In a real app, this would filter based on actual role data
      filtered = filtered.filter(() => Math.random() > 0.3);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(gent => 
        gent.name.toLowerCase().includes(query) || 
        gent.address.toLowerCase().includes(query) ||
        gent.symbol.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    const sorted = sortScienceGents(filtered, sortBy, sortOrder);
    
    setFilteredGents(sorted);
    setTotalResults(sorted.length);
    
    // Reset to first page when filters change
    setPage(1);
  }, [scienceGents, searchQuery, sortBy, sortOrder, activeFilters]);

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchScienceGents();
      setScienceGents(data);
      
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
    setActiveFilters({
      domain: 'all',
      curation: 'all',
      maturity: 'all',
      roles: 'all'
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
  
  // Check if any filters are active
  const hasActiveFilters = () => {
    return Object.values(activeFilters).some(value => value !== 'all') || searchQuery !== '';
  };
  
  // Update a specific filter
  const updateFilter = (category: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Render filter button
  const renderFilterButton = (
    label: string, 
    category: keyof typeof activeFilters,
    showIcon = true
  ) => {
    const isActive = activeFilters[category] !== 'all';
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className={`flex items-center gap-1 ${isActive ? 'bg-purple-50 border-purple-200 text-purple-700' : ''}`}
          >
            {label}
            {showIcon && <ChevronDown className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[180px]">
          <DropdownMenuLabel>Select {label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterCategories[category].map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={activeFilters[category] === option.value}
              onCheckedChange={() => updateFilter(category, option.value)}
            >
              {option.label}
              {activeFilters[category] === option.value && (
                <CheckIcon className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <NavbarLayout>
      <div className="container max-w-full px-6 py-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={handleSortChange.bind(null, 'marketCap')}
              >
                Market cap
                <ArrowDown className={`h-4 w-4 ${sortBy === 'marketCap' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleSortChange.bind(null, 'age')}
              >
                Age
                <ArrowDown className={`h-4 w-4 ${sortBy === 'age' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleSortChange.bind(null, 'revenue')}
              >
                revenue
                <ArrowDown className={`h-4 w-4 ${sortBy === 'revenue' && sortOrder === 'asc' ? 'rotate-180' : ''}`} />
              </Button>
              
              {renderFilterButton('Curation', 'curation')}
              {renderFilterButton('Maturity', 'maturity')}
              {renderFilterButton('Roles', 'roles')}
              {renderFilterButton('Domain', 'domain')}
              
              {hasActiveFilters() && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <div className="bg-white rounded-md border shadow-sm overflow-hidden">
              <ScienceGentTable 
                scienceGents={getCurrentPageItems()}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
              
              <div className="p-4 border-t flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Show 1 to {Math.min(page * itemsPerPage, totalResults)} of {totalResults} results
                </p>
                
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(i + 1);
                          }}
                          isActive={page === i + 1}
                          className={page === i + 1 ? "bg-purple-600" : ""}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {totalPages > 5 && (
                      <>
                        <PaginationItem>
                          <PaginationLink disabled>...</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(totalPages);
                            }}
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
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Explore;
