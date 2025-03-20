
import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  className = "",
  delay = 0,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Calculate transform style based on direction
  const getTransformStyle = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(20px)';
        case 'down': return 'translateY(-20px)';
        case 'left': return 'translateX(20px)';
        case 'right': return 'translateX(-20px)';
        case 'none': return 'scale(0.98)';
        default: return 'translateY(20px)';
      }
    }
    return 'translate(0)';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay before setting visible
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        width,
        transform: getTransformStyle(),
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.7s ease-out ${delay}ms, opacity 0.7s ease-out ${delay}ms`
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;
