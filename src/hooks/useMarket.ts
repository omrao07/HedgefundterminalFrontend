// hooks/useMarket.ts
// Clean state management, polling optional, no external libs

import { useCallback, useEffect, useState } from "react";
import {
  getMarketOverview,
  getMarketOpportunities,
  getClientProfiles,
  getPricingModels,
  upsertPricingModel,
} from "../api";

import type {
  MarketOverview,
  MarketOpportunity,
  ClientProfile,
  PricingModel,
} from "../api";

/* =========================
   Types
   ========================= */

interface MarketState {
  loading: boolean;
  error: string | null;
  overview: MarketOverview | null;
  opportunities: MarketOpportunity[];
  clients: ClientProfile[];
  pricing: PricingModel[];
}

/* =========================
   Hook
   ========================= */

export function useMarket(pollIntervalMs: number = 0) {
  const [state, setState] = useState<MarketState>({
    loading: true,
    error: null,
    overview: null,
    opportunities: [],
    clients: [],
    pricing: [],
  });

  const fetchAll = useCallback(async () => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const [
        overviewRes,
        opportunitiesRes,
        clientsRes,
        pricingRes,
      ] = await Promise.all([
        getMarketOverview(),
        getMarketOpportunities(),
        getClientProfiles(),
        getPricingModels(),
      ]);

      setState({
        loading: false,
        error: null,
        overview: overviewRes.data,
        opportunities: opportunitiesRes.data,
        clients: clientsRes.data,
        pricing: pricingRes.data,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load market data",
      }));
    }
  }, []);

  /* =========================
     Actions
     ========================= */

  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  const savePricingModel = useCallback(
    async (model: PricingModel) => {
      await upsertPricingModel(model);
      await fetchAll();
    },
    [fetchAll]
  );

  /* =========================
     Effects
     ========================= */

  useEffect(() => {
    fetchAll();

    if (pollIntervalMs > 0) {
      const id = setInterval(fetchAll, pollIntervalMs);
      return () => clearInterval(id);
    }
  }, [fetchAll, pollIntervalMs]);

  /* =========================
     API
     ========================= */

  return {
    ...state,
    refresh,
    savePricingModel,
  };
}