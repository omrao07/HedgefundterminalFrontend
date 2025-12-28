// dashboard.api.ts
// Production-ready Dashboard API layer
// Depends only on client.ts (no external libraries)

import { apiClient, ApiResponse } from "./client";

/* =========================
   Types
   ========================= */

export interface DroneStatus {
  id: string;
  name: string;
  status: "idle" | "active" | "offline" | "error";
  battery: number; // percentage
  gps: {
    lat: number;
    lon: number;
    altitude: number;
  };
  signalStrength: number; // percentage
  lastUpdated: string; // ISO timestamp
}

export interface MissionSummary {
  missionId: string;
  missionType: string;
  startTime: string;
  endTime?: string;
  status: "planned" | "running" | "completed" | "aborted";
  dronesInvolved: number;
}

export interface TelemetrySnapshot {
  droneId: string;
  speed: number;
  heading: number;
  altitude: number;
  temperature?: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

/* =========================
   API Functions
   ========================= */

/**
 * Fetch high-level dashboard overview
 */
export function getDashboardOverview(): Promise<
  ApiResponse<{
    activeDrones: number;
    totalDrones: number;
    activeMissions: number;
    alerts: number;
  }>
> {
  return apiClient.get("/dashboard/overview");
}

/**
 * Fetch all drone statuses
 */
export function getDroneStatuses(): Promise<ApiResponse<DroneStatus[]>> {
  return apiClient.get("/dashboard/drones");
}

/**
 * Fetch telemetry snapshot for a specific drone
 */
export function getDroneTelemetry(
  droneId: string
): Promise<ApiResponse<TelemetrySnapshot>> {
  return apiClient.get(`/dashboard/drones/${droneId}/telemetry`);
}

/**
 * Fetch recent missions
 */
export function getRecentMissions(
  limit: number = 10
): Promise<ApiResponse<MissionSummary[]>> {
  return apiClient.get("/dashboard/missions", {
    query: { limit },
  });
}

/**
 * Fetch active alerts
 */
export function getAlerts(
  includeAcknowledged: boolean = false
): Promise<ApiResponse<Alert[]>> {
  return apiClient.get("/dashboard/alerts", {
    query: { includeAcknowledged },
  });
}

/**
 * Acknowledge an alert
 */
export function acknowledgeAlert(
  alertId: string
): Promise<ApiResponse<{ success: true }>> {
  return apiClient.post(`/dashboard/alerts/${alertId}/acknowledge`, {});
}

/**
 * Abort an active mission
 */
export function abortMission(
  missionId: string,
  reason: string
): Promise<ApiResponse<{ success: true }>> {
  return apiClient.post(`/dashboard/missions/${missionId}/abort`, {
    reason,
  });
}

/**
 * Emergency command to land a drone immediately
 */
export function emergencyLandDrone(
  droneId: string
): Promise<ApiResponse<{ success: true }>> {
  return apiClient.post(`/dashboard/drones/${droneId}/emergency-land`, {});
}