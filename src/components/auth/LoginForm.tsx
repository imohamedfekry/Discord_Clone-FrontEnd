"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/primary-button";
import { useAuth } from "@/components/hooks/useAuth";

interface AuthResponse {
  code?: string;
  message?: string;
  [key: string]: unknown;
}
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setFormError(null);
      const res = (await login(data)) as AuthResponse;
      if (res?.code && res.code !== "LOGIN_SUCCESS") {
        const message = res?.message || "Invalid credentials";
        setFormError(message);
        return;
      }
      router.push("/channels/@me");
    } catch (err: unknown) {
      const fallback =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : null;
      const message = typeof err === "string" ? err : fallback || "Login failed";
      setFormError(message);
    }
  };

  return (
    <div className="auth-form-animation bg-(--bg-secondary) rounded-lg p-8 flex flex-col sm:flex-row max-w-200 mx-auto">
      <div className="flex-2">
        <div className="sm:w-[85%]">
          <h1 className="text-2xl font-semibold text-(--text-primary) text-center">
            Welcome back!
          </h1>
          <p className="text-(--text-secondary) text-base text-center mb-5">
            We&apos;re so excited to see you again!
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-3 m-0">
              <div>
                <Input
                  {...register("email")}
                  label="Email or Phone Number *"
                  type="email"
                  className="h-11"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                {formError && <p className="text-(--accent-danger) text-sm mt-1">{formError}</p>}
              </div>

              <div>
                <Input
                  {...register("password")}
                  label="Password *"
                  type="password"
                  className="h-11"
                  error={!!errors.password}
                  errorMessage={errors.password?.message}
                />
                {formError && (
                  <p className="text-(--accent-danger) text-sm mt-1">{formError}</p>
                )}
              </div>
            </div>

            <Link
              href="#"
              className="text-(--accent-link) hover:underline text-sm"
            >
              Forgot your password?
            </Link>

            <PrimaryButton
              type="submit"
              isLoading={isSubmitting || loading}
              disabled={isSubmitting || loading}
              className="mt-3 cursor-pointer w-full"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </PrimaryButton>
          </form>

          <p className="mt-3 text-(--text-secondary) text-sm">
            Need an account?{" "}
            <Link
              href="/register"
              className="text-(--accent-link) hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      <div className="flex-1 items-center justify-center hidden sm:flex">
        <div className="text-center">
          <div className="w-44 h-44 mx-auto bg-white rounded-lg flex items-center justify-center mb-4 p-2">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=discord-login"
              alt="Discord QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold text-(--text-primary) mb-2">
            Log in with QR Code
          </h2>
          <p className="text-(--text-secondary) text-sm mb-6">
            Scan this with the <strong>Discord mobile app</strong> to log in
            instantly.
          </p>
          <Link
            href="#"
            className="text-(--accent-link) hover:underline text-sm"
          >
            Or, sign in with passkey
          </Link>
        </div>
      </div>
    </div>
  );
}
