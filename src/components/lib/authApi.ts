import { api } from "./api";
import { endpoints } from "./endpoints";

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
    console.log("loginRes", res);

    return res.data;
  },

  async getMe() {
    const res = await api.post(endpoints.me.meProfile);
    return res.data;
  },
};
