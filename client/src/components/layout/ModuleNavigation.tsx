import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface NavigationItem {
  path: string;
  label: string;
}

interface ModuleNavigationProps {
  prev?: NavigationItem;
  next?: NavigationItem;
}

export const ModuleNavigation = ({ prev, next }: ModuleNavigationProps) => {
  const [location] = useLocation();

  // Handle specific scroll behavior when navigating back from topic 2 to topic 1
  useEffect(() => {
    if (location === '/modules/module1/digital-currencies' && prev?.path === '/modules/module1/security') {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [location, prev?.path]);

  return (
    <motion.div 
      className="flex justify-between items-center mt-8 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {prev ? (
        <Link href={prev.path}>
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            {prev.label}
          </Button>
        </Link>
      ) : (
        <span></span>
      )}

      {next ? (
        <Link href={next.path}>
          <Button variant="outline" className="flex items-center gap-2">
            {next.label}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <span></span>
      )}
    </motion.div>
  );
};