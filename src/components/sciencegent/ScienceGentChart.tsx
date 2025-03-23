
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface ScienceGentChartProps {
  address: string;
  symbol: string;
}

const ScienceGentChart: React.FC<ScienceGentChartProps> = ({ address, symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', 
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Sample data representing 24h of trading (can be replaced with real data from API)
    const currentDate = new Date();
    const sampleData = generateSampleData(currentDate, 24);
    
    candlestickSeries.setData(sampleData);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [address]);

  // Function to generate sample data
  const generateSampleData = (endDate: Date, hours: number) => {
    const data = [];
    let basePrice = 0.00001 + Math.random() * 0.00005;
    let volatility = 0.2;
    
    for (let i = hours; i >= 0; i--) {
      const date = new Date(endDate);
      date.setHours(date.getHours() - i);
      
      const open = basePrice;
      const close = open * (1 + (Math.random() - 0.5) * volatility);
      const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
      const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);
      
      data.push({
        time: Math.floor(date.getTime() / 1000),
        open,
        high,
        low,
        close
      });
      
      basePrice = close;
    }
    
    return data;
  };

  // Add tabs for different time periods
  const timeframes = ['8h', '12h', '16h', '20h'];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          {timeframes.map((timeframe) => (
            <button 
              key={timeframe}
              className="px-3 py-1 text-sm rounded-md hover:bg-gray-100"
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ScienceGentChart;
