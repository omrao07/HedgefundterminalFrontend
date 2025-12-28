// types/portfolio.types.ts
// Asset, fleet, and portfolio management domain types
// Types only — safe for import type

/* =========================
   Asset Classification
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

/* =========================
   Assets
   ========================= */

export interface Asset {
  id: string;
  name: string;
  assetType: AssetType;
  model: string;
  serialNumber: string;
  status: AssetStatus;
  location?: string;
  lastServiceDate?: string; // ISO timestamp
}

/* =========================
   Fleet Overview
   ========================= */

export interface FleetSummary {
  totalAssets: number;
  activeAssets: number;
  assetsInMaintenance: number;
  utilizationRate: number; // percentage
}

/* =========================
   Maintenance
   ========================= */

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  description: string;
  performedBy: string;
  performedAt: string; // ISO timestamp
  nextDueAt?: string;  // ISO timestamp
}

/* =========================
   Assignments
   ========================= */

export interface Assignment {
  assetId: string;
  missionId: string;
  assignedAt: string; // ISO timestamp
}