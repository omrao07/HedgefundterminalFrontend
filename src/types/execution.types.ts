// types/execution.types.ts
// Execution & mission-control domain types
// Types only — no runtime code

/* =========================
   Mission Lifecycle
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

/* =========================
   Navigation & Waypoints
   ========================= */

export interface Waypoint {
  lat: number;
  lon: number;
  altitude: number;
  speed?: number;
  loiterTimeSec?: number;
}

/* =========================
   Mission Configuration
   ========================= */

export interface MissionConfig {
  missionType: MissionType;
  drones: string[];              // Drone IDs
  waypoints: Waypoint[];
  geofenceId?: string;
  payloadProfile?: string;
  autoReturn: boolean;
  emergencyRTL: boolean;
}

/* =========================
   Mission Execution State
   ========================= */

export interface MissionExecution {
  missionId: string;
  missionType: MissionType;
  status: MissionStatus;
  startedAt?: string;            // ISO timestamp
  completedAt?: string;          // ISO timestamp
}

/* =========================
   Command Results
   ========================= */

export interface ExecutionCommandResult {
  success: boolean;
  message?: string;
}