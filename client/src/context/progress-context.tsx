import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ProgressData {
  moduleId: number;
  sectionId: string;
  completed: boolean;
  courseId: number;
  timeSpent?: number;
  quizScore?: number;
  lastQuizPath?: string;
  lastCompletedPath?: string;
  courseName?: string;
}

interface ProgressContextType {
  progress: ProgressData[];
  isLoading: boolean;
  error: Error | null;
  updateProgress: (moduleId: number, sectionId: string, completed: boolean, courseId: number, timeSpent?: number, quizScore?: number, lastQuizPath?: string, lastCompletedPath?: string, courseName?: string) => Promise<void>;
  getModuleProgress: (moduleId: number, courseId?: number) => { completed: number; total: number };
  getLastAccessedRoute: (courseId: number) => { lastQuizPath: string | null; lastCompletedPath: string | null };
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

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
        body: JSON.stringify(progressData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update progress');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/learning-path/progress'] });
    }
  });

  const updateProgress = useCallback(async (
    moduleId: number,
    sectionId: string,
    completed: boolean,
    courseId: number,
    timeSpent?: number,
    quizScore?: number,
    lastQuizPath?: string,
    lastCompletedPath?: string,
    courseName?: string
  ) => {
    try {
      await mutation.mutateAsync({
        moduleId,
        sectionId,
        completed,
        courseId,
        timeSpent,
        quizScore,
        lastQuizPath,
        lastCompletedPath,
        courseName
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }, [mutation]);

  const getModuleProgress = useCallback((moduleId: number, courseId?: number) => {
    if (!data?.progress) {
      return { completed: 0, total: 0 };
    }

    const moduleProgress = data.progress.filter(
      (item: ProgressData) => item.moduleId === moduleId && 
      (courseId ? item.courseId === courseId : true)
    );

    return {
      completed: moduleProgress.filter((item: ProgressData) => item.completed).length,
      total: moduleProgress.length || 0
    };
  }, [data?.progress]);

  const getLastAccessedRoute = useCallback((courseId: number) => {
    if (!data?.progress) {
      return { lastQuizPath: null, lastCompletedPath: null };
    }

    const courseProgress = data.progress
      .filter((item: ProgressData) => item.courseId === courseId)
      .sort((a: ProgressData, b: ProgressData) => {
        return (b.timeSpent || 0) - (a.timeSpent || 0);
      });

    const lastItem = courseProgress[0];
    return {
      lastQuizPath: lastItem?.lastQuizPath || null,
      lastCompletedPath: lastItem?.lastCompletedPath || null
    };
  }, [data?.progress]);

  const contextValue = {
    progress: data?.progress || [],
    isLoading,
    error: error as Error | null,
    updateProgress,
    getModuleProgress,
    getLastAccessedRoute
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