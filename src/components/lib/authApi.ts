import { apiClient } from "@/lib/apiClient";
import { endpoints } from "./endpoints";
import axios from "axios";
import { API_BASE_URL } from "@/config/env";
import { AuthUser } from "@/store/authSlice";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  globalname: string;
  birthdate: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  async register(data: RegisterPayload) {
    return apiClient.post(endpoints.auth.register, data);
  },

  async login(data: LoginPayload) {
    return apiClient.post(endpoints.auth.login, data);
  },

  async getMe(): Promise<AuthUser> {
    return apiClient.get<AuthUser>(endpoints.me.meProfile);
  },

  async logout() {
    return apiClient.post("/auth/logout");
  },
};

// دالة للتحقق من التوكن على الـ server (للـ middleware)
export async function validateTokenOnServer(token: string) {
  try {
    const serverApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Cookie: `Authorization=${token}`,
      },
      timeout: 5000,
    });

    const response = await serverApi.get(endpoints.me.meProfile);
    console.log("✅ Token validation success:", response.data.data.user.username);
    return true;
  } catch (error) {
    console.error("❌ Token validation error:", error);
    return false;
  }
}
