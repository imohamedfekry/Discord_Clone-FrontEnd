import { AxiosError } from 'axios';

/**
 * Type-safe error response interface
 */
export interface ApiErrorResponse {
    message?: string;
    error?: string;
    statusCode?: number;
}

/**
 * Extract error message from various error formats
 */
export function getErrorMessage(error: unknown): string {
    // String error
    if (typeof error === 'string') {
        return error;
    }

    // Axios error
    if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        return (
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            'An unexpected error occurred'
        );
    }

    // Generic error object
    if (error && typeof error === 'object') {
        const errObj = error as { message?: string };
        return errObj.message || 'An unexpected error occurred';
    }

    return 'An unexpected error occurred';
}

/**
 * Check if error is a network error (no response from server)
 */
export function isNetworkError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return !error.response && error.code !== 'ECONNABORTED';
    }
    return false;
}

/**
 * Check if error is an authentication error (401)
 */
export function isAuthError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 401;
    }
    return false;
}

/**
 * Check if error is a validation error (400)
 */
export function isValidationError(error: unknown): boolean {
    if (error instanceof AxiosError) {
        return error.response?.status === 400;
    }
    return false;
}

/**
 * Default error handler for React Query
 * Can be used in QueryClient configuration
 */
export function defaultErrorHandler(error: unknown): void {
    const message = getErrorMessage(error);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('🔴 React Query Error:', message, error);
    }

    // Handle auth errors
    if (isAuthError(error)) {
        console.warn('🔐 Authentication error detected - user may need to re-login');
        // Note: Actual redirect is handled by apiClient interceptor
    }

    // Handle network errors
    if (isNetworkError(error)) {
        console.error('🌐 Network error - check internet connection');
    }
}
