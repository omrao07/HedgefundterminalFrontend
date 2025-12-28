// api/api.types.ts
// Centralized domain & API contract types
// Types only — safe to import everywhere

/* =========================
   Common / Core
   ========================= */

export interface ApiSuccess {
  success: true;
}

export type Severity = "low" | "medium" | "high" | "critical";

/* =========================
   Dashboard Domain
   ========================= */

export interface DroneStatus {
  id: string;
  name: string;
  status: "idle" | "active" | "offline" | "error";
  battery: number; // %
  gps: {
    lat: number;
    lon: number;
    altitude: number;
  };
  signalStrength: number; // %
  lastUpdated: string; // ISO
}

export interface MissionSummary {
  missionId: string;
  missionType: string;
  startTime: string;
  endTime?: string;
  status: "planned" | "running" | "completed" | "aborted";
  dronesInvolved: number;
}

export interface Alert {
  id: string;
  severity: Severity;
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

/* =========================
   Execution Domain
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

/* =========================
   Market Domain
   ========================= */

export type MarketType =
  | "defence"
  | "homeland_security"
  | "emergency_response"
  | "logistics"
  | "commercial"
  | "custom";

export interface MarketOverview {
  totalOpportunities: number;
  activeTenders: number;
  activeClients: number;
  regionsCovered: number;
}

export interface MarketOpportunity {
  id: string;
  title: string;
  marketType: MarketType;
  region: string;
  valueEstimate: number;
  status: "open" | "in_progress" | "closed" | "lost";
  publishedAt: string;
  deadline?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  sector: MarketType;
  country: string;
  activeContracts: number;
  totalValue: number;
}

export interface PricingModel {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  recurringPrice?: number;
  currency: string;
}

/* =========================
   News Domain
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
  credibilityScore?: number;
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
  importance: Severity;
}

/* =========================
   Portfolio / Assets Domain
   ========================= */

export type AssetType =
  | "drone"
  | "payload"
  | "ground_station"
  | "docking_station"
  | "sensor"
  | "software";

export type AssetStatus =
  | "active"
  | "inactive"
  | "maintenance"
  | "decommissioned";

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  model: string;
  serialNumber: string;
  status: AssetStatus;
  location?: string;
  lastServiceDate?: string;
}

export interface FleetSummary {
  totalAssets: number;
  activeAssets: number;
  assetsInMaintenance: number;
  utilizationRate: number; // %
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  description: string;
  performedBy: string;
  performedAt: string;
  nextDueAt?: string;
}

export interface Assignment {
  assetId: string;
  missionId: string;
  assignedAt: string;
}