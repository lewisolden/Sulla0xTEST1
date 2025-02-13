import { createContext, useContext, ReactNode, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

interface ProgressData {
  moduleId: number;
  sectionId: string;
  completed: boolean;
  courseId: number;
  timeSpent?: number;
  quizScore?: number;
  lastAccessedRoute?: string; // Added to track last accessed route
  courseName?: string; // Added to identify course type
}

interface ProgressContextType {
  progress: ProgressData[];
  isLoading: boolean;
  error: Error | null;
  updateProgress: (moduleId: number, sectionId: string, completed: boolean, courseId?: number, timeSpent?: number, quizScore?: number, lastAccessedRoute?: string, courseName?: string) => void;
  getModuleProgress: (moduleId: number) => { completed: boolean; total: number };
  getLastAccessedRoute: (courseName: string) => string | null; // New function to get last accessed route
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
          quizScore: progressData.quizScore,
          lastAccessedRoute: progressData.lastAccessedRoute,
          courseName: progressData.courseName
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
    quizScore?: number,
    lastAccessedRoute?: string,
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
        lastAccessedRoute,
        courseName
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

  // New function to get the last accessed route for a specific course
  const getLastAccessedRoute = (courseName: string): string | null => {
    if (!data?.progress) return null;

    const courseProgress = data.progress
      .filter((item: ProgressData) => item.courseName === courseName)
      .sort((a, b) => {
        // Sort by timeSpent to get the most recent
        return (b.timeSpent || 0) - (a.timeSpent || 0);
      });

    return courseProgress[0]?.lastAccessedRoute || null;
  };

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