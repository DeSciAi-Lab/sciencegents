import React from 'react';
import { ScienceGent } from '@/services/scienceGentExploreService';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';
import { Github, Twitter, Telegram, ExternalLink } from 'lucide-react';

interface DeveloperInfoProps {
  creatorAddress: string;
  developerName: string;
  bio: string;
  developerTwitter: string;
  developerGithub: string;
  developerWebsite: string;
  profilePic: string;
}

const DeveloperInfo: React.FC<DeveloperInfoProps> = ({
  creatorAddress,
  developerName,
  bio,
  developerTwitter,
  developerGithub,
  developerWebsite,
  profilePic
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
      <h4 className="text-lg font-semibold mb-3">Developer Information</h4>
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          {profilePic ? (
            <AvatarImage src={profilePic} alt={developerName || "Developer"} />
          ) : (
            <AvatarFallback>{developerName ? developerName[0].toUpperCase() : 'D'}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="font-medium">{developerName || "Unknown Developer"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{creatorAddress.substring(0, 6)}...{creatorAddress.slice(-4)}</p>
          {bio && <p className="text-sm mt-2">{bio}</p>}
          <div className="flex gap-2 mt-2">
            {developerTwitter && (
              <Link to={developerTwitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </Link>
            )}
            {developerGithub && (
              <Link to={developerGithub} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </Link>
            )}
            {developerWebsite && (
              <Link to={developerWebsite} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfoTabProps {
  scienceGent: ScienceGent | null;
}

const InfoTab: React.FC<InfoTabProps> = ({ scienceGent }) => {
  if (!scienceGent) {
    return <p>Loading ScienceGent data...</p>;
  }

  const {
    name,
    symbol,
    description,
    website,
    socials,
    domain,
    creatorAddress,
    developerName,
    bio,
    developerTwitter,
    developerGithub,
    developerWebsite,
    profilePic
  } = scienceGent;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {creatorAddress && (
          <DeveloperInfo
            creatorAddress={creatorAddress}
            developerName={developerName}
            bio={bio}
            developerTwitter={developerTwitter}
            developerGithub={developerGithub}
            developerWebsite={developerWebsite}
            profilePic={profilePic}
          />
        )}

        <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
          <h4 className="text-lg font-semibold mb-3">ScienceGent Information</h4>
          <div className="space-y-2">
            {description && (
              <div className="text-sm">
                <p>{description}</p>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4" />
                <Link to={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {website}
                </Link>
              </div>
            )}
            {socials && (
              <div className="flex gap-2">
                {socials.twitter && (
                  <Link to={socials.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {socials.telegram && (
                  <Link to={socials.telegram} target="_blank" rel="noopener noreferrer">
                    <Telegram className="h-5 w-5" />
                  </Link>
                )}
                {socials.github && (
                  <Link to={socials.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
            {domain && (
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">{domain}</Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
