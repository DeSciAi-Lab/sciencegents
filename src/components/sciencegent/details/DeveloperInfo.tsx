
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter, Github, Globe, MessageCircle } from 'lucide-react';

interface DeveloperInfoProps {
  scienceGent: any;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({ scienceGent }) => {
  if (!scienceGent) return null;
  
  // Check if developer info exists
  const hasDeveloperInfo = scienceGent.developer_name || 
                           scienceGent.developer_email || 
                           scienceGent.bio || 
                           scienceGent.developer_twitter || 
                           scienceGent.developer_telegram || 
                           scienceGent.developer_github || 
                           scienceGent.developer_website;
  
  if (!hasDeveloperInfo) return null;
  
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
  
  const developerName = scienceGent.developer_name || 'Developer';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-0">
        <CardTitle className="text-lg">Developer Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={scienceGent.developer_profile_pic || ''} alt={developerName} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
              {getInitials(developerName)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-lg">{developerName}</h3>
          {scienceGent.developer_email && (
            <a href={`mailto:${scienceGent.developer_email}`} className="text-sm text-blue-600 hover:underline">
              {scienceGent.developer_email}
            </a>
          )}
        </div>
        
        {scienceGent.bio && (
          <div className="mt-4 text-sm text-gray-600">
            <p>{scienceGent.bio}</p>
          </div>
        )}
        
        <div className="flex justify-center gap-2 mt-4">
          {scienceGent.developer_twitter && (
            <Button size="icon" variant="outline" className="rounded-full" asChild>
              <a href={scienceGent.developer_twitter} target="_blank" rel="noopener noreferrer">
                <Twitter size={16} />
              </a>
            </Button>
          )}
          
          {scienceGent.developer_github && (
            <Button size="icon" variant="outline" className="rounded-full" asChild>
              <a href={scienceGent.developer_github} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
              </a>
            </Button>
          )}
          
          {scienceGent.developer_website && (
            <Button size="icon" variant="outline" className="rounded-full" asChild>
              <a href={scienceGent.developer_website} target="_blank" rel="noopener noreferrer">
                <Globe size={16} />
              </a>
            </Button>
          )}
          
          {scienceGent.developer_telegram && (
            <Button size="icon" variant="outline" className="rounded-full" asChild>
              <a href={scienceGent.developer_telegram} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfo;
