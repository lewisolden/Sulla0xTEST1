import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ProgressMetrics {
  completedQuizzes: number;
  earnedBadges: number;
  totalLearningMinutes: number;
  learningStreak: number;
  courseProgress: {
    [courseId: number]: number;
  };
}

interface ProgressContextType {
  metrics: ProgressMetrics;
  isLoading: boolean;
  error: Error | null;
  updateProgress: (moduleId: number, sectionId: string, completed: boolean) => Promise<void>;
  trackLearningTime: (minutes: number) => Promise<void>;
  markQuizComplete: (moduleId: number, quizId: string) => Promise<void>;
}

const defaultMetrics: ProgressMetrics = {
  completedQuizzes: 0,
  earnedBadges: 0,
  totalLearningMinutes: 0,
  learningStreak: 0,
  courseProgress: {}
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch user metrics
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['user-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/user/metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch user metrics');
      }
      return response.json();
    },
    initialData: defaultMetrics
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ moduleId, sectionId, completed }: { moduleId: number, sectionId: string, completed: boolean }) => {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, sectionId, completed })
      });
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-metrics'] });
    }
  });

  // Track learning time mutation
  const trackTimeMutation = useMutation({
    mutationFn: async (minutes: number) => {
      const response = await fetch('/api/progress/learning-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes })
      });
      if (!response.ok) {
        throw new Error('Failed to track learning time');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-metrics'] });
    }
  });

  // Mark quiz complete mutation
  const quizCompleteMutation = useMutation({
    mutationFn: async ({ moduleId, quizId }: { moduleId: number, quizId: string }) => {
      const response = await fetch('/api/progress/quiz-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, quizId })
      });
      if (!response.ok) {
        throw new Error('Failed to mark quiz as complete');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-metrics'] });
    }
  });

  const contextValue: ProgressContextType = {
    metrics: metrics || defaultMetrics,
    isLoading,
    error,
    updateProgress: async (moduleId, sectionId, completed) => {
      await updateProgressMutation.mutateAsync({ moduleId, sectionId, completed });
    },
    trackLearningTime: async (minutes) => {
      await trackTimeMutation.mutateAsync(minutes);
    },
    markQuizComplete: async (moduleId, quizId) => {
      await quizCompleteMutation.mutateAsync({ moduleId, quizId });
    }
  };

  return (
    <ProgressContext.Provider value={contextValue}>
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