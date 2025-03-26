
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Twitter, Github, Globe, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeveloperInfoProps {
  scienceGent: any;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ scienceGent }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('sciencegents-held');
  
  const developer = scienceGent?.developerInfo || {
    name: 'Developer Name',
    address: scienceGent?.creatorAddress || '0x1C4C...F463a3',
    bio: '(40 words)',
    twitter: '#',
    github: '#',
    website: '#'
  };
  
  const copyToClipboard = (text: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 8)}...${address.slice(-5)}`;
  };
  
  // Mock data
  const heldTokens = [
    { name: 'ScienceGents Name', symbol: 'TICKER', amount: '7,655,765', valueUsd: '42k', logo: 'D' },
    { name: 'Content', symbol: '', amount: '78,887,865', valueUsd: '23k', logo: 'A' }
  ];
  
  const createdTokens = [
    { name: 'ScienceGents Name', symbol: 'TICKER', amount: '7,655,765', valueUsd: '422k', logo: 'D', curated: true },
    { name: 'Content', symbol: '', amount: '78,887,865', valueUsd: '2.3M', logo: 'A' }
  ];
  
  const createdCapabilities = [
    { 
      name: 'Capability Name',
      id: 'capability-id',
      description: 'Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...',
      price: '0.2 ETH',
      usage: 5,
      rating: 4.1,
      revenue: '2600DSI',
      domain: 'Chemistry',
      image: null
    },
    { 
      name: 'Capability Name',
      id: 'capability-id-2',
      description: 'Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...',
      price: '0.2 ETH',
      usage: 5,
      rating: 4.1,
      revenue: '2600DSI',
      domain: 'Chemistry',
      image: 'public/lovable-uploads/1b8620c8-2ca1-40b7-953d-a42173ee661f.png'
    },
    { 
      name: 'Capability Name',
      id: 'capability-id-3',
      description: 'Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...',
      price: '0.2 ETH',
      usage: null,
      rating: null,
      revenue: null,
      domain: 'Protein Analysis',
      image: null
    }
  ];
  
  const renderCapabilities = () => (
    <div className="space-y-8">
      {createdCapabilities.map((capability, index) => (
        <div key={index} className={`${index > 0 ? 'border-t pt-8' : ''}`}>
          <div className="flex gap-8">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{capability.name}</h3>
                <span className="text-xs text-purple-600">{capability.id}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{capability.description}</p>
              <p className="text-sm font-medium mb-2">Price {capability.price}</p>
              
              <div className="flex flex-wrap gap-3">
                {capability.usage !== null && (
                  <span className="text-xs text-gray-600">usage {capability.usage}</span>
                )}
                
                {capability.rating !== null && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600">rating</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-xs ${star <= Math.floor(capability.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-xs">{capability.rating}</span>
                  </div>
                )}
                
                {capability.revenue && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">revenue {capability.revenue}</span>
                )}
                
                {capability.domain && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{capability.domain}</span>
                )}
              </div>
            </div>
            
            {capability.image && (
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={capability.image} 
                  alt={capability.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderTable = (data: any[], type: 'held' | 'created') => {
    if (type === 'held') {
      return (
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-normal text-gray-500">Logo</th>
              <th className="text-left py-2 font-normal text-gray-500">NAME</th>
              <th className="text-right py-2 font-normal text-gray-500">amount</th>
              <th className="text-right py-2 font-normal text-gray-500">in USD</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">
                  <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                    {item.logo}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    {item.symbol && (
                      <Badge className="w-fit mt-1 text-xs bg-gray-100 text-gray-800 font-normal">{item.symbol}</Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 text-right">{item.amount}</td>
                <td className="py-3 text-right">{item.valueUsd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      // Created tokens
      return (
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-normal text-gray-500">Logo</th>
              <th className="text-left py-2 font-normal text-gray-500">NAME</th>
              <th className="text-left py-2 font-normal text-gray-500">created at</th>
              <th className="text-right py-2 font-normal text-gray-500">market cap</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3">
                  <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center text-white">
                    {item.logo}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.symbol && (
                        <Badge className="text-xs bg-gray-100 text-gray-800 font-normal">{item.symbol}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs font-normal bg-gray-100 text-gray-600 border rounded">
                        {formatAddress(developer.address)}
                      </Badge>
                      {item.curated && (
                        <Badge className="text-xs font-normal bg-green-100 text-green-800 border rounded">
                          curated
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3">{item.amount}</td>
                <td className="py-3 text-right">{item.valueUsd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              LO
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold">Developer Name</h2>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                  <Twitter className="h-4 w-4 text-gray-500" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                  <GitHub className="h-4 w-4 text-gray-500" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                  <Globe className="h-4 w-4 text-gray-500" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                  <AtSign className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gray-100 rounded px-2 py-1 flex items-center">
                <span className="text-sm text-gray-600 mr-1">{formatAddress(developer.address)}</span>
                <button 
                  onClick={() => developer.address && copyToClipboard(developer.address)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <p className="text-sm text-gray-600">{developer.bio}</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="sciencegents-held" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 border-b w-full flex rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="sciencegents-held"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0 mr-6"
              onClick={() => setActiveTab('sciencegents-held')}
            >
              ScienceGents Held
            </TabsTrigger>
            <TabsTrigger 
              value="sciencegents-created"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0 mr-6"
              onClick={() => setActiveTab('sciencegents-created')}
            >
              ScienceGents Created
            </TabsTrigger>
            <TabsTrigger 
              value="capabilities-created"
              className="rounded-none border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-transparent px-0"
              onClick={() => setActiveTab('capabilities-created')}
            >
              Capabilities Created
            </TabsTrigger>
          </TabsList>
          
          <div className="overflow-x-auto">
            {activeTab === 'sciencegents-held' && renderTable(heldTokens, 'held')}
            {activeTab === 'sciencegents-created' && renderTable(createdTokens, 'created')}
            {activeTab === 'capabilities-created' && renderCapabilities()}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfo;
