
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const AnimatedElement = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 800
}: AnimatedElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '30px 0px -30px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'up':
        return 'translate-y-6';
      case 'down':
        return '-translate-y-6';
      case 'left':
        return 'translate-x-6';
      case 'right':
        return '-translate-x-6';
      default:
        return 'translate-y-6';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${getTransformClass()}`
      } ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? '0ms' : `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
