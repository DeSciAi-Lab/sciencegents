import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, IChartApi, Time, LineStyle, CrosshairMode, LineData, ISeriesApi, HistogramData } from 'lightweight-charts';
import { supabase } from '@/integrations/supabase/client';

interface TokenTradeChartProps {
    tokenId: string;
    height?: number;
    width?: number;
    smaPeriod?: number;
}

interface Trade {
    token_id: string;
    price_in_usd: number;
    volume: number;
    time: string;
}

// Time frame type for the chart
type TimeFrame = '1W' | '1M' | '1Y' | 'ALL';

// Function to transform trades into line chart data
const aggregateTradesIntoLineData = (trades: Trade[]): LineData<Time>[] => {
    if (!trades.length) return [];
    
    // Sort trades by time
    const sortedTrades = [...trades].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    
    // Map trades to line data format
    return sortedTrades.map(trade => ({
        time: new Date(trade.time).getTime() / 1000 as Time,
        value: trade.price_in_usd
    }));
};

// Function to get the start date based on time frame
const getStartDateForTimeFrame = (timeFrame: TimeFrame): Date => {
    const now = new Date();
    
    switch (timeFrame) {
        case '1W':
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);
            return oneWeekAgo;
        case '1M':
            const oneMonthAgo = new Date(now);
            oneMonthAgo.setMonth(now.getMonth() - 1);
            return oneMonthAgo;
        case '1Y':
            const oneYearAgo = new Date(now);
            oneYearAgo.setFullYear(now.getFullYear() - 1);
            return oneYearAgo;
        case 'ALL':
        default:
            // Use a very old date to get all data
            return new Date(0);
    }
};

