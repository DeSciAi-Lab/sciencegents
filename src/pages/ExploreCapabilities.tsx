
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, PlusCircle, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';

// Mock capabilities data
const mockCapabilities = [
  {
    id: 'mol-viz-3d',
    name: 'Molecule Visualization (3D)',
    domain: 'Chemistry',
    description: 'Advanced 3D molecular visualization capability that enables ScienceGents to render and interact with complex molecular structures in three dimensions.',
    price: 0.25,
    usageCount: 47,
    rating: 4.8
  },
  {
    id: 'spec-analysis',
    name: 'Spectroscopy Analysis',
    domain: 'Chemistry',
    description: 'Comprehensive spectroscopy analysis capability that enables ScienceGents to interpret various spectroscopic data including NMR, IR, UV-Vis, and mass spectrometry.',
    price: 0.3,
    usageCount: 32,
    rating: 4.5
  },
  {
    id: 'quantum-sim',
    name: 'Quantum Circuit Simulator',
    domain: 'Physics',
    description: 'Quantum circuit simulation capability that enables ScienceGents to design, analyze, and simulate quantum circuits and algorithms.',
    price: 0.4,
    usageCount: 18,
    rating: 4.7
  },
  {
    id: 'protein-fold',
    name: 'Protein Folding Simulation',
    domain: 'Protein Analysis',
    description: 'Advanced protein folding simulation capability that enables ScienceGents to predict three-dimensional protein structures from amino acid sequences.',
    price: 0.35,
    usageCount: 25,
    rating: 4.6
  },
  {
    id: 'mol-dock',
    name: 'Molecular Docking',
    domain: 'Drug Discovery',
    description: 'Molecular docking capability that enables ScienceGents to predict the optimal binding conformations of small molecules to protein targets.',
    price: 0.28,
    usageCount: 38,
    rating: 4.9
  },
  {
    id: 'crystal-pred',
    name: 'Crystal Structure Prediction',
    domain: 'Materials Science',
    description: 'Crystal structure prediction capability that enables ScienceGents to predict the crystal structures of materials from their chemical composition.',
    price: 0.32,
    usageCount: 21,
    rating: 4.4
  }
];

const ExploreCapabilities = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCapabilities, setFilteredCapabilities] = useState(mockCapabilities);
  const [activeDomain, setActiveDomain] = useState('all');
  const [sortBy, setSortBy] = useState('usageCount');
  const [sortOrder, setSortOrder] = useState('desc');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort capabilities
  useEffect(() => {
    let result = [...mockCapabilities];
    
    // Apply domain filter
    if (activeDomain !== 'all') {
      result = result.filter(capability => capability.domain.toLowerCase() === activeDomain.toLowerCase());
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(capability => 
        capability.name.toLowerCase().includes(query) || 
        capability.description.toLowerCase().includes(query) ||
        capability.id.toLowerCase().includes(query)
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
    
    setFilteredCapabilities(result);
  }, [searchQuery, activeDomain, sortBy, sortOrder]);

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
                <h1 className="text-3xl font-bold mb-3">Explore Capabilities</h1>
                <p className="text-muted-foreground">
                  Discover and integrate specialized scientific capabilities for AI agents
                </p>
              </div>
              
              <Button 
                onClick={() => navigate('/create-capability')}
                className="mt-4 md:mt-0 bg-science-600 hover:bg-science-700 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Capability
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
                    placeholder="Search by name, ID, or description..."
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
                      onClick={() => setActiveDomain(filter.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        activeDomain === filter.value
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
                  onClick={() => toggleSort('usageCount')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'usageCount'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Usage Count {sortBy === 'usageCount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                
                <button
                  onClick={() => toggleSort('price')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'price'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                
                <button
                  onClick={() => toggleSort('rating')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === 'rating'
                      ? 'bg-science-100 text-science-800'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/70'
                  }`}
                >
                  Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </Reveal>
          
          {/* Results */}
          {filteredCapabilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapabilities.map((capability, index) => (
                <Reveal key={capability.id} delay={150 + (index * 50)} direction="up">
                  <div 
                    className="glass-card p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/capability/${capability.id}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-science-400 to-science-600">
                        <Beaker size={24} />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-science-700 bg-science-50 px-2 py-1 rounded-full">
                        <span>{capability.domain}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{capability.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{capability.description}</p>
                    
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-science-800 font-semibold">{capability.price} ETH</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{capability.usageCount}</span>
                          <span>uses</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{capability.rating}</span>
                          <span>rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No capabilities found</h3>
                <p className="text-muted-foreground mb-6">
                  No matches for your current search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveDomain('all');
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

export default ExploreCapabilities;
