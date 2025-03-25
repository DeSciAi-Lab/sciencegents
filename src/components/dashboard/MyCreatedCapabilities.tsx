
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronRight, Plus, Upload } from "lucide-react";
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import CapabilityDetailView from './CapabilityDetailView';
import { Input } from "@/components/ui/input";

const renderRating = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={16} 
        className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const CapabilityCard = ({ capability, onClick }) => {
  return (
    <div 
      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{capability.name}</h3>
            <div className="text-xs text-blue-600 mb-1">{capability.id}</div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {capability.description || "Brief Description: Eiusmod ipsum pariatur non amet culpa ipsum eiusmod consect..."}
        </p>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Price {capability.price || 0.2} ETH</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>usage {capability.usageCount || 5}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span>rating</span>
            {renderRating(capability.rating || 4.1)}
            <span className="text-gray-600">{capability.rating || 4.1}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>revenue {capability.revenue || 2600}DSI</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {capability.domain || "Chemistry"}
          </Badge>
        </div>
      </div>
      
      {capability.displayImage && (
        <div className="h-32 w-full">
          <img 
            src={capability.displayImage} 
            alt={capability.name} 
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const MyCreatedCapabilities: React.FC = () => {
  const { isLoading, userCapabilities } = useUserDashboard();
  const navigate = useNavigate();
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Created Capabilities</CardTitle>
          <CardDescription>Manage your created capabilities and track usage metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If viewing a single capability detail
  if (selectedCapability) {
    const capability = userCapabilities.find(c => c.id === selectedCapability);
    if (capability) {
      return (
        <CapabilityDetailView 
          capability={capability} 
          onBack={() => setSelectedCapability(null)} 
        />
      );
    }
  }
  
  // If no capabilities, show empty state
  if (!userCapabilities || userCapabilities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Created Capabilities</CardTitle>
          <CardDescription>Manage your created capabilities and track usage metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>You haven't created any capabilities yet.</p>
            <p className="mt-2 text-sm">Create your first capability and enable others to use it.</p>
            <Button
              className="mt-6"
              onClick={() => navigate('/create-capability')}
            >
              Create Capability
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Created Capabilities</CardTitle>
        <CardDescription>Manage your created capabilities and track usage metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCapabilities.map(capability => (
            <CapabilityCard 
              key={capability.id} 
              capability={capability}
              onClick={() => setSelectedCapability(capability.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCreatedCapabilities;
