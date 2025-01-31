import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);

    // Ensure scroll position is reset after any dynamic content loads
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);
};