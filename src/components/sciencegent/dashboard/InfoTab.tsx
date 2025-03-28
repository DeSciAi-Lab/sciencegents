import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Copy, ExternalLink, Twitter, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface InfoTabProps {
  activeTab: string;
  scienceGent: any;
}

const InfoTab: React.FC<InfoTabProps> = ({ activeTab, scienceGent }) => {
  // Copy address to clipboard
  const copyAddressToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "The address has been copied to your clipboard",
    });
  };
  
  // Selected tab content
  if (activeTab === 'detailed-description') {
    const description = scienceGent?.detailed_description || scienceGent?.description || 'No detailed description available for this ScienceGent.';
    
    return (
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">About this ScienceGent</h2>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    );
  }
  
  if (activeTab === 'capabilities') {
    const capabilities = scienceGent?.capabilities || [];
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Capabilities</h2>
        <p className="text-gray-600 mb-6">This ScienceGent has the following capabilities:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.length > 0 ? capabilities.map((capability: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white hover:shadow-md transition">
              <div className="font-medium mb-1">{capability.name || 'Chat'}</div>
              <p className="text-sm text-gray-600 mb-2">
                {capability.description || 'Enables chat interaction with this ScienceGent.'}
              </p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {capability.domain || 'General'}
              </Badge>
            </div>
          )) : (
            <div className="col-span-3 text-center py-8 border rounded-lg bg-gray-50">
              <p className="text-gray-500">No capabilities found for this ScienceGent.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (activeTab === 'developer') {
    const developer = {
      name: scienceGent?.developer_name || 'Anonymous Developer',
      address: scienceGent?.creator_address || scienceGent?.creator || '0x0000000000000000000000000000000000000000',
      bio: scienceGent?.bio || 'No bio provided.',
      twitter: scienceGent?.developer_twitter,
      github: scienceGent?.developer_github,
    };
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Developer Information</h2>
        
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-20 w-20 rounded-full">
            <AvatarImage src={scienceGent?.developer_profile_pic} alt={developer.name} />
            <AvatarFallback className="bg-purple-600 text-white text-lg">
              {developer.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="text-xl font-semibold">{developer.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span className="font-mono">{developer.address.substring(0, 8)}...{developer.address.slice(-6)}</span>
              <button 
                onClick={() => copyAddressToClipboard(developer.address)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <Copy size={14} />
              </button>
              <a 
                href={`https://sepolia.etherscan.io/address/${developer.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <ExternalLink size={14} />
              </a>
            </div>
            
            <p className="mt-2 text-gray-700">{developer.bio}</p>
            
            <div className="flex gap-2 mt-2">
              {developer.twitter && (
                <Button size="sm" variant="outline" className="h-8" asChild>
                  <a href={developer.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-1" />
                    Twitter
                  </a>
                </Button>
              )}
              
              {developer.github && (
                <Button size="sm" variant="outline" className="h-8" asChild>
                  <a href={developer.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Other ScienceGents by this developer</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div>
                <div className="font-medium">ScienceGent Name</div>
                <div className="text-xs text-gray-500">0x1234...5678</div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price: 0.00002 ETH</span>
              <span>Market Cap: 3.42 ETH</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default InfoTab;
