
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Beaker, FileText, Star, Users, DollarSign, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/animations/Reveal';
import { getCapabilityById } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

const CapabilityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [capability, setCapability] = useState<Capability | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch capability data based on ID
  useEffect(() => {
    const fetchCapability = async () => {
      if (id) {
        try {
          const foundCapability = await getCapabilityById(id);
          if (foundCapability) {
            setCapability(foundCapability);
          } else {
            // If capability not found, redirect to capabilities page
            navigate('/capabilities');
          }
        } catch (error) {
          console.error('Error fetching capability:', error);
        }
        setLoading(false);
      }
    };
    
    fetchCapability();
  }, [id, navigate]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="mb-6">
              <Link to="/capabilities" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Capabilities
              </Link>
              
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-40 w-full mb-6" />
                <Skeleton className="h-60 w-full" />
              </div>
              <div>
                <Skeleton className="h-80 w-full mb-6" />
                <Skeleton className="h-40 w-full mb-6" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!capability) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Capability Not Found</h2>
            <p className="text-muted-foreground mb-6">The capability you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/capabilities">View All Capabilities</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-6">
              <Link to="/capabilities" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Capabilities
              </Link>
              
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-science-400 to-science-600">
                    <Beaker size={28} />
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-bold">{capability.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-science-700 bg-science-50 px-2 py-1 rounded-full">
                        <Beaker size={12} />
                        <span>{capability.domain}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">ID: {capability.id}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow" />
                
                <div className="flex flex-wrap gap-3">
                  {capability.docs && (
                    <Button 
                      variant="outline" 
                      className="gap-1.5 border-science-200"
                      onClick={() => window.open(capability.docs, '_blank')}
                    >
                      <FileText size={16} />
                      <span>Documentation</span>
                    </Button>
                  )}
                  <Button className="bg-science-600 hover:bg-science-700 text-white gap-1.5">
                    <Code size={16} />
                    <span>Integration Guide</span>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Capability info */}
            <div className="lg:col-span-2">
              <Reveal delay={100}>
                <div className="glass-card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground">{capability.description}</p>
                </div>
              </Reveal>
              
              {capability.features && capability.features.length > 0 && (
                <Reveal delay={150}>
                  <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold mb-4">Features</h2>
                    <ul className="space-y-2">
                      {capability.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 rounded-full w-1.5 h-1.5 bg-science-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
            
            {/* Right column - Stats and info */}
            <div>
              <Reveal delay={100}>
                <div className="glass-card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Capability Price</h2>
                  <div className="text-3xl font-bold mb-4 flex items-center">
                    <span>{capability.price}</span>
                    <span className="ml-2 text-muted-foreground text-lg">ETH</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a one-time fee paid to the capability creator when a ScienceGent
                    includes this capability. The fee is collected during ScienceGent migration.
                  </p>
                  
                  <Button className="w-full bg-science-600 hover:bg-science-700 text-white">
                    Include in ScienceGent
                  </Button>
                </div>
              </Reveal>
              
              <Reveal delay={150}>
                <div className="glass-card p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Capability Stats</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <Users size={16} />
                        </div>
                        <span>Usage Count</span>
                      </div>
                      <span className="font-medium">{capability.stats.usageCount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <Star size={16} />
                        </div>
                        <span>Rating</span>
                      </div>
                      <span className="font-medium">{capability.stats.rating}/5</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-science-50 flex items-center justify-center text-science-700">
                          <DollarSign size={16} />
                        </div>
                        <span>Revenue Generated</span>
                      </div>
                      <span className="font-medium">{capability.stats.revenue} ETH</span>
                    </div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="glass-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Creator Information</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                      <span className="font-medium">CV</span>
                    </div>
                    <div>
                      <p className="font-medium">Capability Creator</p>
                      <p className="text-xs text-muted-foreground">{capability.creator.slice(0, 6)}...{capability.creator.slice(-4)}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Created on {new Date(capability.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CapabilityDetails;
