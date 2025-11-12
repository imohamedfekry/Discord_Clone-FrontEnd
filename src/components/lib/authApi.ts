import { api } from "./api";
import { endpoints } from "./endpoints";
import axios from "axios";
import { API_BASE_URL } from "@/config/env";

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
    const res = await api.post(endpoints.auth.register, data);
    return res.data;
  },

  async login(data: LoginPayload) {
    const res = await api.post(endpoints.auth.login, data);
    return res.data;
  },

  async getMe() {
    const res = await api.get(endpoints.me.meProfile);
    return res.data;
  },

  async logout() {
    const res = await api.post("/auth/logout");
    return res.data;
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
