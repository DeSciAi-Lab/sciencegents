
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Reveal from '@/components/animations/Reveal';

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
  const stats = [
    { label: 'ScienceGents Launched', value: 178 },
    { label: 'Total Transactions', value: 15672 },
    { label: 'Total Liquidity', value: 2.4, prefix: '$', suffix: 'M', decimals: 1 },
    { label: 'Total Market Cap', value: 5.7, prefix: '$', suffix: 'M', decimals: 1 },
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
          {stats.map((stat, index) => (
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
