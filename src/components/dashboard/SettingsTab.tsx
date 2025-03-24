
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <p>This feature is under development. Check back soon!</p>
          <p className="mt-2 text-sm">You'll be able to configure your settings here.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
