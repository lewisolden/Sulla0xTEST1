import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Force immediate scroll before any animations
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Ensure scroll happens after any potential DOM updates
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 0);

    // Final backup scroll in case of delayed content
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [location]);
};