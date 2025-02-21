import { QueryClient, QueryFunction } from "@tanstack/react-query";

type GetQueryFnOptions = {
  on401?: "throw" | "returnNull";
};

export async function apiRequest(
  method: string,
  path: string,
  body?: unknown,
  options: RequestInit = {}
) {
  const response = await fetch(path, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
}

export function getQueryFn({ on401 = "throw" }: GetQueryFnOptions = {}) {
  return async <T>({ queryKey }: { queryKey: readonly unknown[] }) => {
    const response = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401 && on401 === "returnNull") {
        return null;
      }
      throw new Error(await response.text());
    }

    return response.json() as Promise<T>;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn() as QueryFunction<unknown, readonly unknown[]>,
      refetchInterval: 5000, // Refetch every 5 seconds
      refetchOnWindowFocus: true,
      staleTime: 0, // Data is considered stale immediately
      retry: true,
    },
    mutations: {
      retry: false,
    }
  },
});