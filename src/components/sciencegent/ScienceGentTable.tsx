import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { ScienceGentListItem } from '@/services/scienceGentExploreService';
import { Star, ArrowDown, ArrowUp, ExternalLink, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEthPriceContext } from '@/context/EthPriceContext';
import { formatNumber, formatPercent, shortenNumber } from '@/utils/formatters';

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
  const { ethPrice } = useEthPriceContext();

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

  // Render maturity progress
  const renderMaturityProgress = (progress: number | undefined) => {
    const displayProgress = progress ?? 0;
    return (
      <div className="w-full max-w-[150px]">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full rounded-full bg-blue-500" 
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 text-center mt-1">
          {displayProgress.toFixed(2)}%
        </div>
      </div>
    );
  };

  // Render column header with sort indicator
  const renderSortableHeader = (label: string, column: keyof ScienceGentListItem) => {
    const isSorted = sortBy === column;
    
    return (
      <button 
        className="flex items-center space-x-1 font-medium" 
        onClick={() => onSortChange(column)}
      >
        <span>{label}</span>
        {isSorted ? (
          sortOrder === 'asc' ? 
            <ArrowUp className="h-4 w-4" /> : 
            <ArrowDown className="h-4 w-4" />
        ) : null}
      </button>
    );
  };

  // Truncate address display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 4)}`;
  };

  // Copy address to clipboard
  const copyToClipboard = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  // Format Market Cap display - matches details page format
  const formatMarketCap = (value: number): string => {
    if (value === 0) return '$0.00';
    
    if (value < 1000) {
      return `$${value.toFixed(2)}`;
    } else if (value < 1000000) {
      return `$${(value / 1000).toFixed(2)}k`;
    } else if (value < 1000000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
  };

  // Format price to match details page (more precision for small values)
  const formatPrice = (value: number): string => {
    if (value === 0) return '$0.00000000';
    
    // Use more decimal places for very small values
    if (value < 0.0001) {
      return `$${value.toFixed(8)}`;
    } else if (value < 0.01) {
      return `$${value.toFixed(6)}`;
    } else if (value < 1) {
      return `$${value.toFixed(4)}`;
    }
    
    return `$${value.toFixed(2)}`;
  };

  // Format 24h volume to match details page
  const formatVolume = (value: number): string => {
    if (value === 0) return '$0.00';
    
    if (value < 10) {
      return `$${value.toFixed(2)}`;
    } else if (value < 1000) {
      return `$${value.toFixed(2)}`;
    } else if (value < 10000) {
      return `$${value.toFixed(2)}`;
    } else {
      // For larger values, use k/M formatting
      return formatMarketCap(value);
    }
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

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-y border-gray-200">
            <TableHead className="w-[80px]">Logo</TableHead>
            <TableHead className="w-[250px]">
              {renderSortableHeader('NAME', 'name')}
            </TableHead>
            <TableHead>{renderSortableHeader('Age', 'age')}</TableHead>
            <TableHead>{renderSortableHeader('Revenue', 'revenue')}</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>{renderSortableHeader('Market cap', 'marketCapUsd')}</TableHead>
            <TableHead>24h Chg</TableHead>
            <TableHead>24h vol</TableHead>
            <TableHead>Price (USD)</TableHead>
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
                <TableCell>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      gent.profilePic 
                        ? '' 
                        : 'bg-purple-600'
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
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium flex items-center gap-1">
                      {gent.name} <span className="text-gray-600">${gent.symbol}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                        {truncateAddress(gent.address)}
                        <button 
                          onClick={(e) => copyToClipboard(e, gent.address)} 
                          className="ml-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy size={12} />
                        </button>
                      </span>
                      {gent.isCurated && (
                        <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-50">
                          curated
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{gent.age === 'unknown' ? 'unknown' : gent.age}</TableCell>
                <TableCell>{formatNumber(gent.revenue, 0)} DSI</TableCell>
                <TableCell>{renderRating(gent.rating)}</TableCell>
                <TableCell>{renderMaturityProgress(gent.maturityProgress)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-50">
                    {gent.domain.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatMarketCap(gent.marketCapUsd || gent.marketCap * (ethPrice || 3000))}
                </TableCell>
                <TableCell className={`${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercent(gent.priceChange24h)}
                </TableCell>
                <TableCell>{formatVolume(gent.volume24h)}</TableCell>
                <TableCell>
                  {formatPrice(gent.tokenPriceUsd || gent.tokenPrice * (ethPrice || 3000))}
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