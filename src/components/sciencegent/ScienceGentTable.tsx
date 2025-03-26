
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
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScienceGentTableProps {
  scienceGents: ScienceGentListItem[];
  onSortChange: (column: keyof ScienceGentListItem) => void;
  sortBy: keyof ScienceGentListItem;
  sortOrder: 'asc' | 'desc';
}

const ScienceGentTable: React.FC<ScienceGentTableProps> = ({ 
  scienceGents,
  onSortChange,
  sortBy,
  sortOrder
}) => {
  const navigate = useNavigate();

  // Helper functions for formatting
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toFixed(0);
  };

  const formatPriceChange = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(0)}%`;
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

  // Render maturity progress
  const renderMaturityProgress = (status: string) => {
    return (
      <div className="w-full max-w-[120px]">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className={`h-full rounded-full ${status === 'Ready' ? 'bg-blue-500' : status === 'Migrated' ? 'bg-green-500' : 'bg-purple-500'}`} 
            style={{ width: status === 'Migrated' ? '100%' : status === 'Ready' ? '80%' : '30%' }}
          />
        </div>
      </div>
    );
  };

  // Render column header with sort indicator
  const renderSortableHeader = (label: string, column: keyof ScienceGentListItem) => {
    const isSorted = sortBy === column;
    const sortIcon = sortOrder === 'asc' ? '↑' : '↓';
    
    return (
      <div 
        className="flex items-center cursor-pointer hover:text-gray-800" 
        onClick={() => onSortChange(column)}
      >
        {label}
        {isSorted && <span className="ml-1">{sortIcon}</span>}
      </div>
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
            <TableHead>24h Chg</TableHead>
            <TableHead>24h vol</TableHead>
            <TableHead>{renderSortableHeader('Revenue', 'revenue')}</TableHead>
            <TableHead>{renderSortableHeader('Price', 'tokenPrice')}</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>Domain</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scienceGents.map((gent) => (
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
                  <div className="font-medium">
                    {gent.name} <span className="text-gray-600">${gent.symbol}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {formatAddress(gent.address)}
                    {gent.isCurated && (
                      <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-gray-50">
                        curated
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-2">{gent.age}</TableCell>
              <TableCell className="py-2">{formatCurrency(gent.marketCap)}</TableCell>
              <TableCell className={`py-2 ${gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPriceChange(gent.priceChange24h)}
              </TableCell>
              <TableCell className="py-2">{formatCurrency(gent.volume24h)}</TableCell>
              <TableCell className="py-2">{formatCurrency(gent.revenue)} DSI</TableCell>
              <TableCell className="py-2">{gent.tokenPrice.toFixed(3)}</TableCell>
              <TableCell className="py-2">{renderRating(gent.rating)}</TableCell>
              <TableCell className="py-2">{renderMaturityProgress(gent.maturityStatus)}</TableCell>
              <TableCell className="py-2">
                <Badge variant="outline" className="bg-gray-50">
                  {gent.domain.toLowerCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScienceGentTable;
