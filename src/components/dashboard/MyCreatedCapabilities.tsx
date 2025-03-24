
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MyCreatedCapabilities: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Created Capabilities</CardTitle>
        <CardDescription>Manage your created capabilities and track usage metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <p>This feature is under development. Check back soon!</p>
          <p className="mt-2 text-sm">You'll be able to manage your created capabilities here.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCreatedCapabilities;
