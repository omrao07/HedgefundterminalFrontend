// hooks/useDashboard.ts
// Clean state management, polling optional, no external libs

import { useCallback, useEffect, useState } from "react";
import {
  getDashboardOverview,
  getDroneStatuses,
  getRecentMissions,
  getAlerts,
  acknowledgeAlert,
  emergencyLandDrone,
  abortExecutionMission,
} from "../api";

import type {
  DroneStatus,
  MissionSummary,
  Alert,
} from "../api";

/* =========================
   Types
   ========================= */

interface DashboardState {
  loading: boolean;
  error: string | null;
  overview: {
    activeDrones: number;
    totalDrones: number;
    activeMissions: number;
    alerts: number;
  } | null;
  drones: DroneStatus[];
  missions: MissionSummary[];
  alerts: Alert[];
}

/* =========================
   Hook
   ========================= */

export function useDashboard(pollIntervalMs: number = 5000) {
  const [state, setState] = useState<DashboardState>({
    loading: true,
    error: null,
    overview: null,
    drones: [],
    missions: [],
    alerts: [],
  });

  const fetchAll = useCallback(async () => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));

      const [
        overviewRes,
        dronesRes,
        missionsRes,
        alertsRes,
      ] = await Promise.all([
        getDashboardOverview(),
        getDroneStatuses(),
        getRecentMissions(),
        getAlerts(false),
      ]);

      setState({
        loading: false,
        error: null,
        overview: overviewRes.data,
        drones: dronesRes.data,
        missions: missionsRes.data,
        alerts: alertsRes.data,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to load dashboard",
      }));
    }
  }, []);

  /* =========================
     Actions
     ========================= */

  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  const onAcknowledgeAlert = useCallback(
    async (alertId: string) => {
      await acknowledgeAlert(alertId);
      await fetchAll();
    },
    [fetchAll]
  );

  const onEmergencyLand = useCallback(
    async (droneId: string) => {
      await emergencyLandDrone(droneId);
      await fetchAll();
    },
    [fetchAll]
  );

  const onAbortMission = useCallback(
    async (missionId: string, reason: string) => {
      await abortExecutionMission(missionId, reason);
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
    acknowledgeAlert: onAcknowledgeAlert,
    emergencyLandDrone: onEmergencyLand,
    abortMission: onAbortMission,
  };
}