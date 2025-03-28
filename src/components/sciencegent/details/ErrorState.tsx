
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavbarLayout from '@/components/layout/NavbarLayout';

interface ErrorStateProps {
  address?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ address }) => {
  const navigate = useNavigate();
  
  return (
    <NavbarLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading ScienceGent</AlertTitle>
            <AlertDescription>
              {address ? 
                `We couldn't find a ScienceGent with the address ${address}. It might not exist or there was an error loading it.` :
                "An error occurred while loading the ScienceGent details."
              }
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-4">
            <Button onClick={() => navigate('/sciencegents')}>
              Browse ScienceGents
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
};

export default ErrorState;
