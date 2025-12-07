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
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import Tooltip from "../ui/Tooltip";

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
    acceptedTerms: z.boolean().optional(),
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

interface RegisterResponse {
  code?: string;
  message?: string;
  [key: string]: unknown;
}

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const { register: registerAccount, loading } = useAuth();

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
      if (!watchedValues.acceptedTerms) {
        setFormError("You must agree to the Terms of Service to register.");
        return;
      }

      setFormError(null);

      const birthdate = `${Number(data.year)}-${Number(data.month)
        .toString()
        .padStart(2, "0")}-${Number(data.day).toString().padStart(2, "0")}`;
      const res = (await registerAccount({
        username: data.username,
        email: data.email,
        password: data.password,
        globalname: data.displayName,
        birthdate,
      })) as RegisterResponse;

      if (res?.code === "USER_EMAIL_EXISTS") {
        setFieldError("email", { type: "manual", message: res.message });
        return;
      }

      if (res?.code === "USERNAME_TAKEN") {
        setFieldError("username", { type: "manual", message: res.message });
        return;
      }

      if (res?.code && res.code !== "SUCCESS" && res.code !== "USER_CREATED") {
        setFormError(res.message || "Registration failed");
        return;
      }

      router.push("/channels/@me");
    } catch (err: unknown) {
      const fallback =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : null;
      const message = typeof err === "string" ? err : fallback || "Registration failed";
      setFormError(message);
    }
  };

  const isSubmitDisabled = isSubmitting || !watchedValues.acceptedTerms;

  return (
    <div className="max-w-lg mx-auto auth-form-animation bg-(--bg-secondary)">
      <div className="modal-background rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-(--text-primary) text-center mb-4">
          Create an account
        </h1>

        {formError && (
          <div className="mb-4 p-3 bg-(--accent-danger)/20 border border-(--accent-danger)/50 rounded-lg">
            <p className="text-(--accent-danger) text-sm text-center">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4">
            <Input
              {...hookRegister("email")}
              label="Email *"
              type="email"
              className="h-11"
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              {...hookRegister("displayName")}
              label="Display Name"
              type="text"
              className="h-11"
            />
            <Input
              {...hookRegister("username")}
              label="Username *"
              type="text"
              className="h-11"
              error={!!errors.username}
              errorMessage={errors.username?.message}
            />
            <Input
              {...hookRegister("password")}
              label="Password *"
              type="password"
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
                <p className="text-(--accent-danger) text-sm mt-1">
                  {errors.day.message}
                </p>
              )}
            </div>
          </div>

          <CustomCheckbox
            id="email-updates"
            label="(Optional) It&apos;s okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time."
            checked={watchedValues.isEmailUpdatesChecked || false}
            onChange={(checked) => setValue("isEmailUpdatesChecked", checked)}
          />

          <div className="flex items-start gap-3">
            <CustomCheckbox
              id="agree-terms"
              checked={watchedValues.acceptedTerms || false}
              onChange={(checked) => setValue("acceptedTerms", checked)}
            />
            <p className="text-sm text-(--text-secondary)">
              I have read and agree to Discord&apos;s{" "}
              <Link href="#" className="text-(--accent-link) hover:underline">
                Terms of Service
              </Link>{" "}
              and have read the{" "}
              <Link href="#" className="text-(--accent-link) hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div>
            {(() => {
              const button = (
                <PrimaryButton
                  type="submit"
                  isLoading={isSubmitting || loading}
                  disabled={isSubmitDisabled || loading}
                  className="w-full"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </PrimaryButton>
              );

              return isSubmitDisabled ? (
                <div className="w-full">
                  <Tooltip text="you need to agree to or terms of service to continue">
                    {button}
                  </Tooltip>
                </div>
              ) : (
                <div className="w-full">{button}</div>
              );
            })()}
          </div>
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
