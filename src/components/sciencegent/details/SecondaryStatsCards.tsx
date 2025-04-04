import React from 'react';
import { formatNumber } from '@/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';
import HoldersDisplay from '@/components/sciencegent/HoldersDisplay';
import TransactionsDisplay from '@/components/sciencegent/TransactionsDisplay';
import { Users, BarChart3, MessageCircle, DollarSign } from 'lucide-react';

interface SecondaryStatsCardsProps {
  scienceGent: any;
  isLoading?: boolean;
}

const SecondaryStatsCards: React.FC<SecondaryStatsCardsProps> = ({ scienceGent, isLoading }) => {
  // Get interactions_count and calculate revenue
  const interactionsCount = scienceGent?.interactions_count ?? 0;
  const agentFee = scienceGent?.agent_fee ?? 0;
  const revenue = interactionsCount * agentFee;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-8 py-3 border-t border-b">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-4 w-16 mx-auto mb-1" />
            <Skeleton className="h-5 w-12 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8 py-3 border-t border-b">
      <div className="text-center">
        <div className="text-sm font-medium flex items-center justify-center">
          <Users className="mr-1 h-4 w-4" /> Holders
        </div>
        <div className="text-lg font-semibold flex justify-center">
          {scienceGent?.address ? (
            <HoldersDisplay tokenAddress={scienceGent.address} />
          ) : (
            '—'
          )}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm font-medium flex items-center justify-center">
          <BarChart3 className="mr-1 h-4 w-4" /> Txns
        </div>
        <div className="text-lg font-semibold flex justify-center">
          {scienceGent?.address ? (
            <TransactionsDisplay tokenAddress={scienceGent.address} />
          ) : (
            '—'
          )}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm font-medium flex items-center justify-center">
          <MessageCircle className="mr-1 h-4 w-4" /> Interactions
        </div>
        <div className="text-lg font-semibold">{formatNumber(interactionsCount, 0)}</div>
      </div>
      
      <div className="text-center">
        <div className="text-sm font-medium flex items-center justify-center">
          <DollarSign className="mr-1 h-4 w-4" /> Revenue
        </div>
        <div className="text-lg font-semibold">{formatNumber(revenue, 0)} DSI</div>
      </div>
    </div>
  );
};

export default SecondaryStatsCards; 