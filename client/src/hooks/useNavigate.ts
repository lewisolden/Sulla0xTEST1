import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useNavigate = () => {
  const [, setLocation] = useLocation();

  const navigate = useCallback((to: string) => {
    // First scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Then navigate
    setLocation(to);
    
    // Double-check scroll after navigation
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [setLocation]);

  return navigate;
};
