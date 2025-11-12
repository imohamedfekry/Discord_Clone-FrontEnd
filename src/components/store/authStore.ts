import { create } from "zustand";
import { authApi } from "../lib/authApi";

interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token:
        typeof window !== "undefined" ? localStorage.getItem("Authorization") : null,
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const res = await authApi.login({ email, password });
            localStorage.setItem("Authorization", res.data.Authorization);
            set({ token: res.data.Authorization });
            await useAuthStore.getState().fetchUser();
        } finally {
            set({ isLoading: false });
        }
    },

    register: async (data) => {
        set({ isLoading: true });
        try {
            const res = await authApi.register(data);
            localStorage.setItem("Authorization", res.data.Authorization);
            set({ token: res.data.Authorization });
            await useAuthStore.getState().fetchUser();
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUser: async () => {
        try {
            const res = await authApi.getMe();
            set({ user: res.data });
        } catch {
            set({ user: null });
        }
    },

    logout: () => {
        localStorage.removeItem("Authorization");
        set({ user: null, token: null });
    },
}));
