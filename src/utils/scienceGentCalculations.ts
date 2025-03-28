
/**
 * Calculates the maturity progress percentage for a ScienceGent token
 * 
 * @param virtualETH The virtual ETH amount from token creation
 * @param collectedFees The amount of trading fees collected
 * @param capabilityFees The total capability fees for the token
 * @returns The maturity progress as a percentage (0-100)
 */
export const calculateMaturityProgress = (
  virtualETH: number, 
  collectedFees: number, 
  capabilityFees: number
): number => {
  // Calculate the migration condition: 2 * virtualETH + capabilityFees
  const migrationCondition = (2 * virtualETH) + capabilityFees;
  
  // Calculate the progress percentage
  if (migrationCondition === 0) return 0;
  
  const progress = (collectedFees / migrationCondition) * 100;
  
  // Ensure the progress doesn't exceed 100%
  return Math.min(100, progress);
};

/**
 * Format token age in a human-readable format
 */
export const formatAge = (timestamp: string | number | Date): string => {
  if (!timestamp) return 'Unknown';
  
  const date = new Date(timestamp);
  const now = new Date();
  
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return diffInHours < 1 ? 'Less than an hour' : `${diffInHours} hours`;
  }
  
  if (diffInDays < 30) {
    return `${diffInDays} days`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  const remainingMonths = diffInMonths % 12;
  
  if (remainingMonths === 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
  }
  
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
};
