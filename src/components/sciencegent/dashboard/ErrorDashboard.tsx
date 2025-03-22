
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ErrorDashboardProps {
  address: string;
}

const ErrorDashboard: React.FC<ErrorDashboardProps> = ({ address }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-destructive">Error Loading ScienceGent</CardTitle>
      </CardHeader>
      <CardContent>
        <p>We couldn't load the ScienceGent with address: {address}</p>
        <p className="mt-2">This could be because:</p>
        <ul className="list-disc list-inside mt-2">
          <li>The address is invalid</li>
          <li>The ScienceGent doesn't exist</li>
          <li>There was a network error</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ErrorDashboard;
