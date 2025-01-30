import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MilestoneTransitionProps {
  title: string;
  description: string;
  isVisible: boolean;
  onComplete?: () => void;
}

export function MilestoneTransition({
  title,
  description,
  isVisible,
  onComplete
}: MilestoneTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", duration: 0.7 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          onClick={onComplete}
        >
          <Card className="p-6 max-w-md w-full bg-gradient-to-br from-blue-50 to-blue-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="mb-4"
              >
                <div className="bg-blue-100 p-3 rounded-full">
                  <Trophy className="w-8 h-8 text-blue-600" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-blue-800 mb-2"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-blue-600 mb-6"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-green-600"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Click anywhere to continue</span>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
