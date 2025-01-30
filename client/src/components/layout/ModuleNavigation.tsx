import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/useScrollTop";

interface NavigationItem {
  path: string;
  label: string;
}

interface ModuleNavigationProps {
  prev?: NavigationItem;
  next?: NavigationItem;
}

export const ModuleNavigation = ({ prev, next }: ModuleNavigationProps) => {
  // Add the scroll hook
  useScrollTop();

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