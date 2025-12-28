// hooks/usePortfolio.ts
// Production-ready React hook for asset, fleet, and maintenance management
// Clean state management, polling optional, no external libs

import { useCallback, useEffect, useState } from "react";
import {
  getFleetSummary,
  getAssets,
  getAssetById,
  updateAssetStatus,
  getMaintenanceRecords,
  addMaintenanceRecord,
  assignAssetToMission,
} from "../api";

import type {
  Asset,
  AssetType,
  AssetStatus,
  FleetSummary,
  MaintenanceRecord,
  Assignment,
} from "../api";

/* =========================
   Types
   ========================= */

interface PortfolioState {
  loading: boolean;
  error: string | null;
  summary: FleetSummary | null;
  assets: Asset[];
  selectedAsset: Asset | null;
  maintenance: MaintenanceRecord[];
}

/* =========================
   Hook
   ========================= */

export function usePortfolio(pollIntervalMs: number = 0) {
  const [state, setState] = useState<PortfolioState>({
    loading: true,
    error: null,
    summary: null,
    assets: [],
    selectedAsset: null,
    maintenance: [],
  });

  /* =========================
     Fetchers
     ========================= */

  const fetchSummary = useCallback(async () => {
    const res = await getFleetSummary();
    return res.data;
  }, []);

  const fetchAssets = useCallback(
    async (assetType?: AssetType, status?: AssetStatus) => {
      const res = await getAssets(assetType, status);
      return res.data;
    },
    []
  );

  const fetchAll = useCallback(async () => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const [summary, assets] = await Promise.all([
        fetchSummary(),
        fetchAssets(),
      ]);

      setState((s) => ({
        ...s,
        loading: false,
        summary,
        assets,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load portfolio data",
      }));
    }
  }, [fetchSummary, fetchAssets]);

  const selectAsset = useCallback(async (assetId: string) => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const [assetRes, maintenanceRes] = await Promise.all([
        getAssetById(assetId),
        getMaintenanceRecords(assetId),
      ]);

      setState((s) => ({
        ...s,
        loading: false,
        selectedAsset: assetRes.data,
        maintenance: maintenanceRes.data,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load asset details",
      }));
    }
  }, []);

  /* =========================
     Actions
     ========================= */

  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  const setAssetStatus = useCallback(
    async (assetId: string, status: AssetStatus) => {
      await updateAssetStatus(assetId, status);
      await fetchAll();
    },
    [fetchAll]
  );

  const addMaintenance = useCallback(
    async (record: Omit<MaintenanceRecord, "id">) => {
      await addMaintenanceRecord(record);
      if (record.assetId === state.selectedAsset?.id) {
        await selectAsset(record.assetId);
      } else {
        await fetchAll();
      }
    },
    [fetchAll, selectAsset, state.selectedAsset]
  );

  const assignToMission = useCallback(
    async (assetId: string, missionId: string): Promise<Assignment> => {
      const res = await assignAssetToMission(assetId, missionId);
      await fetchAll();
      return res.data;
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
    selectAsset,
    setAssetStatus,
    addMaintenance,
    assignToMission,
  };
}