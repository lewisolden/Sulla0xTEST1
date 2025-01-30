import { useEffect } from 'react';
import { useLocation } from 'wouter';

export const useScrollTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' 
    });
  }, [location]);
};