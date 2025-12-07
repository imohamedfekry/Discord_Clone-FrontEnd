import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryResult,
    type UseMutationResult,
} from '@tanstack/react-query';
import { authApi } from '@/components/lib/authApi';
import { queryKeys } from '@/lib/queryKeys';
import { getErrorMessage } from '@/lib/queryErrorHandler';
import type { AuthUser } from '@/store/authSlice';

/**
 * ====================================
 * QUERY HOOKS (Read Operations)
 * ====================================
 */

/**
 * Fetch current authenticated user
 * 
 * Features:
 * - Auto-caches for 10 minutes (user data changes infrequently)
 * - Only retries once (auth failures shouldn't spam server)
 * - Returns null when user is not authenticated
 * 
 * @param enabled - Optional flag to enable/disable the query (default: true)
 */
export function useCurrentUser(enabled = true): UseQueryResult<AuthUser | null, Error> {
    return useQuery({
        queryKey: queryKeys.auth.me,
        queryFn: async () => {
            try {
                const response = await authApi.getMe();

                // Handle nested response structure
                let userData;
                if (response && typeof response === 'object') {
                    if ('data' in response && response.data && typeof response.data === 'object') {
                        userData = 'user' in response.data ? response.data.user : response.data;
                    } else if ('user' in response) {
                        userData = response.user;
                    } else {
                        userData = response;
                    }
                }

                return userData as AuthUser;
            } catch (error) {
                console.error('❌ Failed to fetch current user:', error);
                // Return null instead of throwing to prevent auth check loops
                return null;
            }
        },
        staleTime: 1000 * 60 * 10, // 10 minutes - user data doesn't change often
        retry: 1, // Only retry once for auth
        enabled, // Allow disabling the query
    });
}

/**
 * ====================================
 * MUTATION HOOKS (Write Operations)
 * ====================================
 */

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    Authorization?: string;
    [key: string]: unknown;
}

/**
 * Login mutation
 * 
 * Features:
 * - Automatically invalidates user cache on success
 * - Stores auth token
 * - Triggers user data refetch
 */
export function useLoginMutation(): UseMutationResult<LoginResponse, Error, LoginCredentials> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await authApi.login(credentials);
            return response as LoginResponse;
        },
        onSuccess: (data) => {
            console.log('✅ Login successful');

            // Store token if present
            if (data.Authorization) {
                localStorage.setItem('Authorization', data.Authorization);
            }

            // Invalidate and refetch current user
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        },
        onError: (error) => {
            console.error('❌ Login failed:', getErrorMessage(error));
        },
    });
}

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    globalname: string;
    birthdate: string;
}

interface RegisterResponse {
    Authorization?: string;
    [key: string]: unknown;
}

/**
 * Register mutation
 * 
 * Features:
 * - Automatically invalidates user cache on success
 * - Stores auth token
 * - Triggers user data refetch
 */
export function useRegisterMutation(): UseMutationResult<RegisterResponse, Error, RegisterPayload> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: RegisterPayload) => {
            const response = await authApi.register(payload);
            return response as RegisterResponse;
        },
        onSuccess: (data) => {
            console.log('✅ Registration successful');

            // Store token if present
            if (data.Authorization) {
                localStorage.setItem('Authorization', data.Authorization);
            }

            // Invalidate and refetch current user
            queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
        },
        onError: (error) => {
            console.error('❌ Registration failed:', getErrorMessage(error));
        },
    });
}

/**
 * Logout mutation
 * 
 * Features:
 * - Clears all React Query cache
 * - Removes auth token
 * - Redirects to login page
 */
export function useLogoutMutation(): UseMutationResult<void, Error, void> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await authApi.logout();
        },
        onSuccess: () => {
            console.log('✅ Logout successful');

            // Clear token
            localStorage.removeItem('Authorization');

            // Clear ALL React Query cache (fresh start)
            queryClient.clear();

            // Redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        },
        onError: (error) => {
            console.error('❌ Logout failed:', getErrorMessage(error));

            // Even if logout fails on server, clear local state
            localStorage.removeItem('Authorization');
            queryClient.clear();

            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        },
    });
}

/**
 * ====================================
 * UTILITY HOOKS
 * ====================================
 */

/**
 * Check if user is authenticated
 * Lightweight hook that doesn't fetch data, just checks cache
 */
export function useIsAuthenticated(): boolean {
    const queryClient = useQueryClient();
    const cachedUser = queryClient.getQueryData<AuthUser | null>(queryKeys.auth.me);
    return cachedUser !== null && cachedUser !== undefined;
}
