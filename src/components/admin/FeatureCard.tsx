
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
  onAction?: () => void;
  actionLabel?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  comingSoon = false,
  onAction,
  actionLabel = "Coming Soon"
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-science-600" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          disabled={comingSoon}
          onClick={onAction}
        >
          <span>{actionLabel}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
