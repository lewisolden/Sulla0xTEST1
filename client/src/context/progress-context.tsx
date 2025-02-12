import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ProgressData {
  moduleId: number;
  sectionId: string;
  completed: boolean;
  courseId: number;
  timeSpent?: number;
  quizScore?: number;
}

interface ProgressContextType {
  progress: ProgressData[];
  isLoading: boolean;
  error: Error | null;
  updateProgress: (moduleId: number, sectionId: string, completed: boolean, courseId?: number, timeSpent?: number, quizScore?: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Fetch progress data
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/learning-path/progress'],
    queryFn: async () => {
      const response = await fetch('/api/learning-path/progress');
      if (!response.ok) throw new Error('Failed to fetch progress');
      return response.json();
    }
  });

  // Progress update mutation
  const mutation = useMutation({
    mutationFn: async (progressData: ProgressData) => {
      const response = await fetch('/api/learning-path/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: progressData.moduleId,
          sectionId: progressData.sectionId,
          completed: progressData.completed,
          courseId: progressData.courseId || 1, // Default to course 1 if not specified
          timeSpent: progressData.timeSpent,
          quizScore: progressData.quizScore
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update progress');
      }
      return response.json();
    }
  });

  const updateProgress = async (
    moduleId: number,
    sectionId: string,
    completed: boolean,
    courseId: number = 1,
    timeSpent?: number,
    quizScore?: number
  ) => {
    try {
      await mutation.mutateAsync({
        moduleId,
        sectionId,
        completed,
        courseId,
        timeSpent,
        quizScore
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const contextValue = {
    progress: data?.progress || [],
    isLoading,
    error: error as Error | null,
    updateProgress
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