
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneralInfoProps {
  scienceGent: any;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ scienceGent }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Basic details about this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm font-medium">Name:</div>
            <div>{scienceGent?.name || 'N/A'}</div>
            
            <div className="text-sm font-medium">Symbol:</div>
            <div>{scienceGent?.symbol || 'N/A'}</div>
            
            <div className="text-sm font-medium">Address:</div>
            <div className="text-sm truncate">{scienceGent?.address || 'N/A'}</div>
            
            <div className="text-sm font-medium">Domain:</div>
            <div>{scienceGent?.domain || 'General'}</div>
            
            <div className="text-sm font-medium">Created:</div>
            <div>{scienceGent?.created_at ? new Date(scienceGent.created_at).toLocaleDateString() : 'N/A'}</div>
          </div>
          
          {scienceGent?.description && (
            <div>
              <div className="text-sm font-medium mb-1">Description:</div>
              <p className="text-sm">{scienceGent.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInfo;
