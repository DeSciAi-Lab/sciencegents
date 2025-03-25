
import React from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { Capability } from '@/types/capability';

interface CapabilityDetailPageProps {
  capability: Capability;
}

const CapabilityDetailPage: React.FC<CapabilityDetailPageProps> = ({ capability }) => {
  // Get the first two letters for the avatar
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  // Render stars for rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-sm">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <Link to="/capabilities" className="text-gray-500 hover:text-gray-700 flex items-center text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Capabilities
            </Link>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* Avatar/Logo */}
                <div className="w-24 h-24 bg-science-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {getInitials(capability.name)}
                </div>
                
                {/* Header information */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">{capability.name}</h1>
                      <div className="text-sm text-gray-500 mt-1">Capability ID: {capability.id}</div>
                    </div>
                    
                    <Button className="bg-science-600 hover:bg-science-700">
                      Include in your ScienceGent
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="text-sm">
                      <span className="font-medium">Fee</span>{' '}
                      <span className="text-gray-700">{capability.price} ETH</span>
                    </div>
                    
                    <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                      {capability.domain}
                    </div>
                    
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      usage {capability.stats.usageCount}
                    </div>
                    
                    <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                      revenue {capability.stats.revenue}DSI
                    </div>
                    
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
                      rating {renderRating(capability.stats.rating)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs section */}
              <div className="mt-6">
                <Tabs defaultValue="detailed_description">
                  <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
                    <TabsTrigger 
                      value="detailed_description" 
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-science-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Detailed Description
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sdk" 
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-science-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      SDK
                    </TabsTrigger>
                    <TabsTrigger 
                      value="developer" 
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-science-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Developer
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="detailed_description" className="pt-6">
                    <div className="prose max-w-none">
                      <p>{capability.detailed_description || capability.description}</p>
                      {capability.features && capability.features.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-lg font-medium mb-2">Features</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {capability.features.map((feature, index) => (
                              <li key={index} className="text-gray-700">{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sdk" className="pt-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-2">SDK Documentation</h3>
                      {capability.files?.documentation ? (
                        <div>
                          <p className="mb-4">You can view or download the SDK documentation below:</p>
                          <Button variant="outline" asChild>
                            <a href={capability.files.documentation} target="_blank" rel="noopener noreferrer">
                              View Documentation
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <p className="text-gray-500">No SDK documentation available for this capability.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="developer" className="pt-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="text-lg font-medium mb-2">Developer Information</h3>
                      {capability.developer_info ? (
                        <div>
                          <p className="mb-2"><span className="font-medium">Name:</span> {capability.developer_info.name || "Not provided"}</p>
                          {capability.developer_info.email && (
                            <p className="mb-2">
                              <span className="font-medium">Contact:</span>{' '}
                              <a href={`mailto:${capability.developer_info.email}`} className="text-science-600 hover:underline">
                                {capability.developer_info.email}
                              </a>
                            </p>
                          )}
                          {capability.developer_info.bio && (
                            <div className="mb-2">
                              <p className="font-medium mb-1">Bio:</p>
                              <p className="text-gray-700">{capability.developer_info.bio}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">No developer information available for this capability.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CapabilityDetailPage;
