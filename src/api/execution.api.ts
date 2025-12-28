// execution.api.ts
// Production-ready API layer for mission execution & real-time drone control
// Depends only on client.ts

import { apiClient, ApiResponse } from "./client";

/* =========================
   Types
   ========================= */

export type MissionType =
  | "surveillance"
  | "patrol"
  | "loiter"
  | "delivery"
  | "reconnaissance"
  | "emergency"
  | "custom";

export type MissionStatus =
  | "queued"
  | "initializing"
  | "running"
  | "paused"
  | "completed"
  | "aborted"
  | "failed";

export interface Waypoint {
  lat: number;
  lon: number;
  altitude: number;
  speed?: number;
  loiterTimeSec?: number;
}

export interface MissionConfig {
  missionType: MissionType;
  drones: string[];
  waypoints: Waypoint[];
  geofenceId?: string;
  payloadProfile?: string;
  autoReturn: boolean;
  emergencyRTL: boolean;
}

export interface MissionExecution {
  missionId: string;
  missionType: MissionType;
  status: MissionStatus;
  startedAt?: string;
  completedAt?: string;
}

export interface ExecutionCommandResult {
  success: boolean;
  message?: string;
}

/* =========================
   Mission Lifecycle APIs
   ========================= */

/**
 * Create and start a mission
 */
export function startMission(
  config: MissionConfig
): Promise<ApiResponse<MissionExecution>> {
  return apiClient.post("/execution/missions/start", config);
}

/**
 * Pause a running mission
 */
export function pauseMission(
  missionId: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/missions/${missionId}/pause`, {});
}

/**
 * Resume a paused mission
 */
export function resumeMission(
  missionId: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/missions/${missionId}/resume`, {});
}

/**
 * Abort a mission
 */
export function abortMission(
  missionId: string,
  reason: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/missions/${missionId}/abort`, { reason });
}

/**
 * Fetch mission execution status
 */
export function getMissionStatus(
  missionId: string
): Promise<ApiResponse<MissionExecution>> {
  return apiClient.get(`/execution/missions/${missionId}/status`);
}

/**
 * Fetch all active missions
 */
export function getActiveMissions(): Promise<
  ApiResponse<MissionExecution[]>
> {
  return apiClient.get("/execution/missions/active");
}

/* =========================
   Real-Time Drone Commands
   ========================= */

/**
 * Command drone to take off
 */
export function takeOffDrone(
  droneId: string,
  altitude: number
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/drones/${droneId}/takeoff`, {
    altitude,
  });
}

/**
 * Command drone to land
 */
export function landDrone(
  droneId: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/drones/${droneId}/land`, {});
}

/**
 * Command drone to hover
 */
export function hoverDrone(
  droneId: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/drones/${droneId}/hover`, {});
}

/**
 * Command drone to return to launch (RTL)
 */
export function returnToLaunch(
  droneId: string
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(`/execution/drones/${droneId}/rtl`, {});
}

/**
 * Redirect drone to a new waypoint immediately
 */
export function redirectDrone(
  droneId: string,
  waypoint: Waypoint
): Promise<ApiResponse<ExecutionCommandResult>> {
  return apiClient.post(
    `/execution/drones/${droneId}/redirect`,
    waypoint
  );
}