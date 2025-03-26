
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, Share2, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ScienceGentHeaderProps {
  scienceGent: any;
  address: string;
}

const ScienceGentHeader: React.FC<ScienceGentHeaderProps> = ({ scienceGent, address }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Address copied to clipboard",
          description: "You can now paste the address where needed",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard",
          variant: "destructive"
        });
      });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 8)}...${address.slice(-5)}`;
  };

  const symbol = scienceGent?.symbol || "TICKER";
  const domain = scienceGent?.domain || "General";
  const name = scienceGent?.name || "ScienceGent Name";
  const description = scienceGent?.description || "Description ----- ---- ----- ------ ----- ------ ---";

  return (
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        {scienceGent?.profile_pic ? (
          <img 
            src={scienceGent.profile_pic} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = `<div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">${name?.charAt(0) || '?'}</div>`;
            }}
          />
        ) : (
          <div className="text-white text-4xl font-bold">
            {name?.charAt(0) || '?'}
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">{name}</h1>
          <Badge className="ml-1 bg-gray-100 text-gray-800 font-medium border-0 rounded">${symbol}</Badge>
          <div className="text-xs font-bold text-gray-500 ml-1 uppercase">STICKER</div>
        </div>

        <div className="flex flex-wrap items-center mb-2 gap-2">
          <div className="flex items-center bg-gray-100 rounded px-2 py-1">
            <span className="text-sm text-gray-600 mr-1">{formatAddress(address || '')}</span>
            <button 
              onClick={() => address && copyToClipboard(address)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          <Button size="sm" variant="outline" className="h-7 rounded-md px-3">
            {domain}
          </Button>
          
          <div className="flex items-center gap-1">
            {scienceGent?.twitter && (
              <Button 
                size="sm"
                variant="outline" 
                className="rounded-full bg-[#1DA1F2] text-white h-7 w-7 p-0 flex items-center justify-center"
                onClick={() => window.open(scienceGent.twitter, '_blank')}
              >
                <Twitter className="h-3.5 w-3.5" />
              </Button>
            )}
            
            {scienceGent?.facebook && (
              <Button 
                size="sm"
                variant="outline" 
                className="rounded-full bg-[#4267B2] text-white h-7 w-7 p-0 flex items-center justify-center"
                onClick={() => window.open(scienceGent.facebook, '_blank')}
              >
                <Facebook className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 rounded-md px-3 flex items-center gap-1">
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </Button>

            <Button variant="outline" size="sm" className="h-7 rounded-md px-3 flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Save</span>
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-full px-4 py-1.5 text-sm text-gray-600 max-w-3xl">
          {description}
          <button className="text-blue-500 ml-1 text-xs">see more</button>
        </div>
      </div>
    </div>
  );
};

export default ScienceGentHeader;
