// hooks/useNews.ts
// Production-ready React hook for news & intelligence feeds
// Clean state management, polling optional, no external libs

import { useCallback, useEffect, useState } from "react";
import {
  getLatestNews,
  getNewsById,
  getCriticalNews,
  getNewsBySource,
} from "../api";

import type {
  NewsItem,
  NewsCategory,
} from "../api";

/* =========================
   Types
   ========================= */

interface NewsState {
  loading: boolean;
  error: string | null;
  items: NewsItem[];
  selected: NewsItem | null;
}

/* =========================
   Hook
   ========================= */

export function useNews(pollIntervalMs: number = 0) {
  const [state, setState] = useState<NewsState>({
    loading: true,
    error: null,
    items: [],
    selected: null,
  });

  const fetchLatest = useCallback(
    async (category?: NewsCategory, limit: number = 20) => {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));

        const res = await getLatestNews(category, limit);

        setState((s) => ({
          ...s,
          loading: false,
          items: res.data,
        }));
      } catch (err) {
        setState((s) => ({
          ...s,
          loading: false,
          error:
            err instanceof Error
              ? err.message
              : "Failed to load news",
        }));
      }
    },
    []
  );

  const fetchCritical = useCallback(async () => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const res = await getCriticalNews();

      setState((s) => ({
        ...s,
        loading: false,
        items: res.data,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load critical news",
      }));
    }
  }, []);

  const fetchBySource = useCallback(async (sourceId: string) => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const res = await getNewsBySource(sourceId);

      setState((s) => ({
        ...s,
        loading: false,
        items: res.data,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load news by source",
      }));
    }
  }, []);

  const selectNews = useCallback(async (newsId: string) => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const res = await getNewsById(newsId);

      setState((s) => ({
        ...s,
        loading: false,
        selected: res.data,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load news item",
      }));
    }
  }, []);

  const refresh = useCallback(() => {
    fetchLatest();
  }, [fetchLatest]);

  /* =========================
     Effects
     ========================= */

  useEffect(() => {
    fetchLatest();

    if (pollIntervalMs > 0) {
      const id = setInterval(fetchLatest, pollIntervalMs);
      return () => clearInterval(id);
    }
  }, [fetchLatest, pollIntervalMs]);

  /* =========================
     API
     ========================= */

  return {
    ...state,
    refresh,
    fetchLatest,
    fetchCritical,
    fetchBySource,
    selectNews,
  };
}