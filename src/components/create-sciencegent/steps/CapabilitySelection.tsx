
import React, { useState, useEffect } from 'react';
import { Beaker, DollarSign, Check, Search, Filter, ArrowDownAZ } from 'lucide-react';
import { ScienceGentFormData } from '@/types/sciencegent';
import { Capability } from '@/types/capability';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllCapabilities } from '@/data/capabilities';
import { fetchCapabilityIdsFromBlockchain, fetchCapabilityDetailsFromBlockchain } from '@/services/capability';

interface CapabilitySelectionProps {
  formData: ScienceGentFormData;
  handleCapabilityToggle: (capabilityId: string) => void;
}

const CapabilitySelection: React.FC<CapabilitySelectionProps> = ({ formData, handleCapabilityToggle }) => {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'created' | 'revenue' | 'usage'>('created');
  
  // Get unique domains from capabilities
  const domains = Array.from(new Set(capabilities.map(cap => cap.domain)));

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        setLoading(true);
        
        // First try to fetch from blockchain
        try {
          const capabilityIds = await fetchCapabilityIdsFromBlockchain();
          
          if (capabilityIds && capabilityIds.length > 0) {
            console.log(`Fetched ${capabilityIds.length} capability IDs from blockchain`);
            
            // Fetch details for each capability
            const fetchedCapabilities = await Promise.all(
              capabilityIds.map(async (id) => {
                try {
                  const details = await fetchCapabilityDetailsFromBlockchain(id);
                  return {
                    id,
                    name: details.name || id,
                    domain: details.domain || 'Unknown',
                    description: details.description || '',
                    price: details.price || 0,
                    creator: details.creator || '',
                    createdAt: new Date().toISOString(),
                    stats: details.stats || { usageCount: 0, rating: 4.5, revenue: 0 },
                    features: details.features || []
                  } as Capability;
                } catch (err) {
                  console.error(`Error fetching details for capability ${id}:`, err);
                  return null;
                }
              })
            );
            
            // Filter out any null results
            const validCapabilities = fetchedCapabilities.filter(Boolean) as Capability[];
            setCapabilities(validCapabilities);
          } else {
            throw new Error('No capabilities found on blockchain');
          }
        } catch (error) {
          // Fallback to database
          console.log('Falling back to database for capabilities');
          const dbCapabilities = await getAllCapabilities();
          setCapabilities(dbCapabilities);
        }
      } catch (err) {
        console.error('Error fetching capabilities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapabilities();
  }, []);

  // Filter capabilities based on search and domain
  const filteredCapabilities = capabilities.filter(cap => {
    const matchesSearch = !searchTerm || 
      cap.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cap.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = !selectedDomain || cap.domain === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });

  // Sort capabilities
  const sortedCapabilities = [...filteredCapabilities].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return (b.stats?.revenue || 0) - (a.stats?.revenue || 0);
      case 'usage':
        return (b.stats?.usageCount || 0) - (a.stats?.usageCount || 0);
      case 'created':
      default:
        // Sort by newest first (assuming createdAt is an ISO date string)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Calculate total fee for selected capabilities
  const totalFee = formData.selectedCapabilities.reduce((total, id) => {
    const capability = capabilities.find(cap => cap.id === id);
    return total + (capability ? capability.price : 0);
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={sortBy === 'created' ? 'bg-muted' : ''}
            onClick={() => setSortBy('created')}
          >
            <ArrowDownAZ className="w-4 h-4 mr-2" />
            Created time
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={sortBy === 'revenue' ? 'bg-muted' : ''}
            onClick={() => setSortBy('revenue')}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Revenue
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={sortBy === 'usage' ? 'bg-muted' : ''}
            onClick={() => setSortBy('usage')}
          >
            <Filter className="w-4 h-4 mr-2" />
            Usage
          </Button>
          
          <select
            className="h-9 rounded border border-input bg-background px-3 text-sm"
            value={selectedDomain || ''}
            onChange={(e) => setSelectedDomain(e.target.value || null)}
          >
            <option value="">All Domains</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCapabilities.map(capability => (
          <div
            key={capability.id}
            className={`border rounded-md p-4 cursor-pointer transition-colors ${
              formData.selectedCapabilities.includes(capability.id)
                ? 'border-science-400 bg-science-50'
                : 'hover:border-gray-300'
            }`}
            onClick={() => handleCapabilityToggle(capability.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                  <Beaker size={18} />
                </div>
                <div>
                  <h3 className="font-medium">{capability.name}</h3>
                  <p className="text-xs text-muted-foreground">{capability.domain}</p>
                  <p className="text-xs mt-1 text-science-700 bg-science-100 w-fit px-2 py-1 rounded-full flex items-center">
                    <DollarSign size={10} className="mr-1" />
                    {capability.price} ETH
                  </p>
                </div>
              </div>
              
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                formData.selectedCapabilities.includes(capability.id)
                  ? 'bg-science-500 border-science-500 text-white'
                  : 'border-muted-foreground'
              }`}>
                {formData.selectedCapabilities.includes(capability.id) && (
                  <Check className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-6">
        <div className="bg-science-50 border border-science-200 rounded-md p-3">
          <div className="text-sm text-science-700">Total capability FEE:</div>
          <div className="text-lg font-semibold text-science-800">{totalFee.toFixed(2)} ETH</div>
        </div>
      </div>
    </div>
  );
};

export default CapabilitySelection;
