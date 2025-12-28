// types/news.types.ts
// News, intelligence, and information domain types
// Types only — safe for import type

/* =========================
   Common
   ========================= */

export type Severity = "low" | "medium" | "high" | "critical";

/* =========================
   News Classification
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

/* =========================
   News Sources
   ========================= */

export interface NewsSource {
  id: string;
  name: string;
  credibilityScore?: number; // optional internal scoring
}

/* =========================
   News Items
   ========================= */

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: NewsCategory;
  source: NewsSource;
  publishedAt: string; // ISO timestamp
  url?: string;
  tags?: string[];
  importance: Severity;
}

/* =========================
   Aggregates / Views
   ========================= */

export interface NewsFeedMeta {
  totalItems: number;
  lastUpdated: string; // ISO timestamp
}

export interface NewsFeed {
  items: NewsItem[];
  meta: NewsFeedMeta;
}