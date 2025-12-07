import { QueryClient } from '@tanstack/react-query';

/**
 * Centralized QueryClient configuration for React Query
 * 
 * Configuration Strategy:
 * - staleTime: How long data is considered "fresh" before refetching
 * - cacheTime: How long unused data stays in cache
 * - retry: Number of retry attempts for failed queries
 * - refetchOnWindowFocus: Auto-refetch when user returns to the tab
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is fresh for 5 minutes - good for user data that doesn't change often
            staleTime: 1000 * 60 * 5,

            // Keep unused data in cache for 30 minutes
            gcTime: 1000 * 60 * 30,

            // Retry failed queries twice (useful for network hiccups)
            retry: 2,

            // Auto-refetch on window focus to keep data fresh
            refetchOnWindowFocus: true,

            // Auto-refetch when network reconnects
            refetchOnReconnect: true,

            // Don't refetch on mount if data is fresh
            refetchOnMount: false,
        },
        mutations: {
            // Only retry mutations once (safer - avoid duplicate actions)
            retry: 1,
        },
    },
});
