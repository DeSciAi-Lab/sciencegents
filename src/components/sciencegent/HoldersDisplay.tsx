import React from 'react';
import { useTokenSummary } from '@/hooks/useTokenSummary';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/utils/formatters';
import { RotateCw, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface HoldersDisplayProps {
  tokenAddress: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Component that displays the token holders count from Moralis
 */
export const HoldersDisplay: React.FC<HoldersDisplayProps> = ({ 
  tokenAddress,
  className = '',
  showIcon = false
}) => {
  const { summary, isLoading, error, refetch } = useTokenSummary(tokenAddress);
  
  if (isLoading) {
    return <Skeleton className={`h-6 w-16 ${className}`} />;
  }
  
  if (error || !summary) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={() => refetch()}
            >
              <RotateCw className="h-4 w-4 text-gray-400" />
              <span className="ml-1">Refresh</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Could not fetch holders count. Click to retry.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`flex items-center cursor-help ${className}`}>
            {showIcon && <Users className="mr-1 h-4 w-4 text-gray-400" />}
            {formatNumber(summary.holdersCount, 0)}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Token holders from Moralis</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoldersDisplay; 