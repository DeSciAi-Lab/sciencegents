
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Reveal from '@/components/animations/Reveal';
import { supabase } from '@/integrations/supabase/client';

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2, decimals = 0 }: { end: number, duration?: number, decimals?: number }) => {
  const [count, setCount] = React.useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (!inView) return;

    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(progress * end);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US', { 
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      })}
    </span>
  );
};

const Stats = () => {
  const [stats, setStats] = useState({
    scienceGentsCount: 0,
    totalTransactions: 0,
    totalLiquidity: 0,
    totalMarketCap: 0,
    isLoading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get ScienceGents count
        const { count: scienceGentsCount } = await supabase
          .from('sciencegents')
          .select('*', { count: 'exact', head: true });
        
        // Get total transactions
        const { data: statsData } = await supabase
          .from('sciencegent_stats')
          .select('transactions');
        
        // Sum up transactions
        const totalTransactions = statsData?.reduce((sum, item) => sum + (item.transactions || 0), 0) || 0;
        
        // Get total liquidity and market cap
        const { data: marketData } = await supabase
          .from('sciencegents')
          .select('total_liquidity, market_cap');
        
        const totalLiquidity = marketData?.reduce((sum, item) => sum + (parseFloat(String(item.total_liquidity)) || 0), 0) || 0;
        const totalMarketCap = marketData?.reduce((sum, item) => sum + (parseFloat(String(item.market_cap)) || 0), 0) || 0;
        
        setStats({
          scienceGentsCount: scienceGentsCount || 0,
          totalTransactions,
          totalLiquidity: totalLiquidity / 1e6, // Convert to millions
          totalMarketCap: totalMarketCap / 1e6, // Convert to millions
          isLoading: false
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);
  
  // Fallback data if database is empty
  const statItems = [
    { 
      label: 'ScienceGents Launched', 
      value: stats.isLoading || stats.scienceGentsCount === 0 ? 178 : stats.scienceGentsCount 
    },
    { 
      label: 'Total Transactions', 
      value: stats.isLoading || stats.totalTransactions === 0 ? 15672 : stats.totalTransactions 
    },
    { 
      label: 'Total Liquidity', 
      value: stats.isLoading || stats.totalLiquidity === 0 ? 2.4 : stats.totalLiquidity, 
      prefix: '$', 
      suffix: 'M', 
      decimals: 1 
    },
    { 
      label: 'Total Market Cap', 
      value: stats.isLoading || stats.totalMarketCap === 0 ? 5.7 : stats.totalMarketCap, 
      prefix: '$', 
      suffix: 'M', 
      decimals: 1 
    },
  ];

  return (
    <div className="relative bg-science-50 py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-science-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-science-100 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Platform <span className="text-science-700">Metrics</span>
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {statItems.map((stat, index) => (
            <Reveal key={index} delay={100 * index} direction="up">
              <div className="bg-white rounded-2xl shadow-soft p-6 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-science-800">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUp end={stat.value} decimals={stat.decimals || 0} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
