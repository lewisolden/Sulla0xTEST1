import { motion } from "framer-motion";
import BadgeDisplay from "@/components/badges/badge";
import { useProgress } from "@/context/progress-context";

interface BadgeShowcaseProps {
  moduleId?: number;
  showAllBadges?: boolean;
}

export default function BadgeShowcase({ moduleId, showAllBadges = false }: BadgeShowcaseProps) {
  const { badges = [] } = useProgress();

  const displayBadges = badges ? (
    showAllBadges 
      ? badges
      : badges.filter(badge => 
          moduleId 
            ? badge?.id === `module${moduleId}_complete` 
            : true
        )
  ) : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        {showAllBadges ? "Your Achievements" : "Module Badge"}
      </h3>
      <div className="flex flex-wrap gap-4">
        {displayBadges.map(badge => (
          <BadgeDisplay 
            key={badge?.id}
            badge={badge}
            size={showAllBadges ? "md" : "lg"}
          />
        ))}
      </div>
    </motion.div>
  );
}