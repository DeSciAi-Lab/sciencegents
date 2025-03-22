
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CapabilitiesList from '../CapabilitiesList';

interface CapabilitiesTabProps {
  scienceGent: any;
}

const CapabilitiesTab: React.FC<CapabilitiesTabProps> = ({ scienceGent }) => {
  const capabilitiesCount = scienceGent?.capabilities?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capabilities</CardTitle>
        <CardDescription>
          {capabilitiesCount > 0 
            ? `This ScienceGent has ${capabilitiesCount} specialized capabilities` 
            : "This ScienceGent doesn't have any specialized capabilities yet"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CapabilitiesList 
          scienceGent={scienceGent}
        />
      </CardContent>
    </Card>
  );
};

export default CapabilitiesTab;
