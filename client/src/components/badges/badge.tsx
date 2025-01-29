import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Medal, Star, BookOpen, Brain, Code, Network } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof badgeIcons;
  type: 'bronze' | 'silver' | 'gold';
  earned: boolean;
  earnedAt?: Date;
}

const badgeIcons = {
  Medal,
  Star,
  BookOpen,
  Brain,
  Code,
  Network,
} as const;

const badgeColors = {
  bronze: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
  silver: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
  gold: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
};

interface BadgeDisplayProps {
  badge: AchievementBadge;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export default function BadgeDisplay({ badge, size = 'md', showTooltip = true }: BadgeDisplayProps) {
  const Icon = badgeIcons[badge.icon];
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  return (
    <motion.div
      initial={badge.earned ? { scale: 0 } : { opacity: 0.5 }}
      animate={badge.earned ? { scale: 1 } : { opacity: 0.5 }}
      whileHover={badge.earned ? { scale: 1.05 } : {}}
      className="relative group"
    >
      <Badge
        variant="outline"
        className={cn(
          "flex items-center gap-2 cursor-help transition-all",
          badgeColors[badge.type],
          sizeClasses[size],
          !badge.earned && "opacity-50 grayscale"
        )}
      >
        <Icon className={cn(
          "w-4 h-4",
          size === 'lg' && "w-6 h-6",
          size === 'sm' && "w-3 h-3"
        )} />
        <span>{badge.name}</span>
      </Badge>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
          <p className="text-sm text-gray-700">{badge.description}</p>
          {badge.earned && badge.earnedAt && (
            <p className="text-xs text-gray-500 mt-1">
              Earned: {badge.earnedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
