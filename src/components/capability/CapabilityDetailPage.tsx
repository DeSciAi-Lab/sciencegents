
import React from 'react';
import { Star, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Capability } from '@/types/capability';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

  // Developer info helpers
  const developerName = capability.developer_info?.name || 'Unknown Developer';
  const developerEmail = capability.developer_info?.email;
  const developerBio = capability.developer_info?.bio;
  const socialLinks = capability.developer_info?.social_links || [];
  const hasDeveloperInfo = developerName !== 'Unknown Developer' || developerEmail || developerBio || socialLinks.length > 0;

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
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="text-sm">
                      <span className="font-medium">Fee</span>{' '}
                      <span className="text-gray-700">{capability.price} ETH</span>
                    </div>
                    
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      {capability.domain}
                    </Badge>
                    
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                      usage {capability.stats.usageCount}
                    </Badge>
                    
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                      revenue {capability.stats.revenue}DSI
                    </Badge>
                    
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
                      {capability.detailed_description || capability.description ? (
                        <ReactMarkdown>
                          {capability.detailed_description || capability.description}
                        </ReactMarkdown>
                      ) : (
                        <p>No detailed description available.</p>
                      )}
                      
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
                    <div className="bg-gray-50 p-8 rounded-md">
                      <h3 className="text-xl font-semibold mb-4 text-center">SDK Documentation</h3>
                      <p className="text-center mb-6">You can view or download the SDK documentation below:</p>
                      
                      {capability.files?.documentation || capability.docs ? (
                        <div className="flex justify-center">
                          <div className="space-y-4 max-w-md w-full">
                            <Button 
                              variant="outline" 
                              className="w-full" 
                              asChild
                            >
                              <a href={capability.files?.documentation || capability.docs} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" /> View Documentation
                              </a>
                            </Button>
                            
                            <Button 
                              variant="default" 
                              className="w-full bg-science-600 hover:bg-science-700" 
                              asChild
                            >
                              <a 
                                href={capability.files?.documentation || capability.docs} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                download
                              >
                                <Download className="mr-2 h-4 w-4" /> Download Documentation
                              </a>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500">
                          <p>No SDK documentation available for this capability.</p>
                        </div>
                      )}
                      
                      {capability.files?.additionalFiles && 
                       Array.isArray(capability.files.additionalFiles) && 
                       capability.files.additionalFiles.length > 0 && (
                        <div className="mt-8">
                          <h4 className="text-lg font-medium mb-3 text-center">Additional Resources</h4>
                          <div className="space-y-2 max-w-md mx-auto">
                            {capability.files.additionalFiles.map((file, index) => {
                              // Handle both string array and object array formats
                              const fileUrl = typeof file === 'string' ? file : file.url;
                              const fileName = typeof file === 'string' 
                                ? fileUrl.split('/').pop() || `File ${index + 1}` 
                                : file.name || `File ${index + 1}`;
                              
                              return (
                                <Button 
                                  key={index} 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full justify-start" 
                                  asChild
                                >
                                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-3 w-3" /> {fileName}
                                  </a>
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="developer" className="pt-6">
                    <div className="bg-gray-50 p-8 rounded-md">
                      <h3 className="text-xl font-semibold mb-6 text-center">Developer Information</h3>
                      
                      {hasDeveloperInfo ? (
                        <div className="flex flex-col items-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarImage 
                              src={capability.developer_profile_pic} 
                              alt={developerName} 
                            />
                            <AvatarFallback className="bg-science-100 text-science-600 text-xl">
                              {getInitials(developerName)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <h4 className="text-lg font-medium">{developerName}</h4>
                          
                          {developerEmail && (
                            <a href={`mailto:${developerEmail}`} className="text-science-600 hover:underline mt-1 mb-4">
                              {developerEmail}
                            </a>
                          )}
                          
                          {developerBio && (
                            <div className="mt-4 mb-6 max-w-xl text-center">
                              <p className="text-gray-600">{developerBio}</p>
                            </div>
                          )}
                          
                          {socialLinks.length > 0 && (
                            <div className="flex gap-2 mt-4">
                              {socialLinks.map((link, index) => {
                                let icon = null;
                                
                                if (link.type === 'twitter') {
                                  icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
                                } else if (link.type === 'github') {
                                  icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>;
                                } else if (link.type === 'website') {
                                  icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>;
                                } else if (link.type === 'telegram') {
                                  icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>;
                                }
                                
                                return (
                                  <Button 
                                    key={index} 
                                    size="icon" 
                                    variant="outline" 
                                    className="rounded-full h-8 w-8" 
                                    asChild
                                  >
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                      {icon}
                                    </a>
                                  </Button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <p>No developer information available for this capability.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CapabilityDetailPage;
