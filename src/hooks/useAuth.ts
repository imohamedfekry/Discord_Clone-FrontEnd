import { useCallback, useMemo } from "react";
import {
    useCurrentUser,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} from "@/hooks/useAuthQuery";
import type { AuthUser } from "@/store/authSlice";

/**
 * Backward-compatible useAuth hook
 * Now powered by React Query instead of Redux
 * 
 * Migration Note:
 * - Keeps the same API surface for existing components
 * - Uses React Query under the hood for better caching and data management
 * - Redux is now only used for UI state (theme, modals, etc.)
 */

type LoginPayload = {
    email: string;
    password: string;
};

type RegisterPayload = {
    username: string;
    email: string;
    password: string;
    globalname: string;
    birthdate: string;
};

interface UseAuthResponse {
    user: AuthUser | null;
    status: string;
    loading: boolean;
    error: string | null;
    initialized: boolean;
    login: (payload: LoginPayload) => Promise<unknown>;
    register: (payload: RegisterPayload) => Promise<unknown>;
    logout: () => Promise<void>;
    refresh: () => void;
}

export const useAuth = (): UseAuthResponse => {
    // React Query hooks
    const {
        data: user,
        isLoading,
        error: queryError,
        refetch,
    } = useCurrentUser();

    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();
    const logoutMutation = useLogoutMutation();

    // Backward-compatible login function
    const login = useCallback(
        async (payload: LoginPayload) => {
            return loginMutation.mutateAsync(payload);
        },
        [loginMutation]
    );

    // Backward-compatible register function
    const register = useCallback(
        async (payload: RegisterPayload) => {
            return registerMutation.mutateAsync(payload);
        },
        [registerMutation]
    );

    // Backward-compatible logout function
    const logout = useCallback(async () => {
        await logoutMutation.mutateAsync();
    }, [logoutMutation]);

    // Backward-compatible refresh function
    const refresh = useCallback(() => {
        refetch();
    }, [refetch]);

    // Map React Query states to old Redux-style status
    const status = useMemo(() => {
        if (loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending) {
            return "loading";
        }
        if (isLoading) return "loading";
        if (queryError || loginMutation.error || registerMutation.error) return "failed";
        if (user) return "succeeded";
        return "idle";
    }, [
        isLoading,
        queryError,
        loginMutation.isPending,
        loginMutation.error,
        registerMutation.isPending,
        registerMutation.error,
        logoutMutation.isPending,
        user,
    ]);

    // Combine all possible errors
    const error = useMemo(() => {
        if (queryError) return queryError.message;
        if (loginMutation.error) return loginMutation.error.message;
        if (registerMutation.error) return registerMutation.error.message;
        if (logoutMutation.error) return logoutMutation.error.message;
        return null;
    }, [queryError, loginMutation.error, registerMutation.error, logoutMutation.error]);

    return useMemo(
        () => ({
            user: user ?? null,
            status,
            loading: isLoading || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
            error,
            initialized: true, // With React Query, we're always initialized
            login,
            register,
            logout,
            refresh,
        }),
        [user, status, isLoading, error, login, register, logout, refresh, loginMutation.isPending, registerMutation.isPending, logoutMutation.isPending]
    );
};

export default useAuth;
