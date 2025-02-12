import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { motion } from "framer-motion";

interface ModuleProgressProps {
  moduleId: number;
  totalSections: number;
  courseId?: number;
}

export default function ModuleProgress({ moduleId, totalSections, courseId = 1 }: ModuleProgressProps) {
  const { progress, isLoading } = useProgress();

  // Filter progress for this specific module and course
  const moduleProgress = progress.filter(p => 
    p.moduleId === moduleId && 
    p.courseId === courseId && 
    p.completed
  );

  const completedSections = moduleProgress.length;
  const progressPercentage = (completedSections / totalSections) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-800">
          Module {moduleId} Progress
        </h3>
        <span className="text-sm text-gray-600">
          {completedSections} of {totalSections} sections completed
        </span>
      </div>
      <div className="space-y-2">
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{Math.round(progressPercentage)}% Complete</span>
          {progressPercentage === 100 && (
            <span className="text-green-600 font-medium">Module Completed! 🎉</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}