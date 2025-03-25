
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileText as FileTextIcon,
  FileCode, 
  Code2, 
  User,
  Check, 
  AlertCircle,
  Loader2,
  MessageSquare,
  GraduationCap,
  Copy,
  ExternalLink,
  Twitter,
  Github,
  Globe,
  Mail,
  Star
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Import the capability details component
import { useQuery } from '@tanstack/react-query';
import { Capability } from '@/types/capability';
import { fetchCapabilityById } from '@/services/capability/supabase';
import CapabilityInfoSidebar from './CapabilityInfoSidebar';
import CapabilityDetails from './CapabilityDetails';
import { fetchDeveloperProfile } from '@/services/developerProfileService';
import { DeveloperProfile } from '@/types/profile';
import { formatAddress } from '@/utils/walletUtils';
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';
import { toast } from '@/components/ui/use-toast';

interface CapabilityDetailPageProps {
  capability?: Capability;
}

const CapabilityDetailPage: React.FC<CapabilityDetailPageProps> = ({ capability: propCapability }) => {
  const { id } = useParams<{ id: string }>();
  
  const { data: capability, isLoading, error } = useQuery({
    queryKey: ['capability', id],
    queryFn: () => fetchCapabilityById(id || ''),
    enabled: !!id && !propCapability,
    initialData: propCapability
  });

  // Fetch developer profile
  const { data: developerProfile, isLoading: isLoadingDeveloper } = useQuery({
    queryKey: ['developer-profile', capability?.creator],
    queryFn: () => fetchDeveloperProfile(capability?.creator || ''),
    enabled: !!capability?.creator
  });
  
  // Function to render rating stars
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
  
  // Function to copy address to clipboard
  const copyAddressToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "The address has been copied to your clipboard",
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Skeleton className="h-24 rounded-md" />
              <Skeleton className="h-24 rounded-md" />
              <Skeleton className="h-24 rounded-md" />
            </div>
            
            <Skeleton className="h-96 rounded-md" />
          </div>
          
          <div className="w-full md:w-1/4">
            <Skeleton className="h-64 rounded-md mb-4" />
            <Skeleton className="h-32 rounded-md" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !capability) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error loading capability</AlertTitle>
          <AlertDescription>
            {(error as Error)?.message || "The requested capability could not be found."}
          </AlertDescription>
        </Alert>
        
        <Button variant="default" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  // Function to determine file icon based on filename
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return <FileTextIcon className="h-5 w-5 text-red-500" />;
    } else if (['doc', 'docx'].includes(extension || '')) {
      return <FileTextIcon className="h-5 w-5 text-blue-500" />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
      return <FileTextIcon className="h-5 w-5 text-green-500" />;
    } else if (['js', 'ts', 'jsx', 'tsx', 'json', 'html', 'css'].includes(extension || '')) {
      return <FileCode className="h-5 w-5 text-yellow-500" />;
    }
    
    return <FileTextIcon className="h-5 w-5 text-gray-500" />;
  };
  
  const renderSDKTab = () => {
    // Check if we have any files to display
    const additionalFiles = Array.isArray(capability.files?.additionalFiles) 
      ? capability.files?.additionalFiles 
      : [];
    
    const hasDocumentation = capability.files?.documentation || capability.docs;
    const hasIntegrationGuide = capability.files?.integrationGuide;
    
    if (!hasDocumentation && !hasIntegrationGuide && additionalFiles.length === 0) {
      return (
        <Alert className="my-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No SDK Documentation Available</AlertTitle>
          <AlertDescription>
            The developer hasn't uploaded any documentation for this capability yet.
          </AlertDescription>
        </Alert>
      );
    }
    
    // Prepare display files
    const displayFiles = [];
    
    if (hasDocumentation) {
      displayFiles.push({
        name: 'Documentation.pdf',
        url: capability.files?.documentation || capability.docs,
        size: '1.2 MB',
        lastModified: new Date().toLocaleDateString()
      });
    }
    
    if (hasIntegrationGuide) {
      displayFiles.push({
        name: 'Integration Guide.pdf',
        url: capability.files?.integrationGuide,
        size: '0.8 MB',
        lastModified: new Date().toLocaleDateString()
      });
    }
    
    // Add additional files
    additionalFiles.forEach((file: any) => {
      if (typeof file === 'string') {
        displayFiles.push({
          name: `File ${displayFiles.length + 1}`,
          url: file,
          size: 'Unknown',
          lastModified: new Date().toLocaleDateString()
        });
      } else if (file.name && file.url) {
        displayFiles.push({
          name: file.name,
          url: file.url,
          size: file.size || 'Unknown',
          lastModified: new Date().toLocaleDateString()
        });
      }
    });
    
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-md border">
          <div className="p-4 border-b">
            <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-500">
              <div className="col-span-2">Name</div>
              <div>Size</div>
              <div>Last modified</div>
            </div>
          </div>
          
          <div className="divide-y">
            {displayFiles.map((file, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-2 flex items-center">
                  {getFileIcon(file.name)}
                  <span className="ml-2 font-medium text-gray-700">{file.name}</span>
                </div>
                <div className="text-sm text-gray-600">{file.size}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{file.lastModified}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <span className="text-xs">download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderDeveloperTab = () => {
    if (isLoadingDeveloper) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }
    
    if (!developerProfile) {
      return (
        <Alert className="my-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Developer Information Not Available</AlertTitle>
          <AlertDescription>
            The developer hasn't provided additional information.
          </AlertDescription>
        </Alert>
      );
    }

    const creatorAddress = capability.creator;
    const displayName = developerProfile.developer_name || 'Anonymous Developer';
    
    const socialLinks = [
      ...(developerProfile.developer_twitter ? [{
        icon: <Twitter className="h-4 w-4" />,
        url: developerProfile.developer_twitter,
        label: 'Twitter'
      }] : []),
      ...(developerProfile.developer_github ? [{
        icon: <Github className="h-4 w-4" />,
        url: developerProfile.developer_github,
        label: 'GitHub'
      }] : []),
      ...(developerProfile.developer_website ? [{
        icon: <Globe className="h-4 w-4" />,
        url: developerProfile.developer_website,
        label: 'Website'
      }] : [])
    ];
    
    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 rounded-full">
              <AvatarImage src={developerProfile.profile_pic} alt={displayName} />
              <AvatarFallback className="bg-purple-600 text-white text-lg">
                {displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{displayName}</h3>
                
                {creatorAddress && (
                  <div className="flex items-center mt-1 space-x-1">
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-mono flex items-center">
                      {formatAddress(creatorAddress)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => copyAddressToClipboard(creatorAddress)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1 text-gray-500 hover:text-gray-700"
                        asChild
                      >
                        <a href={`https://sepolia.etherscan.io/address/${creatorAddress}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {developerProfile.bio && (
                <p className="text-gray-600 text-sm">{developerProfile.bio}</p>
              )}
              
              {socialLinks.length > 0 && (
                <div className="flex gap-2">
                  {socialLinks.map((link, index) => (
                    <Button key={index} size="sm" variant="outline" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        {link.icon}
                        <span>{link.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Tabs defaultValue="sciencegents-held">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="sciencegents-held">ScienceGents Held</TabsTrigger>
              <TabsTrigger value="sciencegents-created">ScienceGents Created</TabsTrigger>
              <TabsTrigger value="capabilities-created">Capabilities Created</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sciencegents-held" className="mt-4">
              <div className="bg-white rounded-md border">
                <div className="p-4 border-b">
                  <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-500">
                    <div>Logo</div>
                    <div>NAME</div>
                    <div>amount</div>
                    <div>In USD</div>
                  </div>
                </div>
                
                <div className="p-8 text-center text-gray-500">
                  <p>No ScienceGents held</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sciencegents-created" className="mt-4">
              <div className="bg-white rounded-md border">
                <div className="p-4 border-b">
                  <div className="grid grid-cols-4 gap-4 font-medium text-sm text-gray-500">
                    <div>Logo</div>
                    <div>NAME</div>
                    <div>amount</div>
                    <div>In USD</div>
                  </div>
                </div>
                
                <div>
                  <div className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 border-b">
                    <div>
                      <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center text-white font-semibold">
                        D
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">ScienceGents Name</div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                          {formatAddress("0x1C4C...F463a3")}
                        </span>
                        <span className="ml-2 bg-gray-100 text-xs px-2 py-0.5 rounded">curated</span>
                      </div>
                    </div>
                    <div>7,655,765</div>
                    <div>42k</div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50">
                    <div>
                      <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold">
                        A
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">content</div>
                    </div>
                    <div>78,887,865</div>
                    <div>23k</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="capabilities-created" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Capability Name</h4>
                        <Badge variant="outline" className="text-xs">Capability ID</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Price 0.2 ETH</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                        usage 5
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                        rating 4.1
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                        revenue 2600DSI
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                        Chemistry
                      </Badge>
                    </div>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Capability Name</h4>
                        <Badge variant="outline" className="text-xs">Capability ID</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src="/public/lovable-uploads/5f5cb548-3c37-474e-b137-cb91c7022856.png" 
                        alt="Capability" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Price 0.2 ETH</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                        usage 5
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                        rating 4.1
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                        revenue 2600DSI
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                        Chemistry
                      </Badge>
                    </div>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Capability Name</h4>
                        <Badge variant="outline" className="text-xs">Capability ID</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consectetur...
                      </p>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Price 0.2 ETH</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                        Protein Analysis
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
            {capability.display_image ? (
              <img 
                src={capability.display_image} 
                alt={capability.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              capability.name.substring(0, 2).toUpperCase()
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {capability.name}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {capability.id}
                  </Badge>
                </h1>
                <p className="text-gray-600 mt-2">{capability.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {capability.domain}
                  </Badge>
                  
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
                    <div className="flex items-center">
                      {renderRatingStars(capability.stats?.rating || capability.rating || 4.5)}
                      <span className="ml-1 font-medium">
                        {capability.stats?.rating || capability.rating || 4.5}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="bg-blue-600 hover:bg-blue-700 text-white self-start">
                Include in your ScienceGent
              </Button>
            </div>
            
            <div className="mt-4">
              <p className="text-lg font-medium">Fee {capability.price} ETH</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <CapabilityDetails capability={capability} />
          
          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="sdk" className="flex items-center">
                <Code2 className="w-4 h-4 mr-2" />
                SDK & Integration
              </TabsTrigger>
              <TabsTrigger value="developer" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Developer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <ReactMarkdown 
                      rehypePlugins={[rehypeRaw, rehypeSanitize]} 
                      remarkPlugins={[remarkGfm]}
                    >
                      {capability.detailed_description || capability.description}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sdk" className="mt-0">
              {renderSDKTab()}
            </TabsContent>
            
            <TabsContent value="developer" className="mt-0">
              {renderDeveloperTab()}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4">
          <CapabilityInfoSidebar capability={capability} />
        </div>
      </div>
    </div>
  );
};

export default CapabilityDetailPage;
