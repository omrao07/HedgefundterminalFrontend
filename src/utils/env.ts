// utils/env.ts
// Centralized, type-safe environment variable access
// No external dependencies, no runtime side effects

type EnvMode = "development" | "production" | "test";

/* =========================
   Helpers
   ========================= */

function getEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }

  if (typeof import.meta !== "undefined" && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }

  return undefined;
}

function requireEnv(key: string): string {
  const value = getEnv(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/* =========================
   Environment
   ========================= */

export const ENV = {
  MODE: (getEnv("NODE_ENV") as EnvMode) ?? "development",

  IS_DEV: getEnv("NODE_ENV") === "development",
  IS_PROD: getEnv("NODE_ENV") === "production",
  IS_TEST: getEnv("NODE_ENV") === "test",

  /* =====================
     API / Backend
     ===================== */

  API_BASE_URL:
    getEnv("VITE_API_BASE_URL") ||
    getEnv("NEXT_PUBLIC_API_BASE_URL") ||
    getEnv("REACT_APP_API_BASE_URL") ||
    "http://localhost:8080/api",

  /* =====================
     Feature Flags
     ===================== */

  ENABLE_REALTIME: getEnv("VITE_ENABLE_REALTIME") === "true",
  ENABLE_TELEMETRY: getEnv("VITE_ENABLE_TELEMETRY") === "true",

  /* =====================
     Timeouts & Limits
     ===================== */

  API_TIMEOUT_MS: Number(getEnv("VITE_API_TIMEOUT_MS") ?? 15000),
} as const;

/* =========================
   Validation (optional use)
   ========================= */

export function validateEnv(): void {
  // Call this once at app startup if you want strict checks
  requireEnv("VITE_API_BASE_URL");
}