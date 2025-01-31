import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Immediate scroll with no animation for instant feedback
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    // Backup scroll reset with RAF to ensure it happens after any reflows
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    });
  }, [location]);
};