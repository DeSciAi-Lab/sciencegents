import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Beaker, Activity, Database, Cog, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavHeader from '@/components/layout/NavHeader';
import Footer from '@/components/layout/Footer';
import { getAllCapabilities } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import { Skeleton } from '@/components/ui/skeleton';
import CapabilityCard from '@/components/capability/CapabilityCard';
import { Domain, getAllDomains } from '@/services/domains';

const ExploreCapabilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainsLoading, setDomainsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'created' | 'revenue' | 'usage'>('created');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Fetch domains from Supabase
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setDomainsLoading(true);
        const domainsData = await getAllDomains();
        setDomains(domainsData);
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setDomainsLoading(false);
      }
    };
    
    fetchDomains();
  }, []);
  
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const data = await getAllCapabilities();
        setCapabilities(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching capabilities:', error);
        setLoading(false);
      }
    };
    
    fetchCapabilities();
  }, []);
  
  const filteredCapabilities = capabilities.filter(capability => {
    const matchesSearch = 
      searchQuery === '' || 
      capability.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capability.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = selectedDomain === null || capability.domain === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });

  const sortedCapabilities = [...filteredCapabilities].sort((a, b) => {
    if (sortBy === 'created') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'revenue') {
      const revenueA = a.stats.revenue || 0;
      const revenueB = b.stats.revenue || 0;
      return sortDirection === 'asc' ? revenueA - revenueB : revenueB - revenueA;
    } else if (sortBy === 'usage') {
      const usageA = a.stats.usageCount || 0;
      const usageB = b.stats.usageCount || 0;
      return sortDirection === 'asc' ? usageA - usageB : usageB - usageA;
    }
    return 0;
  });

  const handleSortChange = (sortType: 'created' | 'revenue' | 'usage') => {
    if (sortBy === sortType) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortDirection('desc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain(null);
    setSortBy('created');
    setSortDirection('desc');
  };

  // Get a color for each domain based on domain name
  const getDomainColor = (domain: string) => {
    // Simple hash function to convert domain name to consistent color
    const hash = domain.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Map to a set of predefined colors based on the hash
    const colors = [
      'bg-emerald-500 hover:bg-emerald-600',
      'bg-blue-500 hover:bg-blue-600',
      'bg-purple-500 hover:bg-purple-600',
      'bg-cyan-500 hover:bg-cyan-600',
      'bg-indigo-500 hover:bg-indigo-600',
      'bg-amber-500 hover:bg-amber-600',
      'bg-pink-500 hover:bg-pink-600',
      'bg-lime-500 hover:bg-lime-600',
      'bg-red-500 hover:bg-red-600',
      'bg-teal-500 hover:bg-teal-600',
    ];
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  // Get icon for each domain
  const getDomainIcon = (domain: string) => {
    if (domain.toLowerCase().includes('chemistry')) return <Beaker size={16} className="text-white" />;
    if (domain.toLowerCase().includes('protein')) return <Activity size={16} className="text-white" />;
    if (domain.toLowerCase().includes('material')) return <Database size={16} className="text-white" />;
    if (domain.toLowerCase().includes('quantum') || domain.toLowerCase().includes('simulation')) return <Cog size={16} className="text-white" />;
    return <Beaker size={16} className="text-white" />;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader />
      
      <main className="flex-grow pt-20 pb-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <div className="mb-6 mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-10 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={sortBy === 'created' ? "default" : "outline"} 
                size="sm"
                className="flex items-center gap-1 h-10"
                onClick={() => handleSortChange('created')}
              >
                Created time {sortBy === 'created' && (sortDirection === 'asc' ? '↑' : '↓')}
              </Button>
              
              <Button 
                variant={sortBy === 'revenue' ? "default" : "outline"} 
                size="sm"
                className="flex items-center gap-1 h-10"
                onClick={() => handleSortChange('revenue')}
              >
                Revenue {sortBy === 'revenue' && (sortDirection === 'asc' ? '↑' : '↓')}
              </Button>
              
              <Button 
                variant={sortBy === 'usage' ? "default" : "outline"} 
                size="sm"
                className="flex items-center gap-1 h-10"
                onClick={() => handleSortChange('usage')}
              >
                Usage {sortBy === 'usage' && (sortDirection === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 h-10"
              >
                Ratings <span>↓</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 h-10"
              >
                Domain <span>↓</span>
              </Button>
              
              {(searchQuery || selectedDomain) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1 h-10"
                  onClick={clearFilters}
                >
                  Clear filters
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Domain Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md flex items-center gap-2 h-10"
              size="sm"
              onClick={() => setSelectedDomain(null)}
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-rose-500">
                <Plus size={14} />
              </div>
              <span>All</span>
            </Button>
            
            {domains.map((domain) => (
              <Button
                key={domain.id}
                className={`${getDomainColor(domain.name)} text-white px-4 py-2 rounded-md flex items-center gap-2 h-10 ${
                  selectedDomain === domain.name ? 'ring-2 ring-white' : ''
                }`}
                size="sm"
                onClick={() => setSelectedDomain(domain.name)}
              >
                {getDomainIcon(domain.name)}
                <span>{domain.name}</span>
              </Button>
            ))}
          </div>
          
          {/* Capability Cards */}
          <div className="masonry-grid">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="masonry-item bg-white p-4 rounded-md border">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/6" />
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))
            ) : sortedCapabilities.length > 0 ? (
              sortedCapabilities.map((capability) => (
                <Link 
                  key={capability.id}
                  to={`/capability/${capability.id}`}
                  className="masonry-item"
                >
                  <CapabilityCard capability={capability} />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No capabilities found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Add custom CSS for masonry layout
const styles = `
.masonry-grid {
  column-count: 1;
  column-gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .masonry-grid {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    column-count: 4;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  display: block;
}
`;

// Add style tag to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ExploreCapabilities;
