
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Copy, ChevronDown, ChevronUp, X } from 'lucide-react';
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

  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Address Copied",
      description: "Token address copied to clipboard"
    });
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

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredGents.slice(startIndex, endIndex);
  };

  // Sort button component
  const SortButton = ({ label, column }: { label: string, column: keyof ScienceGentListItem }) => {
    const isActive = sortBy === column;
    const icon = isActive 
      ? sortOrder === 'asc' 
        ? <ChevronUp className="h-4 w-4 ml-1" /> 
        : <ChevronDown className="h-4 w-4 ml-1" />
      : null;
    
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => handleSortChange(column)}
        className={`text-sm rounded-md px-3 py-1 h-auto flex items-center gap-1 ${isActive ? 'bg-gray-100' : 'bg-white'}`}
      >
        {label}
        {icon}
      </Button>
    );
  };

  // Filter dropdown component
  const FilterDropdown = ({ 
    label, 
    options, 
    value, 
    onChange 
  }: { 
    label: string, 
    options: { value: string, label: string }[], 
    value: string, 
    onChange: (value: string) => void 
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1 text-sm rounded-md px-3 py-1 h-auto"
        >
          {label} <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-md">
        {options.map(option => (
          <DropdownMenuItem 
            key={option.value}
            className={value === option.value ? "bg-gray-100" : ""}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <NavbarLayout>
      <div className="pt-4 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-6">Explore ScienceGents</h1>
            
            {/* Search and Filters Row */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap ml-auto">
                  <Button
                    onClick={() => navigate('/create-sciencegent')}
                    variant="outline"
                    className="text-sm bg-white border-science-300 text-science-700 hover:bg-science-50"
                  >
                    Create ScienceGent
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/create-capability')}
                    variant="outline"
                    className="text-sm bg-white border-science-300 text-science-700 hover:bg-science-50"
                  >
                    Create Capability
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <SortButton label="Market cap" column="marketCap" />
                <SortButton label="Age" column="age" />
                <SortButton label="Revenue" column="revenue" />
                
                <FilterDropdown 
                  label="Curation" 
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'curated', label: 'Curated' },
                    { value: 'uncurated', label: 'Uncurated' }
                  ]}
                  value={activeFilter === 'curated' || activeFilter === 'uncurated' ? activeFilter : 'all'}
                  onChange={(value) => setActiveFilter(value)}
                />
                
                <FilterDropdown 
                  label="Maturity" 
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'migrated', label: 'Migrated' },
                    { value: 'ready', label: 'Ready for Migration' },
                    { value: 'immature', label: 'Immature' }
                  ]}
                  value={activeFilter === 'migrated' || activeFilter === 'ready' || activeFilter === 'immature' ? activeFilter : 'all'}
                  onChange={(value) => setActiveFilter(value)}
                />
                
                <FilterDropdown 
                  label="Roles" 
                  options={[
                    { value: 'all', label: 'All Roles' },
                    { value: 'researcher', label: 'Researcher' },
                    { value: 'reviewer', label: 'Reviewer' },
                    { value: 'assistant', label: 'Assistant' }
                  ]}
                  value={activeFilter === 'researcher' || activeFilter === 'reviewer' || activeFilter === 'assistant' ? activeFilter : 'all'}
                  onChange={(value) => setActiveFilter(value)}
                />
                
                <FilterDropdown 
                  label="Domain" 
                  options={domainFilters}
                  value={activeFilter}
                  onChange={setActiveFilter}
                />
                
                {(searchQuery || activeFilter !== 'all') && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="ml-auto text-sm flex items-center gap-1"
                  >
                    <X className="h-4 w-4" /> Clear filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Results Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              {isLoading ? (
                renderSkeleton()
              ) : filteredGents.length > 0 ? (
                <>
                  <div className="overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="w-[40px] p-4 text-left">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </th>
                          <th className="w-[60px] p-4 text-left">Logo</th>
                          <th className="p-4 text-left font-medium text-gray-700">NAME</th>
                          <th className="p-4 text-left font-medium text-gray-700">Age</th>
                          <th className="p-4 text-left font-medium text-gray-700">Market cap</th>
                          <th className="p-4 text-left font-medium text-gray-700">24h Chg</th>
                          <th className="p-4 text-left font-medium text-gray-700">24h vol</th>
                          <th className="p-4 text-left font-medium text-gray-700">Revenue</th>
                          <th className="p-4 text-left font-medium text-gray-700">Price</th>
                          <th className="p-4 text-left font-medium text-gray-700">Rating</th>
                          <th className="p-4 text-left font-medium text-gray-700">Maturity</th>
                          <th className="p-4 text-left font-medium text-gray-700">Domain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getCurrentPageItems().map((gent) => (
                          <tr 
                            key={gent.id}
                            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/sciencegent/${gent.address}`)}
                          >
                            <td className="p-4">
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </td>
                            <td className="p-4">
                              <div className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold bg-gradient-to-br from-science-400 to-science-600">
                                {gent.profilePic ? (
                                  <img 
                                    src={gent.profilePic} 
                                    alt={gent.name} 
                                    className="w-full h-full object-cover rounded-md" 
                                  />
                                ) : (
                                  gent.symbol.substring(0, 1)
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div>
                                <div className="font-medium flex items-center gap-2">
                                  {gent.name}
                                  <span className="text-gray-600 font-medium">${gent.symbol}</span>
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                  <span className="text-xs font-mono">
                                    {gent.address.substring(0, 6)}...{gent.address.slice(-4)}
                                  </span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(gent.address);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <Copy size={12} />
                                  </button>
                                  {gent.isCurated && (
                                    <span className="ml-1 px-2 py-0.5 text-xs bg-gray-100 rounded-full">
                                      curated
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-gray-700">{gent.age}</td>
                            <td className="p-4 text-gray-700">
                              {formatValue(gent.marketCap)}
                            </td>
                            <td className={`p-4 ${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {gent.priceChange24h > 0 ? '+' : ''}{gent.priceChange24h}%
                            </td>
                            <td className="p-4 text-gray-700">
                              {formatValue(gent.volume24h)}
                            </td>
                            <td className="p-4 text-gray-700">
                              {formatValue(gent.revenue)} DSI
                            </td>
                            <td className="p-4 text-gray-700">
                              {gent.tokenPrice.toFixed(3)}
                            </td>
                            <td className="p-4">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`h-4 w-4 ${star <= gent.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="w-full max-w-[100px]">
                                <div className="h-2 bg-gray-200 rounded-full">
                                  <div 
                                    className={getMaturityProgressClasses(gent.maturityStatus)}
                                    style={{ width: getMaturityProgressWidth(gent.maturityStatus) }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
                                {gent.domain.toLowerCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {Math.min((page - 1) * itemsPerPage + 1, filteredGents.length)} to {Math.min(page * itemsPerPage, filteredGents.length)} of {totalResults} results
                    </div>
                    
                    <Pagination>
                      <PaginationContent>
                        {page > 1 && (
                          <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                          </PaginationItem>
                        )}
                        
                        {[...Array(Math.min(5, Math.ceil(totalResults / itemsPerPage)))].map((_, i) => (
                          <PaginationItem key={i + 1}>
                            <PaginationLink
                              onClick={() => setPage(i + 1)}
                              isActive={page === i + 1}
                              className={page === i + 1 ? "bg-science-600 text-white" : ""}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {Math.ceil(totalResults / itemsPerPage) > 5 && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink onClick={() => setPage(Math.ceil(totalResults / itemsPerPage))}>
                                {Math.ceil(totalResults / itemsPerPage)}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}
                        
                        {page < Math.ceil(totalResults / itemsPerPage) && (
                          <PaginationItem>
                            <PaginationNext onClick={() => setPage(p => Math.min(Math.ceil(totalResults / itemsPerPage), p + 1))} />
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
                      className="bg-science-600 hover:bg-science-700 text-white"
                    >
                      {isSyncing ? 'Syncing...' : 'Sync from Blockchain'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
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

// Helper function for maturity progress classes
const getMaturityProgressClasses = (status: string) => {
  switch (status) {
    case 'Migrated':
      return 'h-full rounded-full bg-green-500';
    case 'Ready':
      return 'h-full rounded-full bg-blue-500';
    default:
      return 'h-full rounded-full bg-purple-500';
  }
};

// Helper function for maturity progress width
const getMaturityProgressWidth = (status: string) => {
  switch (status) {
    case 'Migrated':
      return '100%';
    case 'Ready':
      return '80%';
    case 'Near':
      return '60%';
    default:
      return '30%';
  }
};

export default Explore;
