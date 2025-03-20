
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScienceGentCard from '@/components/ui/ScienceGentCard';
import Reveal from '@/components/animations/Reveal';

// Mock ScienceGent data
const mockScienceGents = [
  {
    id: '1',
    name: 'SpectrumAI',
    address: '0x1a2b3c4d5e6f7g8h9i0j',
    marketCap: 450000,
    tokenPrice: 0.00235,
    age: '3 months',
    roi: 18.7,
    domain: 'Chemistry',
    featured: true
  },
  {
    id: '2',
    name: 'GenomicsGPT',
    address: '0x2b3c4d5e6f7g8h9i0j1a',
    marketCap: 780000,
    tokenPrice: 0.00412,
    age: '5 months',
    roi: 24.5,
    domain: 'Genomics',
    featured: true
  },
  {
    id: '3',
    name: 'QuantumSolver',
    address: '0x3c4d5e6f7g8h9i0j1a2b',
    marketCap: 620000,
    tokenPrice: 0.00327,
    age: '2 months',
    roi: 12.3,
    domain: 'Physics',
    featured: true
  },
  {
    id: '4',
    name: 'MaterialsAI',
    address: '0x4d5e6f7g8h9i0j1a2b3c',
    marketCap: 320000,
    tokenPrice: 0.00189,
    age: '4 months',
    roi: 8.5,
    domain: 'Materials Science',
    featured: false
  },
  {
    id: '5',
    name: 'ProteinFoldAI',
    address: '0x5e6f7g8h9i0j1a2b3c4d',
    marketCap: 520000,
    tokenPrice: 0.00275,
    age: '6 months',
    roi: 15.2,
    domain: 'Protein Analysis',
    featured: false
  },
  {
    id: '6',
    name: 'DrugDiscoveryGPT',
    address: '0x6f7g8h9i0j1a2b3c4d5e',
    marketCap: 680000,
    tokenPrice: 0.00362,
    age: '7 months',
    roi: 22.8,
    domain: 'Drug Discovery',
    featured: false
  }
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGents, setFilteredGents] = useState(mockScienceGents);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort ScienceGents
  useEffect(() => {
    let result = [...mockScienceGents];
    
    // Apply domain filter
    if (activeFilter !== 'all') {
      result = result.filter(gent => gent.domain.toLowerCase() === activeFilter.toLowerCase());
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(gent => 
        gent.name.toLowerCase().includes(query) || 
        gent.address.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      // @ts-ignore
      const valueA = a[sortBy];
      // @ts-ignore
      const valueB = b[sortBy];
      
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setFilteredGents(result);
  }, [searchQuery, activeFilter, sortBy, sortOrder]);

  // Toggle sort order
  const toggleSort = (key: string) => {
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
    { value: 'drug discovery', label: 'Drug Discovery' }
  ];

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
              
              <Button 
                onClick={() => navigate('/create-sciencegent')}
                className="mt-4 md:mt-0 bg-science-600 hover:bg-science-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create ScienceGent
              </Button>
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
          {filteredGents.length > 0 ? (
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
                  No matches for your current search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
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
