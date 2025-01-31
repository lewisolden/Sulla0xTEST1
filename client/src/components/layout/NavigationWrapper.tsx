import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export const NavigationWrapper = ({ children }: NavigationWrapperProps) => {
  const [location] = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Force immediate scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Double-check scroll with setTimeout
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);

      // Final check with RAF
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    };

    // Check if we're on a module topic page
    if (location.match(/^\/modules\/module[1-4]\/(digital-currencies|security|applications|getting-started)/)) {
      scrollToTop();
    }
  }, [location]);

  return <>{children}</>;
};