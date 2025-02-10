import { QueryClient } from "@tanstack/react-query";

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
  return async ({ queryKey }: { queryKey: string[] }) => {
    const response = await fetch(queryKey[0], {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401 && on401 === "returnNull") {
        return null;
      }
      throw new Error(await response.text());
    }

    return response.json();
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    }
  },
});