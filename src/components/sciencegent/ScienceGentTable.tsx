
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { ScienceGentListItem } from '@/services/scienceGentExploreService';
import { Star, ExternalLink, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { Button } from '@/components/ui/button';

interface ScienceGentTableProps {
  scienceGents: ScienceGentListItem[];
  onSortChange: (column: keyof ScienceGentListItem) => void;
  sortBy: keyof ScienceGentListItem;
  sortOrder: 'asc' | 'desc';
  isLoading?: boolean;
}

const ScienceGentTable: React.FC<ScienceGentTableProps> = ({ 
  scienceGents,
  onSortChange,
  sortBy,
  sortOrder,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const { formatEthPrice } = useEthPriceContext();

  // Render maturity progress
  const renderMaturityProgress = (status: string) => {
    return (
      <div className="w-full max-w-[120px]">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full ${
              status === 'Ready' ? 'bg-blue-500' : 
              status === 'Migrated' ? 'bg-green-500' : 
              'bg-purple-500'
            }`} 
            style={{ 
              width: status === 'Migrated' ? '100%' : 
                    status === 'Ready' ? '80%' : 
                    '30%' 
            }}
          />
        </div>
        <div className="text-xs mt-1">{status}</div>
      </div>
    );
  };

  // Render star rating (1-5)
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Render column header with sort indicator
  const renderSortableHeader = (label: string, column: keyof ScienceGentListItem) => {
    const isSorted = sortBy === column;
    
    return (
      <Button 
        variant="ghost" 
        className="h-8 p-0 font-medium hover:bg-transparent" 
        onClick={() => onSortChange(column)}
      >
        {label}
        <ArrowUpDown className={`ml-1 h-4 w-4 ${isSorted ? 'text-black' : 'text-gray-400'}`} />
      </Button>
    );
  };

  // Loading row placeholder
  const renderLoadingRow = () => (
    <TableRow>
      <TableCell colSpan={11} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg className="animate-spin h-6 w-6 text-gray-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading ScienceGents...</p>
        </div>
      </TableCell>
    </TableRow>
  );

  // Render external link for migrated tokens
  const renderExternalLink = (address: string, isMigrated: boolean) => {
    if (!isMigrated) return null;
    
    const uniswapUrl = `https://app.uniswap.org/explore/tokens/ethereum_sepolia/${address.toLowerCase()}`;
    
    return (
      <a 
        href={uniswapUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="ml-2 inline-flex items-center text-blue-600 hover:underline"
      >
        <ExternalLink size={14} />
      </a>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[60px]">Logo</TableHead>
            <TableHead className="w-[250px]">
              {renderSortableHeader('NAME', 'name')}
            </TableHead>
            <TableHead>{renderSortableHeader('Age', 'age')}</TableHead>
            <TableHead>{renderSortableHeader('Market cap', 'marketCap')}</TableHead>
            <TableHead>{renderSortableHeader('Price', 'tokenPrice')}</TableHead>
            <TableHead>24h Chg</TableHead>
            <TableHead>24h vol</TableHead>
            <TableHead>{renderSortableHeader('Revenue', 'revenue')}</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Domain</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderLoadingRow()
          ) : scienceGents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                <p className="text-gray-500">No ScienceGents found</p>
              </TableCell>
            </TableRow>
          ) : (
            scienceGents.map((gent) => (
              <TableRow 
                key={gent.id}
                className="cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                onClick={() => navigate(`/sciencegent/${gent.address}`)}
              >
                <TableCell className="py-2">
                  <Checkbox onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell className="py-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      gent.profilePic 
                        ? '' 
                        : 'bg-purple-500'
                    }`}
                  >
                    {gent.profilePic ? (
                      <img 
                        src={gent.profilePic} 
                        alt={gent.name} 
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy" 
                      />
                    ) : (
                      gent.symbol.charAt(0)
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div>
                    <div className="font-medium flex items-center">
                      {gent.name} 
                      <span className="text-gray-600 ml-1">${gent.symbol}</span>
                      {renderExternalLink(gent.address, gent.isMigrated || false)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {gent.address.substring(0, 6)}...{gent.address.slice(-4)}
                      {gent.isCurated && (
                        <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-50">
                          curated
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">{gent.age}</TableCell>
                <TableCell className="py-2">{formatEthPrice(gent.marketCap)}</TableCell>
                <TableCell className="py-2">{gent.tokenPrice.toFixed(6)} ETH</TableCell>
                <TableCell className={`py-2 ${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {gent.priceChange24h >= 0 ? '+' : ''}{gent.priceChange24h.toFixed(2)}%
                </TableCell>
                <TableCell className="py-2">{formatEthPrice(gent.volume24h)}</TableCell>
                <TableCell className="py-2">{gent.revenue.toFixed(0)} DSI</TableCell>
                <TableCell className="py-2">{renderRating(gent.rating)}</TableCell>
                <TableCell className="py-2">{renderMaturityProgress(gent.maturityStatus)}</TableCell>
                <TableCell className="py-2">
                  <Badge variant="outline" className="bg-gray-50">
                    {gent.domain.toLowerCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScienceGentTable;
