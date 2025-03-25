
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Beaker, Twitter, Github, Globe, MessageCircle } from 'lucide-react';
import { Capability } from '@/types/capability';
import ReactMarkdown from 'react-markdown';

interface CapabilityDetailsProps {
  capability: Capability;
}

const CapabilityDetails: React.FC<CapabilityDetailsProps> = ({ capability }) => {
  // Check if developer info exists
  const hasDeveloperInfo = capability.developer_info?.name || 
                         capability.developer_info?.email || 
                         capability.developer_info?.bio;

  const socialLinks = capability.developer_info?.social_links || [];
  
  // Get developer initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'D';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const developerName = capability.developer_info?.name || 'Developer';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {capability.description ? (
                <div className="prose max-w-none">
                  <ReactMarkdown>{capability.description}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-700">No description available.</p>
              )}
              
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
            </CardContent>
          </Card>
        </div>
        
        {hasDeveloperInfo && (
          <div>
            <Card>
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="text-lg">Developer Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={capability.developer_profile_pic || ''} alt={developerName} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                      {getInitials(developerName)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-lg">{developerName}</h3>
                  {capability.developer_info?.email && (
                    <a href={`mailto:${capability.developer_info.email}`} className="text-sm text-blue-600 hover:underline">
                      {capability.developer_info.email}
                    </a>
                  )}
                </div>
                
                {capability.developer_info?.bio && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{capability.developer_info.bio}</p>
                  </div>
                )}
                
                <div className="flex justify-center gap-2 mt-4">
                  {socialLinks.map((link, index) => {
                    if (link.type === 'twitter') {
                      return (
                        <Button key={index} size="icon" variant="outline" className="rounded-full" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Twitter size={16} />
                          </a>
                        </Button>
                      );
                    }
                    if (link.type === 'github') {
                      return (
                        <Button key={index} size="icon" variant="outline" className="rounded-full" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Github size={16} />
                          </a>
                        </Button>
                      );
                    }
                    if (link.type === 'telegram') {
                      return (
                        <Button key={index} size="icon" variant="outline" className="rounded-full" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={16} />
                          </a>
                        </Button>
                      );
                    }
                    if (link.type === 'website') {
                      return (
                        <Button key={index} size="icon" variant="outline" className="rounded-full" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Globe size={16} />
                          </a>
                        </Button>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Domain</h3>
              </div>
              <p className="text-gray-700">{capability.domain}</p>
            </div>
            
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Price</h3>
              </div>
              <p className="text-gray-700">{capability.price} ETH</p>
            </div>
            
            <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-blue-600">
                <Beaker className="h-5 w-5 mr-2" />
                <h3 className="font-medium">ID</h3>
              </div>
              <p className="text-gray-700">{capability.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapabilityDetails;
