import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Plus, ChevronDown, Filter, X, Beaker, Activity, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { getAllCapabilities } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const ExploreCapabilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<'created' | 'revenue' | 'usage'>('created');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
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
  
  const domains = Array.from(new Set(capabilities.map(cap => cap.domain)));
  
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

  const totalCapabilities = capabilities.length;
  const totalTransactions = capabilities.reduce((sum, cap) => sum + (cap.stats.usageCount || 0) * 5, 0);
  const totalRevenue = capabilities.reduce((sum, cap) => sum + (cap.stats.revenue || 0), 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  const toggleDomainDropdown = () => {
    setShowDomainDropdown(!showDomainDropdown);
    if (showRatingDropdown) setShowRatingDropdown(false);
  };

  const toggleRatingDropdown = () => {
    setShowRatingDropdown(!showRatingDropdown);
    if (showDomainDropdown) setShowDomainDropdown(false);
  };

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

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getDomainIcon = (domain: string) => {
    switch (domain.toLowerCase()) {
      case 'chemistry':
        return <Beaker size={16} />;
      case 'protein analysis':
        return <Activity size={16} />;
      case 'material science':
        return <Database size={16} />;
      case 'qm simulations':
        return <Beaker size={16} />;
      default:
        return <Beaker size={16} />;
    }
  };

  const domainButtons = [
    { name: 'Chemistry', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { name: 'Protein Analysis', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Material Science', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'QM Simulations', color: 'bg-cyan-500 hover:bg-cyan-600' },
    { name: 'Molecular Dynamics', color: 'bg-indigo-500 hover:bg-indigo-600' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div>
                <h1 className="text-3xl font-bold">Explore Capabilities</h1>
              </div>
              
              <div className="flex gap-2">
                <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  <Link to="/create-sciencegent">
                    <span>Create ScienceGent</span>
                  </Link>
                </Button>
                <Button asChild className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  <Link to="/create-capability">
                    <span>Create Capability</span>
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={50}>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-rose-50 p-4 rounded-md text-center">
                <h2 className="text-3xl font-bold text-gray-800">{formatNumber(totalCapabilities)}</h2>
                <p className="text-sm text-gray-600">Total Capabilities</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h2 className="text-3xl font-bold text-gray-800">{formatNumber(totalTransactions)}</h2>
                <p className="text-sm text-gray-600">Total Transactions</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h2 className="text-3xl font-bold text-gray-800">{formatNumber(totalRevenue)} DSI</h2>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search capabilities..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => handleSortChange('created')}
                  >
                    Created {sortBy === 'created' && <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />}
                  </Button>
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => handleSortChange('revenue')}
                  >
                    Revenue {sortBy === 'revenue' && <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />}
                  </Button>
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={() => handleSortChange('usage')}
                  >
                    Usage {sortBy === 'usage' && <ChevronDown className={`h-4 w-4 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />}
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={toggleRatingDropdown}
                  >
                    Ratings <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  {showRatingDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10 border border-gray-200">
                      <div className="py-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <button 
                            key={rating}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                          >
                            <span className="mr-2">{rating}+</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={12}
                                  className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-1"
                    onClick={toggleDomainDropdown}
                  >
                    Domain <ChevronDown className="h-4 w-4" />
                  </Button>
                  
                  {showDomainDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 border border-gray-200">
                      <div className="py-1">
                        <button 
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setSelectedDomain(null);
                            setShowDomainDropdown(false);
                          }}
                        >
                          All Domains
                        </button>
                        {domains.map((domain) => (
                          <button 
                            key={domain}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => {
                              setSelectedDomain(domain);
                              setShowDomainDropdown(false);
                            }}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {(searchQuery || selectedDomain) && (
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1"
                    onClick={clearFilters}
                  >
                    Clear filters
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <div className="flex flex-wrap gap-2 mb-6">
              {domainButtons.map((domain, index) => (
                <button
                  key={index}
                  className={`${domain.color} text-white px-4 py-2 rounded-md flex items-center gap-2`}
                  onClick={() => setSelectedDomain(domain.name)}
                >
                  {index === 0 ? <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-rose-500"><Plus size={14} /></div> : getDomainIcon(domain.name)}
                  <span>{domain.name}</span>
                </button>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white p-4 rounded-md border">
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
                    className="bg-white rounded-md border hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800">{capability.name}</h3>
                        <span className="text-xs text-blue-600">Capability ID</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        Brief Description: {capability.description}
                      </p>
                      
                      <div className="font-medium mb-4">
                        FEE {capability.price} ETH
                      </div>
                      
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-xs flex items-center gap-1">
                          <span>usage {capability.stats?.usageCount || 0}</span>
                        </div>
                        <div className="text-xs flex items-center gap-1">
                          <span>rating</span>
                          {renderRating(capability.stats?.rating || 4.1)}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <span>revenue {capability.stats?.revenue || 2600}DSI</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {capability.domain}
                        </Badge>
                      </div>
                    </div>
                    
                    {capability.display_image && (
                      <div className="h-32 w-full">
                        <img 
                          src={capability.display_image} 
                          alt={capability.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="lg:col-span-4 text-center py-8">
                  <p className="text-muted-foreground">No capabilities found matching your search.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploreCapabilities;
