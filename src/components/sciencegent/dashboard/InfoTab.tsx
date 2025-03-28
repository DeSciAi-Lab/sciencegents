
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe, Twitter } from "lucide-react";
import { calculateMaturityProgress } from '@/utils/scienceGentCalculations';

interface InfoTabProps {
  activeTab: string;
  scienceGent: any;
}

const InfoTab: React.FC<InfoTabProps> = ({ activeTab, scienceGent }) => {
  const renderGeneralInfo = () => {
    const detailedDescription = scienceGent?.detailedDescription || 
      scienceGent?.description ||
      "This ScienceGent provides advanced capabilities for scientific research and analysis. The detailed description will appear here.";
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>About {scienceGent?.name || "ScienceGent"}</CardTitle>
          <CardDescription>Comprehensive information about this ScienceGent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p>{detailedDescription}</p>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderCapabilitiesInfo = () => {
    const capabilities = scienceGent?.capabilities || [];
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Capabilities</CardTitle>
          <CardDescription>Specialized capabilities of this ScienceGent</CardDescription>
        </CardHeader>
        <CardContent>
          {capabilities.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {capabilities.map((capability: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {capability}
                  </Badge>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">What this ScienceGent can do:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Process and analyze scientific data</li>
                    <li>Generate visualizations for research findings</li>
                    <li>Assist with literature reviews and references</li>
                    <li>Help with experiment design and methodology</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <p>No capabilities have been added to this ScienceGent yet.</p>
          )}
        </CardContent>
      </Card>
    );
  };
  
  const renderDeveloperInfo = () => {
    const developerName = scienceGent?.developerName || "Unknown Developer";
    const bio = scienceGent?.bio || "No bio provided";
    const twitter = scienceGent?.developerTwitter;
    const github = scienceGent?.developerGithub;
    const website = scienceGent?.developerWebsite;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Developer Information</CardTitle>
          <CardDescription>About the creator of this ScienceGent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {developerName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-medium">{developerName}</h3>
              <div className="flex gap-2 mt-2">
                {twitter && (
                  <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                    <Twitter size={18} />
                  </a>
                )}
                {github && (
                  <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
                    <Github size={18} />
                  </a>
                )}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500">
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
          <p>{bio}</p>
        </CardContent>
      </Card>
    );
  };
  
  if (activeTab === "nested") {
    return (
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="m-0">{renderGeneralInfo()}</TabsContent>
        <TabsContent value="capabilities" className="m-0">{renderCapabilitiesInfo()}</TabsContent>
        <TabsContent value="developer" className="m-0">{renderDeveloperInfo()}</TabsContent>
      </Tabs>
    );
  }
  
  // If not nested tabs, render based on the active tab
  if (activeTab === "capabilities") {
    return renderCapabilitiesInfo();
  }
  
  if (activeTab === "developer") {
    return renderDeveloperInfo();
  }
  
  // Default to general info
  return renderGeneralInfo();
};

export default InfoTab;
