
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCapabilityById } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import CapabilityDetailPage from '@/components/capability/CapabilityDetailPage';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
        <main className="flex-grow pt-8 pb-16">
          <div className="container mx-auto px-6">
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
    <>
      <Navbar />
      <CapabilityDetailPage capability={capability} />
      <Footer />
    </>
  );
};

export default CapabilityDetails;
