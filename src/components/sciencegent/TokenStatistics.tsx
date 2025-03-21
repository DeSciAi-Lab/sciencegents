
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, TrendingUp, TrendingDown, Users, Clock, BarChart3, DollarSign } from "lucide-react";

interface TokenStatisticsProps {
  marketCap: number;
  price: number;
  priceChange24h: number;
  volume24h: number;
  holders: number;
  maturityProgress: number;
  migrationStatus: 'pending' | 'eligible' | 'migrated';
  createdAt: string;
}

const TokenStatistics = ({
  marketCap,
  price,
  priceChange24h,
  volume24h,
  holders,
  maturityProgress,
  migrationStatus,
  createdAt,
}: TokenStatisticsProps) => {
  // Calculate time since creation
  const created = new Date(createdAt);
  const now = new Date();
  const diffInDays = Math.round((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Price Card */}
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price
          </CardTitle>
          <span className={`text-xs font-medium rounded-full px-2 py-1 ${
            priceChange24h >= 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {priceChange24h >= 0 ? (
              <TrendingUp className="w-3 h-3 inline mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 inline mr-1" />
            )}
            {Math.abs(priceChange24h).toFixed(2)}%
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${price.toFixed(6)}</div>
        </CardContent>
      </Card>

      {/* Market Cap Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Market Cap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${marketCap >= 1000000
              ? `${(marketCap / 1000000).toFixed(2)}M`
              : marketCap >= 1000
              ? `${(marketCap / 1000).toFixed(2)}K`
              : marketCap.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Volume Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            24h Volume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${volume24h >= 1000000
              ? `${(volume24h / 1000000).toFixed(2)}M`
              : volume24h >= 1000
              ? `${(volume24h / 1000).toFixed(2)}K`
              : volume24h.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* Holders Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            Holders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {holders.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Age Card */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Age
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xl font-bold">{diffInDays} days</div>
          <div className="text-sm text-muted-foreground">
            Created on {created.toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      {/* Maturity Progress Card */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Maturity Progress
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>ScienceGents need to reach maturity before they can be migrated to external DEXs.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{maturityProgress}%</span>
          </div>
          <Progress value={maturityProgress} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Migration Status</span>
            <span className={`text-xs font-medium rounded-full px-2 py-1 ${
              migrationStatus === 'migrated'
                ? 'bg-green-100 text-green-800'
                : migrationStatus === 'eligible'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {migrationStatus === 'migrated'
                ? 'Migrated'
                : migrationStatus === 'eligible'
                ? 'Eligible for Migration'
                : 'Pending Migration'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenStatistics;
