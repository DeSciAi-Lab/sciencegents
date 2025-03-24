
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Github, Globe, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchDeveloperProfile } from '@/services/developerProfileService';
import { DeveloperProfile } from '@/types/profile';

interface DeveloperInfoProps {
  creatorAddress?: string;
  developerName?: string;
  developerEmail?: string;
  bio?: string;
  developerTwitter?: string;
  developerGithub?: string;
  developerWebsite?: string;
  profilePic?: string;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({
  creatorAddress,
  developerName,
  developerEmail,
  bio,
  developerTwitter,
  developerGithub,
  developerWebsite,
  profilePic
}) => {
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadDeveloperProfile = async () => {
      if (!creatorAddress) return;
      
      setIsLoading(true);
      try {
        const profile = await fetchDeveloperProfile(creatorAddress);
        if (profile) {
          setDeveloperProfile(profile);
        }
      } catch (error) {
        console.error("Error loading developer profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDeveloperProfile();
  }, [creatorAddress]);

  // Use data from props or from the fetched profile
  const displayName = developerProfile?.developer_name || developerName || 'Unknown Developer';
  const displayBio = developerProfile?.bio || bio || 'No bio available';
  const displayTwitter = developerProfile?.developer_twitter || developerTwitter;
  const displayGithub = developerProfile?.developer_github || developerGithub;
  const displayWebsite = developerProfile?.developer_website || developerWebsite;
  const displayEmail = developerProfile?.developer_email || developerEmail;
  const displayProfilePic = developerProfile?.profile_pic || profilePic;

  // Generate initials for avatar fallback
  const generateInitials = () => {
    if (displayName && displayName !== 'Unknown Developer') {
      return displayName.charAt(0).toUpperCase();
    }
    return creatorAddress ? creatorAddress.substring(2, 4).toUpperCase() : 'UN';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer</CardTitle>
        <CardDescription>About the creator of this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Avatar className="h-16 w-16">
            {displayProfilePic && <AvatarImage src={displayProfilePic} alt={displayName} />}
            <AvatarFallback>{generateInitials()}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-medium">{displayName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{displayBio}</p>
            
            <div className="flex gap-2 flex-wrap">
              {displayEmail && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${displayEmail}`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Email</span>
                  </a>
                </Button>
              )}
              
              {displayTwitter && (
                <Button size="sm" variant="outline" asChild>
                  <a href={displayTwitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Twitter</span>
                  </a>
                </Button>
              )}
              
              {displayGithub && (
                <Button size="sm" variant="outline" asChild>
                  <a href={displayGithub} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">GitHub</span>
                  </a>
                </Button>
              )}
              
              {displayWebsite && (
                <Button size="sm" variant="outline" asChild>
                  <a href={displayWebsite} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Website</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperInfo;
