import { createContext, useContext, ReactNode } from "react";

// Simplified ProgressContext with minimal functionality
interface ProgressContextType {
  progress: any[];
  isLoading: boolean;
  error: Error | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  return (
    <ProgressContext.Provider
      value={{
        progress: [],
        isLoading: false,
        error: null,
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