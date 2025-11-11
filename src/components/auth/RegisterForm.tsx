"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { PrimaryButton } from "../ui/primary-button";
import { SelectInput } from "../ui/select-input";
import { CustomCheckbox } from "../ui/custom-checkbox";
import { authApi } from "../lib/authApi";
import { z } from "zod";

const currentYear = new Date().getFullYear();

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    displayName: z
      .string()
      .min(3, "Display name must be at least 3 characters"),
    month: z.string().min(1, "Month is required"),
    day: z.string().min(1, "Day is required"),
    year: z.string().min(1, "Year is required"),
    isEmailUpdatesChecked: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const year = Number(data.year);
      const month = Number(data.month);
      const day = Number(data.day);
      const date = new Date(year, month - 1, day);

      return (
        year >= 1950 &&
        year <= currentYear - 10 &&
        date < new Date() &&
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    {
      message:
        "Birthdate must be between 1950 and at least 10 years before the current year",
      path: ["day"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register: hookRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    setError: setFieldError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const watchedValues = watch();

  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    label: month,
  }));

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString(),
  }));
  const yearOptions = Array.from({ length: 100 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setFormError(null);

      const birthdate = `${Number(data.year)}-${Number(data.month)
        .toString()
        .padStart(2, "0")}-${Number(data.day).toString().padStart(2, "0")}`;
      const res = await authApi.register({
        username: data.username,
        email: data.email,
        password: data.password,
        globalname: data.displayName,
        birthdate,
      });

      if (res.code === "SUCCESS") return router.push("/channels/@me");

      const message = res.message || "Registration failed";

      if (res.code === "USER_EMAIL_EXISTS") {
        setFieldError("email", { type: "manual", message: res.message });
      } else if (res.code === "USERNAME_TAKEN") {
        setFieldError("username", { type: "manual", message: res.message });
      } else if (res.code === "USER_CREATED") {
        router.push("/channels/@me");
      } else {
        setFormError(res.message || "Registration failed");
      }
    } catch (err: any) {
      setFormError(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto auth-form-animation">
      <div className="bg-(--bg-secondary) rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-(--text-primary) text-center mb-4">
          Create an account
        </h1>

        {formError && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm text-center">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...hookRegister("email")}
            label="Email *"
            type="email"
            placeholder="Enter your email"
            className="h-11"
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            {...hookRegister("displayName")}
            label="Display Name"
            type="text"
            placeholder="Enter your display name"
            className="h-11"
          />
          <Input
            {...hookRegister("username")}
            label="Username *"
            type="text"
            placeholder="Enter your username"
            className="h-11"
            error={!!errors.username}
            errorMessage={errors.username?.message}
          />
          <Input
            {...hookRegister("password")}
            label="Password *"
            type="password"
            placeholder="Enter your password"
            className="h-11"
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <div>
            <label className="block text-sm font-medium text-(--text-primary) mb-2">
              Date of Birth *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <SelectInput
                options={monthOptions}
                value={watchedValues.month || ""}
                onChange={(val) => setValue("month", val)}
                placeholder="Month"
              />
              <SelectInput
                options={dayOptions}
                value={watchedValues.day || ""}
                onChange={(val) => setValue("day", val)}
                placeholder="Day"
              />
              <SelectInput
                options={yearOptions}
                value={watchedValues.year || ""}
                onChange={(val) => setValue("year", val)}
                placeholder="Year"
              />
            </div>
            {errors.day && (
              <p className="text-red-400 text-sm mt-1">{errors.day.message}</p>
            )}
          </div>

          <CustomCheckbox
            id="email-updates"
            label="(Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time."
            checked={watchedValues.isEmailUpdatesChecked || false}
            onChange={(checked) => setValue("isEmailUpdatesChecked", checked)}
          />

          <p className="text-sm text-(--text-secondary)">
            By clicking "Create Account," you agree to Discord's{" "}
            <Link href="#" className="text-(--accent-link) hover:underline">
              Terms of Service
            </Link>{" "}
            and have read the{" "}
            <Link href="#" className="text-(--accent-link) hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full bg-(--accent-primary) hover:bg-(--accent-hover) text-(--text-primary) font-medium py-3 px-4 rounded h-12 text-base transition-colors"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </PrimaryButton>
        </form>

        <p className="mt-3 text-sm text-(--text-secondary) text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-(--accent-link) hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
