
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
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toFixed(2);
  };

  const formatPriceChange = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
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
    let color = "bg-gray-200";
    let width = "w-1/5";
    let textColor = "text-gray-600";
    
    switch (status) {
      case "Migrated":
        color = "bg-green-500";
        width = "w-full";
        textColor = "text-green-700";
        break;
      case "Ready":
        color = "bg-blue-500";
        width = "w-4/5";
        textColor = "text-blue-700";
        break;
      case "Near":
        color = "bg-yellow-400";
        width = "w-3/5";
        textColor = "text-yellow-700";
        break;
      default:
        // Use defaults
    }
    
    return (
      <div className="flex flex-col">
        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} ${width}`}></div>
        </div>
        <span className={`text-xs ${textColor} mt-1`}>{status}</span>
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
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[60px]">Logo</TableHead>
            <TableHead className="w-[200px]">
              {renderSortableHeader('NAME', 'name')}
            </TableHead>
            <TableHead>{renderSortableHeader('Age', 'age')}</TableHead>
            <TableHead>{renderSortableHeader('Market cap', 'marketCap')}</TableHead>
            <TableHead>{renderSortableHeader('24h Chg', 'priceChange24h')}</TableHead>
            <TableHead>{renderSortableHeader('24h vol', 'volume24h')}</TableHead>
            <TableHead>{renderSortableHeader('Revenue', 'revenue')}</TableHead>
            <TableHead>{renderSortableHeader('Price', 'tokenPrice')}</TableHead>
            <TableHead>{renderSortableHeader('Rating', 'rating')}</TableHead>
            <TableHead>Maturity</TableHead>
            <TableHead>{renderSortableHeader('Domain', 'domain')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scienceGents.map((gent) => (
            <TableRow 
              key={gent.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/sciencegent/${gent.address}`)}
            >
              <TableCell>
                <Checkbox onClick={(e) => e.stopPropagation()} />
              </TableCell>
              <TableCell>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                    gent.profilePic 
                      ? '' 
                      : 'bg-gradient-to-br from-science-400 to-science-600'
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
                    gent.name.substring(0, 1).toUpperCase()
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {gent.name}
                    {gent.isCurated && (
                      <Badge variant="outline" className="bg-gray-100 text-xs">
                        curated
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="font-semibold">${gent.symbol}</span>
                    <span className="text-xs text-gray-400">{formatAddress(gent.address)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{gent.age}</TableCell>
              <TableCell>{formatCurrency(gent.marketCap)}</TableCell>
              <TableCell className={gent.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatPriceChange(gent.priceChange24h)}
              </TableCell>
              <TableCell>{formatCurrency(gent.volume24h)}</TableCell>
              <TableCell>{formatCurrency(gent.revenue)} DSI</TableCell>
              <TableCell>{gent.tokenPrice.toFixed(3)}</TableCell>
              <TableCell>{renderRating(gent.rating)}</TableCell>
              <TableCell>{renderMaturityProgress(gent.maturityStatus)}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-gray-50">
                  {gent.domain}
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
