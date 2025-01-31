import { useCallback } from 'react';
import { useLocation } from 'wouter';

export const useNavigate = () => {
  const [location, setLocation] = useLocation();

  // Helper function to check if a path is a module topic page
  const isModuleTopicPage = (path: string): boolean => {
    return path.match(/^\/modules\/module[1-4]\/(digital-currencies|security|applications|getting-started)$/) !== null;
  };

  const navigate = useCallback((to: string) => {
    // Force scroll for navigation involving any module topic page
    if (isModuleTopicPage(to) || isModuleTopicPage(location)) {
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