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