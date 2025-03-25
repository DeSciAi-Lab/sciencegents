
import React from 'react';
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
  GraduationCap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

// Import the capability details component
import { useQuery } from '@tanstack/react-query';
import { Capability } from '@/types/capability';
import { fetchCapabilityById } from '@/services/capability/supabase';
import CapabilityInfoSidebar from './CapabilityInfoSidebar';
import CapabilityDetails from './CapabilityDetails';

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
  
  const renderSDKTab = () => {
    const docsAvailable = capability.files?.documentation || capability.docs;
    const guideAvailable = capability.files?.integrationGuide;
    const additionalFiles = Array.isArray(capability.files?.additionalFiles) 
      ? capability.files?.additionalFiles.length > 0 
      : false;
    
    if (!docsAvailable && !guideAvailable && !additionalFiles) {
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
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capability.files?.documentation && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Complete documentation for using this capability in your ScienceGent
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Documentation
                </Button>
              </CardContent>
            </Card>
          )}
          
          {capability.files?.integrationGuide && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Integration Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step guide for integrating this capability
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Guide
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        {Array.isArray(capability.files?.additionalFiles) && capability.files?.additionalFiles.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {capability.files?.additionalFiles.map((file: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileTextIcon className="h-5 w-5 mr-2 text-blue-500" />
                      {file.name || `Resource ${index + 1}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" 
                      onClick={() => window.open(file.url, '_blank')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderDeveloperTab = () => {
    const developerInfo = capability.developer_info;
    
    if (!developerInfo || (!developerInfo.name && !developerInfo.bio)) {
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
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {capability.developer_profile_pic ? (
            <img 
              src={capability.developer_profile_pic} 
              alt={developerInfo.name || "Developer"} 
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-bold">
              {developerInfo.name || "Anonymous Developer"}
            </h3>
            <p className="text-gray-600">
              {developerInfo.email || ""}
            </p>
          </div>
        </div>
        
        {developerInfo.bio && (
          <div>
            <h4 className="text-lg font-medium mb-2">About the Developer</h4>
            <p className="text-gray-700 whitespace-pre-line">
              {developerInfo.bio}
            </p>
          </div>
        )}
        
        {developerInfo.social_links && developerInfo.social_links.length > 0 && (
          <div>
            <h4 className="text-lg font-medium mb-2">Connect</h4>
            <div className="flex flex-wrap gap-2">
              {developerInfo.social_links.map((link, index) => (
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
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
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
