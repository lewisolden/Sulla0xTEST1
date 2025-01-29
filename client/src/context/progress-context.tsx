import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

interface Progress {
  moduleId: number;
  sectionId: string;
  completed: boolean;
}

interface ProgressContextType {
  progress: Progress[];
  updateProgress: (moduleId: number, sectionId: string, completed: boolean) => void;
  isLoading: boolean;
  error: Error | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
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

  const updateProgress = (moduleId: number, sectionId: string, completed: boolean) => {
    updateProgressMutation.mutate({ moduleId, sectionId, completed });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
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
