
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessScreenProps {
  navigateToDetails: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ navigateToDetails }) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
            <Check className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">ScienceGent Created!</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Congratulations! Your ScienceGent has been successfully created. You will be redirected to your ScienceGent details page momentarily.
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={navigateToDetails}
              className="bg-science-600 hover:bg-science-700 text-white gap-2"
            >
              <span>View My ScienceGent</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessScreen;
