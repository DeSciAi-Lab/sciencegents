
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Lock className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
      <p className="text-muted-foreground mb-6">
        Only the admin wallet (0x86A6...9F83) can access this page.
      </p>
      <Button onClick={() => navigate('/')} variant="outline">
        Return to Homepage
      </Button>
    </div>
  );
};

export default AccessDenied;
