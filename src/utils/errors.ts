// utils/error.ts
// Centralized error normalization and handling utilities
// No external dependencies, safe for frontend and backend use

/* =========================
   Base Error Types
   ========================= */

export type ErrorSeverity = "info" | "warning" | "error" | "critical";

export interface AppError {
  name: string;
  message: string;
  severity: ErrorSeverity;
  statusCode?: number;
  cause?: unknown;
  timestamp: string;
  context?: Record<string, unknown>;
}

/* =========================
   Type Guards
   ========================= */

export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

export function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "message" in value &&
    "severity" in value
  );
}

/* =========================
   Error Normalization
   ========================= */

export function normalizeError(
  error: unknown,
  context?: Record<string, unknown>
): AppError {
  if (isAppError(error)) {
    return {
      ...error,
      context: { ...error.context, ...context },
    };
  }

  if (isError(error)) {
    return {
      name: error.name || "Error",
      message: error.message || "Unexpected error",
      severity: "error",
      cause: error,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  return {
    name: "UnknownError",
    message: "An unknown error occurred",
    severity: "error",
    cause: error,
    timestamp: new Date().toISOString(),
    context,
  };
}

/* =========================
   Helpers
   ========================= */

export function createError(
  name: string,
  message: string,
  severity: ErrorSeverity = "error",
  statusCode?: number,
  context?: Record<string, unknown>
): AppError {
  return {
    name,
    message,
    severity,
    statusCode,
    timestamp: new Date().toISOString(),
    context,
  };
}

export function withContext(
  error: AppError,
  context: Record<string, unknown>
): AppError {
  return {
    ...error,
    context: { ...error.context, ...context },
  };
}

/* =========================
   Logging (pluggable)
   ========================= */

export function logError(error: AppError): void {
  // Replace with remote logging / Sentry / SIEM integration
  if (error.severity === "critical") {
    console.error("[CRITICAL]", error);
  } else if (error.severity === "error") {
    console.error("[ERROR]", error);
  } else if (error.severity === "warning") {
    console.warn("[WARN]", error);
  } else {
    console.info("[INFO]", error);
  }
}