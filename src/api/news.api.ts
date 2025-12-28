// news.api.ts
// Production-ready API layer for news, intelligence feeds, and updates
// Depends only on client.ts

import { apiClient, ApiResponse } from "./client";

/* =========================
   Types
   ========================= */

export type NewsCategory =
  | "defence"
  | "security"
  | "technology"
  | "policy"
  | "geopolitics"
  | "disaster"
  | "industry"
  | "custom";

export interface NewsSource {
  id: string;
  name: string;
  credibilityScore?: number; // optional internal scoring
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: NewsCategory;
  source: NewsSource;
  publishedAt: string;
  url?: string;
  tags?: string[];
  importance: "low" | "medium" | "high" | "critical";
}

/* =========================
   API Functions
   ========================= */

/**
 * Fetch latest news items
 */
export function getLatestNews(
  category?: NewsCategory,
  limit: number = 20
): Promise<ApiResponse<NewsItem[]>> {
  return apiClient.get("/news", {
    query: { category, limit },
  });
}

/**
 * Fetch a specific news item
 */
export function getNewsById(
  newsId: string
): Promise<ApiResponse<NewsItem>> {
  return apiClient.get(`/news/${newsId}`);
}

/**
 * Fetch high-importance alerts/news
 */
export function getCriticalNews(): Promise<
  ApiResponse<NewsItem[]>
> {
  return apiClient.get("/news/critical");
}

/**
 * Fetch news by source
 */
export function getNewsBySource(
  sourceId: string
): Promise<ApiResponse<NewsItem[]>> {
  return apiClient.get("/news/source", {
    query: { sourceId },
  });
}