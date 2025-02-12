import { createContext, useContext, ReactNode, useState } from "react";
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
  getModuleProgress: (moduleId: number) => { completed: boolean; total: number };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/learning-path/progress'],
    queryFn: async () => {
      const response = await fetch('/api/learning-path/progress');
      if (!response.ok) throw new Error('Failed to fetch progress');
      return response.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (progressData: ProgressData) => {
      const response = await fetch('/api/learning-path/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: progressData.moduleId,
          sectionId: progressData.sectionId,
          completed: progressData.completed,
          courseId: progressData.courseId || 1,
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

  const getModuleProgress = (moduleId: number) => {
    if (!data?.progress) {
      return { completed: 0, total: 0 };
    }

    const moduleProgress = data.progress.filter(
      (item: ProgressData) => item.moduleId === moduleId
    );

    return {
      completed: moduleProgress.filter((item: ProgressData) => item.completed).length,
      total: moduleProgress.length || 0
    };
  };

  const contextValue = {
    progress: data?.progress || [],
    isLoading,
    error: error as Error | null,
    updateProgress,
    getModuleProgress
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