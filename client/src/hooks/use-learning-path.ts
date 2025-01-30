import { useQuery } from "@tanstack/react-query";

interface LearningStats {
  completedTopics: number;
  averageQuizScore: number;
  strugglingTopics: string[];
}

interface LearningRecommendation {
  nextTopic: string;
  reason: string;
  suggestedResources: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface LearningPathResponse {
  userStats: LearningStats;
  recommendation: LearningRecommendation;
}

export function useLearningPath() {
  const { data, isLoading, error, refetch } = useQuery<LearningPathResponse>({
    queryKey: ["learningPath"],
    queryFn: async () => {
      const response = await fetch("/api/learning-path/recommendations");
      if (!response.ok) {
        throw new Error("Failed to fetch learning recommendations");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Consider recommendations stale after 5 minutes
  });

  return {
    recommendations: data?.recommendation,
    userStats: data?.userStats,
    isLoading,
    error,
    refetch
  };
}
