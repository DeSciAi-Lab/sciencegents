
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Download, Users } from 'lucide-react';
import { Capability } from '@/types/capability';

interface CapabilityInfoSidebarProps {
  capability: Capability;
}

const CapabilityInfoSidebar: React.FC<CapabilityInfoSidebarProps> = ({ capability }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Price</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{capability.price} ETH</div>
          <Button className="w-full" disabled>
            Create ScienceGent
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Stats</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <span className="font-medium">{capability.stats?.rating || 4.5}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Usage</span>
            </div>
            <span className="font-medium">{capability.stats?.usageCount || 0} tokens</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Revenue</span>
            </div>
            <span className="font-medium">{capability.stats?.revenue || 0} ETH</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Category</h3>
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="font-normal">
            {capability.domain}
          </Badge>
        </CardContent>
      </Card>
      
      {capability.features && capability.features.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Features</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {capability.features.slice(0, 5).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
            {capability.features.length > 5 && (
              <div className="text-xs text-muted-foreground text-center pt-1">
                +{capability.features.length - 5} more features
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CapabilityInfoSidebar;
