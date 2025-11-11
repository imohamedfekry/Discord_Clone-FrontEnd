// src/lib/api.ts
import { API_BASE_URL } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL, // غيّرها حسب سيرفرك
  withCredentials: false, // لو بتستخدم كوكيز خليه true
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors (اختياري) لتعامل مع التوكنز أو الأخطاء
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
);

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) config.headers.Authorization = `${token}`;
  return config;
});

