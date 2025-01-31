import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Backup scroll reset with RAF to ensure it happens after any reflows
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }, [location]);
};