
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCapabilityById } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  FileText, 
  User, 
  Code2, 
  Twitter, 
  Github, 
  Globe, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import CapabilityDetailPage from '@/components/capability/CapabilityDetailPage';
import { useQuery } from '@tanstack/react-query';
import { fetchCapabilityById } from '@/services/capability/supabase';

const CapabilityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    data: capability, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['capability', id],
    queryFn: () => fetchCapabilityById(id || ''),
    enabled: !!id,
    retry: 1,
    // Handle errors properly by using the meta object for custom error handling
    meta: {
      errorHandler: async () => {
        try {
          // Fallback to the static data if the API call fails
          const staticData = await getCapabilityById(id || '');
          return staticData;
        } catch {
          return null;
        }
      }
    }
  });
  
  // If API call fails, try to use static data as fallback
  useEffect(() => {
    if (error) {
      const fetchStaticData = async () => {
        try {
          const staticData = await getCapabilityById(id || '');
          if (staticData) {
            // Use static data if API fails
            console.log('Using static data as fallback');
            return staticData;
          }
        } catch (e) {
          console.error('Both API and static data failed:', e);
        }
      };
      
      fetchStaticData();
    }
  }, [error, id]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-6">
        {isLoading ? (
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-start gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-8 w-56 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="border-b mb-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        ) : !capability ? (
          <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-300px)]">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">Capability Not Found</h2>
              <p className="text-muted-foreground mb-6">The capability you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link to="/capabilities">View All Capabilities</Link>
              </Button>
            </div>
          </div>
        ) : (
          <CapabilityDetailPage capability={capability} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CapabilityDetails;
