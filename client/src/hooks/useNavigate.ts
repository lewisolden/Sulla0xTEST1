import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useNavigate = () => {
  const [location, setLocation] = useLocation();

  const navigate = useCallback((to: string) => {
    // Only force scroll for digital-currencies page navigation
    if (to === '/modules/module1/digital-currencies' || location === '/modules/module1/digital-currencies') {
      // First scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Then navigate
      setLocation(to);

      // Double-check scroll after navigation
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else {
      // Normal navigation without forced scroll
      setLocation(to);
    }
  }, [setLocation, location]);

  return navigate;
};