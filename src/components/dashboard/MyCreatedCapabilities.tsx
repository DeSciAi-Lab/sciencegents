
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import { useUserDashboard } from '@/hooks/useUserDashboard';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import CapabilityDetailView from './CapabilityDetailView';
import CapabilityCard from '@/components/capability/CapabilityCard';

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
            <div key={capability.id} className="relative">
              <CapabilityCard 
                capability={capability}
                onClick={() => setSelectedCapability(capability.id)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCapability(capability.id);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCreatedCapabilities;
