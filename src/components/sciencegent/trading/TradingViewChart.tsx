
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { createChart, ColorType, CandlestickData, Time } from 'lightweight-charts';
import { ethers } from 'ethers';
import { contractConfig } from '@/utils/contractConfig';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

interface TradingViewChartProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated?: boolean;
}

// Define the type for our candle data
interface TokenCandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

// Interface for price history data from Supabase
interface PricePoint {
  price: number;
  timestamp: number;
  volume: number;
}

// Helper function to safely extract price history item properties
const extractPricePointFromJson = (item: Json): PricePoint => {
  // Default values if properties don't exist or aren't numbers
  const defaultPoint: PricePoint = { price: 0, timestamp: 0, volume: 0 };
  
  // If not an object, return default
  if (typeof item !== 'object' || item === null) {
    return defaultPoint;
  }
  
  // Get properties safely, with defaults if they don't exist or aren't numbers
  return {
    price: typeof (item as Record<string, unknown>).price === 'number' 
      ? (item as Record<string, number>).price 
      : defaultPoint.price,
    timestamp: typeof (item as Record<string, unknown>).timestamp === 'number' 
      ? (item as Record<string, number>).timestamp 
      : defaultPoint.timestamp,
    volume: typeof (item as Record<string, unknown>).volume === 'number' 
      ? (item as Record<string, number>).volume 
      : defaultPoint.volume
  };
};

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated = false
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<TokenCandleData[]>([]);
  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<any>(null);

  // Fetch price history data from Supabase and contract
  useEffect(() => {
    if (isMigrated) return;
    
    const fetchTokenTradeData = async () => {
      try {
        setIsLoading(true);
        
        // Step 1: Fetch price history from Supabase
        const { data: statsData, error: statsError } = await supabase
          .from('sciencegent_stats')
          .select('price_history, volume_24h, transactions')
          .eq('sciencegent_address', tokenAddress)
          .single();
        
        if (statsError) {
          console.error("Error fetching price history:", statsError);
          throw new Error("Failed to load price history data");
        }

        // Step 2: Also get current token stats from blockchain for latest price
        if (!window.ethereum) {
          throw new Error("No Ethereum provider found");
        }
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const swapABI = [
          "function getTokenStats(address token) external view returns (uint256 tokenReserve, uint256 ethReserve, uint256 virtualETH, uint256 collectedFees, bool tradingEnabled, address creator, uint256 creationTimestamp, uint256 maturityDeadline, bool migrated, uint256 lpUnlockTime, uint256 lockedLPAmount, uint256 currentPrice, bool migrationEligible)"
        ];
        
        const swapContract = new ethers.Contract(
          contractConfig.addresses.ScienceGentsSwap,
          swapABI,
          provider
        );
        
        // Get current token stats
        const stats = await swapContract.getTokenStats(tokenAddress);
        const currentPrice = parseFloat(ethers.utils.formatEther(stats[11]));
        const creationTimestamp = parseInt(stats[6].toString());
        
        // Process price history data from Supabase
        let priceHistory: PricePoint[] = [];
        
        if (statsData?.price_history) {
          // Check if price_history is an array and parse each item
          if (Array.isArray(statsData.price_history)) {
            priceHistory = (statsData.price_history as Json[]).map(extractPricePointFromJson);
          } else {
            console.warn("Price history is not an array:", statsData.price_history);
          }
        }
        
        // If we have no price history or very limited data, generate some initial historical data
        if (priceHistory.length < 10) {
          // Use the current price from blockchain and a generated history
          const data = generateDemoData(currentPrice, creationTimestamp);
          setChartData(data);
        } else {
          // Convert price history to chart data
          const candleData = convertPriceHistoryToCandleData(priceHistory, currentPrice);
          setChartData(candleData);
        }

        // Setup real-time subscription for price updates
        const priceUpdateChannel = supabase
          .channel('price-updates')
          .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'sciencegent_stats',
            filter: `sciencegent_address=eq.${tokenAddress}`
          }, (payload) => {
            // If price_history has changed, update the chart
            if (payload.new && payload.new.price_history) {
              let newHistory: PricePoint[] = [];
              
              // Safely parse the new price history
              if (Array.isArray(payload.new.price_history)) {
                newHistory = (payload.new.price_history as Json[]).map(extractPricePointFromJson);
              }
              
              const updatedCandleData = convertPriceHistoryToCandleData(newHistory, currentPrice);
              setChartData(updatedCandleData);
            }
          })
          .subscribe();
        
        setIsLoading(false);
        
        return () => {
          supabase.removeChannel(priceUpdateChannel);
        };
      } catch (error) {
        console.error("Error fetching token trade data:", error);
        setChartError("Failed to load trading data. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchTokenTradeData();
  }, [tokenAddress, isMigrated]);

  // Initialize chart when container is ready and data is loaded
  useEffect(() => {
    if (!chartContainerRef.current || isLoading || isMigrated || chartError || chartData.length === 0) return;
    
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current?.clientWidth || 600 
        });
      }
    };
    
    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333',
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });
    
    chartRef.current = chart;
    
    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    
    candlestickSeriesRef.current = candlestickSeries;
    
    // Set the data
    candlestickSeries.setData(chartData);
    
    // Fit content
    chart.timeScale().fitContent();
    
    // Add volume series as histogram if data has volume
    if (chartData[0]?.volume !== undefined) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a50',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
      });
      
      volumeSeries.setData(
        chartData.map(item => ({
          time: item.time,
          value: item.volume || 0,
          color: item.close >= item.open ? '#26a69a50' : '#ef535050',
        }))
      );
    }
    
    // Handle resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartData, isLoading, isMigrated, chartError]);

  // Convert Supabase price history to candle data
  const convertPriceHistoryToCandleData = (
    priceHistory: PricePoint[],
    currentPrice: number
  ): TokenCandleData[] => {
    // Sort the price history by timestamp (oldest first)
    const sortedHistory = [...priceHistory].sort((a, b) => a.timestamp - b.timestamp);
    
    // If no history, return empty array
    if (sortedHistory.length === 0) return [];
    
    // Group data points by day for daily candles
    const dailyCandles: Record<string, PricePoint[]> = {};
    
    sortedHistory.forEach(point => {
      // Convert timestamp to date string (YYYY-MM-DD)
      const date = new Date(point.timestamp * 1000);
      const dateString = date.toISOString().split('T')[0];
      
      if (!dailyCandles[dateString]) {
        dailyCandles[dateString] = [];
      }
      
      dailyCandles[dateString].push(point);
    });
    
    // Convert daily points to OHLC candles
    const candleData: TokenCandleData[] = Object.entries(dailyCandles).map(([dateString, points]) => {
      // Sort points by timestamp for this day
      const sortedPoints = points.sort((a, b) => a.timestamp - b.timestamp);
      
      // Get open, high, low, close values
      const open = sortedPoints[0].price;
      const close = sortedPoints[sortedPoints.length - 1].price;
      const high = Math.max(...sortedPoints.map(p => p.price));
      const low = Math.min(...sortedPoints.map(p => p.price));
      
      // Calculate total volume for the day
      const volume = sortedPoints.reduce((sum, point) => sum + (point.volume || 0), 0);
      
      // Convert date string to timestamp (seconds)
      const time = Math.floor(new Date(dateString).getTime() / 1000) as Time;
      
      return {
        time,
        open,
        high,
        low,
        close,
        volume
      };
    });
    
    // Ensure the last candle has the current price as close value
    if (candleData.length > 0) {
      const lastCandle = candleData[candleData.length - 1];
      lastCandle.close = currentPrice;
      // Update high/low if necessary
      if (currentPrice > lastCandle.high) lastCandle.high = currentPrice;
      if (currentPrice < lastCandle.low) lastCandle.low = currentPrice;
    }
    
    return candleData;
  };

  // Generate demo data function (for when we don't have enough real data)
  const generateDemoData = (currentPrice: number, creationTimestamp: number): TokenCandleData[] => {
    const data: TokenCandleData[] = [];
    const now = Math.floor(Date.now() / 1000);
    // 30 days of data with daily candles
    const oneDaySeconds = 86400;
    const startPrice = currentPrice * 0.7; // Start from a price 30% lower than current
    let lastClose = startPrice;
    
    // If token was created less than 30 days ago, start from creation
    const startTime = Math.max(creationTimestamp, now - (30 * oneDaySeconds));
    
    for (let time = startTime; time <= now; time += oneDaySeconds) {
      // Random price fluctuation
      const volatility = 0.05; // 5% volatility
      const change = lastClose * volatility * (Math.random() * 2 - 1);
      const open = lastClose;
      const close = Math.max(0.00001, open + change); // Ensure price doesn't go negative or too small
      const high = Math.max(open, close) * (1 + Math.random() * 0.03); // Random high above open/close
      const low = Math.min(open, close) * (1 - Math.random() * 0.03); // Random low below open/close
      const volume = Math.random() * 100 + 10; // Random volume between 10-110
      
      data.push({
        time: time as Time,
        open,
        high,
        low,
        close,
        volume
      });
      
      lastClose = close;
    }
    
    // Ensure the last candle ends at current price
    if (data.length > 0) {
      const lastIndex = data.length - 1;
      data[lastIndex].close = currentPrice;
      data[lastIndex].high = Math.max(data[lastIndex].high, currentPrice);
      data[lastIndex].low = Math.min(data[lastIndex].low, currentPrice);
    }
    
    return data;
  };

  if (isMigrated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>
            This token has been migrated to Uniswap. Please view chart data on Uniswap.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Chart data is available on Uniswap after migration.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>
          Trading data for {tokenSymbol}/ETH
        </CardDescription>
      </CardHeader>
      <CardContent className="relative min-h-[400px]">
        {chartError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{chartError}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        ) : (
          <div ref={chartContainerRef} className="h-[400px]" />
        )}
      </CardContent>
    </Card>
  );
};

export default TradingViewChart;
