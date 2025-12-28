// client.ts
// Production-ready HTTP client for frontend ↔ backend communication
// No placeholders, no external dependencies

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export interface ApiError extends Error {
  status: number;
  payload?: unknown;
}

interface RequestConfig<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT = 15000;

export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders?: Record<string, string>) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders,
    };
  }

  async get<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: "GET" });
  }

  async post<T, B = unknown>(
    path: string,
    body: B,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T, B>(path, { ...config, method: "POST", body });
  }

  async put<T, B = unknown>(
    path: string,
    body: B,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T, B>(path, { ...config, method: "PUT", body });
  }

  async patch<T, B = unknown>(
    path: string,
    body: B,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T, B>(path, { ...config, method: "PATCH", body });
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(path, { ...config, method: "DELETE" });
  }

  private async request<T, B = unknown>(
    path: string,
    config: RequestConfig<B>
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      config.timeoutMs ?? DEFAULT_TIMEOUT
    );

    const url = this.buildUrl(path, config.query);

    try {
      const response = await fetch(url, {
        method: config.method,
        headers: {
          ...this.defaultHeaders,
          ...config.headers,
        },
        body:
          config.body !== undefined
            ? JSON.stringify(config.body)
            : undefined,
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type");
      const payload =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      if (!response.ok) {
        const error: ApiError = new Error(
          `HTTP ${response.status}: ${response.statusText}`
        ) as ApiError;
        error.status = response.status;
        error.payload = payload;
        throw error;
      }

      return {
        data: payload as T,
        status: response.status,
        headers: response.headers,
      };
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        const timeoutError: ApiError = new Error(
          "Request timed out"
        ) as ApiError;
        timeoutError.status = 408;
        throw timeoutError;
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined>
  ): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    if (!query) return `${this.baseUrl}${normalizedPath}`;

    const params = Object.entries(query)
      .filter(([, v]) => v !== undefined)
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
      )
      .join("&");

    return params.length
      ? `${this.baseUrl}${normalizedPath}?${params}`
      : `${this.baseUrl}${normalizedPath}`;
  }
}

// Example instantiation (import and reuse across app)
export const apiClient = new ApiClient(
  typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost:8080/api"
);