export const TokenTradeChart = ({ 
    tokenId, 
    height = 400, 
    width = 600,
    smaPeriod = 20
}: TokenTradeChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
    const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [allTrades, setAllTrades] = useState<Trade[]>([]);
    const [timeFrame, setTimeFrame] = useState<TimeFrame>('1W');
    const [loading, setLoading] = useState(true);

    // Filter trades based on selected time frame
    const filterTradesByTimeFrame = (trades: Trade[], selectedTimeFrame: TimeFrame) => {
        const startDate = getStartDateForTimeFrame(selectedTimeFrame);
        return trades.filter(trade => new Date(trade.time) >= startDate);
    };

    // Handle time frame change
    const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
        setTimeFrame(newTimeFrame);
        
        if (allTrades.length > 0) {
            const filteredTrades = filterTradesByTimeFrame(allTrades, newTimeFrame);
            setTrades(filteredTrades);
            
            // Update chart data
            if (lineSeriesRef.current && volumeSeriesRef.current) {
                const lineData = aggregateTradesIntoLineData(filteredTrades);
                lineSeriesRef.current.setData(lineData);
                
                const volumeData = filteredTrades.map((trade: Trade) => ({
                    time: new Date(trade.time).getTime() / 1000 as Time,
                    value: Math.abs(trade.volume),
                    color: trade.volume > 0 ? '#26a69a' : '#ef5350',
                }));
                volumeSeriesRef.current.setData(volumeData);
                
                if (chartRef.current) {
                    chartRef.current.timeScale().fitContent();
                }
            }
        }
    };

    useEffect(() => {
        if (!chartContainerRef.current) return;
        setLoading(true);

        // Initialize chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'white' },
                textColor: 'black',
            },
            width: width || chartContainerRef.current.clientWidth,
            height: height,
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            // Enhance crosshair and tooltips
            crosshair: {
                mode: CrosshairMode.Normal,
                vertLine: {
                    labelBackgroundColor: '#9B7DFF',
                },
                horzLine: {
                    labelBackgroundColor: '#9B7DFF',
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });
        chartRef.current = chart;

        // Add line series for price
        const lineSeries = chart.addLineSeries({
            color: '#2962FF',
            lineWidth: 2,
            crosshairMarkerVisible: true,
            crosshairMarkerRadius: 6,
            priceFormat: {
                type: 'price',
                precision: 8,
                minMove: 0.00000001,
            },
            // Add gradient fill
            lineType: 0,
            lastValueVisible: true,
            priceLineVisible: true,
        });
        lineSeriesRef.current = lineSeries;

        // Add volume histogram series
        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
                precision: 2,
            },
            priceScaleId: '',
        } as any); // Type assertion to handle complex properties
        volumeSeriesRef.current = volumeSeries;
        
        // Set scale margins separately
        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8,
                bottom: 0,
            },
        });

        // Load initial data
        const loadData = async () => {
            try {
                // Get all trades for this token
                const { data: fetchedTrades, error } = await supabase
                    .from('trades')
                    .select('*')
                    .eq('token_id', tokenId)
                    .order('time', { ascending: true });

                if (error) throw error;

                if (!fetchedTrades || fetchedTrades.length === 0) {
                    console.log('No trade data available');
                    setTrades([]);
                    setAllTrades([]);
                    lineSeries.setData([]);
                    volumeSeries.setData([]);
                    setLoading(false);
                    return;
                }

                // Store all trades
                setAllTrades(fetchedTrades);
                
                // Filter trades based on current time frame
                const filteredTrades = filterTradesByTimeFrame(fetchedTrades, timeFrame);
                setTrades(filteredTrades);
                
                // Format data for line series (price)
                const lineData = aggregateTradesIntoLineData(filteredTrades);
                lineSeries.setData(lineData);
                
                // Format data for volume series
                const volumeData = filteredTrades.map((trade: Trade) => ({
                    time: new Date(trade.time).getTime() / 1000 as Time,
                    value: Math.abs(trade.volume),
                    color: trade.volume > 0 ? '#26a69a' : '#ef5350',
                }));
                volumeSeries.setData(volumeData);
                
                chart.timeScale().fitContent();
                setLoading(false);
            } catch (error) {
                console.error('Error loading trade data:', error);
                setLoading(false);
            }
        };

        loadData();

        // Subscribe to new trades
        const subscription = supabase
            .channel('trades_channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'trades',
                    filter: `token_id=eq.${tokenId}`
                },
                (payload) => {
                    const newTrade = payload.new as Trade;
                    
                    // Update all trades
                    setAllTrades(prev => [...prev, newTrade]);
                    
                    // Check if the new trade falls within the current time frame
                    const tradeDate = new Date(newTrade.time);
                    const startDate = getStartDateForTimeFrame(timeFrame);
                    
                    if (tradeDate >= startDate) {
                        // Update trades state for current time frame
                        setTrades(prev => [...prev, newTrade]);
                        
                        // Update line series with new trade
                        if (lineSeriesRef.current) {
                            const timestamp = new Date(newTrade.time).getTime() / 1000 as Time;
                            lineSeriesRef.current.update({
                                time: timestamp,
                                value: newTrade.price_in_usd
                            });
                        }
                        
                        // Update volume for the latest point
                        if (volumeSeriesRef.current) {
                            const timestamp = new Date(newTrade.time).getTime() / 1000 as Time;
                            volumeSeriesRef.current.update({
                                time: timestamp,
                                value: Math.abs(newTrade.volume),
                                color: newTrade.volume > 0 ? '#26a69a' : '#ef5350',
                            });
                        }
                    }
                }
            )
            .subscribe();

        // Handle window resize
        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            lineSeriesRef.current = null;
            volumeSeriesRef.current = null;
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
            subscription.unsubscribe();
        };
    }, [tokenId, height, width]);

    return (
        <div>
            {/* Time frame selector */}
            <div className="flex justify-end mb-2">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-1 text-xs font-medium ${timeFrame === '1W' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'} border border-gray-200 rounded-l-lg`}
                        onClick={() => handleTimeFrameChange('1W')}
                    >
                        1W
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-1 text-xs font-medium ${timeFrame === '1M' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'} border-t border-b border-r border-gray-200`}
                        onClick={() => handleTimeFrameChange('1M')}
                    >
                        1M
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-1 text-xs font-medium ${timeFrame === '1Y' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'} border-t border-b border-r border-gray-200`}
                        onClick={() => handleTimeFrameChange('1Y')}
                    >
                        1Y
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-1 text-xs font-medium ${timeFrame === 'ALL' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'} border-t border-b border-r border-gray-200 rounded-r-lg`}
                        onClick={() => handleTimeFrameChange('ALL')}
                    >
                        ALL
                    </button>
                </div>
            </div>
            
            {/* Chart container */}
            <div ref={chartContainerRef}>
                {loading && (
                    <div className="flex items-center justify-center h-[400px] bg-gray-50">
                        <p className="text-gray-500">Loading chart data...</p>
                    </div>
                )}
            </div>
        </div>
    );
}; 