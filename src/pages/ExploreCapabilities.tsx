
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { getAllCapabilities, Capability } from '@/data/capabilities';

const ExploreCapabilities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  // Get all capabilities
  const allCapabilities = getAllCapabilities();
  
  // Extract unique domains
  const domains = Array.from(new Set(allCapabilities.map(cap => cap.domain)));
  
  // Filter capabilities based on search query and selected domain
  const filteredCapabilities = allCapabilities.filter(capability => {
    const matchesSearch = 
      searchQuery === '' || 
      capability.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capability.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDomain = selectedDomain === null || capability.domain === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Capabilities</h1>
                <p className="text-muted-foreground">
                  Discover and explore science-specific capabilities for your ScienceGents
                </p>
              </div>
              
              <Button asChild className="bg-science-600 hover:bg-science-700 text-white gap-1.5">
                <Link to="/create-capability">
                  <Plus size={16} />
                  <span>Create Capability</span>
                </Link>
              </Button>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="mb-8 glass-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search capabilities..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto justify-between border-science-200 gap-1"
                  >
                    <Filter size={16} />
                    <span>{selectedDomain || 'All Domains'}</span>
                  </Button>
                  
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 border border-border hidden">
                    <div className="py-1">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm hover:bg-science-50"
                        onClick={() => setSelectedDomain(null)}
                      >
                        All Domains
                      </button>
                      {domains.map((domain) => (
                        <button 
                          key={domain}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-science-50"
                          onClick={() => setSelectedDomain(domain)}
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapabilities.map((capability) => (
                <Link 
                  key={capability.id}
                  to={`/capability/${capability.id}`}
                  className="glass-card p-6 hover:border-science-200 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-science-400 to-science-600">
                      <Beaker size={20} />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-science-600 transition-colors">
                        {capability.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs font-medium text-science-700 bg-science-50 px-2 py-1 rounded-full w-fit mb-2">
                        <Beaker size={10} />
                        <span>{capability.domain}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {capability.description}
                      </p>
                      
                      <div className="mt-4 flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {capability.stats.usageCount} uses
                        </span>
                        <span className="font-medium">
                          {capability.price} ETH
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExploreCapabilities;
