import { useLearningPath } from "@/hooks/use-learning-path";
import { Card } from "@/components/ui/card";
import { Brain, BookOpen, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function PersonalizedPath() {
  const { recommendations, userStats, isLoading } = useLearningPath();

  if (isLoading) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </Card>
    );
  }

  if (!recommendations || !userStats) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-blue-200">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Your Personalized Learning Path
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Trophy className="w-4 h-4" />
                <span>
                  Completed Topics: {userStats.completedTopics} | Average Score:{" "}
                  {Math.round(userStats.averageQuizScore * 100)}%
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">
                  Recommended Next Step
                </h4>
                <p className="text-gray-600 mb-3">{recommendations.reason}</p>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">
                    Suggested Resources:
                  </h5>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {recommendations.suggestedResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <Link href={`/modules/${recommendations.nextTopic}`}>
                    <Button className="w-full gap-2">
                      Start Recommended Topic <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
