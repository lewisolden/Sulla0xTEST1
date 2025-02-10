import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useCertificateAward } from "@/hooks/use-certificate-award";
import type { AchievementBadge } from "@/components/badges/badge";

interface Progress {
  moduleId: number;
  sectionId: string;
  completed: boolean;
}

interface BadgeProgress {
  badges: AchievementBadge[];
  earnedBadges: string[];
}

interface ProgressContextType {
  progress: Progress[];
  badges: AchievementBadge[];
  earnedBadges: string[];
  updateProgress: (moduleId: number, sectionId: string, completed: boolean) => void;
  awardBadge: (badgeId: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const defaultBadges: AchievementBadge[] = [
  {
    id: 'module1_complete',
    name: 'Crypto Pioneer',
    description: 'Completed Module 1: Fundamentals of Cryptocurrency',
    icon: 'Medal',
    type: 'bronze',
    earned: false
  },
  {
    id: 'module2_complete',
    name: 'Blockchain Explorer',
    description: 'Completed Module 2: Understanding Blockchain Technology',
    icon: 'Network',
    type: 'silver',
    earned: false
  },
  {
    id: 'module3_complete',
    name: 'Tech Master',
    description: 'Completed Module 3: Advanced Blockchain Technology',
    icon: 'Code',
    type: 'gold',
    earned: false
  },
  {
    id: 'module4_complete',
    name: 'Digital Money Expert',
    description: 'Completed Module 4: Understanding Digital Money',
    icon: 'BookOpen',
    type: 'gold',
    earned: false
  },
  {
    id: 'all_modules_complete',
    name: 'Blockchain Scholar',
    description: 'Completed all modules in the course',
    icon: 'Star',
    type: 'gold',
    earned: false
  }
];

export function ProgressProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [badges, setBadges] = useState<AchievementBadge[]>(defaultBadges);
  const { checkModuleCompletion } = useCertificateAward();

  const { data: progress = [], isLoading, error } = useQuery<Progress[]>({
    queryKey: ["progress"],
    queryFn: async () => {
      const response = await fetch("/api/progress");
      if (!response.ok) {
        throw new Error("Failed to fetch progress");
      }
      return response.json();
    },
    staleTime: 30000,
    cacheTime: 3600000,
  });

  const { data: badgeProgress = { badges: defaultBadges, earnedBadges: [] } } = useQuery<BadgeProgress>({
    queryKey: ["badges"],
    queryFn: async () => {
      const response = await fetch("/api/badges");
      if (!response.ok) {
        return { badges: defaultBadges, earnedBadges: [] };
      }
      return response.json();
    },
    staleTime: 30000,
    cacheTime: 3600000,
  });

  useEffect(() => {
    if (badgeProgress.earnedBadges) {
      setBadges(prevBadges =>
        prevBadges.map(badge => ({
          ...badge,
          earned: badgeProgress.earnedBadges.includes(badge.id)
        }))
      );
    }
  }, [badgeProgress.earnedBadges]);

  const updateProgressMutation = useMutation({
    mutationFn: async (variables: Progress) => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variables),
      });
      if (!response.ok) {
        throw new Error("Failed to update progress");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });

  const awardBadgeMutation = useMutation({
    mutationFn: async (badgeId: string) => {
      const response = await fetch("/api/badges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ badgeId }),
      });
      if (!response.ok) {
        throw new Error("Failed to award badge");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
  });

  const updateProgress = useCallback((moduleId: number, sectionId: string, completed: boolean) => {
    updateProgressMutation.mutate({ moduleId, sectionId, completed });

    if (completed) {
      const moduleProgress = progress.filter(p => p.moduleId === moduleId);
      const moduleTopics = moduleProgress.length;
      const completedTopics = moduleProgress.filter(p => p.completed).length + 1;

      if (moduleTopics === completedTopics) {
        awardBadgeMutation.mutate(`module${moduleId}_complete`);
        checkModuleCompletion(moduleId);

        const allModulesCompleted = [1, 2, 3, 4].every(mid => {
          const modProgress = progress.filter(p => p.moduleId === mid);
          return modProgress.every(p => p.completed);
        });

        if (allModulesCompleted) {
          awardBadgeMutation.mutate('all_modules_complete');
        }
      }
    }
  }, [progress, awardBadgeMutation, checkModuleCompletion]);

  const awardBadge = useCallback((badgeId: string) => {
    awardBadgeMutation.mutate(badgeId);
  }, [awardBadgeMutation]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        badges,
        earnedBadges: badgeProgress.earnedBadges,
        updateProgress,
        awardBadge,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}