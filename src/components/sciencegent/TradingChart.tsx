
import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data - in a real app, this would come from an API
const generateSampleData = (days: number) => {
  const data = [];
  const now = new Date();
  let price = 0.024;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate some random price movement
    const change = (Math.random() - 0.5) * 0.001;
    price = Math.max(0.0001, price + change);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: price,
      volume: Math.floor(Math.random() * 10000) + 1000,
    });
  }
  
  return data;
};

const timeFrames = [
  { id: '1d', label: '1D', days: 1 },
  { id: '1w', label: '1W', days: 7 },
  { id: '1m', label: '1M', days: 30 },
  { id: '3m', label: '3M', days: 90 },
  { id: '1y', label: '1Y', days: 365 },
];

interface TradingChartProps {
  tokenSymbol: string;
}

const TradingChart = ({ tokenSymbol }: TradingChartProps) => {
  const [activeTimeFrame, setActiveTimeFrame] = useState(timeFrames[1]);
  const data = generateSampleData(activeTimeFrame.days);
  
  const config = {
    price: {
      label: 'Price',
      color: '#3B82F6', // Blue
    },
    volume: {
      label: 'Volume',
      color: '#D1D5DB', // Gray
    },
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">
            {tokenSymbol} Price Chart
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          {timeFrames.map((timeFrame) => (
            <button
              key={timeFrame.id}
              onClick={() => setActiveTimeFrame(timeFrame)}
              className={`px-3 py-1 text-xs rounded-md ${
                activeTimeFrame.id === timeFrame.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {timeFrame.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>
          <TabsContent value="price" className="h-[300px]">
            <ChartContainer config={config}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    });
                  }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                  tickFormatter={(value) => `$${value.toFixed(6)}`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                          <p className="text-gray-500">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                          <p className="font-medium">${Number(payload[0].value).toFixed(6)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="volume" className="h-[300px]">
            <ChartContainer config={config}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D1D5DB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D1D5DB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    });
                  }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickCount={5}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
                          <p className="text-gray-500">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                          <p className="font-medium">{Number(payload[0].value).toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#D1D5DB"
                  fillOpacity={1}
                  fill="url(#colorVolume)"
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingChart;
