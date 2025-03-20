
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScienceGentCard from '@/components/ui/ScienceGentCard';
import Reveal from '@/components/animations/Reveal';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchScienceGents, ScienceGentListItem } from '@/services/scienceGentExploreService';

const Featured = () => {
  const navigate = useNavigate();
  const [featuredGents, setFeaturedGents] = useState<ScienceGentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedGents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchScienceGents();
        
        // Get the top 3 ScienceGents by market cap
        const featured = data
          .sort((a, b) => b.marketCap - a.marketCap)
          .slice(0, 3)
          .map(gent => ({ ...gent, featured: true }));
          
        setFeaturedGents(featured);
      } catch (error) {
        console.error("Error loading featured ScienceGents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedGents();
  }, []);

  // Generate skeleton cards for loading state
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
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
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Featured ScienceGents
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-muted-foreground max-w-2xl">
                Discover top-performing AI agents with specialized scientific capabilities
                and their associated tokens.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button
              onClick={() => navigate('/explore')}
              variant="outline" 
              className="group border-science-200 hover:border-science-300"
            >
              <span>View All ScienceGents</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            renderSkeletons()
          ) : featuredGents.length > 0 ? (
            featuredGents.map((gent, index) => (
              <Reveal key={gent.id} delay={300 + (index * 100)} direction="up">
                <ScienceGentCard {...gent} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No ScienceGents found</h3>
              <p className="text-muted-foreground mb-6">
                There are no ScienceGents in the database yet. Visit the Explore page to sync from the blockchain.
              </p>
              <Button 
                onClick={() => navigate('/explore')}
              >
                Go to Explore
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;
