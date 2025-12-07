import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiErrorResponse {
    message?: string;
    error?: string;
    statusCode?: number;
}

/**
 * Centralized API client with interceptors for auth, error handling, and logging
 */
class ApiClient {
    private client: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{
        resolve: (value?: unknown) => void;
        reject: (reason?: unknown) => void;
    }> = [];

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request Interceptor - Add auth token
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = this.getToken();
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Add CSRF token if available
                const csrfToken = this.getCsrfToken();
                if (csrfToken && config.headers) {
                    config.headers['X-CSRF-Token'] = csrfToken;
                }

                return config;
            },
            (error) => {
                console.error('Request interceptor error:', error);
                return Promise.reject(error);
            }
        );

        // Response Interceptor - Handle errors globally
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                // Return data directly for cleaner usage
                return response.data;
            },
            async (error: AxiosError<ApiErrorResponse>) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                // Handle 401 Unauthorized
                if (error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Wait for token refresh
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        })
                            .then(() => this.client(originalRequest))
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        // Attempt to refresh token
                        // const newToken = await this.refreshToken();
                        // this.setToken(newToken);

                        // Process failed queue
                        this.failedQueue.forEach((prom) => prom.resolve());
                        this.failedQueue = [];

                        return this.client(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed - redirect to login
                        this.failedQueue.forEach((prom) => prom.reject(refreshError));
                        this.failedQueue = [];
                        this.handleUnauthorized();
                        return Promise.reject(refreshError);
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // Handle other errors
                this.handleError(error);
                return Promise.reject(error);
            }
        );
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('Authorization');
    }

    private setToken(token: string) {
        if (typeof window === 'undefined') return;
        localStorage.setItem('Authorization', token);
    }

    private getCsrfToken(): string | null {
        if (typeof window === 'undefined') return null;
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta?.getAttribute('content') || null;
    }

    private handleError(error: AxiosError<ApiErrorResponse>) {
        if (!error.response) {
            // Network error
            console.error('Network error:', error.message);
            this.showNotification('Network error. Please check your connection.', 'error');
            return;
        }

        const { status, data } = error.response;
        const message = data?.message || data?.error || 'An error occurred';

        switch (status) {
            case 400:
                console.error('Bad request:', message);
                this.showNotification(message, 'error');
                break;
            case 401:
                // Handled in interceptor
                break;
            case 403:
                console.error('Forbidden:', message);
                this.showNotification('Access denied', 'error');
                break;
            case 404:
                console.error('Not found:', message);
                this.showNotification('Resource not found', 'error');
                break;
            case 429:
                console.error('Too many requests:', message);
                this.showNotification('Too many requests. Please slow down.', 'warning');
                break;
            case 500:
            case 502:
            case 503:
                console.error('Server error:', message);
                this.showNotification('Server error. Please try again later.', 'error');
                break;
            default:
                console.error('Unknown error:', message);
                this.showNotification(message, 'error');
        }
    }

    private handleUnauthorized() {
        if (typeof window === 'undefined') return;

        localStorage.removeItem('Authorization');

        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
        }
    }

    private showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
        // You can replace this with your notification system (toast, etc.)
        console.log(`[${type.toUpperCase()}]`, message);
    }

    // HTTP Methods
    async get<T = unknown>(url: string, config = {}): Promise<T> {
        return this.client.get(url, config) as Promise<T>;
    }

    async post<T = unknown>(url: string, data?: unknown, config = {}): Promise<T> {
        return this.client.post(url, data, config) as Promise<T>;
    }

    async put<T = unknown>(url: string, data?: unknown, config = {}): Promise<T> {
        return this.client.put(url, data, config) as Promise<T>;
    }

    async patch<T = unknown>(url: string, data?: unknown, config = {}): Promise<T> {
        return this.client.patch(url, data, config) as Promise<T>;
    }

    async delete<T = unknown>(url: string, config = {}): Promise<T> {
        return this.client.delete(url, config) as Promise<T>;
    }

    // Upload file with progress
    async uploadFile<T = unknown>(
        url: string,
        file: File,
        onProgress?: (progress: number) => void
    ): Promise<T> {
        const formData = new FormData();
        formData.append('file', file);

        return this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total && onProgress) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(progress);
                }
            },
        }) as Promise<T>;
    }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
