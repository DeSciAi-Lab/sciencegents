
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, PlusCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScienceGentCard from '@/components/ui/ScienceGentCard';
import Reveal from '@/components/animations/Reveal';
import { 
  fetchScienceGents, 
  filterScienceGents, 
  sortScienceGents,
  type ScienceGentListItem
} from '@/services/scienceGentExploreService';
import { Skeleton } from '@/components/ui/skeleton';
import { syncAllScienceGents } from '@/services/scienceGentDataService';
import { toast } from '@/components/ui/use-toast';

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

  // Fetch science gents on initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters and sorting when data, filter, or sort options change
  useEffect(() => {
    const filtered = filterScienceGents(scienceGents, searchQuery, activeFilter);
    const sorted = sortScienceGents(filtered, sortBy, sortOrder);
    setFilteredGents(sorted);
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

  // Toggle sort order
  const toggleSort = (key: keyof ScienceGentListItem) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
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

  // Generate skeleton cards for loading state
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="p-6 border rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-5 w-24" />
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-3">Explore ScienceGents</h1>
                <p className="text-muted-foreground">
                  Discover and interact with AI agents specialized in scientific domains
                </p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button 
                  onClick={handleSync}
                  variant="outline"
                  disabled={isSyncing}
                >
                  <RefreshCcw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync'}
                </Button>
                <Button 
                  onClick={() => navigate('/create-sciencegent')}
                  className="bg-science-600 hover:bg-science-700 text-white"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create ScienceGent
                </Button>
              </div>
            </div>
          </Reveal>
          
          {/* Filters and search */}
          <Reveal delay={100}>
            <div className="mb-8 p-6 glass-card">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-science-500/20 focus:border-science-500 transition-colors"
                  />
                </div>
                
                <div className="flex gap-4 overflow-x-auto hidden-scrollbar pb-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Filter className="h-4 w-4" />
                    <span>Domain:</span>
                  </div>
                  
                  {domainFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setActiveFilter(filter.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        activeFilter === filter.value
                          ? 'bg-science-100 text-science-800'
                          : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-4 overflow-x-auto hidden-scrollbar">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by:</span>
                </div>
                
                <button
                  onClick={() => toggleSort('marketCap')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'marketCap'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Market Cap {sortBy === 'marketCap' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                
                <button
                  onClick={() => toggleSort('tokenPrice')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'tokenPrice'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Token Price {sortBy === 'tokenPrice' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                
                <button
                  onClick={() => toggleSort('roi')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'roi'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Capability ROI {sortBy === 'roi' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </Reveal>
          
          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSkeletons()}
            </div>
          ) : filteredGents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGents.map((gent, index) => (
                <Reveal key={gent.id} delay={150 + (index * 50)} direction="up">
                  <ScienceGentCard {...gent} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No ScienceGents found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || activeFilter !== 'all' 
                    ? "No matches for your current search criteria."
                    : "There are no ScienceGents in the database yet. Try syncing from the blockchain or creating a new one."}
                </p>
                <div className="flex gap-4 justify-center">
                  {(searchQuery || activeFilter !== 'all') && (
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveFilter('all');
                      }}
                      variant="outline"
                    >
                      Reset Filters
                    </Button>
                  )}
                  <Button 
                    onClick={handleSync}
                    disabled={isSyncing}
                  >
                    <RefreshCcw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    {isSyncing ? 'Syncing...' : 'Sync from Blockchain'}
                  </Button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
