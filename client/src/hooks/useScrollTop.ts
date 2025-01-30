import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);

    // Backup scroll reset in case the first one gets overridden
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [location]);
};