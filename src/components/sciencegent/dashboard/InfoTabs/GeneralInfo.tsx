
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GeneralInfoProps {
  scienceGent: any;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({ scienceGent }) => {
  const detailedDescription = scienceGent?.detailedDescription || 
    "This ScienceGent provides advanced capabilities for scientific research and analysis. The detailed description will appear here.";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Description</CardTitle>
        <CardDescription>Comprehensive information about this ScienceGent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p>{detailedDescription}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInfo;
