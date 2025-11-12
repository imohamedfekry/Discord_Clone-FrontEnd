// src/lib/api.ts
import { API_BASE_URL } from "@/config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ هذا بيرسل الـ httpOnly cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor للـ errors
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // Token expired أو invalid
      window.location.href = "/login";
    }
    throw err;
  }
);
