
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Define the proper type for TradingViewWidget props
interface TradingViewWidgetProps {
  symbol?: string;
  theme?: string;
  locale?: string;
  autosize?: boolean;
  interval?: string;
  timezone?: string;
  style?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_side_toolbar?: boolean;
  allow_symbol_change?: boolean;
  studies?: string[];
  container_id?: string;
}

// Dynamic import of TradingView widget to avoid SSR issues
const TradingViewWidget = React.lazy(() => 
  import('react-tradingview-widget').then(module => ({
    // Cast the default export to our properly typed component
    default: module.default as React.ComponentType<TradingViewWidgetProps>
  }))
);

interface TradingViewChartProps {
  tokenAddress: string;
  tokenSymbol: string;
  isMigrated?: boolean;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  tokenAddress,
  tokenSymbol,
  isMigrated = false
}) => {
  const [isClient, setIsClient] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [chartError, setChartError] = useState<string | null>(null);

  // Symbol for the chart - we'll use a custom format
  const symbol = `SCIENCEGENT:${tokenSymbol}ETH`;

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);
    
    // Attempt to load chart, set error if it fails
    const timer = setTimeout(() => {
      if (widgetRef.current && widgetRef.current.querySelector('iframe')?.contentWindow?.document?.body?.innerHTML === '') {
        setChartError("Unable to load trading data. This may be due to low trading volume or recent token creation.");
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
          Live trading data for {tokenSymbol}/ETH
        </CardDescription>
      </CardHeader>
      <CardContent className="relative min-h-[400px]">
        {chartError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{chartError}</AlertDescription>
          </Alert>
        ) : (
          <div ref={widgetRef} className="h-[400px]">
            {!isClient ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <React.Suspense fallback={<Skeleton className="h-full w-full" />}>
                <TradingViewWidget
                  symbol={symbol}
                  theme="Light"
                  locale="en"
                  autosize
                  interval="60"
                  timezone="Etc/UTC"
                  style="1"
                  toolbar_bg="#f1f3f6"
                  enable_publishing={false}
                  hide_side_toolbar={false}
                  allow_symbol_change={false}
                  studies={['RSI@tv-basicstudies', 'MASimple@tv-basicstudies']}
                  container_id="tradingview_widget"
                />
              </React.Suspense>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradingViewChart;
