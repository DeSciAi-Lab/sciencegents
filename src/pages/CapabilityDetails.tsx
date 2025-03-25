
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCapabilityById } from '@/data/capabilities';
import { Capability } from '@/types/capability';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, FileText, User, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

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

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-60" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
            <div className="flex items-center gap-6">
              {/* Logo/Avatar */}
              <Avatar className="h-24 w-24 rounded-full bg-primary text-white text-2xl font-bold">
                <AvatarImage src={capability.display_image} alt={capability.name} />
                <AvatarFallback className="bg-primary text-white text-2xl">
                  {capability.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {/* Main Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{capability.name}</h1>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Badge variant="outline" className="bg-gray-50">
                        {capability.id}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Include in your ScienceGent
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {capability.domain}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">usage</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                      {capability.stats?.usageCount || capability.usage_count || 5}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">revenue</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {capability.stats?.revenue || capability.revenue || 2600} DSI
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">rating</span>
                    <div className="flex items-center gap-1">
                      {renderRatingStars(capability.stats?.rating || capability.rating || 4.1)}
                      <span className="ml-1 text-sm font-medium">
                        {capability.stats?.rating || capability.rating || 4.1}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-600 text-lg">Fee {capability.price} ETH</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-lg border shadow-sm">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="border-b w-full justify-start rounded-none px-6 h-12">
                <TabsTrigger 
                  value="description" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Detailed Description
                </TabsTrigger>
                <TabsTrigger 
                  value="sdk" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  SDK
                </TabsTrigger>
                <TabsTrigger 
                  value="developer" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Developer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-6">
                <div className="prose max-w-none">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeRaw, rehypeSanitize]} 
                    remarkPlugins={[remarkGfm]}
                  >
                    {capability.detailed_description || capability.description}
                  </ReactMarkdown>
                  
                  {capability.features && capability.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Features</h3>
                      <ul className="space-y-2">
                        {capability.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-2 mt-1 bg-blue-600 rounded-full w-1.5 h-1.5" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="sdk" className="p-6">
                <div className="space-y-6">
                  {capability.files?.documentation || capability.docs ? (
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h3 className="text-lg font-medium">Documentation</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Complete documentation for using this capability in your ScienceGent
                      </p>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Download Documentation
                      </Button>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-6 text-center">
                      <p className="text-gray-500">No SDK documentation available yet.</p>
                    </div>
                  )}
                  
                  {Array.isArray(capability.files?.additionalFiles) && capability.files?.additionalFiles.length > 0 && (
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {capability.files?.additionalFiles.map((file: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <h4 className="font-medium">{file.name || `Resource ${index + 1}`}</h4>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-2"
                              onClick={() => window.open(file.url, '_blank')}
                            >
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="developer" className="p-6">
                {capability.developer_info?.name || capability.developer_profile_pic ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={capability.developer_profile_pic} alt={capability.developer_info?.name || "Developer"} />
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {(capability.developer_info?.name || "D").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-xl font-bold">
                          {capability.developer_info?.name || "Anonymous Developer"}
                        </h3>
                        {capability.developer_info?.email && (
                          <p className="text-gray-600">{capability.developer_info.email}</p>
                        )}
                      </div>
                    </div>
                    
                    {capability.developer_info?.bio && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium mb-2">About the Developer</h4>
                        <p className="text-gray-700 whitespace-pre-line">
                          {capability.developer_info.bio}
                        </p>
                      </div>
                    )}
                    
                    {capability.developer_info?.social_links && capability.developer_info.social_links.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium mb-2">Connect</h4>
                        <div className="flex flex-wrap gap-2">
                          {capability.developer_info.social_links.map((link, index) => (
                            <Button key={index} variant="outline" size="sm" asChild>
                              <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.type}
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Developer information not available.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CapabilityDetails;
