"use client";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthFormWrapperProps {
  mode: "login" | "register";
}

export function AuthFormWrapper({ mode }: AuthFormWrapperProps) {
  return mode === "login" ? <LoginForm /> : <RegisterForm />;
}
