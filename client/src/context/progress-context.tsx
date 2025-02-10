import { createContext, useContext, ReactNode } from "react";

interface ProgressContextType {
  progress: any[];
  isLoading: boolean;
  error: Error | null;
  updateProgress: (moduleId: number, sectionId: string, completed: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  // Provide a simple implementation that doesn't cause hook issues
  const contextValue = {
    progress: [],
    isLoading: false,
    error: null,
    updateProgress: (moduleId: number, sectionId: string, completed: boolean) => {
      console.log('Progress update:', { moduleId, sectionId, completed });
      // Implement actual progress tracking later
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