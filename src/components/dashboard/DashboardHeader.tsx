
import React from 'react';
import { Copy, Settings, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWallet } from '@/hooks/useWallet';

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName = "User Name" }) => {
  const { address, formatAddress } = useWallet();
  const formattedAddress = address ? formatAddress(address) : "0x1C4C...F463a3";
  
  // Get initials from username or use first chars of address
  const getInitials = () => {
    if (userName && userName !== "User Name") {
      return userName.charAt(0).toUpperCase();
    }
    return address ? address.substring(2, 4).toUpperCase() : "LO";
  };
  
  return (
    <div className="flex items-center justify-between py-4 px-1">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 bg-blue-500 text-white">
          <AvatarFallback className="text-xl font-semibold">{getInitials()}</AvatarFallback>
          <AvatarImage src="" alt={userName} />
        </Avatar>
        
        <div>
          <h2 className="text-xl font-bold">{userName}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
              {formattedAddress}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                }
              }}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DashboardHeader;
