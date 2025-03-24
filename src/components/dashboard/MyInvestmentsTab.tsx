
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MyInvestmentsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Investments</CardTitle>
        <CardDescription>Track your ScienceGent token investments and trading history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <p>This feature is under development. Check back soon!</p>
          <p className="mt-2 text-sm">You'll be able to view your investments here.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyInvestmentsTab;
