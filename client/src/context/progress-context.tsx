import { createContext, useContext, ReactNode, useState, useEffect } from "react";
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

  const { data: progress = [], isLoading, error } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const response = await fetch("/api/progress");
      if (!response.ok) {
        throw new Error("Failed to fetch progress");
      }
      return response.json();
    },
  });

  const { data: badgeProgress = { badges: defaultBadges, earnedBadges: [] } } = useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const response = await fetch("/api/badges");
      if (!response.ok) {
        return { badges: defaultBadges, earnedBadges: [] };
      }
      return response.json();
    },
  });

  useEffect(() => {
    setBadges(prevBadges =>
      prevBadges.map(badge => ({
        ...badge,
        earned: badgeProgress.earnedBadges.includes(badge.id),
        earnedAt: badge.earned ? new Date() : undefined
      }))
    );
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

  const updateProgress = (moduleId: number, sectionId: string, completed: boolean) => {
    updateProgressMutation.mutate({ moduleId, sectionId, completed });

    // Check for badge and certificate awards
    if (completed) {
      const moduleProgress = progress.filter(p => p.moduleId === moduleId);
      const moduleTopics = moduleProgress.length;
      const completedTopics = moduleProgress.filter(p => p.completed).length + 1;

      if (moduleTopics === completedTopics) {
        // Award badge
        awardBadgeMutation.mutate(`module${moduleId}_complete`);

        // Check for certificate award
        checkModuleCompletion(moduleId);

        // Check if all modules are completed
        const allModulesCompleted = [1, 2, 3].every(mid => {
          const modProgress = progress.filter(p => p.moduleId === mid);
          return modProgress.every(p => p.completed || (p.moduleId === moduleId && p.sectionId === sectionId));
        });

        if (allModulesCompleted) {
          awardBadgeMutation.mutate('all_modules_complete');
        }
      }
    }
  };

  const awardBadge = (badgeId: string) => {
    awardBadgeMutation.mutate(badgeId);
  };

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